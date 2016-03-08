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

            // hide logo if small screen
            scope.$watch(function() { return $mdMedia('(min-width: 804px)'); }, function(big) {
                scope.bigScreen = big;
            });

            // for cart
            scope.toggleRight = buildToggler('right');

            scope.state = $state;

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

            scope.showSignup = function(ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && scope.customFullscreen;
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'js/signup/signup.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
            };

            scope.user = null;

            // may need to embed cart by refrence, having trouble clearing the cart even though its cleared in db.
            var updateCart = function () {
                CartFactory.getUserCart()
                .then(function(cart) {
                    scope.cart = cart
                })
            }
            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    updateCart();
                    $state.go('home');
                });
            };

            scope.goToAdmin = function () {
                $timeout(function() {
                    $state.go('admin');
                }, 0);
            };

            scope.goToStoreEdit = function () {
                $timeout(function() {
                    AuthService.getLoggedInUser()
                    .then(function(user){
                        return AuthService.populateUser();
                    })
                    .then(function(user){
                        $state.go('storeEdit',{url:user.store.url});
                    });
                }, 0);
            };
            

            var clearCart = function () {
                scope.cart.contents = [];
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                    if (user && user.isSeller) {
                        // turned off so it wont redirect sellers away from edit page
                        // doesn't work without timeout
                        // $timeout(function() {
                        //   $state.go('admin');
                        // }, 0);
                    }
                    updateCart()
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
            // add listener for add to cart event to pull from db and update cart 
            $rootScope.$on('updateCart', updateCart)
            $rootScope.$on('clearCart', clearCart)
        }

    };

});
