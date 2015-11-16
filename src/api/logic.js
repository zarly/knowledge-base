
import Note from '../models/note.js';

const routesHash = {
  'get_notes_for_list_of_tags': (query, done) => {
    var tags = [];
    try {
      if('string' === typeof query.tags) {
        tags = JSON.parse(query.tags);
      }
      else if (query.tags instanceof Array) {
        tags = query.tags;
      }
    } catch (e) {
      return done({message: 'Wrong query: tags is not valid JSON'});
    }

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
  }
};

export default routesHash;
