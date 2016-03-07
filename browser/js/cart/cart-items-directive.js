app.directive('cartItems', function(CartFactory) {
    return {
        restrict: 'E',
        scope: {
      		cart: '='
		},
        templateUrl: 'js/cart/cart-items.html',
        link: function (scope) {

            function getTotal() {
                if (!scope.cart) return 
        		scope.cart.totalToPay = !scope.cart? 0 : scope.cart.contents.reduce(function (prev, curr, i, arr) {
        			return prev + curr.product.price * curr.quantity
        		},0);
            }

            scope.updateCart = function () {
                CartFactory.updateCart(scope.cart).then(getTotal,console.log)
            }

            scope.$watch('cart.contents', getTotal)

            scope.removeProduct = function (product,index) {
                scope.cart.contents.splice(index,1);
                getTotal();
                CartFactory.removeProduct(product).then(null,console.log)
            }

        	scope.getNums = function() {
		        return [1,2,3,4,5];
		    };
        }
    };
});
