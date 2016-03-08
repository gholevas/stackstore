'use strict';
var passport = require('passport');
// var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({ email: email })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                res.status(200).send({
                    user: user.sanitize()
                });
            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

    app.post('/signup', function (req, res, next) {
        User.findOne({ email: req.body.email })
        .then(function (user) {
            if(!user){
                    User.create({email: req.body.email,password:req.body.password,isSeller:req.body.isSeller})
                    .then(function(newUser){
                        if(newUser.isSeller === true){
                            newUser.addStore({})
                            .then(function(newUser){
                                req.logIn(newUser, function (loginErr) {
                                if (loginErr) return next(loginErr);
                                    res.status(201).send({ user: newUser.sanitize()});
                                });
                            })
                        }else{
                            newUser.addCart({isGuest:false})
                            .then(function(newUser){
                                req.logIn(newUser, function (loginErr) {
                                if (loginErr) return next(loginErr);
                                    res.status(201).send({ user: newUser.sanitize()});
                                });
                            })
                        }
                    })
                }else {
                    console.log('hii')
                    res.status(401).send('That email already exists');
                }
            })


    });


};
