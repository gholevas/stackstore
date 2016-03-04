app.directive('navbar', function($rootScope, $location,AuthService, AUTH_EVENTS, $state, $timeout, $mdSidenav, $log,$mdDialog,$mdMedia, CartFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            function buildToggler(navID) {
                return function() {
                    $mdSidenav(navID)
                        .toggle();
                }
            }

            // for cart
            scope.toggleRight = buildToggler('right');

            scope.state = $state;
            console.log(scope.state.current)

            // for admin menu
            scope.toggleLeft = buildToggler('left');


            function DialogController() {
                  scope.hide = function() {
                    $mdDialog.hide();
                  };
                  scope.cancel = function() {
                    $mdDialog.cancel();
                  };
                  scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                  };
            }

            scope.showAdvanced = function(ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && scope.customFullscreen;
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'js/login/login.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
            };

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    console.log(user)
                    scope.user = user;
                    if (user && user.isAdmin) {
                        // doesn't work without timeout
                        $timeout(function() {
                          $state.go('admin');
                        }, 0);
                    }
                    CartFactory.getUserCart()
                    .then(function(cart) {
                        scope.user.cart = cart
                    })
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
