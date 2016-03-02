var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var Promise = require('bluebird');
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Question = Promise.promisifyAll(mongoose.model('Question'));

describe('Question models', function() {

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    it('should exist', function() {
        expect(Question).to.be.a('function');
    });

    it('should create a question with answers (with ans category)', function(done) {
        Question.createAsync({
            questionText: "What's your fav color?"
            ,answers: [{answerText:"blue",answerCategory:"M/F"},{answerText:"red",answerCategory:"M/F"},{answerText:"green",answerCategory:"M/F"}]
        }).then(function(quest){
            expect(quest.questionText).to.eql("What's your fav color?");
            expect(quest.answers[0].answerText).to.eql("blue");
            done();
        }).catch(done);

    });

    it('should have mappings for algorithm', function(done) {
        Question.createAsync({
            questionText: "What's your fav color?"
            ,answers: [{answerText:"blue",mappings: [{sliderCategory: "M/F", points: -38}] }]
        }).then(function(quest){
            expect(quest.questionText).to.eql("What's your fav color?");
            expect(quest.answers[0].answerText).to.eql("blue");
            done();
        }).catch(done);

    });


});