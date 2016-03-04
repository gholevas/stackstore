app.factory('StoreEditFactory', function($http){

	var factory = {};

	factory.saveStore = function(store){
		$http.put('/api/store/'+store.url);
	};

	factory.getStore = function(url){
		return $http.get('/api/store/'+url)
		.then(function(response){
			console.log(response);
			return response.data;
		});
	};

	return factory;

});