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
var BoxWrapper = Promise.promisifyAll(mongoose.model('BoxWrapper'));
var Cart = Promise.promisifyAll(mongoose.model('Cart'));

var dropUsers = function(){
    return User.remove({});
};

var removeCartsNBoxes = function (){
    return Cart.remove({})
    .then(function(){
        return Box.remove({});
    })
    .then(function(){
        return BoxWrapper.remove({});  
    });
};

var createBox = function(){
    return Box.createAsync({
        name: "test_name",
        gender: "M",
        isActive: true
    });    
};

connectToDb
.then(dropUsers)
.then(removeCartsNBoxes)
.then(createBox)
.then(function(box){
    return BoxWrapper.createAsync({
        box: [box]
        ,isPremium: true
        ,quantity: 3
    });
})
.then(function(bw){
    return Cart.createAsync({
        boxes: [bw]
    })
})
// .then(function(cart){
//     return Cart.find({_id: cart._id}).populate("boxes.box").exec()
// })
.then(function(cart){
    console.log("cartId " , cart._id)
    var users = [{
        email: 'testing@fsa.com'
        ,password: 'password'
        ,isAdmin: false
        ,currentCart: cart._id
    }
    , {
        email: 'obama@gmail.com'
        ,password: 'potus'
        ,isAdmin: true}
    ];

    return User.createAsync(users);
})
// .then(function(user){
//     return User.find({_id: user[0]._id})
//     .populate({path: "orders currentCart"}).exec() //"orders currentCart"
// })
// .then(function(data){
//     // console.log(data[0].currentCart);
// })
.then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
})
.catch(function(err) {
    console.error(chalk.red(err));
    process.kill(1);
});
