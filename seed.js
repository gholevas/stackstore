var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var asyncEach = require('async-each');
var chance = require('chance')(123);
var connectToDb = require('./server/db');

var User = Promise.promisifyAll(mongoose.model('User'));
var Box = Promise.promisifyAll(mongoose.model('Box'));
var BoxWrapper = Promise.promisifyAll(mongoose.model('BoxWrapper'));
var Cart = Promise.promisifyAll(mongoose.model('Cart'));
var Question = Promise.promisifyAll(mongoose.model('Question'));
var enums = require("./server/db/models/enums.js");

var numBoxes = 40;
var numCarts = 2; //should be less than numBoxes
var numBoxesPerCart = 5;
var numUsers = 5;

var dropAll = function(){
    console.log("dropping users/carts/bdubs/boxes/questions");
    return Promise.all([User.remove({}), Cart.remove({}), BoxWrapper.remove({}), Box.remove({}), Question.remove({})]);
};

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

var createBoxes = function(){
    console.log("creating boxes");
    var boxes = [];
    for(var i=0; i<numBoxes; i++){
        boxes.push({
            name: chance.word()
            ,description: chance.sentence()
            ,imgUrl: "http://lorempixel.com/400/400/"
            ,isActive: true
            ,gender: chance.bool()?"M":"F"
            ,ageRange: enums.ageRange[chance.integer({min:0,max:4})]
            ,interest: enums.interest[chance.integer({min:0,max:5})]
            // ,keywords:
            ,items: ["snake1","snake2"]
            ,premiumItems: ["snake1","snake2","moreSnakes"]
        });    
    }

    return Box.createAsync.apply(Box, boxes);    
};

var createCartsFromBoxes = function(boxes){
    console.log("creating carts");
    var cartObjs = [];
    for(var i=0; i<numCarts; i++){
        cartObjs.push({
            totalPaid: 0
            // ,boxes: [ new BoxWrapper({box: boxes[chance.integer({min: 0, max: numBoxes-1})], isPremium: chance.bool({likelihood: 30})}) ]
        });
    }
    // console.log(chalk.yellow(carts))
    return Cart.createAsync.apply(Cart,cartObjs)
    .then(function(carts){
        // carts.forEach(function(cart){
            // for(var j=0; j<numBoxesPerCart; j++){
                return carts[0].addBoxWrapper(new BoxWrapper({
                   // box: boxes[chance.integer({min: i*4, max: (i*4)+4})]
                   box: boxes[chance.integer({min: 0, max: numBoxes-1})]
                   ,isPremium: chance.bool({likelihood: 30}) 
                }));
            // }
        // });
        
        return carts;
    });
}

// var createCartsFromBoxes = function(boxes){
//     console.log("creating carts");
//     var carts = [];
//     var emptyArray = Array.apply(null, Array(numCarts)).map(function () {});

//     function doo(){
//         // var cart = 
//         Cart.createAsync({totalPaid:0})
//         .then(function(cart){
//             // for(var j=0; j<numBoxesPerCart; j++){
//                 cart.addBoxWrapper(new BoxWrapper({
//                    // box: boxes[chance.integer({min: i*4, max: (i*4)+4})]
//                    box: boxes[chance.integer({min: 0, max: numBoxes-1})]
//                    ,isPremium: chance.bool({likelihood: 30}) 
//                 }));
//             // }
//             carts.push(cart);
//         });
//         // cart.save(function(err){
//         //     console.log(chalk.blue("c",err));
//         // });
        
//     }

//     asyncEach(emptyArray, doo);


//     // for(var i=0; i<numCarts; i++){
        
//     // }    
//     // console.log(chalk.yellow(carts))
//     return Promise.resolve(carts);
// }

var createUsersFromCarts = function(carts){
    console.log("creating users");
    var users = [];

    for(var i=0; i<numUsers; i++){
        var u = new User({
            email: "test"+i.toString()
            ,title: chance.word()
            ,firstName: chance.word()
            ,lastName: chance.word()
            ,password: "pw"
            ,salt: "salt??"
            ,orders: [carts.slice((i*3),(i*3)+1)]
            ,currentCart: carts[(i*3)+2]
            ,isAdmin: false
        });
        u.save(function(err){
            console.log(chalk.blue("u",err));
        });
        users.push(u);    
    }

    var admin = new User({
        email: "admin"
        ,title: chance.word()
        ,firstName: chance.word()
        ,lastName: chance.word()
        ,password: "pw"
        ,salt: "salt??"
        ,orders: null
        ,currentCart: null
        ,isAdmin: true
    });
    admin.save(function(err){
        console.log(chalk.blue("ua",err));
    });
    users.push(admin);
    // console.log(chalk.yellow(users))
    return Promise.resolve(users);
}

var createQuestions = function(){
    console.log("creating questions");
    return Question.createAsync({
        questionText: "What is your gender"
        ,answers: [{answerText:"M",answerCategory:"gender"},{answerText:"F",answerCategory:"gender"}]
    }, {
        questionText: "How old are you"
        ,answers: [{answerText:"0-12",answerCategory:"ageRange"},{answerText:"13-20",answerCategory:"ageRange"},{answerText:"21-30",answerCategory:"ageRange"},{answerText:"31-54",answerCategory:"ageRange"},{answerText:"55+",answerCategory:"ageRange"}]
    }, {
        questionText: "What are you into?"
        ,answers: [{answerText:"EDM",answerCategory:"interest"},{answerText:"WEIRD",answerCategory:"interest"},{answerText:"OUTDOORS",answerCategory:"interest"},{answerText:"VANITY",answerCategory:"interest"},{answerText:"OTAKU",answerCategory:"interest"},{answerText:"NORMAL",answerCategory:"interest"}]
    });
};

connectToDb
// .then(dropUsers)
// .then(removeCartsNBoxes)
.then(dropAll)
.then(createQuestions)
.then(createBoxes)
.then(createCartsFromBoxes)
// .then(createUsersFromCarts)
// .then(function(boxes){
//     return BoxWrapper.createAsync({
//         box: [box]
//         ,isPremium: true
//         ,quantity: 1
//     });
// })
// .then(function(bw){ //create one cart with aforementioned wrapper
//     return Cart.createAsync({
//         boxes: [bw]
//     })
// })
// .then(function(cart){ //create a user with aforementioned cart
//     console.log("cartId " , cart._id)
//     var users = [{
//         email: 'testing@fsa.com'
//         ,password: 'password'
//         ,isAdmin: false
//         ,currentCart: cart._id
//     }];

//     return User.createAsync(users);
// })
// .then(function(){ //create another user with a new PAID cart i.e. order (with new bw and bx)
//     return Box.createAsync({
//         name: "happyBox"
//         ,gender: "F"
//         ,isActive: true
//         ,description: "this box will give you the heebly jeeblies"
//         ,ageRange: "0-12"
//         ,interest: "EDM"
//     });
// })
// .then(function(box){
//     console.log("BBB",box);
//     return BoxWrapper.createAsync({
//         box: [box]
//         ,isPremium: false
//         ,quantity: 2
//     })
// }).then(function(bw){
//     console.log("BBW",bw);
//     return Cart.createAsync({
//         boxes: [bw]
//         ,status: "paid"
//     })
// }).then(function(cart){
//     console.log("CARRT",cart);
//     return User.createAsync({
//         email: 'obama@gmail.com'
//         ,password: 'potus'
//         ,isAdmin: true
//         ,currentCart: null
//         ,orders: [cart]
//     })
// })
// .then(function(u){
//     console.log("UUU ",u)
// })
// // .then(function(user){
// //     return User.find({_id: user[0]._id})
// //     .populate({path: "orders currentCart"}).exec() //"orders currentCart"
// // })
// // .then(function(data){
// //     // console.log(data[0].currentCart);
// // })
// .then(function(){
//     return Question.createAsync({
//         questionText: "What's your fav color?"
//         ,answers: [{answerText:"blue",answerCategory:"gender"},{answerText:"red",answerCategory:"gender"},{answerText:"green",answerCategory:"gender"}]
//     }, {
//         questionText: "How old is you be"
//         ,answers: [{answerText:"0-12",answerCategory:"ageRange"},{answerText:"13-20",answerCategory:"ageRange"},{answerText:"21-30",answerCategory:"ageRange"}]
//     }, {
//         questionText: "What are you into?"
//         ,answers: [{answerText:"EDM",answerCategory:"interest"},{answerText:"WEIRD",answerCategory:"interest"},{answerText:"OUTDOORS",answerCategory:"interest"}]
//     });
// })
.then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
})
.catch(function(err) {
    console.error(chalk.red(err));
    process.kill(1);
});


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