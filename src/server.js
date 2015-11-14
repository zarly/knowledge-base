/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import logger from 'morgan';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import TwitterStrategy from 'passport-twitter';
import GoogleStrategy from 'passport-google';
import FacebookStrategy from 'passport-facebook';

import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import ApiHelper from './api/_api_helper.js';

import mongoose from 'mongoose';
import mongooseSession from 'mongoose-session';
import MongooseInitializer from './initializers/mongoose.js';

MongooseInitializer.init();

const server = global.server = express();
const port = process.env.PORT || 5000;
server.set('port', port);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(logger('combined'));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(methodOverride('X-HTTP-Method-Override'));
//server.use(session({secret: 'book-secret-key', saveUninitialized: true, resave: true, store: mongooseSession(mongoose)}));
server.use(session({secret: 'book-secret-key', saveUninitialized: true, resave: true}));
server.use(passport.initialize());
server.use(express.static(path.join(__dirname, 'public')));

// Session-persisted message middleware
//server.use(function(req, res, next){
//  var err = req.session.error,
//      msg = req.session.notice,
//      success = req.session.success;
//
//  delete req.session.error;
//  delete req.session.success;
//  delete req.session.notice;
//
//  if (err) res.locals.error = err;
//  if (msg) res.locals.notice = msg;
//  if (success) res.locals.success = success;
//
//  next();
//});

//
// Authentication
// -----------------------------------------------------------------------------
passport.use(new LocalStrategy(
    function(username, password, done) {
      //done(null, false, { message: 'Incorrect username.' });
      done(null, { id: 22, username: 'juancito' });
    }
));
//passport.use(new FacebookStrategy({
//      clientID: FACEBOOK_APP_ID,
//      clientSecret: FACEBOOK_APP_SECRET,
//      callbackURL: "http://www.example.com/auth/facebook/callback"
//    },
//    function(accessToken, refreshToken, profile, done) {
//      done(null, {user:222});
//    }
//));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, 'juancito');
});
server.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
server.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));
server.use('/api/note', ApiHelper.setRoutes(require('./api/note')));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    if (!req.user && req.path !== '/login') return res.redirect('/login');

    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
