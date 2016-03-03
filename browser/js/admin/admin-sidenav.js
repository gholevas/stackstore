app.directive('adminNav', function($mdSidenav, $state) {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/admin-nav.html',
        link: function(scope) {
            function buildToggler(navID) {
                return function() {
                    $mdSidenav(navID)
                        .toggle();
                }
            }

            scope.toggleLeft = buildToggler('left');

            scope.toAdmin = function() {
                $state.go('admin')
            }

            scope.toBoxes = function() {
                $state.go('adminBoxes')
            }

            scope.toCarts = function() {
                $state.go('adminCarts')
            }

        }
    };
});
