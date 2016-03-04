app.config(function($stateProvider) {
    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: 'js/orders/orders.html',
        controller: 'OrdersCtrl',
        resolve: {
            allOrders: function(OrdersFactory){
                return OrdersFactory.getAllOrders();
            }
        }
    });
});


app.controller('OrdersCtrl', function($scope,$state,allOrders,OrdersFactory) {

    $scope.allOrders = allOrders;

});



app.factory('OrdersFactory', function($http) {
    return {
        getAllOrders: function() {
            return $http.get('/api/orders/')
                .then(function(res) {
                    return res.data;
                })
        }
    };
});


