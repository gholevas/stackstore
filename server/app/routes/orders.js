'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
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

var ensureSeller = function(req, res, next) {
    if (req.user.isSeller) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

// Get all orders for store, seller only
router.get('/store-orders', ensureSeller, function(req, res, next) {
    Order.find({})
        .then(function(info) {
            res.json(info);
        })
        .then(null, next);
});


router.post('/', ensureAuthenticated, function(req, res, next) {


});


router.put('/user', ensureAuthenticated, function(req, res, next) {


});

router.delete('/', ensureAuthenticated, function(req, res, next) {


});
