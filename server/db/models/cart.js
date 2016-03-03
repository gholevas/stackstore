'use strict';
var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({

	contents: [{
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
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

CartSchema.virtual("totalToPay")
.get(function(){
	return this.contents.reduce(function(prev,curr){
		return prev + (curr.quantity * curr.product.price)
	}, 0)
});

CartSchema.methods.addProduct = function(product){
	var exists = false;
	this.contents.forEach(function(c){
		if(c.product === product._id){
			exists=true;
			c.quantity ++;
		}
	});
	
	if(!exists) this.contents.push(product);
	return this.save();
}

CartSchema.methods.removeProduct = function(product){
	var self = this;
	this.contents.forEach(function(c,i){
		if(c.product === product._id){
			c.quantity--;
			if(c.quantity === 0){
				self.contents.splice(i,1);
			}
		}
	});	
	return this.save();
}

mongoose.model('Cart', CartSchema);