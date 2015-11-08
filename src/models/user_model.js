'use strict';

/**
 * User model
 *
 * @description :: Server-side model for managing User
 */

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



//User Schema
var UserSchema = new Schema({
    
    email: {
    
        type: String
    
    },
    
    password: {
    
        type: String
    
    }
    
});


//apply UserSchema level plugins


//exports User model
module.exports = mongoose.model('User', UserSchema);