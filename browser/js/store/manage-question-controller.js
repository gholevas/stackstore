app.controller('ManageQuestionCtrl', function($scope, $mdDialog, StoreEditFactory){
	$scope.store = StoreEditFactory.store;

	$scope.cancel = function() {
    $mdDialog.cancel();
  };
});