/*
This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.
It uses the same file the server uses to establish
the database connection:
--- server/db/index.js
The name of the database used is set in your environment files:
--- server/env/*
This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.
*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Cart = Promise.promisifyAll(mongoose.model('Cart'));
var Store = Promise.promisifyAll(mongoose.model('Store'));
var Product = Promise.promisifyAll(mongoose.model('Product'));

var seedUsers = function() {

    var users = [{
        email: 'user@gmail.com',
        password: 'user'
    }, {
        email: 'admin@gmail.com',
        password: 'admin',
        isAdmin: true
    }, {
        email: 'seller@gmail.com',
        password: 'seller',
        isSeller: true
    }];

    return User.createAsync(users);

};

var dropUsers = function() {
    return User.remove({});
};

var seedProducts = function() {

    var products = [{
        name: 'p1',
        price: 100,
        tags: ["preteen","EDM","rave"]
    }, {
        name: 'p2',
        price: 60,
        tags: ["outdoors","food","trees"]
    }];

    return Product.createAsync(products);

};

var dropProducts = function() {
    return Product.remove({});
};


var seedCarts = function() {
    return Product.find({})
    .then(function (products) {
        var contents = products.map(function (p) {
            return {
                product:p._id,
                quantity: 1
            }
        })
        var carts = [{
            contents: contents
        }];

        return Cart.createAsync(carts);
    }).then(function (carts) {
        var cart = carts[0];
        return User.findOne({email: 'user@gmail.com'})
        .then(function (user) {
            user.cart = cart;
            return user.save()
        })
    })

}

var dropCarts = function() {
    return Cart.remove({});
};

var seedStores = function() {
    var userA;
    return User.findOne({ isSeller: true })
        .then(function(user) {
            userA = user
            var stores = [{
                name: "testStore",
                url: "test-store",
                seller: user._id
            }];
            return Store.createAsync(stores);
        }).then(function(stores) {
            userA.store = stores[0]._id
            return userA.save()
        }).catch(console.error)
}

var dropStores = function() {
    return Store.remove({});
};

connectToDb.then(function() {
    var seedyThings = [
        dropUsers(),
        dropCarts(),
        dropStores(),
        dropProducts(),
        seedUsers(),
        seedProducts(),
        seedCarts(),
        seedStores()
    ]

    Promise.each(seedyThings, function(element) {
            return element + '.';
        })
        .then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        }).catch(function(err) {
            console.error(err);
            process.kill(1);
        });
});
