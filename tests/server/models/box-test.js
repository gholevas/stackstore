var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Box = mongoose.model('Box');
var BoxWrapper = mongoose.model('BoxWrapper');

describe('Box and wrapper models', function() {

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    it('should exist', function() {
        expect(Box).to.be.a('function');
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

        beforeEach(function() {});

        afterEach(function() {});

        it('should create a box', function(done) {
            createValidBox().then(function(box) {
                    expect(box.name).to.be.ok;
                    done();
                })
                .catch(done);
        });

    });



    describe('on creation of wrappers', function() {

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
                    box: [box],
                    isPremium: true
                })
            })
        };


        beforeEach(function() {});

        afterEach(function() {});

        it('should have virtual priceToPay and box', function(done) {
            createValidBoxWrapper().then(function(bw) {
                    expect(bw.priceToPay).to.eql(200);
                    console.log("BW.bx", bw.box)
                    expect(bw.box[0].name).to.eql("test1");
                    done();
                })
                .catch(done);
        });

    });


});