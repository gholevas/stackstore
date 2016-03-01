'use strict';
var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
	
	user: {type: mongoose.Schema.ObjectId, ref: "User"},
	box: {type: mongoose.Schema.ObjectId, ref: "Box"},
	title: {type: String, maxlength: 40},
	body: {type: String, minlength: 40}

});

mongoose.model('Review', ReviewSchema);