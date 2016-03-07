app.controller('AddProductCtrl', function($timeout, $rootScope, $scope, $mdDialog, StoreEditFactory){

	$scope.saveProduct = function(){
    var product = {};
    product.name = $scope.name;
    product.imgUrl = $scope.imgUrl;
    product.tags = $scope.tags;
    product.price = $scope.price;
    if(!product.name || !product.price || !product.tags || !product.imgUrl) return;
    return StoreEditFactory.addProduct(product)
    .then(function(store){
    	StoreEditFactory.store = store;
    	$rootScope.$broadcast("storeUpdate");
    	$scope.cancel();
    });
  };

	$scope.cancel = function() {
    $mdDialog.cancel();
  };
});