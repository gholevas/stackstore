'use strict';
var mongoose = require('mongoose');

var StoreSchema = new mongoose.Schema({

    name: { type: String, required: true },
    url: { type: String, unique: true },
    pic: { type: String, default: "http://lorempixel.com/400/400/" },
    headline: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    likers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]

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
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}


StoreSchema.methods.addProduct = function(product) {
    var theStore = this;
    var product;
    return ProductSchema.create(product)
        .then(function(c) {
            product = c;
            theStore.products.addToSet(c._id);
            return theStore.save();
        })
};


StoreSchema.methods.removeProduct = function(product) {
    var theStore = this;
    return product.remove()
        .then(function() {
            theStore.products.pull(product);
            return theStore.save();
        });
};


StoreSchema.pre('validate', function(next) {
    this.url = convertToUrl(this.name);
    next();
}); 

mongoose.model('Store', StoreSchema);
