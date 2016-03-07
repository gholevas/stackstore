'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model("User");

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

var ensureSeller = function(req, res, next) {
    if (req.user.isSeller) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

// get user's own data
router.get('/', ensureAuthenticated, function (req, res) {
    res.json(req.user);
});

router.get('/store', ensureAuthenticated, ensureSeller, function(req, res) {
	res.json(req.user.store);
})

router.get('/orders', ensureAuthenticated, function(req, res) {
	res.json(req.user.orders);
})

router.get('/cart', ensureAuthenticated, function(req, res) {
	res.json(req.user.cart);
})

// update a user //is this being used?
router.put('/:userId', ensureAuthenticated, function(req,res, next) {
	User.findByIdAndUpdate(req.params.userId, req.body, {new:true})
	.then(function(data){
		res.send(data);
	}).catch(next);
});


module.exports = router;
