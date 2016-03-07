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

// Get all orders
router.get('/', ensureAdmin, function(req, res, next) {
    Order.find()
    .populate("user")
    .then(function(order) {
        res.json(order);
    })
    .then(null, next);
});

// Get order details
router.get('/:confirmationNum', function(req, res, next) {
    console.log("cccc",req.params.confirmationNum);
    Order.findOne({confirmationNum: req.params.confirmationNum})
    .populate("user")
    .then(function(order) {
        res.json(order);
    })
    .then(null, next);
});