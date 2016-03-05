'use strict';
var mongoose = require('mongoose');
var ProductSchema = mongoose.model('Product').schema;


var CartSchema = new mongoose.Schema({

	contents: [{
		product: ProductSchema,
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
		if(c.product._id.toString() === product._id.toString()){
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