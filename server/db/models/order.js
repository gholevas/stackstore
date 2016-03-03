'use strict';
var mongoose = require('mongoose');
var ProductSchema = require('./product');

var OrderSchema = new mongoose.Schema({
    totalPrice: Number,
    shipping: {
        name: {
            first: String,
            last: String
        },
        street: String,
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
        city: String,
        state: String,
        zip: Number
    }
    contents: [ProductSchema]
});

mongoose.model('Order', OrderSchema);
