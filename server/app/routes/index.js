'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');

module.exports = router;

router.use('/members', require('./members'));

// router.use('/boxes', require('./boxes.js'));

router.use('/cart', require('./cart.js'));

// router.use('/questions', require('./questions.js'));

// router.use('/answers', require('./answers.js'));


// get one user
router.get('/user/:userId', function (req, res) {
    mongoose.model('User').findById(req.params.userId)
    .then(function(info){
        res.send(info);
    });
});

// update a user
router.put('/user/:userId', function(req,res, next) {
	mongoose.model('User').findByIdAndUpdate(req.params.userId, req.body, {new:true})
	.then(function(data){
		res.send(data);
	}).catch(next);
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
