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

      	$scope.manageQuestions = function(ev) {

			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    $mdDialog.show({
			      controller:'ManageQuestionCtrl',
			      templateUrl: 'js/store/manage-question.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: useFullScreen
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

      	$scope.$on('productChange', function(){
      		$scope.store = StoreEditFactory.returnStore();
      	});

      	$scope.manageProducts = function(ev) {

			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    $mdDialog.show({
			      controller:'ManageProductCtrl',
			      templateUrl: 'js/store/manage-product.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: useFullScreen
			    });
      	};
      }
	});
});