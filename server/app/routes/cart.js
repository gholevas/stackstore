'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart')
module.exports = router;



// get a cart
router.get('/', function (req, res, next) {
    Cart.findById(req.query.cartId)
    .then(function(info){
        res.send(info);
    })
    .then(null,next);
});


// add a box to cart (creates a cart and adds box if there is no cartId provided in the query)
router.post('/', function (req, res, next) {
    if(req.query.cartId){
        Cart.findById(req.query.cartId)
        .then(function(cart){
            return cart.addBox(req.body);
        })
        .then(function(info){
            res.send(info);
        })
        .then(null,next);
    }else{
        Cart.create({purchased:false})
        .then(function(cart){
            return cart.addBox(req.body)
        })
        .then(function(info){
            res.send(info);
        })
        .then(null,next);
    }
});

// remove a box from a cart
router.delete('/', function (req, res, next) {
    mongoose.model('Cart').findById(req.query.cartId)
    .then(function(cart){
        return cart.removeBox(req.body)
    })
    .then(function(info){
        res.send(info);
    })
    .then(null,next);
});

