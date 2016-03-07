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

app.controller('FoundProductController', function ($mdSidenav,$scope,productInfo,CartFactory, AuthService) {
	$scope.product = productInfo;
    $scope.quantity = 1;
    AuthService.getLoggedInUser(false).then(function(user){
        if(!user) return;
        $scope.isAdmin = user.isAdmin;
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
