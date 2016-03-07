app.config(function($stateProvider) {
    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: 'js/orders/orders.html',
        controller: function($scope,$state,allOrders,OrdersFactory) {
            $scope.allOrders = allOrders;
        },
        resolve: {
            allOrders: function(OrdersFactory){
                return OrdersFactory.getAllOrders();
            }
        }
    });
});

app.config(function($stateProvider) {
    $stateProvider.state('thankyou', {
        url: '/thankyou/:confirmationNum',
        templateUrl: 'js/orders/orders.html',
        controller: function($scope,allOrders,orderDetails,OrdersFactory){
            $scope.allOrders = allOrders;
            $scope.orderDetails = orderDetails;
        },
        resolve: {
            allOrders: function(OrdersFactory){
                return OrdersFactory.getAllOrders();
            },
            orderDetails: function(OrdersFactory, $stateParams){
                return OrdersFactory.getOrderDetails($stateParams.confirmationNum);
            }
        }
    });
});

app.factory('OrdersFactory', function($http) {
    return {
        getAllOrders: function() {
            return $http.get('/api/orders/')
                .then(function(res) {
                    return res.data;
                })
        },
        getOrderDetails: function(confirmationNum){
            return $http.get('api/orders/'+confirmationNum)
                .then(function(res){
                    return res.data;
                })
        }
    };
});


