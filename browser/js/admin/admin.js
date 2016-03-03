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
            carts: function (CartFactory) {
                return CartFactory.getAll()
            }
        }
    }).state('adminCarts', {
        url: '/admin/carts',
        controller: 'AdminCartsController',
        templateUrl: 'js/admin/admin-carts.html',
        resolve: {
            carts: function (CartFactory) {
                return CartFactory.getAll()
            }
        }
    }).state('adminBoxes', {
        url: '/admin/boxes',
        controller: 'AdminBoxesController',
        templateUrl: 'js/admin/admin-boxes.html',
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

app.controller('AdminCartsController', function($mdEditDialog, $q, $scope, $timeout, carts) {
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


app.controller('AdminBoxesController', function($mdEditDialog, $q, $scope, $timeout, carts) {
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
