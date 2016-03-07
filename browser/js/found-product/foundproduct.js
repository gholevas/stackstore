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

app.controller('FoundProductController', function ($mdSidenav,$scope,productInfo,CartFactory) {
	$scope.product = productInfo;
    $scope.quantity = 1;
    $scope.addToCart = function () {
        // need to change one we fix answer schema [tags]
        CartFactory.addToCart($scope.product)
        .then(function (newCart) {
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
