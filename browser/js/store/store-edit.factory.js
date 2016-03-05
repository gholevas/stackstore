app.factory('StoreEditFactory', function($http){

	var factory = {};

	factory.store = {};

	factory.saveStore = function(){
		var store = this.store;
		return $http.put('/api/store/'+store.url, store)
		.then(function(response){
			//TODO: Provide success/failure feedback
		});
	};

	factory.addQuestion = function(question){
		var store = this.store;
		return $http.post('/api/store/'+store.url+'/question',question)
		.then(function(response){
			console.log(response);
		});
	};

	factory.getStore = function(url){
		var self = this;
		return $http.get('/api/store/'+url)
		.then(function(response){
			self.store = response.data;
			return response.data;
		});
	};

	return factory;

});