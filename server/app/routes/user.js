'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model("User");

var ensureAdmin = function(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

// get all users?
router.get('/', ensureAdmin, function (req, res, next) {
    User.find({})
    .then(function(info){
        res.json(info);
    })
    .then(null,next);
});

router.param("userId", function(req, res, next, id){
	User.findById(id)
	.populate("store orders cart.contents.product")
	.then(function(user){
		if(!user) throw Error("no such user");
		console.log("U",user);
		req.user = user;
		next();
	})
	.catch(function(err){
		err.status = 404;
		next(err);
	});
});

// get one user
router.get('/:userId', function (req, res) {
    res.send(req.user);
    // User.findById(req.params.userId)
    // .then(function(info){
    //     res.send(info);
    // });
});

// update a user
router.put('/:userId', function(req,res, next) {
	User.findByIdAndUpdate(req.params.userId, req.body, {new:true})
	.then(function(data){
		res.send(data);
	}).catch(next);
});


module.exports = router;
