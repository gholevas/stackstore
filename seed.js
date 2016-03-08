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
var Question = Promise.promisifyAll(mongoose.model('Question'));


var seedUsers = function() {

    var users = [{
        email: 'user@gmail.com',
        password: 'user',
        profile: {
            firstName: "Big",
            lastName: "McLarge"
        },
        address: {
            street: "Street",
            apt: "1",
            city: "place town",
            state: "GO",
            zip: "12112"
        },
        isAdmin: false,
        isSeller: false,
        // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
        // cart:
    }, {
        email: 'admin@gmail.com',
        password: 'admin',
        isAdmin: true
    }];

    for(var i=1;i<=2;i++){
        users.push({
            email: "seller"+i+"@gmail.com",
            password: 'seller',
            isSeller: true
        });
    }

    return User.createAsync(users);

};

var dropUsers = function() {
    return User.remove({});
};

var seedProducts = function() {

    var products = [{
        name: 'Bar Soap',
        price: 40,
        imgUrl: "http://food.unl.edu/documents/hand-nuts-690-2.png",
        tags: ["home","health","soap"]
    }, {
        name: 'Mobile Phone',
        price: 40,
        imgUrl: "http://food.unl.edu/documents/hand-nuts-690-2.png",
        tags: ["phone","tech","wireless"]
    }, {
        name: 'Mixed Nuts',
        price: 40,
        imgUrl: "http://food.unl.edu/documents/hand-nuts-690-2.png",
        tags: ["outdoors","food","health"]
    }, {
        name: 'Salted Nuts',
        price: 40,
        imgUrl: "http://food.unl.edu/documents/hand-nuts-690-2.png",
        tags: ["nuts","food","snack"]
    }, {
        name: 'Pea Nuts',
        price: 40,
        imgUrl: "http://food.unl.edu/documents/hand-nuts-690-2.png",
        tags: ["ground","snack","nuts"]
    }, {
        name: 'Doze Nuts',
        price: 40,
        imgUrl: "http://food.unl.edu/documents/hand-nuts-690-2.png",
        tags: ["snack","food","trees"]
    }, {
        name: 'Deez Nuts',
        price: 40,
        imgUrl: "http://food.unl.edu/documents/hand-nuts-690-2.png",
        tags: ["health","food","tech"]
    }];

    return Product.createAsync(products);

};

var dropProducts = function() {
    return Product.remove({});
};

var seedQuestions = function() {

    var questions = [{
        text: 'What is your favorite food?',
        answers: [{
                text: 'Nuts',
                tags: ["nuts"]
            }, {
                text: 'Peanuts',
                tags: ["ground"]
            }, {
                text: 'Spaghetti',
                tags: ["soap"]
            }, {
                text: 'Cereal',
                tags: ["tech"]
            }]
        }, {
        text: 'What is your dream vacation?',
        answers: [{
                text: 'Camping',
                tags: ["outdoors","food"]
            }, {
                text: 'Hiking',
                tags: ["nuts","snack"]
            }, {
                text: 'Staycation',
                tags: ["health","food"]
            }, {
                text: 'Beach',
                tags: ["health","outdoors"]
            }]
    }];

    return Question.createAsync(questions);

};

var dropQuestions = function() {
    return Question.remove({});
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

var numPrdPerStore = 2;

var seedStores = function() {
    var seller;
    var prodIds;
    var products;
    return Product.find({})
    .then(function (productz) {
        products = productz;
        prodIds = products.map(function (el) {
            return el._id
        });
        return Question.find({})
    }).then(function (questions) {
        var questIds = questions.map(function (el) {
            return el._id
        })
        return User.findOne({ email: "seller1@gmail.com" })
        .then(function(user) {
            seller = user
            var stores = [{
                name: "40 Dollars and Less",
                seller: user._id,
                products: prodIds,
                questions: questIds,
                pic: "https://static-secure.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/5/19/1400507865646/Dollars-009.jpg"
            }];
            return Store.createAsync(stores);
        }).then(function(stores) {
            seller.store = stores[0]._id
            products.forEach(function(product){
                product.store = stores[0]._id;
                product.save();
            })
            return seller.save()
        })
        .then(function(){
            return User.findOne({ email: "seller2@gmail.com" })
        })
        .then(function(user) {
            seller = user
            var stores = [{
                name: "GoNuts",
                seller: user._id,
                products: prodIds,
                questions: questIds,
                pic: "http://luxurywayofliving.com/wp-content/uploads/2016/01/Nuts2.jpg"
            }];
            return Store.createAsync(stores);
        }).then(function(stores) {
            seller.store = stores[0]._id
            products.forEach(function(product){
                product.store = stores[0]._id;
                product.save();
            })
            return seller.save()
        }).catch(console.error)
        
    })

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
        dropQuestions(),
        seedQuestions(),
        seedProducts(),
        seedUsers(),
        // seedCarts(),
        seedStores()
    ]

    Promise.each(seedyThings, function(){})
        .then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        }).catch(function(err) {
            console.error(err);
            process.kill(1);
        });
});
