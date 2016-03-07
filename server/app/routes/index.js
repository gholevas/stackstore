'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model("User");
module.exports = router;

router.use('/members', require('./members'));

router.use('/products', require('./products.js'));

router.use('/cart', require('./cart.js'));

router.use('/store', require('./store.js'));

router.use('/my', require('./user.js'));

router.use('/orders', require('./order.js'));

var ensureAdmin = function(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

// get all users
router.get('/users', ensureAdmin, function (req, res, next) {
    User.find({})
    .then(function(info){
        res.json(info);
    })
    .then(null,next);
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
