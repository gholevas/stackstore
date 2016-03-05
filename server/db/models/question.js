'use strict';
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    text: String,
    answers: [{
        text: String,
        tag: String
    }]
});

mongoose.model('Question', QuestionSchema);
