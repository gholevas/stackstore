'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;




// post answers
router.post('/', function (req, res, next) {
    console.log(req.body)
    // mongoose.model('Question').create(req.body)
    // .then(function(info){
    //     res.json(info);
    // })
    // .then(null,next);
});