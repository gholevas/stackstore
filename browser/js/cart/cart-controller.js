app.controller('CartController', function($scope, $mdSidenav, CartFactory) {

    CartFactory.getUserCart()
        .then(function(cart) {
            $scope.cart = cart
        })

    $scope.range = function(n) {
        return new Array(n);
    };
    $scope.num = 1;
    $scope.close = function() {
        $mdSidenav('right').close()
    };


});
