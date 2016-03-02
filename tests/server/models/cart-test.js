var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Box = mongoose.model('Box');
var BoxWrapper = mongoose.model('BoxWrapper');
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

        var createValidBox = function() {
            return Box.create({
                name: "test1",
                imgUrl: "http://google.com",
                gender: "M",
                ageRange: "0-12",
                interest: "EDM"
            });
        };

        var createValidBoxWrapper = function() {
            return createValidBox().then(function(box) {
                return BoxWrapper.create({
                    box: box,
                    isPremium: true
                })
            })
        };

        var createCart = function() {
            return createValidBoxWrapper().then(function(bw){
                return Cart.create({
                    boxes: [bw]
                });
            })
        };

        beforeEach(function() {});

        afterEach(function() {});

        var aBox = new Box({ name: "another", interest: "EDM" });

        it('should create a valid instance of cart', function(done) {
            
            createCart().then(function(cart) {
                expect(cart.addBoxWrapper).to.be.a('function');
                expect(cart.boxes.length).to.eql(1);
                BoxWrapper.create({
                    box: aBox,
                    isPremium: false
                }).then(function(bw){
                    cart.addBoxWrapper(bw);
                    cart.addBoxWrapper(bw);
                    return bw
                }).then(function(bw){
                    expect(cart.boxes.length).to.eql(2)
                    expect(cart.boxes[1].quantity).to.eql(2);
                    cart.removeBoxWrapper(bw);
                    expect(cart.boxes[1].quantity).to.eql(1)
                    cart.removeBoxWrapper(bw);
                    expect(cart.boxes.length).to.eql(1)
                    done();
                })
                .catch(done)
            })
            .then(null,done);

        });

    });


});
