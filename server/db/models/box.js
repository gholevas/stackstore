'use strict';
var mongoose = require('mongoose');

var BoxSchema = new mongoose.Schema({

	name: String,
	imgUrl: String,
	priceLevel: String,
	gender: String,	  //["M","F"];
	ageRange: String, //["0-12","13-20","21-30","31-54","55+"];
	interest: String, //["EDM","VANILLA","JAPANESE","WEIRD","OUTDOORS","VANITY"];

});

//pre save hooks? map exact age to agerange
//virtual price (based on price)
//BoxSchema.virtuals

mongoose.model('Box', BoxSchema);