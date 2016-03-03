'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var OrderSchema = mongoose.model('Order').schema;

var UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    profile:{
        firstName: String,
        lastName: String,
        address: {        
            street: String,
            apt: String,
            city:String,
            state:String,
            postalCode:String,
        },
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    isAdmin: Boolean,
    isSeller: Boolean,
    store: {type: mongoose.Schema.Types.ObjectId, ref: "Store"},
    orders: [OrderSchema],
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"}
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

// method to remove sensitive information from user objects before sending them out
UserSchema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

//virtual to get Full Name

UserSchema.virtual('fullName').get(function(){
    return this.firstName + " " + this.lastName;
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

UserSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

UserSchema.statics.generateSalt = generateSalt;
UserSchema.statics.encryptPassword = encryptPassword;

UserSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', UserSchema);