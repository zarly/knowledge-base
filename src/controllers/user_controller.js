'use strict';

//dependencies
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * User Controller
 *
 * @description :: Server-side logic for managing User.
 */
module.exports = {
    /**
     * @function
     * @name users.index()
     * @description display a list of all users
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    index: function(request, response, next) {
        User
            .paginate({},{
                    page: request.query.page,
                    limit: request.query.limit
                },
                function(error, users, pages, total) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok({
                                users: users,
                                pages: pages,
                                count: total
                            });
                    }
                });
    },

    
    /**
     * @function
     * @name users.create()
     * @description create a new user
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    create: function(request, response, next) {
        User
            .create(request.body, function(error, user) {
                if (error) {
                    next(error);
                } else {
                    response
                        .created(user);
                }
            });
    },


    /**
     * @function
     * @name users.show()
     * @description display a specific user
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    show: function(request, response, next) {
        User
            .findById(request.params.id, function(error, user) {
                if (error) {
                    next(error);
                } else {
                    response
                        .ok(user);
                }
            });
    },


    /**
     * @function
     * @name users.update()
     * @description update a specific user
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    update: function(request, response, next) {
        User
            .findByIdAndUpdate(
                request.params.id,
                request.body,
                {upsert:true,new:true},
                function(error, user) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok(user);
                    }
                });
    },


    /**
     * @function
     * @name users.destroy()
     * @description delete a specific user
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    destroy: function(request, response, next) {
        User
            .findByIdAndRemove(
                request.params.id,
                function(error, user) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok(user);
                    }
                });
    }

};