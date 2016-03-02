'use strict';
var mongoose = require('mongoose');
var enums = require('./enums.js');

var BoxWrapperSchema = new mongoose.Schema({

	box: [mongoose.model('Box').schema]
  ,quantity: {type: Number, default: 1}
  ,pricePaid: Number
  ,isPremium: Boolean

}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

BoxWrapperSchema.virtual('priceToPay')
.get(function () {
  return this.isPremium ? 200 : 10;
  //TODO: make the price come from price config
});

mongoose.model('BoxWrapper', BoxWrapperSchema);