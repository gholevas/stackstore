'use strict';
var mongoose = require('mongoose');
var enums = require('./enums.js');

var BoxSchema = new mongoose.Schema({

	name: {type: String, unique: true}
	,imgUrl: String
	,gender: {type: String, enum: enums.gender}
	,ageRange: {type: String, enum: enums.agerange}
	,interest: {type: String, enum: enums.interest}
	// ,gifts
	// ,premiumsGifts

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