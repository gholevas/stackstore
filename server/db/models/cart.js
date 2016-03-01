'use strict';
var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
	purchased: Boolean,
	status: String, //purchases? paid? complete? 
	boxes: [{
		box: {type: mongoose.Schema.ObjectId, ref: 'Box'},
		quantity: Number
	}]
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

CartSchema.methods.addBox = function(box){
	var exists = false;
	this.boxes.forEach(function(b){
		if(b.box==box._id){
			exists=true;
			b.quantity++;
		}
	});
	if(!exists) this.boxes.push({box:box._id, quantity:1});
	return this.save();
}

CartSchema.methods.removeBox = function(box){
	var self = this;
	this.boxes.forEach(function(b,i){
		if(b.box.toString()===box._id.toString()){
			b.quantity--;
			if(b.quantity==0){
				self.boxes.splice(i,1);
			}
		}
	});	
	return this.save();
}

mongoose.model('Cart', CartSchema);