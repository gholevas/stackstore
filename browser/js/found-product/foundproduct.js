app.config(function ($stateProvider) {
    $stateProvider.state('foundproduct', {
        url: '/foundproduct/:productId',
        controller: 'FoundProductController',
        templateUrl: 'js/found-product/foundproduct.html',
        resolve: {
            productInfo: function(FoundProductFactory,$stateParams) {
                return FoundProductFactory.getProductInfo($stateParams.productId);
            }
        }
    });

});

app.controller('FoundProductController', function ($state,$mdSidenav,$scope,productInfo,CartFactory, AuthService, StoreFactory) {
	$scope.product = productInfo;
    $scope.quantity = 1;
    /* TMK: Why not resolve this? */
    AuthService.getLoggedInUser(false).then(function(user){
        if(!user) return;
        $scope.isAdmin = user.isAdmin;
        $scope.isSeller = user.isSeller;
    });
    $scope.addToCart = function () {
        // need to change one we fix answer schema [tags]
        // console.log("Quant",$scope.quantity); //TODO, not updating from view
        CartFactory.addToCart($scope.product, $scope.quantity)
        .then(function () {
            $scope.$emit('updateCart');
            $mdSidenav('right').open()
        })
    }
    $scope.backToQuestions = function(){
        StoreFactory.getStoreById(productInfo.store)
        .then(function(storeUrl){
            $state.go("store",{url:storeUrl.data});
        });
    }

});

app.factory('FoundProductFactory', function($http) {
    return {
        getProductInfo: function(productId) {
            return $http.get('/api/products/'+productId)
                .then(function(res) {
                    return res.data;
                })
        }
    };
});
