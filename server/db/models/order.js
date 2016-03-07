'use strict';
var mongoose = require('mongoose');
var ProductSchema = mongoose.model('Product').schema;

var OrderSchema = new mongoose.Schema({
    totalPrice: Number,
    shipping: {
        name: {
            first: String,
            last: String
        },
        street: String,
        apt: String,
        city: String,
        state: String,
        zip: Number
    },
    billing: {
        name: {
            first: String,
            last: String
        },
        street: String,
        apt: String,
        city: String,
        state: String,
        zip: Number
    },
    contents: [{product:ProductSchema, quantity: Number}],
    date: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    confirmationNum: String

});

OrderSchema.pre("save", function(next){
    this.totalPrice = this.contents.reduce(function(prev,curr){
        return prev + (curr.quantity * curr.product.price);
    },0);
    this.confirmationNum = this.confirmationNum || (+new Date()).toString(36);
    next();
})

mongoose.model('Order', OrderSchema);
