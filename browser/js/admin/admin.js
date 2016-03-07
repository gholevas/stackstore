app.config(function($stateProvider) {

    // Register our *admin* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'js/admin/admin.html',
        data: {
            authenticate: true
        },
        resolve: {
            stores: function (AdminFactory) {
                return AdminFactory.getStores()
            }
        }
    }).state('adminOrders', {
        url: '/admin/orders',
        controller: 'AdminOrdersController',
        templateUrl: 'js/admin/admin-orders.html',
        resolve: {
            orders: function (AdminFactory) {
                return AdminFactory.getOrders()
            }
        }
    }).state('adminProducts', {
        url: '/admin/products',
        controller: 'AdminProductsController',
        templateUrl: 'js/admin/admin-products.html',
        resolve: {
            products: function (AdminFactory) {
                return AdminFactory.getProducts()
            }
        }
    });

});

app.controller('AdminController', function($mdEditDialog, $q, $scope, $timeout,stores) {
    
    $scope.stores = stores
    
});

app.controller('AdminOrdersController', function($mdEditDialog, $q, $scope, $timeout, orders) {

    $scope.orders = orders

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


app.controller('AdminProductsController', function($mdEditDialog, $q, $scope, $timeout, products) {

    $scope.products = products

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
        getStores: function () {
            return $http.get('/api/store').then(function (response) {
                return response.data;
            }); 
        },
        getOrders: function () {
            return $http.get('/api/orders').then(function (response) {
                return response.data;
            }); 
        },
        getProducts: function () {
            return $http.get('/api/products').then(function (response) {
                return response.data;
            }); 
        },
        updateStatus: function (store) {
            return $http.put('/api/store',store).then(function (response) {
                return response.data;
            }); 
        }

    };
})
