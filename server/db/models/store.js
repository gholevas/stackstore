'use strict';
var mongoose = require('mongoose');

var StoreSchema = new mongoose.Schema({

    name: { type: String, required: true},
	,pic: "http://lorempixel.com/400/400/"
	,seller: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
	,products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
	,questions: [{type: mongoose.Schema.Types.ObjectId, ref: "Questions"}]
	
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

StoreSchema.virtual("url")
.get(function () {
	return "/store/"+name;
});

mongoose.model('Store', StoreSchema);