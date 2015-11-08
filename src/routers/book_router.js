'use strict';
/**
 * Book Router
 *
 * @description :: Server-side router for managing Book.
 */

//dependencies
var path = require('path');
var express = require('express');
var router = express.Router();
var controller = require(path.join(__dirname, '..', 'controllers', 'book_controller'));

/**
 * Handle Http GET on /books
 * @description display a list of all books
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/books', function(request, response, next) {
    controller.index(request, response, next);
});


/**
 * Handle Http POST on /books
 * @description create a new book
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.post('/books', function(request, response, next) {
    controller.create(request, response, next);
});


/**
 * Handle Http GET on /books/:id
 * @description display a specific book
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/books/:id', function(request, response, next) {
    controller.show(request, response, next);
});


/**
 * Handle Http PUT on /books/:id
 * @description update a specific book
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.put('/books/:id', function(request, response, next) {
    controller.update(request, response, next);
});


/**
 * Handle Http PATCH on /books/:id
 * @description update a specific book
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.patch('/books/:id', function(request, response, next) {
    controller.update(request, response, next);
});


/**
 * Handle Http DELETE on /books/:id
 * @description delete a specific book
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.delete('/books/:id', function(request, response, next) {
    controller.destroy(request, response, next);
});


/**
 * exports books router
 * @type {Object}
 */
module.exports = router;