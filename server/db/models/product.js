'use strict';
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({

	name: { type: String, required: true},
	price: { type: Number, required: true},
	imgUrl: String,
	tags: [String],
	store: {type: mongoose.Schema.Types.ObjectId, ref: "Store"}

});


mongoose.model('Product', ProductSchema);