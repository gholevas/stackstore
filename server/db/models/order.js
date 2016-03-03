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
    contents: [ProductSchema]
});

mongoose.model('Order', OrderSchema);
