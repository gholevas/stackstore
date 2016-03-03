app.directive('adminNav', function($mdSidenav) {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/admin-nav.html',
        link: function(scope) {
        	scope.toggleLeft = buildToggler('left');

		    function buildToggler(navID) {
		        return function() {
		            $mdSidenav(navID)
		                .toggle();
		        }
		    }
        }
    };
});