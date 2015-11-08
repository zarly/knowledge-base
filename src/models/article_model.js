'use strict';

/**
 * Article model
 *
 * @description :: Server-side model for managing Article
 */

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



//Article Schema
var ArticleSchema = new Schema({
    
    tags: {
    
        type: [{}]
    
    },
    
    content: {
    
        type: String
    
    },
    
    book: {
    
        type: String
    
    },
    
    updatedAt: {
    
        type: Date
    
    },
    
    createdAt: {
    
        type: Date
    
    }
    
});


//apply ArticleSchema level plugins


//exports Article model
module.exports = mongoose.model('Article', ArticleSchema);