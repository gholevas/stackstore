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
            stores: function(AdminFactory) {
                return AdminFactory.getStores();
            }
        }
    }).state('adminOrders', {
        url: '/admin/orders',
        controller: 'AdminOrdersController',
        templateUrl: 'js/admin/admin-orders.html',
        resolve: {
            orders: function(AdminFactory) {
                return AdminFactory.getOrders();
            }
        }
    }).state('adminProducts', {
        url: '/admin/products',
        controller: 'AdminProductsController',
        templateUrl: 'js/admin/admin-products.html',
        resolve: {
            products: function(AdminFactory) {
                return AdminFactory.getProducts();
            }
        }
    }).state('adminUsers', {
        url: '/admin/users',
        controller: 'AdminUsersController',
        templateUrl: 'js/admin/admin-users.html',
        resolve: {
            users: function(AdminFactory) {
                return AdminFactory.getUsers()
            }
        }
    })

});

app.controller('AdminController', function($mdEditDialog, $q, $scope, $timeout, stores, AdminFactory) {

    $scope.stores = stores;

    $scope.updateStoreStatus = function(store) {
        $scope.promise = $timeout(function() {
            AdminFactory.updateStoreStatus(store)
                .then(function(newStore) {
                    console.log(newStore);
                });
        }, 500);
    };


});

app.controller('AdminOrdersController', function($mdEditDialog,$filter, $q, $scope, $timeout, orders) {

    $scope.orders = orders;
    console.log(orders)

    $scope.selected = [];

    $scope.getTypes = function() {
        return ['unpaid', 'shipping info', 'complete'];
    };

    var ctx = document.getElementById("myChart").getContext("2d");

    var data = {
        labels: orders.map(function (order) {
                    return $filter('date')(order.date, "MM-dd");
                }),
        datasets: [
            {
                label: "Orders",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: orders.map(function (order) {
                    return order.totalPrice
                })
            }
        ]
    };
    
    var myLineChart = new Chart(ctx).Line(data,{responsive: true});

});


app.controller('AdminProductsController', function($mdEditDialog, $q, $scope, $timeout, products, AdminFactory) {

    $scope.products = products;

    $scope.selected = [];

    $scope.toggle = false;

    $scope.toggleAll = function (to) {
        $scope.products = $scope.selected.map(function (item) {
            item.available = to;
            return item
        })

        $scope.products.forEach(function (prod) {
            AdminFactory.updateProduct(prod)
            .then(null,console.log)
        })
    }

});

app.controller('AdminUsersController', function($mdEditDialog, $q, $scope, $timeout, users, AuthService, AdminFactory) {

    $scope.users = users

    $scope.selected = [];

    $scope.resetPassword = function(user) {
        $scope.promise = $timeout(function() {
            AuthService.resetPassword(user.email)
            .then(function() {})
        }, 500);
    }

    $scope.toggleAdmin = function(user) {

        $scope.promise = $timeout(function() {
            AdminFactory.toggleAdmin(user)
            .then(function(data) {
                console.log(data)
            })
        }, 500);
        
    }


});

app.factory('AdminFactory', function($http) {

    return {
        getStores: function() {
            return $http.get('/api/store').then(function(response) {
                return response.data;
            });
        },
        getOrders: function() {
            return $http.get('/api/orders').then(function(response) {
                return response.data;
            });
        },
        getProducts: function() {
            return $http.get('/api/products').then(function(response) {
                return response.data;
            });
        },
        getUsers: function() {
            return $http.get('/api/users').then(function(response) {
                return response.data;
            });
        },
        toggleAdmin: function(user) {
            console.log("here")
            return $http.put('/api/user/toggle',user).then(function(response) {
                return response.data;
            });
        },
        updateStoreStatus: function(store) {
            return $http.put('/api/store/', store).then(function(response) {
                return response.data;
            });
        },
        updateProduct: function(product) {
            return $http.put('/api/products/'+product._id, product).then(function(response) {
                return response.data;
            });
        }

    };
});
