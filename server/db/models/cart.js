'use strict';
var mongoose = require('mongoose');
var enums = require("./enums.js");
var BoxWrapper = require("./boxwrapper.js");

var CartSchema = new mongoose.Schema({
	status: {type: String, enum: enums.orderStatus}
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

// CartSchema.methods.addBox = function(box){
// 	var exists = false;
// 	this.boxes.forEach(function(b){
// 		if(b.box==box._id){
// 			exists=true;
// 			b.quantity++;
// 		}
// 	});
// 	if(!exists) this.boxes.push({box:box._id, quantity:1});
// 	return this.save();
// }

// CartSchema.methods.removeBox = function(box){
// 	var self = this;
// 	this.boxes.forEach(function(b,i){
// 		if(b.box.toString()===box._id.toString()){
// 			b.quantity--;
// 			if(b.quantity==0){
// 				self.boxes.splice(i,1);
// 			}
// 		}
// 	});	
// 	return this.save();
// }

// CartSchema.methods.convertToOrder = function(){
	


// 	// new Order({
// 	// 	purchased: this.purchased
// 	// 	boxes: []
// 	// })
// }

mongoose.model('Cart', CartSchema);