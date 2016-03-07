app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckOutCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser()
            },
            cart: function(CartFactory) {
                return CartFactory.getUserCart()
            }
        }
    });
});


app.controller('CheckOutCtrl', function($rootScope, $scope, $state, user, CartFactory, cart) {

    $scope.user = user;
    $scope.cart = cart;
    $scope.states = "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming".split(",");
    $scope.placeOrder = function() {
        
        CartFactory.processOrder({
            // "user": $scope.user._id, //setting this on the backend now -pm
            "cartId": $scope.cart._id,
            "shipping": $scope.shipping,
            "billing": $scope.billing,
            "contents": $scope.cart.contents
        }).then(function (data) {
            $scope.$emit('clearCart')
            // $state.go('membersOnly');
            $state.go('thankyou',{confirmationNum:data.confirmationNum})
        }).then(null,console.log)
        
    }


    $scope.shippingVis = true;
    $scope.billingVis = false;
    $scope.reviewVis = false;
    $scope.showBilling = function() {
        $scope.billingVis = true;
        $scope.shippingVis = false;
    }
    $scope.showReview = function() {
        $scope.reviewVis = true;
        $scope.billingVis = false;
    }
    $scope.backToShipping = function() {
        $scope.shippingVis = true;
        $scope.billingVis = false;
    }
    $scope.backToBilling = function() {
        $scope.reviewVis = false;
        $scope.billingVis = true;
    }


});
