'use strict';
var mongoose = require('mongoose');

var StoreSchema = new mongoose.Schema({

    name: { type: String, required: true},
	pic: {type:String, default: "http://lorempixel.com/400/400/"},
	seller: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
	questions: [{type: mongoose.Schema.Types.ObjectId, ref: "Question"}]
	
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

function convertToUrl(name) {
    return name
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
}

StoreSchema.virtual("url")
.get(function () {
	return "/store/"+convertToUrl(this.name);
});

mongoose.model('Store', StoreSchema);