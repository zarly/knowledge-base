
import Note from '../models/note.js';
import ApiHelper from './_api_helper.js';

const routesHash = {
  'list': (req, res) => {
    res.status(200).send('list');
  },
  'get': (req, res) => {
    res.status(200).send('get');
  },
  'create': (req, res) => {
    res.status(200).send('create');
  },
  'update': (req, res) => {
    res.status(200).send('update');
  },
  'delete': (req, res) => {
    res.status(200).send('delete');
  }
};

export default ApiHelper.setRoutes(routesHash);
