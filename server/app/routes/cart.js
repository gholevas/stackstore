'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart')
module.exports = router;
var BoxWrapper = mongoose.model('BoxWrapper')

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

// get currentcart for a logged in user /api/cart/user
// needs to be logged in right now. need workaround for unauthticated using req.session
router.get('/user', ensureAuthenticated, function(req, res, next) {
    Cart.findById(req.user.currentCart)
        .then(function(cart) {
            res.json(cart);
        })
        .then(null, next);
});


// Get all carts admin only
router.get('/', ensureAdmin, function(req, res, next) {
    Cart.find()
        .then(function(info) {
            res.json(info);
        })
        .then(null, next);
});



// add a box to cart (creates a cart and adds box if there is no cartId provided in the query)
router.post('/', ensureAuthenticated, function(req, res, next) {

    //here we get answers, and map to a box
    //that means req.body is answers
    //answers should have isPremium
    //now we have a box
    // var box = mappedbox

    BoxWrapper.findOne({ box: box, isPremium: isPremium })
        .then(function(bw) {
            if (!bw) {
                bw = new BoxWrapper({
                    box: box,
                    isPremium: req.body.isPremium
                });
            }
            bw.quantity = req.body.quantity;

            return bw;
        })
        .then(function(boxwrapper) {
            if (req.query.cartId) {
                Cart.findById(req.query.cartId)
                    .then(function(cart) {
                        return cart.addBoxWrapper(boxwrapper);
                    })
                    .then(function(info) {
                        res.send(info);
                    })
                    .then(null, next);
            } else {
                Cart.create({})
                    .then(function(cart) {
                        return cart.addBoxWrapper(boxwrapper)
                    })
                    .then(function(info) {
                        res.send(info);
                    })
                    .then(null, next);
            }
        })


});

// remove a box from a cart
router.delete('/', ensureAuthenticated, function(req, res, next) {

    //here the req.body is a BoxWrapper already, since the cart came from backend

    mongoose.model('Cart').findById(req.query.cartId)
        .then(function(cart) {
            return cart.removeBox(req.body)
        })
        .then(function(info) {
            res.send(info);
        })
        .then(null, next);
});
