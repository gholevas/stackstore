'use strict';
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Product = mongoose.model('Product');

var StoreSchema = new mongoose.Schema({

    name: { type: String },
    url: { type: String, unique: true },
    pic: { type: String, default: "http://lorempixel.com/400/400/" },
    headline: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
    likers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    active: {type:Boolean, default: true}

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
    return Product.create(product)
        .then(function(createdProduct) {
            theStore.products.addToSet(createdProduct);
            return theStore.save();
        });
};

StoreSchema.methods.removeProduct = function(product) {
    var theStore = this;
    return product.remove()
        .then(function() {
            theStore.products.pull(product);
            return theStore.save();
        });
};

StoreSchema.methods.addQuestion = function(question) {
    var theStore = this;
    return Question.create(question)
        .then(function(createdQuestion) {
            theStore.questions.addToSet(createdQuestion);
            return theStore.save();
        });
};

StoreSchema.methods.removeQuestion = function(question) {
    var theStore = this;
    return question.remove()
        .then(function() {
            theStore.questions.pull(question);
            return theStore.save();
        });
};

StoreSchema.pre('update', function(next) {
    this.url = convertToUrl(this.name);
    next();
}); 

StoreSchema.pre('validate', function(next) {
    this.url = convertToUrl(this.name);
    next();
}); 

mongoose.model('Store', StoreSchema);
