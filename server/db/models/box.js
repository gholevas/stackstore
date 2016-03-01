'use strict';
var mongoose = require('mongoose');
var enums = require('./enums.js');

var BoxSchema = new mongoose.Schema({

	name: {type: String, unique: true}
	,imgUrl: String
	,priceLevel: {type: String, enum: enums.priceLevel}
	,gender: {type: String, enum: enums.gender}
	,ageRange: {type: String, enum: enums.agerange}
	,interest: {type: String, enum: enums.interest}

}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

BoxSchema.virtual('price')
.get(function () {
  return this.priceLevel=="cheap"? 20 : 100;
})
.set(function (price) {
  this.set('price', price);
});

//pre save hooks? map exact age to agerange

mongoose.model('Box', BoxSchema);