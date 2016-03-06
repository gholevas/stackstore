app.config(function($stateProvider) {

    // Register our *admin* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'js/admin/admin.html',
        data: {
            authenticate: true
        }
    }).state('adminOrders', {
        url: '/admin/orders',
        controller: 'AdminOrdersController',
        templateUrl: 'js/admin/admin-orders.html',
        resolve: {
            carts: function (AdminFactory) {
                return AdminFactory.getStoreOrders()
            }
        }
    }).state('adminProducts', {
        url: '/admin/products',
        controller: 'AdminProductsController',
        templateUrl: 'js/admin/admin-products.html',
        resolve: {
            carts: function (CartFactory) {
                return CartFactory.getAll()
            }
        }
    });

});

app.controller('AdminController', function($mdEditDialog, $q, $scope, $timeout, carts) {
    
    $scope.carts = carts

    $scope.selected = [];

    $scope.getTypes = function() {
        return ['unpaid', 'shipping info', 'complete'];
    };

    $scope.loadStuff = function() {
        $scope.promise = $timeout(function() {
            // loading
        }, 2000);
    }

});

app.controller('AdminOrdersController', function($mdEditDialog, $q, $scope, $timeout, carts) {
    $scope.carts = carts

    $scope.selected = [];

    $scope.getTypes = function() {
        return ['unpaid', 'shipping info', 'complete'];
    };

    $scope.loadStuff = function() {
        $scope.promise = $timeout(function() {
            // loading
        }, 2000);
    }

});


app.controller('AdminProductsController', function($mdEditDialog, $q, $scope, $timeout, carts) {
    $scope.carts = carts

    $scope.selected = [];

    $scope.getTypes = function() {
        return ['unpaid', 'shipping info', 'complete'];
    };

    $scope.loadStuff = function() {
        $scope.promise = $timeout(function() {
            // loading
        }, 2000);
    }

});

app.factory('AdminFactory', function($http){
    
    return {
        getStoreOrders: function (store) {
            return $http.get('/api/' + store.url + '/orders').then(function (response) {
                return response.data;
            }); 
        }

    };
})
