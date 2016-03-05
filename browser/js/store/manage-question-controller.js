app.controller('ManageQuestionCtrl', function($scope, $mdDialog, StoreEditFactory){
 $scope.store = StoreEditFactory.returnStore();
	$scope.removeQuestion =function(question){
		StoreEditFactory.removeQuestion(question)
		.then(function(store){
    	StoreEditFactory.store = store;
    	$rootScope.$broadcast("questionChange");
    	$scope.cancel();
    });
	};
	$scope.cancel = function() {
    $mdDialog.cancel();
  };
});