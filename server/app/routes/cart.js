'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart')
module.exports = router;
var BoxWrapper = mongoose.model('BoxWrapper')


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

    //here we get answers, and map to a box
    //that means req.body is answers
    //answers should have isPremium
    //now we have a box
    // var box = mappedbox
    var boxwrapper = new BoxWrapper({
        box: box
        ,isPremium: req.body.isPremium
        ,quantity: req.body.quantity
    })


    if(req.query.cartId){
        Cart.findById(req.query.cartId)
        .then(function(cart){
            return cart.addBoxWrapper(boxwrapper);
        })
        .then(function(info){
            res.send(info);
        })
        .then(null,next);
    }else{
        Cart.create({})
        .then(function(cart){
            return cart.addBoxWrapper(boxwrapper)
        })
        .then(function(info){
            res.send(info);
        })
        .then(null,next);
    }
});

// remove a box from a cart
router.delete('/', function (req, res, next) {

    //here the req.body is a BoxWrapper already, since the cart came from backend

    mongoose.model('Cart').findById(req.query.cartId)
    .then(function(cart){
        return cart.removeBox(req.body)
    })
    .then(function(info){
        res.send(info);
    })
    .then(null,next);
});

