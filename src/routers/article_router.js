'use strict';
/**
 * Article Router
 *
 * @description :: Server-side router for managing Article.
 */

//dependencies
var path = require('path');
var express = require('express');
var router = express.Router();
var controller = require(path.join(__dirname, '..', 'controllers', 'article_controller'));

/**
 * Handle Http GET on /articles
 * @description display a list of all articles
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/articles', function(request, response, next) {
    controller.index(request, response, next);
});


/**
 * Handle Http POST on /articles
 * @description create a new article
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.post('/articles', function(request, response, next) {
    controller.create(request, response, next);
});


/**
 * Handle Http GET on /articles/:id
 * @description display a specific article
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/articles/:id', function(request, response, next) {
    controller.show(request, response, next);
});


/**
 * Handle Http PUT on /articles/:id
 * @description update a specific article
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.put('/articles/:id', function(request, response, next) {
    controller.update(request, response, next);
});


/**
 * Handle Http PATCH on /articles/:id
 * @description update a specific article
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.patch('/articles/:id', function(request, response, next) {
    controller.update(request, response, next);
});


/**
 * Handle Http DELETE on /articles/:id
 * @description delete a specific article
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.delete('/articles/:id', function(request, response, next) {
    controller.destroy(request, response, next);
});


/**
 * exports articles router
 * @type {Object}
 */
module.exports = router;