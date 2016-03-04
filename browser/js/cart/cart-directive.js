app.directive('cart', function() {
    return {
        restrict: 'E',
        scope: {
      		cart: '='
		},
        templateUrl: 'js/cart/cart.html',
        link: function (scope) {
        	scope.updateCart = function (c) {
        		scope.cart.totalToPay = scope.cart.contents.reduce(function (prev, curr, i, arr) {
        			return prev + arr[i].product.price * arr[i].quantity
        		},0)
        	}

        	scope.getNums = function() {
		        return [1,2,3,4,5];
		    };
        }
    };
});
