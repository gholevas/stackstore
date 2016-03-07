app.controller('ManageProductCtrl', function($rootScope, $scope, $mdDialog, StoreEditFactory){
    
    $scope.store = StoreEditFactory.returnStore();

	$scope.cancel = function() {
        $mdDialog.cancel();
    };
});