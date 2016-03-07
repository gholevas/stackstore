app.config(function($stateProvider) {
    $stateProvider.state('orders', {
        url: '/orders',
        onEnter: function($state, AuthService){
            if(!AuthService.isAuthenticated()) $state.go("home");
        },
        templateUrl: 'js/orders/orders.html',
        controller: function($scope,$state,allMyOrders,OrdersFactory) {
            $scope.allMyOrders = allMyOrders;
        },
        resolve: {
            allMyOrders: function(AuthService, OrdersFactory){
                return OrdersFactory.getAllMyOrders()
                    .catch(console.log.bind(console))
            }
        }
    });
});

app.config(function($stateProvider) {
    $stateProvider.state('thankyou', {
        url: '/thankyou/:confirmationNum',
        templateUrl: 'js/orders/orders.html',
        controller: function($scope,allMyOrders,orderDetails,OrdersFactory){
            $scope.allMyOrders = allMyOrders;
            $scope.orderDetails = orderDetails;
        },
        resolve: {
            allMyOrders: function(OrdersFactory){
                return OrdersFactory.getAllMyOrders();
            },
            orderDetails: function(OrdersFactory, $stateParams){
                return OrdersFactory.getOrderDetails($stateParams.confirmationNum);
            }
        }
    });
});

app.factory('OrdersFactory', function($http) {
    return {
        getAllMyOrders: function() {
            return $http.get('/api/my/orders')
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