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

var seedUsers = function () {

    var users = [
        {
            email: 'user@gmail.com',
            password: 'user'
        },
        {
            email: 'admin@gmail.com',
            password: 'admin',
            isAdmin:true
        },
        {
            email: 'seller@gmail.com',
            password: 'seller',
            isSeller:true
        }
    ];

    return User.createAsync(users);

};

var dropUsers = function(){
    return User.remove({});
};

var seedCarts = function () {
    var carts = [
        {
        },
        {
        }
    ];

    return Cart.createAsync(carts);
}

var dropCarts = function(){
    return Cart.remove({});
};

var seedStores = function () {
    var userA;
    return User.findOne({isSeller: true })
    .then(function (user) {
        userA = user
        console.log("user",userA)
        var stores = [
            { 
                name: "testStore",
                url: "test-store",
                seller: user._id
            }
        ];
        return Store.createAsync(stores);
    }).then(function (stores) {
        userA.store = stores[0]._id
        return userA.save()
    }).catch(console.error)
}

var dropStores = function(){
    return Store.remove({});
};

connectToDb.then(function () {
    Promise.each([dropUsers(),dropCarts(),dropStores(),seedUsers(),seedCarts(),seedStores()],function(element) {
        return element+'.';
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

