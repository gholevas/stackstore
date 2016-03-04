'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');

module.exports = router;

router.use('/members', require('./members'));

router.use('/products', require('./products.js'));

router.use('/cart', require('./cart.js'));

router.use('/store', require('./store.js'));

router.use('/user', require('./user.js'));

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
