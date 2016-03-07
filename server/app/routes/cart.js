'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Cart = mongoose.model('Cart');
var Store = mongoose.model('Store');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
module.exports = router;

var ensureAuthenticatedOrGuestCart = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {        

        return Cart.findOne({guestId: req.cookies["connect.sid"].toString()})
        .then(function(cart){
            if(!cart) return Cart.create({isGuest:true, guestId: req.cookies["connect.sid"].toString()});
            else return cart;
        }).then(function(cart){
            req.user = req.user || {}; //unnecessary since user will be null here
            req.user.cart = cart;
            next();
        }).catch(next);

    }
};

var ensureAdmin = function(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

// Get all carts admin only
router.get('/', ensureAdmin, function(req, res, next) {
    Cart.find()
        .then(function(info) {
            res.json(info);
        })
        .then(null, next);
});

// get currentcart for a logged in user /api/cart/user
// needs to be logged in right now. need workaround for unauthticated using req.session
router.get('/user', ensureAuthenticatedOrGuestCart, function(req, res, next) {
    Cart.findById(req.user.cart)
        .populate('contents.product')
        .then(function(cart) {
            res.json(cart);
        })
        .then(null, next);
});

// creates a cart and adds the product
router.post('/', ensureAuthenticatedOrGuestCart, function(req, res, next) {


});

//aka convert to order
router.post('/purchase', ensureAuthenticatedOrGuestCart, function(req, res, next){

    if(req.body.contents.length<1){
        res.send("no items in cart..");
        return;
    }

    var orderPromises = [];
    //organize cart contents by store
    var storeContent = {};
    req.body.contents.forEach(function(content){
        var storeId = content.product.store;
        storeContent[storeId] = storeContent[storeId] || [];
        storeContent[storeId].push(content);
    });

    // //new order for every store they bought from
    for(var storeId in storeContent){
        var content = storeContent[storeId];
        orderPromises.push(Order.create({
                contents: content,
                shipping: req.body.shipping,
                billing: req.body.billing
            })
        );       
    }

    //order for user
    req.body.user = req.user._id || null;
    var userOrder;
    orderPromises.push(Order.create(req.body)
            .then(function(order){
                userOrder = order;
                return User.findById(req.user._id)
                    .then(function(user){
                        if(!user) return "nosuchuser"; //don't want an error or next
                        //add to user's order history
                        user.orders.push(order);
                        // clear the user cart
                        user.cart.contents = [];
                        return user.save();
                    }).catch(console.log);
            })
        );
    
    Promise.all(orderPromises)
        .then(function(orders){
            console.log("store orders created ", orders)
            res.json(userOrder); //send back the full order
        })
        .catch(function(err){
            console.log("error creating store order",err);
            next(err);
        });

});

// creates a cart and adds the product
router.put('/add-to-cart', ensureAuthenticatedOrGuestCart, function(req, res, next) {
    Cart.findById(req.user.cart._id)
        .then(function(cart) {
            return cart.addProduct(req.body)
        })
        .then(function (cart) {
            res.json(cart)
        })
        .then(null, next);

});

// creates a cart and adds the product //TODO, is this being used? yes
router.put('/user', ensureAuthenticatedOrGuestCart, function(req, res, next) {
    Cart.findByIdAndUpdate(req.user.cart._id,req.body,{new:true})
        .then(function(cart) {
            res.json(cart);
        })
        .then(null, next);

});

// remove a box from a cart
router.put('/remove-product', ensureAuthenticatedOrGuestCart, function(req, res, next) {
    Cart.findById(req.user.cart._id)
        .then(function(cart) {
            return cart.removeProduct(req.body)
        })
        .then(function (cart) {
            res.json(cart)
        })
        .then(null, next);

});
