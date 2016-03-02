var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Box = mongoose.model('Box');
var Cart = mongoose.model('Cart');

describe('Cart model', function() {

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    it('should exist', function() {
        expect(Cart).to.be.a('function');
    });

    describe('on creation', function() {

        // module.exports = {
        //     gender: "M F".split(" "),
        //     priceLevel: "cheap expensive".split(" "),
        //     ageRange: "0-12 13-20 21-30 31-54 55+".split(" "),
        //     interest: "EDM VANITY OTAKU NORMAL WEIRD OUTDOORS".split(" ")
        // }

        var createValidBox = function() {
            return Box.create({
                name: "test1",
                imgUrl: "http://google.com",
                priceLevel: "expensive",
                gender: "M",
                ageRange: "0-12",
                interest: "EDM"
            });
        };

        var createCart = function(box) {
            return Cart.create({
                purchased: false,
                boxes: [{ box: box._id, quantity: 1 }]
            })
        };

        var aBox = new Box({ name: "another", interest: "EDM" });


        beforeEach(function() {});

        afterEach(function() {});



        it('should create a valid instance of cart', function(done) {
            createValidBox().then(function(box) {
                createCart(box).then(function(cart) {
                    expect(cart.addBox).to.be.a('function');
                    done();
                })
            })
            .then(null,done);

        });

        it('add box should add a box to the cart', function(done) {
            createValidBox().then(function(box) {
                createCart(box).then(function(cart) {
                    cart.addBox(aBox);
                    expect(cart.boxes.length).to.be.eql(2);
                    done();
                })
            })
            .then(null,done);

        });

    });


});
