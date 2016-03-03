'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;


// get all questions
router.get('/', function (req, res, next) {
    mongoose.model('Question').find()
    .then(function(info){
        res.json(info);
    })
    .then(null,next);
});

// add a questions
router.post('/', function (req, res, next) {
    mongoose.model('Question').create(req.body)
    .then(function(info){
        res.json(info);
    })
    .then(null,next);
});