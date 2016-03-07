'use strict';
var mongoose = require('mongoose');


var CartSchema = new mongoose.Schema({

	contents: [{
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
		quantity: Number
	}],
	isGuest: {type: Boolean, default: false},
	guestId: {type: String, select: false}
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }

});

// CartSchema.virtual("totalToPay")
// .get(function(){
// 	return this.contents.reduce(function(prev,curr){
// 		return prev + (curr.quantity * curr.product.price)
// 	}, 0)
// });

CartSchema.methods.addProduct = function(product,quantity){
	var exists = false;
	this.contents.forEach(function(c){
		if(c.product.toString() === product._id.toString()){
			exists=true;
			c.quantity += quantity;
		}
	});
	if(!exists) this.contents.push({product: product, quantity: quantity||1});
	return this.save();
}

CartSchema.methods.removeProduct = function(product){
	var self = this;
	this.contents.forEach(function(c,i){
		if(c.product.toString() === product._id.toString()){
			self.contents.splice(i,1);
		}
	});	
	return this.save();
}

mongoose.model('Cart', CartSchema);