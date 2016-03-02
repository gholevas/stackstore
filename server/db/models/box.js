'use strict';
var mongoose = require('mongoose');
var enums = require('./enums.js');

var BoxSchema = new mongoose.Schema({

	name: {type: String, unique: true}
  ,description: String
	,imgUrl: String
  ,isActive: Boolean
  ,gender: Boolean
	,ageRange: {type: String, enum: enums.agerange}
	,interest: {type: String, enum: enums.interest}
  ,keywords: [String]
  ,items: [String]
  ,premiumItems: [String]

}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

//pre save hooks? map exact age to agerange

mongoose.model('Box', BoxSchema);