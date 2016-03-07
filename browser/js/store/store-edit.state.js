app.config(function($stateProvider){

	$stateProvider.state('storeEdit',{
				url: '/store/:url/edit',
        templateUrl: 'js/store/store-edit.html',
        resolve:{
        	store: function($stateParams, StoreEditFactory){
        		return StoreEditFactory.getStore($stateParams.url);
        	}
        },
        controller: function($scope, $mdMedia, $mdDialog, store, StoreEditFactory){
        	$scope.store = store;

        	$scope.saveStore = function(){
        		StoreEditFactory.store = $scope.store;
        		StoreEditFactory.saveStore();
        		$scope.store = StoreEditFactory.returnStore();
        	};

      	$scope.addQuestion = function(ev) {
			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    $mdDialog.show({
			      controller:'AddQuestionCtrl',
			      templateUrl: 'js/store/add-question.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: useFullScreen
			    });
      	};

      	$scope.$on('storeUpdate', function(){
      		$scope.store = StoreEditFactory.returnStore();
      	});

    		$scope.removeQuestion =function(question){
					return StoreEditFactory.removeQuestion(question)
					.then(function(store){
			    	StoreEditFactory.store = store;
			    	$scope.store = store;
		    	});
				};

				$scope.removeProduct =function(product){
					return StoreEditFactory.removeProduct(product)
					.then(function(store){
			    	StoreEditFactory.store = store;
			    	$scope.store = store;
		    	});
				};


      	$scope.addProduct = function(ev) {
			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    $mdDialog.show({
			      controller:'AddProductCtrl',
			      templateUrl: 'js/store/add-product.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: useFullScreen
			    });
      	};
      }
	});
});