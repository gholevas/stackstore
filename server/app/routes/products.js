'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Store = mongoose.model('Store');

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
    .populate('store')
    .then(function(info){
        res.json(info);
    })
    .then(null,next);

});


// add a product (only sellers can add new products)
router.post('/store/:storeId', ensureAdminOrSeller, function (req, res, next) {
    Store.findById(req.params.storeId)
    .then(function(store){
        store.addProduct(req.body);
    })
    .then(null,next);
});

//delete a product 
router.delete('/store/:storeId', ensureAdminOrSeller, function (req, res, next) {
    Store.findById(req.params.storeId)
    .then(function(store){
        store.removeProduct(req.body);
    })
    .then(null,next);
});

// get product that matches tags
router.post('/store/:url/tags', function (req, res, next) {
    var tags = req.body;
    Store.findOne({url:req.params.url})
    .populate('products')
    .then(function(store){
        console.log("store", store);
        var topMatches = 0;
        var numMatches = 0;
        var bestProduct;
        store.products.forEach(function(product){
            for(var i=0; i<product.tags.length; i++){
                if(tags.indexOf(product.tags[i]) !== -1){
                    numMatches++;
                }
                if(numMatches > topMatches){
                    topMatches = numMatches;
                    bestProduct = product;
                }
            }
            numMatches = 0;
        })
        console.log("bestProduct", bestProduct)
        return bestProduct;
    })
    .then(function(product){
        res.send(product);
    })
    .then(null,next);
});


//param to find product by id. sets product on request object.
router.param("id", function(req, res, next, id){
    Product.findById(id)
    .then(function(product){
        if(!product) throw Error("no such product");
        console.log(product)
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