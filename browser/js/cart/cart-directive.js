app.directive('cart', function() {
    return {
        restrict: 'E',
        scope: {
      		cart: '='
		},
        templateUrl: 'js/cart/cart.html'
    };
});
