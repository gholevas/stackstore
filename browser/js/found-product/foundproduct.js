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

app.controller('FoundProductController', function ($scope,productInfo,CartFactory) {
	$scope.product = productInfo;

    $scope.addToCart = function () {
        console.log($scope.product)
    }

});

app.factory('FoundProductFactory', function($http) {
    return {
        getProductInfo: function(productId) {
            return $http.get('/api/products/'+productId)
                .then(function(res) {
                    console.log("this returns and array",res.data)
                    return res.data;
                })
        }
    };
});
