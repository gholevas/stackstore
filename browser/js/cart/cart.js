app.directive('cart', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/cart/cart.html',
        link: function(scope) {
            scope.range = function(n) {
                return new Array(n);
            };
            scope.num = 1;
        }
    };
});
