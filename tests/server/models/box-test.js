var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Box = mongoose.model('Box');

describe('Box model', function() {

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


        beforeEach(function() {});

        afterEach(function() {});

        it('should create and instance of box', function(done) {
            createValidBox().then(function(box) {
                console.log(box.price)
                expect(box.price).to.be.ok;
                done();
            });
        });

    });


});
