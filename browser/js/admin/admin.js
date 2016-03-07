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
                return AdminFactory.getStores();
            }
        }
    }).state('adminOrders', {
        url: '/admin/orders',
        controller: 'AdminOrdersController',
        templateUrl: 'js/admin/admin-orders.html',
        resolve: {
            orders: function (AdminFactory) {
                return AdminFactory.getOrders();
            }
        }
    }).state('adminProducts', {
        url: '/admin/products',
        controller: 'AdminProductsController',
        templateUrl: 'js/admin/admin-products.html',
        resolve: {
            products: function (AdminFactory) {
                return AdminFactory.getProducts();
            }
        }
    }).state('adminUsers', {
        url: '/admin/users',
        controller: 'AdminUsersController',
        templateUrl: 'js/admin/admin-users.html',
        resolve: {
            users: function (AdminFactory) {
                return AdminFactory.getUsers()
            }
        }
    })

});

app.controller('AdminController', function($mdEditDialog, $q, $scope, $timeout,stores,AdminFactory) {
    
    $scope.stores = stores;

    $scope.updateStoreStatus = function (store) {
        $scope.promise = $timeout(function() {
            AdminFactory.updateStatus(store)
            .then(function (newStore) {
                console.log(newStore);
            });
        }, 500);
    };

    
});

app.controller('AdminOrdersController', function($mdEditDialog, $q, $scope, $timeout, orders) {

    $scope.orders = orders;

    $scope.selected = [];

    $scope.getTypes = function() {
        return ['unpaid', 'shipping info', 'complete'];
    };

    $scope.loadStuff = function() {
        $scope.promise = $timeout(function() {
            // loading
        }, 2000);
    };

});


app.controller('AdminProductsController', function($mdEditDialog, $q, $scope, $timeout, products) {

    $scope.products = products;

    $scope.selected = [];

    $scope.getTypes = function() {
        return ['unpaid', 'shipping info', 'complete'];
    };

    $scope.loadStuff = function() {
        $scope.promise = $timeout(function() {
            // loading
        }, 2000);
    };

});

app.controller('AdminUsersController', function($mdEditDialog, $q, $scope, $timeout, users) {

    $scope.users = users

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
        getUsers: function () {
            return $http.get('/api/users').then(function (response) {
                return response.data;
            }); 
        },
        updateStoreStatus: function (store) {
            return $http.put('/api/store/',store).then(function (response) {
                return response.data;
            }); 
        }

    };
});
