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

router.get('/reset/:token', function(req, res, next) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
    .then(function(user) {
        res.json(user);
    })
    .then(null,next)
});

// update a unauthenticated user password
router.put('/reset', function(req, res, next) {
    User.findOne({ resetPasswordToken: req.body.resetPasswordToken,resetPasswordExpires: {$gt: Date.now()}})
    .then(function(user) {
        user.password = req.body.password
        user.save()
        res.json(user);
    })
    .then(null,next)
});

router.put('/toggle', ensureAdmin, function(req, res, next) {
    console.log("here",req.body._id,req.body.isAdmin)
    User.findById(req.body._id)
    .then(function (user) {
        user.isAdmin = req.body.isAdmin
        user.save()
        res.json(user)
    })
    .then(null,next)
});

// update a user
router.put('/:userId', ensureAuthenticated, function(req,res, next) {
	User.findByIdAndUpdate(req.params.userId, req.body, {new:true})
	.then(function(data){
		res.send(data);
	}).catch(next);
});


module.exports = router;
