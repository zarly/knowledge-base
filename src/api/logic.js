
import AsyncLib from 'async';
import Note from '../models/note.js'
import NoteApi from './note.js';

const logicHelper = {
  ensureArray: function (rawValue) {
    var resultArray;
    try {
      if('string' === typeof rawValue) {
        resultArray = JSON.parse(rawValue);
      }
      else if (rawValue instanceof Array) {
        resultArray = rawValue;
      }
    } catch (e) {}
    return resultArray;
  }
};

const routesHash = {

  'get_tags_by_string_beginning': (query, done) => {
    var search = ('' + query.search) || '';

    var dbQuery;
    if (search.length > 0) {
      dbQuery = {
        //title: {$regex: search}
        //title: {$text: {$search: search}} // since v2.6, need text index by db.collection.createIndex( { "$**": "text" } )
        $where: 'this.title && this.title.indexOf("' + search + '") >= 0' // TODO: replace to something more efficient
      };
    }
    else {
      dbQuery = {};
    }

    Note
        .paginate(dbQuery, {
          page: query.page,
          limit: query.limit
        },
        function(error, tags, pages, total) {
          if (error) {
            done(error);
          } else {
            done(null, {
              search: search,
              tags: tags,
              pages: pages,
              count: total
            });
          }
        });
  },

  'add_tag_if_not_exists': (query, done) => {
    var title = query.title;
    if (!title) {
      return done({message: 'Wrong query: title is required parameter'});
    }
    title = '' + title;

    Note
        .findOne({
          title: title
        },
        function(error, tag) {
          if (error) {
            done(error);
          } else {
            if (tag === null) {
              NoteApi.create({
                title: title
              }, done);
            }
            else {
              done(null, tag);
            }
          }
        });
  },

  'get_notes_for_list_of_tags': (query, done) => {
    var tags = logicHelper.ensureArray(query.tags);
    if (!tags) return done({message: 'Wrong query: tags is not valid array'});

    var conditions = tags.map(function (tag) {
      return {tags: tag};
    });

    var dbQuery;
    if (conditions.length >= 2) {
      dbQuery = {
        $and: conditions
      }
    }
    else if (conditions.length === 1) {
      dbQuery = conditions[0];
    }
    else {
      dbQuery = {};
    }

    Note
        .paginate(dbQuery, {
          page: query.page,
          limit: query.limit
        },
        function(error, notes, pages, total) {
          if (error) {
            done(error);
          } else {
            done(null, {
              tags: tags,
              notes: notes,
              pages: pages,
              count: total
            });
          }
        });
  },

  'create_note_with_adding_tags': function (query, done) {
    var tags = logicHelper.ensureArray(query.tags);
    if (!tags) return done({message: 'Wrong query: tags is not valid array'});

    AsyncLib.eachLimit(tags, 5, function (tag, localDone) {
      routesHash.add_tag_if_not_exists({title: tag}, localDone);
    }, function (error) {
      if (error) {
        done(error);
      } else {
        NoteApi.create(query, done);
      }
    });
  }
};

export default routesHash;
