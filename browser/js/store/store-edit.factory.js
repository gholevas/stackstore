app.factory('StoreEditFactory', function($http){

	var factory = {};

	factory.store = {};

	factory.returnStore = function(){
		return this.store;
	};

	factory.saveStore = function(){
		var store = this.store;
		return $http.put('/api/store/'+store.url, store)
		.then(function(response){
			factory.store = response.data;
			return response.data;
		});
	};

	factory.addQuestion = function(question){
		var store = this.store;
		return $http.post('/api/store/'+store.url+'/question',question)
		.then(function(response){
			store = response.data;
			return store;
		});
	};

	factory.addProduct = function(product){
		var store = this.store;
		product.store = store._id;
		return $http.post('/api/store/'+store.url+'/product',product)
		.then(function(response){
			store = response.data;
			return store;
		});
	};

	factory.updateProduct = function(product){
		var store = this.store;
		return $http.put('/api/products/store/'+store.url+'/'+product._id,product)
		.then(function(response){
			return response.data;
		});
	};

	factory.removeQuestion = function(question){
		var store = this.store;
		return $http.delete('/api/store/'+store.url+'/question/'+question._id)
		.then(function(response){
			store = response.data;
			return store;
		});
	};

	factory.removeProduct = function(product){
		var store = this.store;
		return $http.delete('/api/store/'+store.url+'/product/'+product._id)
		.then(function(response){
			store = response.data;
			return store;
		});
	};

	factory.getStore = function(url){
		var self = this;
		return $http.get('/api/store/'+url)
		.then(function(response){
			self.store = response.data;
			console.log(self.store);
			return response.data;
		});
	};

	return factory;

});