'use strict';
var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
	purchased: Boolean,
	status: String, //purchases? paid? complete? 
	boxes: [{
		box: {type: mongoose.Schema.ObjectId, ref: 'Box'},
		quantity: Number
	}]
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

mongoose.model('Cart', CartSchema);