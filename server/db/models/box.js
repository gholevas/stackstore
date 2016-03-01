'use strict';
var mongoose = require('mongoose');

var BoxSchema = new mongoose.Schema({

	name: String,
	imgUrl: String,
	priceLevel: String,
	gender: String,	  //["M","F"];
	ageRange: String, //["0-12","13-20","21-30","31-54","55+"];
	interest: String, //["EDM","VANILLA","JAPANESE","WEIRD","OUTDOORS","VANITY"];

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
  return priceLevel=="cheap"? 20 : 100;
})
.set(function (price) {
  this.set('price', price);
});

//pre save hooks? map exact age to agerange

mongoose.model('Box', BoxSchema);