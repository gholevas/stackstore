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
var Box = Promise.promisifyAll(mongoose.model('Box'));
var Cart = Promise.promisifyAll(mongoose.model('Cart'));

var seedUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password',
        isAdmin: false
    }, {
        email: 'obama@gmail.com',
        password: 'potus',
        isAdmin: true
    }];

    return User.createAsync(users);

};

connectToDb.then(function() {

    User.remove({}).then(function() {
        User.findAsync({}).then(function(users) {
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
                process.kill(0);
            }
        }).then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        }).catch(function(err) {
            console.error(err);
            process.kill(1);
        });
    });

    var gBox;

    Box.remove({})
    .then(function(){
        return Box.createAsync({
            name: "test_Box",
            priceLevel: "CheapAF",
            gender: "whoknowsanymore"
        })    
    })
    .then(function(box){
        gBox = box;
        return Cart.remove({});
    })
    .then(function(){
        console.log("removed",gBox._id);
        return Cart.createAsync({
            purchased: false,
            boxes: [{ boxId: gBox._id, quantity:500 }]
        }).then(function(cart){
            console.log("HAAY ",cart.populate("boxes.boxId"));
        })
    })
    

    




});