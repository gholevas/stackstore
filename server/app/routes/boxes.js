'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Box = mongoose.model('Box');

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

// get all boxes (if recommending box on front end, or admin catalog screen)
router.get('/', function (req, res, next) {
    Box.find({})
    .then(function(info){
        res.json(info);
    })
    .then(null,next);

});

// add a box (only admin can add new products)
router.post('/', ensureAdmin, function (req, res, next) {
    Box.create(req.body)
    .then(function(info){
        res.json(info);
    })
    .then(null,next);
});

//param to find box by id. sets box on request object.
router.param("id", function(req, res, next, id){
    Box.findById(id)
    .then(function(box){
        if(!box) throw Error("no such box");
        req.box = box;
        next();
    })
    .then(null, function(err){
        err.status(404);
        next(err);
    })
});

// update a box (only admin can update products)
router.put('/:id', ensureAdmin, function (req, res, next) {
    req.box.set(req.body).save()
    .then(function(updated){
        res.json(updated)
    })
    .then(null,next);
});


// get specific box
router.get('/:id', function (req, res, next) {
    res.json(req.box);
});

module.exports = router;