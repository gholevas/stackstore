'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');

module.exports = router;

router.use('/members', require('./members'));

// get one user
router.get('/user/:userId', function (req, res) {
    mongoose.model('User').findById(req.params.userId)
    .then(function(info){
        res.send(info);
    })
});


// get all boxes
router.get('/boxes/', function (req, res) {
    mongoose.model('Box').find({})
    .then(function(info){
        res.send(info);
    })
});

// add a boxes
router.post('/boxes/', function (req, res) {
    mongoose.model('Box').create(req.body)
    .then(function(info){
        res.send(info);
    })
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
