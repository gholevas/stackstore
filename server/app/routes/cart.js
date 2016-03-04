'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart')
var Store = mongoose.model('Store')
module.exports = router;

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

var ensureAdmin = function(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

// Get all carts admin only
router.get('/', function(req, res, next) {
    Cart.find()
        .then(function(info) {
            res.json(info);
        })
        .then(null, next);
});

// get currentcart for a logged in user /api/cart/user
// needs to be logged in right now. need workaround for unauthticated using req.session
router.get('/user', ensureAuthenticated, function(req, res, next) {
    Cart.findById(req.user.cart)
        .populate('contents.product')
        .then(function(cart) {
            res.json(cart);
        })
        .then(null, next);
});

// creates a cart and adds the product
router.post('/', ensureAuthenticated, function(req, res, next) {


});

//aka convert to order
router.get('/purchase', function(req, res, next){
    
    //order for user
    var userOrder = Order.create(req.body)
    .then(function(order){

    });

    var storeContent = {};
    req.body.contents.forEach(function(content){
        var storeId = content.product.store;
        storeContent[storeId] = storeContent[storeId] || [];
        storeContent[storeId].push(content);
    });

    //new order for every store they bought from
    for(content in storeContent){
        var storeOrder = Order.create({
            contents: content,
            shipping: req.body.shipping,
            billing: req.body.billing
        });
    }

    

});

// creates a cart and adds the product
router.put('/user', ensureAuthenticated, function(req, res, next) {
    Cart.findByIdAndUpdate(req.user.cart._id,req.user.cart,{new:true})
        .then(function(cart) {
            res.json(cart);
        })
        .then(null, next);

});

// remove a box from a cart
router.delete('/', ensureAuthenticated, function(req, res, next) {


});
