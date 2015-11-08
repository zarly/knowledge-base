'use strict';

//dependencies
var mongoose = require('mongoose');
var Book = mongoose.model('Book');

/**
 * Book Controller
 *
 * @description :: Server-side logic for managing Book.
 */
module.exports = {
    /**
     * @function
     * @name books.index()
     * @description display a list of all books
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    index: function(request, response, next) {
        Book
            .paginate({},{
                    page: request.query.page,
                    limit: request.query.limit
                },
                function(error, books, pages, total) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok({
                                books: books,
                                pages: pages,
                                count: total
                            });
                    }
                });
    },

    
    /**
     * @function
     * @name books.create()
     * @description create a new book
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    create: function(request, response, next) {
        Book
            .create(request.body, function(error, book) {
                if (error) {
                    next(error);
                } else {
                    response
                        .created(book);
                }
            });
    },


    /**
     * @function
     * @name books.show()
     * @description display a specific book
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    show: function(request, response, next) {
        Book
            .findById(request.params.id, function(error, book) {
                if (error) {
                    next(error);
                } else {
                    response
                        .ok(book);
                }
            });
    },


    /**
     * @function
     * @name books.update()
     * @description update a specific book
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    update: function(request, response, next) {
        Book
            .findByIdAndUpdate(
                request.params.id,
                request.body,
                {upsert:true,new:true},
                function(error, book) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok(book);
                    }
                });
    },


    /**
     * @function
     * @name books.destroy()
     * @description delete a specific book
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    destroy: function(request, response, next) {
        Book
            .findByIdAndRemove(
                request.params.id,
                function(error, book) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok(book);
                    }
                });
    }

};