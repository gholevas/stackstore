'use strict';
var mongoose = require('mongoose');
var enums = require('./enums.js');

var QuestionSchema = new mongoose.Schema({

  questionText: String
  ,questionImgUrl: String
	,answers: [{
    answerText: String //e.g. "M" "F" "0-10" "EDM" .. any of the possible answers
    ,answerImageUrl: String
    ,answerCategory: String //only applicable in the discrete methodology
    ,mappings: [{sliderCategory: String, points: Number}] //applicable if using slider methodology
  }]

}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

mongoose.model('Question', QuestionSchema);