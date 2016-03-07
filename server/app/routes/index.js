'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model("User");
var async = require('async');
var crypto = require('crypto');
var sendgrid = require('sendgrid')('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');

module.exports = router;

router.use('/members', require('./members'));

router.use('/products', require('./products.js'));

router.use('/cart', require('./cart.js'));

router.use('/store', require('./store.js'));

router.use('/user', require('./user.js'));

router.use('/orders', require('./order.js'));

var ensureAdmin = function(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.sendStatus(401).end();
    }
};

// get all users
router.get('/users', ensureAdmin, function (req, res, next) {
    User.find({})
    .then(function(info){
        res.json(info);
    })
    .then(null,next);
});

router.post('/forgot', function(req, res, next) {
    console.log(req.body.email)
    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          console.error('error', 'No account with that email address exists.');
          return res.redirect('/');
        }

        user.resetPasswordToken = crypto.randomBytes(10).toString('hex')
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        return user.save()
    })
    .then(function (user) {
        var mailOptions = {
            to: user.email,
            from: 'passwordreset@demo.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/api/reset/' + user.resetPasswordToken + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        return sendgrid.send(mailOptions)
    })
    .then(function (sendData) {
        res.json({})
    })
    .then(null,next)

});

router.get('/reset/:token', function(req, res, next) {
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } })
  .then(function(user) {
    res.json(user);
  })
  .then(null,next)
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});



