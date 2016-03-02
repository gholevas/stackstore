'use strict';
var mongoose = require('mongoose');
var enums = require("./enums.js");
var BoxWrapper = require("./boxwrapper.js");

var CartSchema = new mongoose.Schema({
	status: {type: String, enum: enums.orderStatus, default: "unpaid"}
	,totalPaid: Number
	,boxes: [BoxWrapper]
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

CartSchema.virtual("totalToPay")
.get(function(){
	return this.boxes.reduce(function(prev,curr){
		return prev + (curr.quantity * curr.priceToPay)
	}, 0)
});

CartSchema.methods.addBoxWrapper = function(boxwrapper){
	var exists = false;
	this.boxes.forEach(function(bw){
		if(bw.box.name==boxwrapper.box.name && bw.box.isPremium==boxwrapper.box.isPremium){
			exists=true;
			bw.quantity += boxwrapper.quantity;
		}
	});
	if(!exists) this.boxes.push(boxwrapper);
	return this.save();
}

CartSchema.methods.removeBox = function(boxwrapper){
	var self = this;
	this.boxes.forEach(function(bw,i){
		if(bw.box.name==boxwrapper.box.name && bw.box.isPremium==boxwrapper.box.isPremium){
			bw.quantity--;
			if(bw.quantity==0){
				self.boxes.splice(i,1);
			}
		}
	});	
	return this.save();
}

mongoose.model('Cart', CartSchema);