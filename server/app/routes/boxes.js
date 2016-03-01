'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;


// get all boxes
router.get('/', function (req, res, next) {
    mongoose.model('Box').find({})
    .then(function(info){
        res.send(info);
    })
    .then(null,next);

});

// add a boxes
router.post('/', function (req, res, next) {
    mongoose.model('Box').create(req.body)
    .then(function(info){
        res.send(info);
    })
    .then(null,next);
});