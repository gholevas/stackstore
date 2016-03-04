app.directive('cartItems', function(CartFactory) {
    return {
        restrict: 'E',
        scope: {
      		cart: '='
		},
        templateUrl: 'js/cart/cart-items.html',
        link: function (scope) {
        	scope.updateCart = function () {
        		scope.cart.totalToPay = scope.cart.contents.reduce(function (prev, curr, i, arr) {
        			return prev + curr.product.price * curr.quantity
        		},0);
                CartFactory.updateCart(scope.cart).then(null,console.log)
        	}

        	scope.getNums = function() {
		        return [1,2,3,4,5];
		    };
        }
    };
});
