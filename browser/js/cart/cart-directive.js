app.directive('cart', function(CartFactory) {
    return {
        restrict: 'E',
        scope: {
      		cart: '='
		},
        templateUrl: 'js/cart/cart.html'
    };
});
