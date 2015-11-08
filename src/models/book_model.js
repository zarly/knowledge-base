'use strict';

/**
 * Book model
 *
 * @description :: Server-side model for managing Book
 */

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



//Book Schema
var BookSchema = new Schema({
    
    title: {
    
        type: String
    
    },
    
    id: {
    
        type: Number
    
    },
    
    owner: {
    
        type: String
    
    }
    
});


//apply BookSchema level plugins


//exports Book model
module.exports = mongoose.model('Book', BookSchema);