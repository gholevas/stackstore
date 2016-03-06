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
    $scope.user.cart = cart


    $scope.placeOrder = function() {

        CartFactory.processOrder({
            "user": $scope.user._id,
            "shipping": $scope.shipping,
            "billing": $scope.billing,
            "contents": $scope.user.cart.contents
        }).then(function (data) {
            console.log("order processed", data)
            $scope.$emit('clearCart')
            $state.go('membersOnly')
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
