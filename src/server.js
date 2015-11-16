
import 'babel-core/polyfill';
import path from 'path';
import config from 'config';

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import logger from 'morgan';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import TwitterStrategy from 'passport-twitter';
import PassportGoogleOAuth from 'passport-google-oauth';
const GoogleStrategy = PassportGoogleOAuth.OAuth2Strategy;
import FacebookStrategy from 'passport-facebook';

import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import ApiHelper from './api/_api_helper.js';

import mongoose from 'mongoose';
import MongooseInitializer from './initializers/mongoose.js';
import connectMongo from 'connect-mongo';

var MongoStore = connectMongo(session);

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
server.use(session({
  secret: config.auth.sessionSecretKey,
  saveUninitialized: true,
  resave:true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 100 * 365 * 24 * 3600
  })
}));
//server.use(session({secret: config.auth.sessionSecretKey, saveUninitialized: true, resave: true}));
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
      done(null, { id: 23, username: username });
    }
));
passport.use(new FacebookStrategy({
      clientID: config.facebook.appId,
      clientSecret: config.facebook.appSecret,
      callbackURL: 'http://' + config.host + '/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, {id: 222});
    }
));
passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: 'http://' + config.host + '/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, {id: 222});
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, 'juancito');
});

server.get('/auth/facebook', passport.authenticate('facebook'));
server.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
server.get('/auth/google', passport.authenticate('google', { scope: 'profile' }));
server.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
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
server.use('/api/logic', ApiHelper.setRoutes(require('./api/logic')));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    var isLoggedIn = req.session && req.session.passport && req.session.passport.user;
    var isOnLoginPage = req.path === '/login';
    if (!isLoggedIn && !isOnLoginPage) return res.redirect('/login');
    if (isLoggedIn && isOnLoginPage) return res.redirect('/');

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
