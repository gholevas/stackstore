app.directive('cart', function($mdSidenav) {
    return {
        restrict: 'E',
        scope: {
      		cart: '='
		},
        templateUrl: 'js/cart/cart.html'
    };
});
