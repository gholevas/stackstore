app.controller('ManageQuestionCtrl', function($rootScope, $scope, $mdDialog, StoreEditFactory){
 $scope.store = StoreEditFactory.returnStore();

	$scope.removeQuestion =function(question){
		return StoreEditFactory.removeQuestion(question)
		.then(function(store){
    	StoreEditFactory.store = store;
    	$rootScope.$broadcast("questionChange");
    	$scope.store = store;
    });
	};
	$scope.cancel = function() {
    $mdDialog.cancel();
  };
});