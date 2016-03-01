// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

// Require in all models.
require('../../../server/db/models');

var Box = mongoose.model('Box');

describe('Box model', function() {

    var agent = supertest.agent(app)

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    var boxInfo = {
        name: "test1",
        imgUrl: "http://google.com",
        priceLevel: "cheap",
        gender: "M",
        ageRange: "0-12",
        interest: "EDM"
    }

    it('should exist', function() {
        expect(Box).to.be.a('function');
    });

    describe('post/get a boxes', function() {

        describe('on creation', function() {

            it('should create a box', function(done) {
                agent.post('/api/boxes').send(boxInfo).end(done);
            });
            
            it('should get all boxes with 200 response and an array as body', function(done) {
                agent.get('/api/boxes').expect(200).end(function(err, response) {
                    if (err) return done(err);
                    expect(response.body).to.be.an('array');
                    done();
                });
            });
        });
    });

});
