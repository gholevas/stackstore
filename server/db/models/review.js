'use strict';
var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
	
	user: {type: mongoose.Schema.ObjectId, ref: "User"},
	title: {type: String, maxlength: 40},
	body: {type: String, minlength: 40},
	rating: {type: Number, min:0, max:5}

});

mongoose.model('Review', ReviewSchema);