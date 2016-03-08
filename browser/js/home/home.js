app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
        	stores: function (StoreFactory) {
        		return StoreFactory.getActiveStores();
        	}
        },
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, $state, stores, $location, $anchorScroll){
	
    $scope.stores = stores;

    $scope.searchText = "";

	$scope.goToStore = function (store) {
		$state.go('store', {url: store.url});
	};

    $scope.scrollToStores = function () {
        $location.hash('stores'); 
        $anchorScroll();
    };
    
});


