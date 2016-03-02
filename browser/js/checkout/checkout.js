app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckOutCtrl'
    });
});


app.controller('CheckOutCtrl', function($scope) {

    $scope.shippingVis = true;
    $scope.billingVis = false;
    $scope.reviewVis = false;
    $scope.showBilling = function(){
        $scope.billingVis = true;
        $scope.shippingVis = false;
    }
    $scope.showReview = function(){
        $scope.reviewVis = true;
        $scope.billingVis = false;
    }
    $scope.backToShipping = function(){
        $scope.shippingVis = true;
        $scope.billingVis = false;
    }
    $scope.backToBilling = function(){
        $scope.reviewVis = false;
        $scope.billingVis = true;
    }


});
