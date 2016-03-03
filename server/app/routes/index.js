'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');

module.exports = router;

router.use('/members', require('./members'));

router.use('/boxes', require('./boxes.js'));

router.use('/cart', require('./cart.js'));

router.use('/questions', require('./questions.js'));


// get one user
router.get('/user/:userId', function (req, res) {
    mongoose.model('User').findById(req.params.userId)
    .then(function(info){
        res.send(info);
    });
});

// update a user
router.put('/user/:userId', function(req,res) {
	mongoose.model('User').findByIdAndUpdate(req.params.userId, req.body, {new:true},function(err,data){
		if(err) console.log(err);
		res.send(data);
	});
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
