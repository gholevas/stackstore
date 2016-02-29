'use strict';
var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
	purchased: Boolean,
	status: String, //purchases? paid? complete? 
	boxes: [{
		boxId: {type: mongoose.Schema.ObjectId, ref: 'Box'},
		quantity: Number
	}]
});

//virtual total price?


mongoose.model('Cart', CartSchema);