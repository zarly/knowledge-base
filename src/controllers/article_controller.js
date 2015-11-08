'use strict';

//dependencies
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

/**
 * Article Controller
 *
 * @description :: Server-side logic for managing Article.
 */
module.exports = {
    /**
     * @function
     * @name articles.index()
     * @description display a list of all articles
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    index: function(request, response, next) {
        Article
            .paginate({},{
                    page: request.query.page,
                    limit: request.query.limit
                },
                function(error, articles, pages, total) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok({
                                articles: articles,
                                pages: pages,
                                count: total
                            });
                    }
                });
    },

    
    /**
     * @function
     * @name articles.create()
     * @description create a new article
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    create: function(request, response, next) {
        Article
            .create(request.body, function(error, article) {
                if (error) {
                    next(error);
                } else {
                    response
                        .created(article);
                }
            });
    },


    /**
     * @function
     * @name articles.show()
     * @description display a specific article
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    show: function(request, response, next) {
        Article
            .findById(request.params.id, function(error, article) {
                if (error) {
                    next(error);
                } else {
                    response
                        .ok(article);
                }
            });
    },


    /**
     * @function
     * @name articles.update()
     * @description update a specific article
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    update: function(request, response, next) {
        Article
            .findByIdAndUpdate(
                request.params.id,
                request.body,
                {upsert:true,new:true},
                function(error, article) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok(article);
                    }
                });
    },


    /**
     * @function
     * @name articles.destroy()
     * @description delete a specific article
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    destroy: function(request, response, next) {
        Article
            .findByIdAndRemove(
                request.params.id,
                function(error, article) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok(article);
                    }
                });
    }

};