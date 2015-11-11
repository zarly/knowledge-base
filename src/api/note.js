
import Note from '../models/note.js';

const routesHash = {
  'list': (query, done) => {
    Note
        .paginate({},{
          page: query.page,
          limit: query.limit
        },
        function(error, notes, pages, total) {
          if (error) {
            done(error);
          } else {
            done(null, {
              notes: notes,
              pages: pages,
              count: total
            });
          }
        });
  },
  'get': (query, done) => {
    done(null, 'get');
  },
  /**
   * @function
   * @name note.create()
   * @description create a new note
   * @param  {HttpRequest} req  a http request
   * @param  {HttpResponse} res a http response
   * @param  {Function} next a error handler
   */
  'create': (query, done) => {
    Note.create(query, function(error, note) {
      if (error) {
        done(error);
      } else {
        done(null, note);
      }
    });
  },
  'update': (req, res, next) => {
    res.status(200).send('update');
  },
  'delete': (req, res, next) => {
    res.status(200).send('delete');
  }
};

export default routesHash;
