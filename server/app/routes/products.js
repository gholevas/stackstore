'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401).end();
    } 
};

var ensureAdminOrSeller = function(req, res, next) {
    if ((req.user.isSeller && req.user.store === req.params.storeId)||req.user.isAdmin) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

// get all products (if recommending product on front end, or admin catalog screen)
router.get('/', function (req, res, next) {
    Product.find({})
    .then(function(info){
        res.json(info);
    })
    .then(null,next);

});

router.get('/store/:storeId', function (req, res, next) {
    Product.find({store:req.params.storeId})
    .then(function(info){
        res.json(info);
    })
    .then(null,next);

});

// add a product (only sellers can add new products)
router.post('/store/:storeId', ensureAdminOrSeller, function (req, res, next) {
    Product.create(req.body)
    .then(function(info){
        res.json(info);
    })
    .then(null,next);
});

//param to find product by id. sets product on request object.
router.param("id", function(req, res, next, id){
    Product.findById(id)
    .then(function(product){
        if(!product) throw Error("no such product");
        req.product = product;
        next();
    })
    .then(null, function(err){
        err.status(404);
        next(err);
    });
});

// update a product (only sellers can update products)
router.put('/store/:storeId/:id', ensureAdminOrSeller, function (req, res, next) {
    req.product.set(req.body).save()
    .then(function(updated){
        res.json(updated);
    })
    .then(null,next);
});


// get specific product
router.get('/:id', function (req, res, next) {
    res.json(req.product);
});

module.exports = router;