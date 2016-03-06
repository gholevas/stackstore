'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
var Store = mongoose.model('Store');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
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
router.post('/purchase', ensureAuthenticated, function(req, res, next){

    //order for user
    Order.create(req.body)
        .then(function(order){
            return User.findById(req.user._id)
                .then(function(user){
                    if(!user) throw Error("nosuchuser");
                    user.orders.push(order);
                    return user.save();
                });
        })
        .catch(function(err){
            console.log("error creating user order",err);
        });

    var storeContent = {};
    req.body.contents.forEach(function(content){
        console.log("co ",content);
        var storeId = content.product.store;
        storeContent[storeId] = storeContent[storeId] || [];
        storeContent[storeId].push(content);
    });

    // //new order for every store they bought from
    for(var storeId in storeContent){
        var content = storeContent[storeId];

        var storeOrder = Order.create({
            contents: content,
            shipping: req.body.shipping,
            billing: req.body.billing
        })
        .catch(function(err){
            console.log("error creating store order",err);
        });
    }

});

// creates a cart and adds the product
router.put('/add-to-cart', ensureAuthenticated, function(req, res, next) {
    console.log('adding to cart', req.body)
    Cart.findById(req.user.cart._id)
        .then(function(cart) {
            return cart.addProduct(req.body)
        })
        .then(function (cart) {
            res.json(cart)
        })
        .then(null, next);

});

// creates a cart and adds the product
router.put('/user', ensureAuthenticated, function(req, res, next) {
    console.log('we here', req.body)
    Cart.findByIdAndUpdate(req.user.cart._id,req.body,{new:true})
        .then(function(cart) {
            res.json(cart);
        })
        .then(null, next);

});

// remove a box from a cart
router.put('/remove-product', ensureAuthenticated, function(req, res, next) {
    Cart.findById(req.user.cart._id)
        .then(function(cart) {
            console.log('removing from cart', req.body)
            return cart.removeProduct(req.body)
        })
        .then(function (cart) {
            res.json(cart)
        })
        .then(null, next);

});
