app.directive('cart', function(CartFactory,$mdSidenav) {
    return {
        restrict: 'E',
        scope: {
      		cart: '='
		},
        templateUrl: 'js/cart/cart.html',
        link: function (scope) {
        	scope.close = function () {
		      $mdSidenav('right').close()
		    };
        }
    };
});
