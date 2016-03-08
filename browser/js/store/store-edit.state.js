app.config(function($stateProvider) {

    $stateProvider.state('storeEdit', {
        url: '/store/:url/edit',
        templateUrl: 'js/store/store-edit.html',
        resolve: {
            store: function($stateParams, StoreEditFactory) {
                return StoreEditFactory.getStore($stateParams.url);
                }
        },

        controller: function($state, $scope, $mdMedia, $mdDialog, store, StoreEditFactory){
        	$scope.store = store;
        	$scope.success = false;
        	$scope.error = false;

        	$scope.saveStore = function(){
        		StoreEditFactory.store = $scope.store;
        		return StoreEditFactory.saveStore()
        		.then(function(store){
                    if ($scope.store.url !== store.url) {
                        $state.go('storeEdit',{url:store.url})
                    } else {
    	        		$scope.store = store;
    	        		$scope.success = true;
    	        		$scope.error = false;
                    }
	        	})
	        	.catch(function(err){
	        		$scope.success = false;
	        		$scope.error = true;
	        	});
        };

            $scope.addQuestion = function(ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: 'AddQuestionCtrl',
                    templateUrl: 'js/store/add-question.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                });
            };

            $scope.$on('storeUpdate', function() {
                $scope.store = StoreEditFactory.returnStore();
            });

            $scope.removeQuestion = function(question) {
                return StoreEditFactory.removeQuestion(question)
                    .then(function(editedStore) {
                        StoreEditFactory.store = editedStore;
                        $scope.store = editedStore;
                    });
            };

            $scope.removeProduct = function(product) {
                return StoreEditFactory.removeProduct(product)
                    .then(function(editedStore) {
                        StoreEditFactory.store = editedStore;
                        $scope.store = editedStore;
                    });
            };

            $scope.updateProduct = function(product){
                return StoreEditFactory.updateProduct(product);
                

            };

            $scope.addProduct = function(ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: 'AddProductCtrl',
                    templateUrl: 'js/store/add-product.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                });
            };
        }
    });
});
