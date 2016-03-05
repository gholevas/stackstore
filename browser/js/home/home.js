app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
        	stores: function (StoreFactory) {
        		console.log("here")
        		return StoreFactory.getAllStores();
        	}
        },
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, $state, stores){
	$scope.stores = stores;

    $scope.searchText = "";

	$scope.goToStore = function (store) {
		console.log(store._id);
		$state.go('store', {storeId: store.url});
	};
});


