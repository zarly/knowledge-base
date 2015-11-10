
import Note from '../models/note.js';
import ApiHelper from './_api_helper.js';

const routesHash = {
  'list': (req, res, next) => {
    Note
        .paginate({},{
          page: req.query.page,
          limit: req.query.limit
        },
        function(error, notes, pages, total) {
          if (error) {
            next(error);
          } else {
            res
                .json({
                  notes: notes,
                  pages: pages,
                  count: total
                });
          }
        });
  },
  'get': (req, res, next) => {
    res.status(200).send('get');
  },
  /**
   * @function
   * @name note.create()
   * @description create a new note
   * @param  {HttpRequest} req  a http request
   * @param  {HttpResponse} res a http response
   * @param  {Function} next a error handler
   */
  'create': (req, res, next) => {
    Note.create(req.body || {}, function(error, note) {
      if (error) {
        next(error);
      } else {
        res.json(note);
        //res.status(200).send('create');
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

export default ApiHelper.setRoutes(routesHash);
