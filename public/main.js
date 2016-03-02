'use strict';
window.app = angular.module('FullstackGeneratedApp', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMaterial', 'md.data.table']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function destinationStateRequiresAuth(state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });
    });
});

app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });
});

app.controller('AboutController', function ($scope, FullstackPics) {

    // Images of beautiful Fullstack people.
    $scope.images = _.shuffle(FullstackPics);
});
app.config(function ($stateProvider) {

    // Register our *admin* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'js/admin/admin.html'
    });
});

app.controller('AdminController', ['$mdEditDialog', '$q', '$scope', '$timeout', function ($mdEditDialog, $q, $scope, $timeout) {
    'use strict';

    $scope.selected = [];

    $scope.options = {
        autoSelect: true,
        boundaryLinks: false,
        largeEditDialog: false,
        pageSelector: false,
        rowSelection: true
    };

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    $scope.desserts = {
        "count": 9,
        "data": [{
            "name": "Frozen yogurt",
            "type": "Ice cream",
            "calories": { "value": 159.0 },
            "fat": { "value": 6.0 },
            "carbs": { "value": 24.0 },
            "protein": { "value": 4.0 },
            "sodium": { "value": 87.0 },
            "calcium": { "value": 14.0 },
            "iron": { "value": 1.0 }
        }, {
            "name": "Ice cream sandwich",
            "type": "Ice cream",
            "calories": { "value": 237.0 },
            "fat": { "value": 9.0 },
            "carbs": { "value": 37.0 },
            "protein": { "value": 4.3 },
            "sodium": { "value": 129.0 },
            "calcium": { "value": 8.0 },
            "iron": { "value": 1.0 }
        }, {
            "name": "Eclair",
            "type": "Pastry",
            "calories": { "value": 262.0 },
            "fat": { "value": 16.0 },
            "carbs": { "value": 24.0 },
            "protein": { "value": 6.0 },
            "sodium": { "value": 337.0 },
            "calcium": { "value": 6.0 },
            "iron": { "value": 7.0 }
        }, {
            "name": "Cupcake",
            "type": "Pastry",
            "calories": { "value": 305.0 },
            "fat": { "value": 3.7 },
            "carbs": { "value": 67.0 },
            "protein": { "value": 4.3 },
            "sodium": { "value": 413.0 },
            "calcium": { "value": 3.0 },
            "iron": { "value": 8.0 }
        }, {
            "name": "Jelly bean",
            "type": "Candy",
            "calories": { "value": 375.0 },
            "fat": { "value": 0.0 },
            "carbs": { "value": 94.0 },
            "protein": { "value": 0.0 },
            "sodium": { "value": 50.0 },
            "calcium": { "value": 0.0 },
            "iron": { "value": 0.0 }
        }, {
            "name": "Lollipop",
            "type": "Candy",
            "calories": { "value": 392.0 },
            "fat": { "value": 0.2 },
            "carbs": { "value": 98.0 },
            "protein": { "value": 0.0 },
            "sodium": { "value": 38.0 },
            "calcium": { "value": 0.0 },
            "iron": { "value": 2.0 }
        }, {
            "name": "Honeycomb",
            "type": "Other",
            "calories": { "value": 408.0 },
            "fat": { "value": 3.2 },
            "carbs": { "value": 87.0 },
            "protein": { "value": 6.5 },
            "sodium": { "value": 562.0 },
            "calcium": { "value": 0.0 },
            "iron": { "value": 45.0 }
        }, {
            "name": "Donut",
            "type": "Pastry",
            "calories": { "value": 452.0 },
            "fat": { "value": 25.0 },
            "carbs": { "value": 51.0 },
            "protein": { "value": 4.9 },
            "sodium": { "value": 326.0 },
            "calcium": { "value": 2.0 },
            "iron": { "value": 22.0 }
        }, {
            "name": "KitKat",
            "type": "Candy",
            "calories": { "value": 518.0 },
            "fat": { "value": 26.0 },
            "carbs": { "value": 65.0 },
            "protein": { "value": 7.0 },
            "sodium": { "value": 54.0 },
            "calcium": { "value": 12.0 },
            "iron": { "value": 6.0 }
        }]
    };

    $scope.editComment = function (event, dessert) {
        event.stopPropagation(); // in case autoselect is enabled

        var editDialog = {
            modelValue: dessert.comment,
            placeholder: 'Add a comment',
            save: function save(input) {
                if (input.$modelValue === 'Donald Trump') {
                    return $q.reject();
                }
                if (input.$modelValue === 'Bernie Sanders') {
                    return dessert.comment = 'FEEL THE BERN!';
                }
                dessert.comment = input.$modelValue;
            },
            targetEvent: event,
            title: 'Add a comment',
            validators: {
                'md-maxlength': 30
            }
        };

        var promise;

        if ($scope.options.largeEditDialog) {
            promise = $mdEditDialog.large(editDialog);
        } else {
            promise = $mdEditDialog.small(editDialog);
        }

        promise.then(function (ctrl) {
            var input = ctrl.getInput();

            input.$viewChangeListeners.push(function () {
                input.$setValidity('test', input.$modelValue !== 'test');
            });
        });
    };

    $scope.getTypes = function () {
        return ['Candy', 'Ice cream', 'Other', 'Pastry'];
    };

    $scope.loadStuff = function () {
        $scope.promise = $timeout(function () {
            // loading
        }, 2000);
    };

    $scope.logItem = function (item) {
        console.log(item.name, 'was selected');
    };

    $scope.logOrder = function (order) {
        console.log('order: ', order);
    };

    $scope.logPagination = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
    };
}]);

// app.controller('AdminController', function($scope) {

//     $scope.query = {
//         order: 'name',
//         limit: 5,
//         page: 1
//     };
//     $scope.desserts = {}
//     $scope.desserts.data = [{
//         name: "hmm",
//         calories: 80,
//         fat: 1000,
//         carbs: 199,
//         protein: 2,
//         sodium: 200,
//         calcium: 2,
//         iron: 3
//     }, {
//         name: "hmm",
//         calories: 10,
//         fat: 1000,
//         carbs: 199,
//         protein: 2,
//         sodium: 200,
//         calcium: 2,
//         iron: 3
//     }, {
//         name: "hmm",
//         calories: 20,
//         fat: 1000,
//         carbs: 199,
//         protein: 2,
//         sodium: 200,
//         calcium: 2,
//         iron: 3
//     }, {
//         name: "hmm",
//         calories: 830,
//         fat: 1000,
//         carbs: 199,
//         protein: 2,
//         sodium: 200,
//         calcium: 2,
//         iron: 3
//     }, {
//         name: "hmm",
//         calories: 1280,
//         fat: 1000,
//         carbs: 199,
//         protein: 2,
//         sodium: 200,
//         calcium: 2,
//         iron: 3
//     }, {
//         name: "hmm",
//         calories: 8120,
//         fat: 1000,
//         carbs: 199,
//         protein: 2,
//         sodium: 200,
//         calcium: 2,
//         iron: 3
//     }]

//     $scope.statuses = ["pending", "shipped", "complete"]

//     $scope.orders = [{
//         _id: "123",
//         total: 100,
//         status: "shipped"
//     }, {
//         _id: "123",
//         total: 100,
//         status: "shipped"
//     }, {
//         _id: "123",
//         total: 100,
//         status: "shipped"
//     }, {
//         _id: "123",
//         total: 100,
//         status: "shipped"
//     }]

// });

app.config(function ($stateProvider) {
    $stateProvider.state('buildbox', {
        url: '/buildbox',
        templateUrl: 'js/buildbox/buildbox.html'
    });
});

app.controller('BuildBoxCtrl', BuildBoxCtrl);
function BuildBoxCtrl($scope) {
    $scope.data = {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two",
        bottom: false
    };
    $scope.next = function () {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };
    $scope.previous = function () {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
}
app.directive('cart', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/cart/cart.html'
    };
});
(function () {

    'use strict';

    // Hope you didn't forget Angular! Duh-doy.
    if (!window.angular) throw new Error('I can\'t find Angular!');

    var app = angular.module('fsaPreBuilt', []);

    app.factory('Socket', function () {
        if (!window.io) throw new Error('socket.io not found!');
        return window.io(window.location.origin);
    });

    // AUTH_EVENTS is used throughout our app to
    // broadcast and listen from and to the $rootScope
    // for important events about authentication flow.
    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        var statusDict = {
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.sessionTimeout,
            440: AUTH_EVENTS.sessionTimeout
        };
        return {
            responseError: function responseError(response) {
                $rootScope.$broadcast(statusDict[response.status], response);
                return $q.reject(response);
            }
        };
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push(['$injector', function ($injector) {
            return $injector.get('AuthInterceptor');
        }]);
    });

    app.service('AuthService', function ($http, Session, $rootScope, AUTH_EVENTS, $q) {

        function onSuccessfulLogin(response) {
            var data = response.data;
            Session.create(data.id, data.user);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            return data.user;
        }

        // Uses the session factory to see if an
        // authenticated user is currently registered.
        this.isAuthenticated = function () {
            return !!Session.user;
        };

        this.getLoggedInUser = function (fromServer) {

            // If an authenticated session exists, we
            // return the user attached to that session
            // with a promise. This ensures that we can
            // always interface with this method asynchronously.

            // Optionally, if true is given as the fromServer parameter,
            // then this cached value will not be used.

            if (this.isAuthenticated() && fromServer !== true) {
                return $q.when(Session.user);
            }

            // Make request GET /session.
            // If it returns a user, call onSuccessfulLogin with the response.
            // If it returns a 401 response, we catch it and instead resolve to null.
            return $http.get('/session').then(onSuccessfulLogin)['catch'](function () {
                return null;
            });
        };

        this.login = function (credentials) {
            return $http.post('/login', credentials).then(onSuccessfulLogin)['catch'](function () {
                return $q.reject({ message: 'Invalid login credentials.' });
            });
        };

        this.logout = function () {
            return $http.get('/logout').then(function () {
                Session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            });
        };
    });

    app.service('Session', function ($rootScope, AUTH_EVENTS) {

        var self = this;

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
            self.destroy();
        });

        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
            self.destroy();
        });

        this.id = null;
        this.user = null;

        this.create = function (sessionId, user) {
            this.id = sessionId;
            this.user = user;
        };

        this.destroy = function () {
            this.id = null;
            this.user = null;
        };
    });
})();

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        })['catch'](function () {
            $scope.error = 'Invalid login credentials.';
        });
    };
});
app.config(function ($stateProvider) {

    $stateProvider.state('membersOnly', {
        url: '/members-area',
        template: '<img ng-repeat="item in stash" width="300" ng-src="{{ item }}" />',
        controller: function controller($scope, SecretStash) {
            SecretStash.getStash().then(function (stash) {
                $scope.stash = stash;
            });
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });
});

app.factory('SecretStash', function ($http) {

    var getStash = function getStash() {
        return $http.get('/api/members/secret-stash').then(function (response) {
            return response.data;
        });
    };

    return {
        getStash: getStash
    };
});
app.factory('FullstackPics', function () {
    return ['https://pbs.twimg.com/media/B7gBXulCAAAXQcE.jpg:large', 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xap1/t31.0-8/10862451_10205622990359241_8027168843312841137_o.jpg', 'https://pbs.twimg.com/media/B-LKUshIgAEy9SK.jpg', 'https://pbs.twimg.com/media/B79-X7oCMAAkw7y.jpg', 'https://pbs.twimg.com/media/B-Uj9COIIAIFAh0.jpg:large', 'https://pbs.twimg.com/media/B6yIyFiCEAAql12.jpg:large', 'https://pbs.twimg.com/media/CE-T75lWAAAmqqJ.jpg:large', 'https://pbs.twimg.com/media/CEvZAg-VAAAk932.jpg:large', 'https://pbs.twimg.com/media/CEgNMeOXIAIfDhK.jpg:large', 'https://pbs.twimg.com/media/CEQyIDNWgAAu60B.jpg:large', 'https://pbs.twimg.com/media/CCF3T5QW8AE2lGJ.jpg:large', 'https://pbs.twimg.com/media/CAeVw5SWoAAALsj.jpg:large', 'https://pbs.twimg.com/media/CAaJIP7UkAAlIGs.jpg:large', 'https://pbs.twimg.com/media/CAQOw9lWEAAY9Fl.jpg:large', 'https://pbs.twimg.com/media/B-OQbVrCMAANwIM.jpg:large', 'https://pbs.twimg.com/media/B9b_erwCYAAwRcJ.png:large', 'https://pbs.twimg.com/media/B5PTdvnCcAEAl4x.jpg:large', 'https://pbs.twimg.com/media/B4qwC0iCYAAlPGh.jpg:large', 'https://pbs.twimg.com/media/B2b33vRIUAA9o1D.jpg:large', 'https://pbs.twimg.com/media/BwpIwr1IUAAvO2_.jpg:large', 'https://pbs.twimg.com/media/BsSseANCYAEOhLw.jpg:large', 'https://pbs.twimg.com/media/CJ4vLfuUwAAda4L.jpg:large', 'https://pbs.twimg.com/media/CI7wzjEVEAAOPpS.jpg:large', 'https://pbs.twimg.com/media/CIdHvT2UsAAnnHV.jpg:large', 'https://pbs.twimg.com/media/CGCiP_YWYAAo75V.jpg:large', 'https://pbs.twimg.com/media/CIS4JPIWIAI37qu.jpg:large'];
});

app.factory('RandomGreetings', function () {

    var getRandomFromArray = function getRandomFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var greetings = ['Hello, world!', 'At long last, I live!', 'Hello, simple human.', 'What a beautiful day!', 'I\'m like any other project, except that I am yours. :)', 'This empty string is for Lindsay Levine.', 'こんにちは、ユーザー様。', 'Welcome. To. WEBSITE.', ':D', 'Yes, I think we\'ve met before.', 'Gimme 3 mins... I just grabbed this really dope frittata', 'If Cooper could offer only one piece of advice, it would be to nevSQUIRREL!'];

    return {
        greetings: greetings,
        getRandomGreeting: function getRandomGreeting() {
            return getRandomFromArray(greetings);
        }
    };
});

app.directive('fullstackLogo', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/fullstack-logo/fullstack-logo.html'
    };
});
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $timeout, $mdSidenav, $log, $mdDialog, $mdMedia) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function link(scope) {

            scope.toggleRight = buildToggler('right');

            function buildToggler(navID) {
                return function () {
                    $mdSidenav(navID).toggle().then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
                };
            }

            function DialogController(scope, $mdDialog) {
                scope.hide = function () {
                    $mdDialog.hide();
                };
                scope.cancel = function () {
                    $mdDialog.cancel();
                };
                scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }

            scope.showAdvanced = function (ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'js/login/login.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                });
            };

            scope.items = [{ label: 'Home', state: 'home' }, { label: 'About', state: 'about' }, { label: 'Documentation', state: 'docs' }, { label: 'Members Only', state: 'membersOnly', auth: true }];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                    $state.go('home');
                });
            };

            var setUser = function setUser() {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function removeUser() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
        }

    };
});

app.directive('randoGreeting', function (RandomGreetings) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/rando-greeting/rando-greeting.html',
        link: function link(scope) {
            scope.greeting = RandomGreetings.getRandomGreeting();
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiYWRtaW4vYWRtaW4uanMiLCJidWlsZGJveC9idWlsZGJveC5qcyIsImNhcnQvY2FydC5qcyIsImZzYS9mc2EtcHJlLWJ1aWx0LmpzIiwiaG9tZS9ob21lLmpzIiwibG9naW4vbG9naW4uanMiLCJtZW1iZXJzLW9ubHkvbWVtYmVycy1vbmx5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9GdWxsc3RhY2tQaWNzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9SYW5kb21HcmVldGluZ3MuanMiLCJjb21tb24vZGlyZWN0aXZlcy9mdWxsc3RhY2stbG9nby9mdWxsc3RhY2stbG9nby5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuanMiLCJjb21tb24vZGlyZWN0aXZlcy9yYW5kby1ncmVldGluZy9yYW5kby1ncmVldGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFBLENBQUE7QUFDQSxNQUFBLENBQUEsR0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsdUJBQUEsRUFBQSxDQUFBLGFBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxZQUFBLEVBQUEsZUFBQSxDQUFBLENBQUEsQ0FBQTs7QUFFQSxHQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsa0JBQUEsRUFBQSxpQkFBQSxFQUFBOztBQUVBLHFCQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBOztBQUVBLHNCQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOzs7QUFHQSxHQUFBLENBQUEsR0FBQSxDQUFBLFVBQUEsVUFBQSxFQUFBLFdBQUEsRUFBQSxNQUFBLEVBQUE7OztBQUdBLFFBQUEsNEJBQUEsR0FBQSxTQUFBLDRCQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0EsZUFBQSxLQUFBLENBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxDQUFBO0tBQ0EsQ0FBQTs7OztBQUlBLGNBQUEsQ0FBQSxHQUFBLENBQUEsbUJBQUEsRUFBQSxVQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBOztBQUVBLFlBQUEsQ0FBQSw0QkFBQSxDQUFBLE9BQUEsQ0FBQSxFQUFBOzs7QUFHQSxtQkFBQTtTQUNBOztBQUVBLFlBQUEsV0FBQSxDQUFBLGVBQUEsRUFBQSxFQUFBOzs7QUFHQSxtQkFBQTtTQUNBOzs7QUFHQSxhQUFBLENBQUEsY0FBQSxFQUFBLENBQUE7O0FBRUEsbUJBQUEsQ0FBQSxlQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7Ozs7QUFJQSxnQkFBQSxJQUFBLEVBQUE7QUFDQSxzQkFBQSxDQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQTtBQUNBLHNCQUFBLENBQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO2FBQ0E7U0FDQSxDQUFBLENBQUE7S0FFQSxDQUFBLENBQUE7Q0FFQSxDQUFBLENBQUE7O0FDbERBLEdBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUE7OztBQUdBLGtCQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBLFdBQUEsRUFBQSxRQUFBO0FBQ0Esa0JBQUEsRUFBQSxpQkFBQTtBQUNBLG1CQUFBLEVBQUEscUJBQUE7S0FDQSxDQUFBLENBQUE7Q0FFQSxDQUFBLENBQUE7O0FBRUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxpQkFBQSxFQUFBLFVBQUEsTUFBQSxFQUFBLGFBQUEsRUFBQTs7O0FBR0EsVUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQSxDQUFBO0NBRUEsQ0FBQSxDQUFBO0FDaEJBLEdBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUE7OztBQUdBLGtCQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBLFdBQUEsRUFBQSxRQUFBO0FBQ0Esa0JBQUEsRUFBQSxpQkFBQTtBQUNBLG1CQUFBLEVBQUEscUJBQUE7S0FDQSxDQUFBLENBQUE7Q0FFQSxDQUFBLENBQUE7O0FBRUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxpQkFBQSxFQUFBLENBQUEsZUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsVUFBQSxFQUFBLFVBQUEsYUFBQSxFQUFBLEVBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBO0FBQ0EsZ0JBQUEsQ0FBQTs7QUFFQSxVQUFBLENBQUEsUUFBQSxHQUFBLEVBQUEsQ0FBQTs7QUFFQSxVQUFBLENBQUEsT0FBQSxHQUFBO0FBQ0Esa0JBQUEsRUFBQSxJQUFBO0FBQ0EscUJBQUEsRUFBQSxLQUFBO0FBQ0EsdUJBQUEsRUFBQSxLQUFBO0FBQ0Esb0JBQUEsRUFBQSxLQUFBO0FBQ0Esb0JBQUEsRUFBQSxJQUFBO0tBQ0EsQ0FBQTs7QUFFQSxVQUFBLENBQUEsS0FBQSxHQUFBO0FBQ0EsYUFBQSxFQUFBLE1BQUE7QUFDQSxhQUFBLEVBQUEsQ0FBQTtBQUNBLFlBQUEsRUFBQSxDQUFBO0tBQ0EsQ0FBQTs7QUFFQSxVQUFBLENBQUEsUUFBQSxHQUFBO0FBQ0EsZUFBQSxFQUFBLENBQUE7QUFDQSxjQUFBLEVBQUEsQ0FDQTtBQUNBLGtCQUFBLEVBQUEsZUFBQTtBQUNBLGtCQUFBLEVBQUEsV0FBQTtBQUNBLHNCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0FBQ0EsaUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxtQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQTtBQUNBLHFCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0Esb0JBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQTtBQUNBLGtCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO1NBQ0EsRUFBQTtBQUNBLGtCQUFBLEVBQUEsb0JBQUE7QUFDQSxrQkFBQSxFQUFBLFdBQUE7QUFDQSxzQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0FBQ0EscUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtTQUNBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLFFBQUE7QUFDQSxrQkFBQSxFQUFBLFFBQUE7QUFDQSxzQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0FBQ0EscUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtTQUNBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLFNBQUE7QUFDQSxrQkFBQSxFQUFBLFFBQUE7QUFDQSxzQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0FBQ0EscUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtTQUNBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLFlBQUE7QUFDQSxrQkFBQSxFQUFBLE9BQUE7QUFDQSxzQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EscUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtTQUNBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLFVBQUE7QUFDQSxrQkFBQSxFQUFBLE9BQUE7QUFDQSxzQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EscUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtTQUNBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLFdBQUE7QUFDQSxrQkFBQSxFQUFBLE9BQUE7QUFDQSxzQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0FBQ0EscUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQTtTQUNBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLE9BQUE7QUFDQSxrQkFBQSxFQUFBLFFBQUE7QUFDQSxzQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0FBQ0EscUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQTtTQUNBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLFFBQUE7QUFDQSxrQkFBQSxFQUFBLE9BQUE7QUFDQSxzQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxxQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EscUJBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtTQUNBLENBQ0E7S0FDQSxDQUFBOztBQUVBLFVBQUEsQ0FBQSxXQUFBLEdBQUEsVUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBO0FBQ0EsYUFBQSxDQUFBLGVBQUEsRUFBQSxDQUFBOztBQUVBLFlBQUEsVUFBQSxHQUFBO0FBQ0Esc0JBQUEsRUFBQSxPQUFBLENBQUEsT0FBQTtBQUNBLHVCQUFBLEVBQUEsZUFBQTtBQUNBLGdCQUFBLEVBQUEsY0FBQSxLQUFBLEVBQUE7QUFDQSxvQkFBQSxLQUFBLENBQUEsV0FBQSxLQUFBLGNBQUEsRUFBQTtBQUNBLDJCQUFBLEVBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQTtpQkFDQTtBQUNBLG9CQUFBLEtBQUEsQ0FBQSxXQUFBLEtBQUEsZ0JBQUEsRUFBQTtBQUNBLDJCQUFBLE9BQUEsQ0FBQSxPQUFBLEdBQUEsZ0JBQUEsQ0FBQTtpQkFDQTtBQUNBLHVCQUFBLENBQUEsT0FBQSxHQUFBLEtBQUEsQ0FBQSxXQUFBLENBQUE7YUFDQTtBQUNBLHVCQUFBLEVBQUEsS0FBQTtBQUNBLGlCQUFBLEVBQUEsZUFBQTtBQUNBLHNCQUFBLEVBQUE7QUFDQSw4QkFBQSxFQUFBLEVBQUE7YUFDQTtTQUNBLENBQUE7O0FBRUEsWUFBQSxPQUFBLENBQUE7O0FBRUEsWUFBQSxNQUFBLENBQUEsT0FBQSxDQUFBLGVBQUEsRUFBQTtBQUNBLG1CQUFBLEdBQUEsYUFBQSxDQUFBLEtBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQTtTQUNBLE1BQUE7QUFDQSxtQkFBQSxHQUFBLGFBQUEsQ0FBQSxLQUFBLENBQUEsVUFBQSxDQUFBLENBQUE7U0FDQTs7QUFFQSxlQUFBLENBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBQ0EsZ0JBQUEsS0FBQSxHQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsQ0FBQTs7QUFFQSxpQkFBQSxDQUFBLG9CQUFBLENBQUEsSUFBQSxDQUFBLFlBQUE7QUFDQSxxQkFBQSxDQUFBLFlBQUEsQ0FBQSxNQUFBLEVBQUEsS0FBQSxDQUFBLFdBQUEsS0FBQSxNQUFBLENBQUEsQ0FBQTthQUNBLENBQUEsQ0FBQTtTQUNBLENBQUEsQ0FBQTtLQUNBLENBQUE7O0FBRUEsVUFBQSxDQUFBLFFBQUEsR0FBQSxZQUFBO0FBQ0EsZUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO0tBQ0EsQ0FBQTs7QUFFQSxVQUFBLENBQUEsU0FBQSxHQUFBLFlBQUE7QUFDQSxjQUFBLENBQUEsT0FBQSxHQUFBLFFBQUEsQ0FBQSxZQUFBOztTQUVBLEVBQUEsSUFBQSxDQUFBLENBQUE7S0FDQSxDQUFBOztBQUVBLFVBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxJQUFBLEVBQUE7QUFDQSxlQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsY0FBQSxDQUFBLENBQUE7S0FDQSxDQUFBOztBQUVBLFVBQUEsQ0FBQSxRQUFBLEdBQUEsVUFBQSxLQUFBLEVBQUE7QUFDQSxlQUFBLENBQUEsR0FBQSxDQUFBLFNBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQTtLQUNBLENBQUE7O0FBRUEsVUFBQSxDQUFBLGFBQUEsR0FBQSxVQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7QUFDQSxlQUFBLENBQUEsR0FBQSxDQUFBLFFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQTtBQUNBLGVBQUEsQ0FBQSxHQUFBLENBQUEsU0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBO0tBQ0EsQ0FBQTtDQUNBLENBQUEsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUxBLEdBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUE7QUFDQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxVQUFBLEVBQUE7QUFDQSxXQUFBLEVBQUEsV0FBQTtBQUNBLG1CQUFBLEVBQUEsMkJBQUE7S0FDQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FBR0EsR0FBQSxDQUFBLFVBQUEsQ0FBQSxjQUFBLEVBQUEsWUFBQSxDQUFBLENBQUE7QUFDQSxTQUFBLFlBQUEsQ0FBQSxNQUFBLEVBQUE7QUFDQSxVQUFBLENBQUEsSUFBQSxHQUFBO0FBQ0EscUJBQUEsRUFBQSxDQUFBO0FBQ0Esb0JBQUEsRUFBQSxJQUFBO0FBQ0EsbUJBQUEsRUFBQSxVQUFBO0FBQ0EsY0FBQSxFQUFBLEtBQUE7S0FDQSxDQUFBO0FBQ0EsVUFBQSxDQUFBLElBQUEsR0FBQSxZQUFBO0FBQ0EsY0FBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7S0FDQSxDQUFBO0FBQ0EsVUFBQSxDQUFBLFFBQUEsR0FBQSxZQUFBO0FBQ0EsY0FBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7S0FDQSxDQUFBO0NBQ0E7QUN0QkEsR0FBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLEVBQUEsWUFBQTtBQUNBLFdBQUE7QUFDQSxnQkFBQSxFQUFBLEdBQUE7QUFDQSxtQkFBQSxFQUFBLG1CQUFBO0tBQ0EsQ0FBQTtDQUNBLENBQUEsQ0FBQTtBQ0xBLENBQUEsWUFBQTs7QUFFQSxnQkFBQSxDQUFBOzs7QUFHQSxRQUFBLENBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQSxNQUFBLElBQUEsS0FBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQTs7QUFFQSxRQUFBLEdBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLGFBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQTs7QUFFQSxPQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsRUFBQSxZQUFBO0FBQ0EsWUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQUEsTUFBQSxJQUFBLEtBQUEsQ0FBQSxzQkFBQSxDQUFBLENBQUE7QUFDQSxlQUFBLE1BQUEsQ0FBQSxFQUFBLENBQUEsTUFBQSxDQUFBLFFBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtLQUNBLENBQUEsQ0FBQTs7Ozs7QUFLQSxPQUFBLENBQUEsUUFBQSxDQUFBLGFBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsb0JBQUE7QUFDQSxtQkFBQSxFQUFBLG1CQUFBO0FBQ0EscUJBQUEsRUFBQSxxQkFBQTtBQUNBLHNCQUFBLEVBQUEsc0JBQUE7QUFDQSx3QkFBQSxFQUFBLHdCQUFBO0FBQ0EscUJBQUEsRUFBQSxxQkFBQTtLQUNBLENBQUEsQ0FBQTs7QUFFQSxPQUFBLENBQUEsT0FBQSxDQUFBLGlCQUFBLEVBQUEsVUFBQSxVQUFBLEVBQUEsRUFBQSxFQUFBLFdBQUEsRUFBQTtBQUNBLFlBQUEsVUFBQSxHQUFBO0FBQ0EsZUFBQSxFQUFBLFdBQUEsQ0FBQSxnQkFBQTtBQUNBLGVBQUEsRUFBQSxXQUFBLENBQUEsYUFBQTtBQUNBLGVBQUEsRUFBQSxXQUFBLENBQUEsY0FBQTtBQUNBLGVBQUEsRUFBQSxXQUFBLENBQUEsY0FBQTtTQUNBLENBQUE7QUFDQSxlQUFBO0FBQ0EseUJBQUEsRUFBQSx1QkFBQSxRQUFBLEVBQUE7QUFDQSwwQkFBQSxDQUFBLFVBQUEsQ0FBQSxVQUFBLENBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQ0EsdUJBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQTthQUNBO1NBQ0EsQ0FBQTtLQUNBLENBQUEsQ0FBQTs7QUFFQSxPQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsYUFBQSxFQUFBO0FBQ0EscUJBQUEsQ0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLENBQ0EsV0FBQSxFQUNBLFVBQUEsU0FBQSxFQUFBO0FBQ0EsbUJBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxpQkFBQSxDQUFBLENBQUE7U0FDQSxDQUNBLENBQUEsQ0FBQTtLQUNBLENBQUEsQ0FBQTs7QUFFQSxPQUFBLENBQUEsT0FBQSxDQUFBLGFBQUEsRUFBQSxVQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsVUFBQSxFQUFBLFdBQUEsRUFBQSxFQUFBLEVBQUE7O0FBRUEsaUJBQUEsaUJBQUEsQ0FBQSxRQUFBLEVBQUE7QUFDQSxnQkFBQSxJQUFBLEdBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQTtBQUNBLG1CQUFBLENBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLEVBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQ0Esc0JBQUEsQ0FBQSxVQUFBLENBQUEsV0FBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBO0FBQ0EsbUJBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQTtTQUNBOzs7O0FBSUEsWUFBQSxDQUFBLGVBQUEsR0FBQSxZQUFBO0FBQ0EsbUJBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUE7U0FDQSxDQUFBOztBQUVBLFlBQUEsQ0FBQSxlQUFBLEdBQUEsVUFBQSxVQUFBLEVBQUE7Ozs7Ozs7Ozs7QUFVQSxnQkFBQSxJQUFBLENBQUEsZUFBQSxFQUFBLElBQUEsVUFBQSxLQUFBLElBQUEsRUFBQTtBQUNBLHVCQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO2FBQ0E7Ozs7O0FBS0EsbUJBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsaUJBQUEsQ0FBQSxTQUFBLENBQUEsWUFBQTtBQUNBLHVCQUFBLElBQUEsQ0FBQTthQUNBLENBQUEsQ0FBQTtTQUVBLENBQUE7O0FBRUEsWUFBQSxDQUFBLEtBQUEsR0FBQSxVQUFBLFdBQUEsRUFBQTtBQUNBLG1CQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLFdBQUEsQ0FBQSxDQUNBLElBQUEsQ0FBQSxpQkFBQSxDQUFBLFNBQ0EsQ0FBQSxZQUFBO0FBQ0EsdUJBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLE9BQUEsRUFBQSw0QkFBQSxFQUFBLENBQUEsQ0FBQTthQUNBLENBQUEsQ0FBQTtTQUNBLENBQUE7O0FBRUEsWUFBQSxDQUFBLE1BQUEsR0FBQSxZQUFBO0FBQ0EsbUJBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQTtBQUNBLHVCQUFBLENBQUEsT0FBQSxFQUFBLENBQUE7QUFDQSwwQkFBQSxDQUFBLFVBQUEsQ0FBQSxXQUFBLENBQUEsYUFBQSxDQUFBLENBQUE7YUFDQSxDQUFBLENBQUE7U0FDQSxDQUFBO0tBRUEsQ0FBQSxDQUFBOztBQUVBLE9BQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxFQUFBLFVBQUEsVUFBQSxFQUFBLFdBQUEsRUFBQTs7QUFFQSxZQUFBLElBQUEsR0FBQSxJQUFBLENBQUE7O0FBRUEsa0JBQUEsQ0FBQSxHQUFBLENBQUEsV0FBQSxDQUFBLGdCQUFBLEVBQUEsWUFBQTtBQUNBLGdCQUFBLENBQUEsT0FBQSxFQUFBLENBQUE7U0FDQSxDQUFBLENBQUE7O0FBRUEsa0JBQUEsQ0FBQSxHQUFBLENBQUEsV0FBQSxDQUFBLGNBQUEsRUFBQSxZQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQTtTQUNBLENBQUEsQ0FBQTs7QUFFQSxZQUFBLENBQUEsRUFBQSxHQUFBLElBQUEsQ0FBQTtBQUNBLFlBQUEsQ0FBQSxJQUFBLEdBQUEsSUFBQSxDQUFBOztBQUVBLFlBQUEsQ0FBQSxNQUFBLEdBQUEsVUFBQSxTQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxFQUFBLEdBQUEsU0FBQSxDQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxJQUFBLEdBQUEsSUFBQSxDQUFBO1NBQ0EsQ0FBQTs7QUFFQSxZQUFBLENBQUEsT0FBQSxHQUFBLFlBQUE7QUFDQSxnQkFBQSxDQUFBLEVBQUEsR0FBQSxJQUFBLENBQUE7QUFDQSxnQkFBQSxDQUFBLElBQUEsR0FBQSxJQUFBLENBQUE7U0FDQSxDQUFBO0tBRUEsQ0FBQSxDQUFBO0NBRUEsQ0FBQSxFQUFBLENBQUE7O0FDcElBLEdBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUE7QUFDQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUE7QUFDQSxXQUFBLEVBQUEsR0FBQTtBQUNBLG1CQUFBLEVBQUEsbUJBQUE7S0FDQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDTEEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxXQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUEsV0FBQSxFQUFBLE1BQUEsRUFBQTs7QUFFQSxVQUFBLENBQUEsS0FBQSxHQUFBLEVBQUEsQ0FBQTtBQUNBLFVBQUEsQ0FBQSxLQUFBLEdBQUEsSUFBQSxDQUFBOztBQUVBLFVBQUEsQ0FBQSxTQUFBLEdBQUEsVUFBQSxTQUFBLEVBQUE7O0FBRUEsY0FBQSxDQUFBLEtBQUEsR0FBQSxJQUFBLENBQUE7O0FBRUEsbUJBQUEsQ0FBQSxLQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLFlBQUE7QUFDQSxrQkFBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtTQUNBLENBQUEsU0FBQSxDQUFBLFlBQUE7QUFDQSxrQkFBQSxDQUFBLEtBQUEsR0FBQSw0QkFBQSxDQUFBO1NBQ0EsQ0FBQSxDQUFBO0tBRUEsQ0FBQTtDQUVBLENBQUEsQ0FBQTtBQ2pCQSxHQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsY0FBQSxFQUFBOztBQUVBLGtCQUFBLENBQUEsS0FBQSxDQUFBLGFBQUEsRUFBQTtBQUNBLFdBQUEsRUFBQSxlQUFBO0FBQ0EsZ0JBQUEsRUFBQSxtRUFBQTtBQUNBLGtCQUFBLEVBQUEsb0JBQUEsTUFBQSxFQUFBLFdBQUEsRUFBQTtBQUNBLHVCQUFBLENBQUEsUUFBQSxFQUFBLENBQUEsSUFBQSxDQUFBLFVBQUEsS0FBQSxFQUFBO0FBQ0Esc0JBQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQSxDQUFBO2FBQ0EsQ0FBQSxDQUFBO1NBQ0E7OztBQUdBLFlBQUEsRUFBQTtBQUNBLHdCQUFBLEVBQUEsSUFBQTtTQUNBO0tBQ0EsQ0FBQSxDQUFBO0NBRUEsQ0FBQSxDQUFBOztBQUVBLEdBQUEsQ0FBQSxPQUFBLENBQUEsYUFBQSxFQUFBLFVBQUEsS0FBQSxFQUFBOztBQUVBLFFBQUEsUUFBQSxHQUFBLFNBQUEsUUFBQSxHQUFBO0FBQ0EsZUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLDJCQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxRQUFBLEVBQUE7QUFDQSxtQkFBQSxRQUFBLENBQUEsSUFBQSxDQUFBO1NBQ0EsQ0FBQSxDQUFBO0tBQ0EsQ0FBQTs7QUFFQSxXQUFBO0FBQ0EsZ0JBQUEsRUFBQSxRQUFBO0tBQ0EsQ0FBQTtDQUVBLENBQUEsQ0FBQTtBQy9CQSxHQUFBLENBQUEsT0FBQSxDQUFBLGVBQUEsRUFBQSxZQUFBO0FBQ0EsV0FBQSxDQUNBLHVEQUFBLEVBQ0EscUhBQUEsRUFDQSxpREFBQSxFQUNBLGlEQUFBLEVBQ0EsdURBQUEsRUFDQSx1REFBQSxFQUNBLHVEQUFBLEVBQ0EsdURBQUEsRUFDQSx1REFBQSxFQUNBLHVEQUFBLEVBQ0EsdURBQUEsRUFDQSx1REFBQSxFQUNBLHVEQUFBLEVBQ0EsdURBQUEsRUFDQSx1REFBQSxFQUNBLHVEQUFBLEVBQ0EsdURBQUEsRUFDQSx1REFBQSxFQUNBLHVEQUFBLEVBQ0EsdURBQUEsRUFDQSx1REFBQSxFQUNBLHVEQUFBLEVBQ0EsdURBQUEsRUFDQSx1REFBQSxFQUNBLHVEQUFBLEVBQ0EsdURBQUEsQ0FDQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOztBQzdCQSxHQUFBLENBQUEsT0FBQSxDQUFBLGlCQUFBLEVBQUEsWUFBQTs7QUFFQSxRQUFBLGtCQUFBLEdBQUEsU0FBQSxrQkFBQSxDQUFBLEdBQUEsRUFBQTtBQUNBLGVBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxHQUFBLEdBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBO0tBQ0EsQ0FBQTs7QUFFQSxRQUFBLFNBQUEsR0FBQSxDQUNBLGVBQUEsRUFDQSx1QkFBQSxFQUNBLHNCQUFBLEVBQ0EsdUJBQUEsRUFDQSx5REFBQSxFQUNBLDBDQUFBLEVBQ0EsY0FBQSxFQUNBLHVCQUFBLEVBQ0EsSUFBQSxFQUNBLGlDQUFBLEVBQ0EsMERBQUEsRUFDQSw2RUFBQSxDQUNBLENBQUE7O0FBRUEsV0FBQTtBQUNBLGlCQUFBLEVBQUEsU0FBQTtBQUNBLHlCQUFBLEVBQUEsNkJBQUE7QUFDQSxtQkFBQSxrQkFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBO1NBQ0E7S0FDQSxDQUFBO0NBRUEsQ0FBQSxDQUFBOztBQzVCQSxHQUFBLENBQUEsU0FBQSxDQUFBLGVBQUEsRUFBQSxZQUFBO0FBQ0EsV0FBQTtBQUNBLGdCQUFBLEVBQUEsR0FBQTtBQUNBLG1CQUFBLEVBQUEseURBQUE7S0FDQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBO0FDTEEsR0FBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxVQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxJQUFBLEVBQUEsU0FBQSxFQUFBLFFBQUEsRUFBQTs7QUFFQSxXQUFBO0FBQ0EsZ0JBQUEsRUFBQSxHQUFBO0FBQ0EsYUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxFQUFBLHlDQUFBO0FBQ0EsWUFBQSxFQUFBLGNBQUEsS0FBQSxFQUFBOztBQUVBLGlCQUFBLENBQUEsV0FBQSxHQUFBLFlBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQTs7QUFFQSxxQkFBQSxZQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0EsdUJBQUEsWUFBQTtBQUNBLDhCQUFBLENBQUEsS0FBQSxDQUFBLENBQ0EsTUFBQSxFQUFBLENBQ0EsSUFBQSxDQUFBLFlBQUE7QUFDQSw0QkFBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLEdBQUEsS0FBQSxHQUFBLFVBQUEsQ0FBQSxDQUFBO3FCQUNBLENBQUEsQ0FBQTtpQkFDQSxDQUFBO2FBQ0E7O0FBRUEscUJBQUEsZ0JBQUEsQ0FBQSxLQUFBLEVBQUEsU0FBQSxFQUFBO0FBQ0EscUJBQUEsQ0FBQSxJQUFBLEdBQUEsWUFBQTtBQUNBLDZCQUFBLENBQUEsSUFBQSxFQUFBLENBQUE7aUJBQ0EsQ0FBQTtBQUNBLHFCQUFBLENBQUEsTUFBQSxHQUFBLFlBQUE7QUFDQSw2QkFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBO2lCQUNBLENBQUE7QUFDQSxxQkFBQSxDQUFBLE1BQUEsR0FBQSxVQUFBLE1BQUEsRUFBQTtBQUNBLDZCQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBO2lCQUNBLENBQUE7YUFDQTs7QUFFQSxpQkFBQSxDQUFBLFlBQUEsR0FBQSxVQUFBLEVBQUEsRUFBQTtBQUNBLG9CQUFBLGFBQUEsR0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxNQUFBLENBQUEsZ0JBQUEsQ0FBQTtBQUNBLHlCQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0EsOEJBQUEsRUFBQSxnQkFBQTtBQUNBLCtCQUFBLEVBQUEscUJBQUE7QUFDQSwwQkFBQSxFQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQTtBQUNBLCtCQUFBLEVBQUEsRUFBQTtBQUNBLHVDQUFBLEVBQUEsSUFBQTtBQUNBLDhCQUFBLEVBQUEsYUFBQTtpQkFDQSxDQUFBLENBQUE7YUFDQSxDQUFBOztBQUVBLGlCQUFBLENBQUEsS0FBQSxHQUFBLENBQ0EsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsRUFDQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxFQUNBLEVBQUEsS0FBQSxFQUFBLGVBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBLEVBQ0EsRUFBQSxLQUFBLEVBQUEsY0FBQSxFQUFBLEtBQUEsRUFBQSxhQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxDQUNBLENBQUE7O0FBRUEsaUJBQUEsQ0FBQSxJQUFBLEdBQUEsSUFBQSxDQUFBOztBQUVBLGlCQUFBLENBQUEsVUFBQSxHQUFBLFlBQUE7QUFDQSx1QkFBQSxXQUFBLENBQUEsZUFBQSxFQUFBLENBQUE7YUFDQSxDQUFBOztBQUVBLGlCQUFBLENBQUEsTUFBQSxHQUFBLFlBQUE7QUFDQSwyQkFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxZQUFBO0FBQ0EsMEJBQUEsQ0FBQSxFQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7aUJBQ0EsQ0FBQSxDQUFBO2FBQ0EsQ0FBQTs7QUFFQSxnQkFBQSxPQUFBLEdBQUEsU0FBQSxPQUFBLEdBQUE7QUFDQSwyQkFBQSxDQUFBLGVBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUNBLHlCQUFBLENBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQTtpQkFDQSxDQUFBLENBQUE7YUFDQSxDQUFBOztBQUVBLGdCQUFBLFVBQUEsR0FBQSxTQUFBLFVBQUEsR0FBQTtBQUNBLHFCQUFBLENBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQTthQUNBLENBQUE7O0FBRUEsbUJBQUEsRUFBQSxDQUFBOztBQUVBLHNCQUFBLENBQUEsR0FBQSxDQUFBLFdBQUEsQ0FBQSxZQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7QUFDQSxzQkFBQSxDQUFBLEdBQUEsQ0FBQSxXQUFBLENBQUEsYUFBQSxFQUFBLFVBQUEsQ0FBQSxDQUFBO0FBQ0Esc0JBQUEsQ0FBQSxHQUFBLENBQUEsV0FBQSxDQUFBLGNBQUEsRUFBQSxVQUFBLENBQUEsQ0FBQTtTQUVBOztLQUVBLENBQUE7Q0FFQSxDQUFBLENBQUE7O0FDbkZBLEdBQUEsQ0FBQSxTQUFBLENBQUEsZUFBQSxFQUFBLFVBQUEsZUFBQSxFQUFBOztBQUVBLFdBQUE7QUFDQSxnQkFBQSxFQUFBLEdBQUE7QUFDQSxtQkFBQSxFQUFBLHlEQUFBO0FBQ0EsWUFBQSxFQUFBLGNBQUEsS0FBQSxFQUFBO0FBQ0EsaUJBQUEsQ0FBQSxRQUFBLEdBQUEsZUFBQSxDQUFBLGlCQUFBLEVBQUEsQ0FBQTtTQUNBO0tBQ0EsQ0FBQTtDQUVBLENBQUEsQ0FBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdGdWxsc3RhY2tHZW5lcmF0ZWRBcHAnLCBbJ2ZzYVByZUJ1aWx0JywgJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnLCAnbmdBbmltYXRlJywnbmdNYXRlcmlhbCcsJ21kLmRhdGEudGFibGUnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuXG4vLyBUaGlzIGFwcC5ydW4gaXMgZm9yIGNvbnRyb2xsaW5nIGFjY2VzcyB0byBzcGVjaWZpYyBzdGF0ZXMuXG5hcHAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBdXRoU2VydmljZSwgJHN0YXRlKSB7XG5cbiAgICAvLyBUaGUgZ2l2ZW4gc3RhdGUgcmVxdWlyZXMgYW4gYXV0aGVudGljYXRlZCB1c2VyLlxuICAgIHZhciBkZXN0aW5hdGlvblN0YXRlUmVxdWlyZXNBdXRoID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kYXRhICYmIHN0YXRlLmRhdGEuYXV0aGVudGljYXRlO1xuICAgIH07XG5cbiAgICAvLyAkc3RhdGVDaGFuZ2VTdGFydCBpcyBhbiBldmVudCBmaXJlZFxuICAgIC8vIHdoZW5ldmVyIHRoZSBwcm9jZXNzIG9mIGNoYW5naW5nIGEgc3RhdGUgYmVnaW5zLlxuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMpIHtcblxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uU3RhdGVSZXF1aXJlc0F1dGgodG9TdGF0ZSkpIHtcbiAgICAgICAgICAgIC8vIFRoZSBkZXN0aW5hdGlvbiBzdGF0ZSBkb2VzIG5vdCByZXF1aXJlIGF1dGhlbnRpY2F0aW9uXG4gICAgICAgICAgICAvLyBTaG9ydCBjaXJjdWl0IHdpdGggcmV0dXJuLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAvLyBUaGUgdXNlciBpcyBhdXRoZW50aWNhdGVkLlxuICAgICAgICAgICAgLy8gU2hvcnQgY2lyY3VpdCB3aXRoIHJldHVybi5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbmNlbCBuYXZpZ2F0aW5nIHRvIG5ldyBzdGF0ZS5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBBdXRoU2VydmljZS5nZXRMb2dnZWRJblVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAvLyBJZiBhIHVzZXIgaXMgcmV0cmlldmVkLCB0aGVuIHJlbmF2aWdhdGUgdG8gdGhlIGRlc3RpbmF0aW9uXG4gICAgICAgICAgICAvLyAodGhlIHNlY29uZCB0aW1lLCBBdXRoU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKSB3aWxsIHdvcmspXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIGlmIG5vIHVzZXIgaXMgbG9nZ2VkIGluLCBnbyB0byBcImxvZ2luXCIgc3RhdGUuXG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyh0b1N0YXRlLm5hbWUsIHRvUGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcbiIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYWJvdXQnLCB7XG4gICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBYm91dENvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2Fib3V0L2Fib3V0Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignQWJvdXRDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgRnVsbHN0YWNrUGljcykge1xuXG4gICAgLy8gSW1hZ2VzIG9mIGJlYXV0aWZ1bCBGdWxsc3RhY2sgcGVvcGxlLlxuICAgICRzY29wZS5pbWFnZXMgPSBfLnNodWZmbGUoRnVsbHN0YWNrUGljcyk7XG5cbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWRtaW4qIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhZG1pbicsIHtcbiAgICAgICAgdXJsOiAnL2FkbWluJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0FkbWluQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvYWRtaW4vYWRtaW4uaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBZG1pbkNvbnRyb2xsZXInLCBbJyRtZEVkaXREaWFsb2cnLCAnJHEnLCAnJHNjb3BlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRtZEVkaXREaWFsb2csICRxLCAkc2NvcGUsICR0aW1lb3V0KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgXG4gICRzY29wZS5zZWxlY3RlZCA9IFtdO1xuICBcbiAgJHNjb3BlLm9wdGlvbnMgPSB7XG4gICAgYXV0b1NlbGVjdDogdHJ1ZSxcbiAgICBib3VuZGFyeUxpbmtzOiBmYWxzZSxcbiAgICBsYXJnZUVkaXREaWFsb2c6IGZhbHNlLFxuICAgIHBhZ2VTZWxlY3RvcjogZmFsc2UsXG4gICAgcm93U2VsZWN0aW9uOiB0cnVlXG4gIH07XG4gIFxuICAkc2NvcGUucXVlcnkgPSB7XG4gICAgb3JkZXI6ICduYW1lJyxcbiAgICBsaW1pdDogNSxcbiAgICBwYWdlOiAxXG4gIH07XG4gIFxuICAkc2NvcGUuZGVzc2VydHMgPSB7XG4gICAgXCJjb3VudFwiOiA5LFxuICAgIFwiZGF0YVwiOiBbXG4gICAgICB7XG4gICAgICAgIFwibmFtZVwiOiBcIkZyb3plbiB5b2d1cnRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiSWNlIGNyZWFtXCIsXG4gICAgICAgIFwiY2Fsb3JpZXNcIjogeyBcInZhbHVlXCI6IDE1OS4wIH0sXG4gICAgICAgIFwiZmF0XCI6IHsgXCJ2YWx1ZVwiOiA2LjAgfSxcbiAgICAgICAgXCJjYXJic1wiOiB7IFwidmFsdWVcIjogMjQuMCB9LFxuICAgICAgICBcInByb3RlaW5cIjogeyBcInZhbHVlXCI6IDQuMCB9LFxuICAgICAgICBcInNvZGl1bVwiOiB7IFwidmFsdWVcIjogODcuMCB9LFxuICAgICAgICBcImNhbGNpdW1cIjogeyBcInZhbHVlXCI6IDE0LjAgfSxcbiAgICAgICAgXCJpcm9uXCI6IHsgXCJ2YWx1ZVwiOiAxLjAgfVxuICAgICAgfSwge1xuICAgICAgICBcIm5hbWVcIjogXCJJY2UgY3JlYW0gc2FuZHdpY2hcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiSWNlIGNyZWFtXCIsXG4gICAgICAgIFwiY2Fsb3JpZXNcIjogeyBcInZhbHVlXCI6IDIzNy4wIH0sXG4gICAgICAgIFwiZmF0XCI6IHsgXCJ2YWx1ZVwiOiA5LjAgfSxcbiAgICAgICAgXCJjYXJic1wiOiB7IFwidmFsdWVcIjogMzcuMCB9LFxuICAgICAgICBcInByb3RlaW5cIjogeyBcInZhbHVlXCI6IDQuMyB9LFxuICAgICAgICBcInNvZGl1bVwiOiB7IFwidmFsdWVcIjogMTI5LjAgfSxcbiAgICAgICAgXCJjYWxjaXVtXCI6IHsgXCJ2YWx1ZVwiOiA4LjAgfSxcbiAgICAgICAgXCJpcm9uXCI6IHsgXCJ2YWx1ZVwiOiAxLjAgfVxuICAgICAgfSwge1xuICAgICAgICBcIm5hbWVcIjogXCJFY2xhaXJcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiUGFzdHJ5XCIsXG4gICAgICAgIFwiY2Fsb3JpZXNcIjogeyBcInZhbHVlXCI6ICAyNjIuMCB9LFxuICAgICAgICBcImZhdFwiOiB7IFwidmFsdWVcIjogMTYuMCB9LFxuICAgICAgICBcImNhcmJzXCI6IHsgXCJ2YWx1ZVwiOiAyNC4wIH0sXG4gICAgICAgIFwicHJvdGVpblwiOiB7IFwidmFsdWVcIjogIDYuMCB9LFxuICAgICAgICBcInNvZGl1bVwiOiB7IFwidmFsdWVcIjogMzM3LjAgfSxcbiAgICAgICAgXCJjYWxjaXVtXCI6IHsgXCJ2YWx1ZVwiOiAgNi4wIH0sXG4gICAgICAgIFwiaXJvblwiOiB7IFwidmFsdWVcIjogNy4wIH1cbiAgICAgIH0sIHtcbiAgICAgICAgXCJuYW1lXCI6IFwiQ3VwY2FrZVwiLFxuICAgICAgICBcInR5cGVcIjogXCJQYXN0cnlcIixcbiAgICAgICAgXCJjYWxvcmllc1wiOiB7IFwidmFsdWVcIjogIDMwNS4wIH0sXG4gICAgICAgIFwiZmF0XCI6IHsgXCJ2YWx1ZVwiOiAzLjcgfSxcbiAgICAgICAgXCJjYXJic1wiOiB7IFwidmFsdWVcIjogNjcuMCB9LFxuICAgICAgICBcInByb3RlaW5cIjogeyBcInZhbHVlXCI6IDQuMyB9LFxuICAgICAgICBcInNvZGl1bVwiOiB7IFwidmFsdWVcIjogNDEzLjAgfSxcbiAgICAgICAgXCJjYWxjaXVtXCI6IHsgXCJ2YWx1ZVwiOiAzLjAgfSxcbiAgICAgICAgXCJpcm9uXCI6IHsgXCJ2YWx1ZVwiOiA4LjAgfVxuICAgICAgfSwge1xuICAgICAgICBcIm5hbWVcIjogXCJKZWxseSBiZWFuXCIsXG4gICAgICAgIFwidHlwZVwiOiBcIkNhbmR5XCIsXG4gICAgICAgIFwiY2Fsb3JpZXNcIjogeyBcInZhbHVlXCI6ICAzNzUuMCB9LFxuICAgICAgICBcImZhdFwiOiB7IFwidmFsdWVcIjogMC4wIH0sXG4gICAgICAgIFwiY2FyYnNcIjogeyBcInZhbHVlXCI6IDk0LjAgfSxcbiAgICAgICAgXCJwcm90ZWluXCI6IHsgXCJ2YWx1ZVwiOiAwLjAgfSxcbiAgICAgICAgXCJzb2RpdW1cIjogeyBcInZhbHVlXCI6IDUwLjAgfSxcbiAgICAgICAgXCJjYWxjaXVtXCI6IHsgXCJ2YWx1ZVwiOiAwLjAgfSxcbiAgICAgICAgXCJpcm9uXCI6IHsgXCJ2YWx1ZVwiOiAwLjAgfVxuICAgICAgfSwge1xuICAgICAgICBcIm5hbWVcIjogXCJMb2xsaXBvcFwiLFxuICAgICAgICBcInR5cGVcIjogXCJDYW5keVwiLFxuICAgICAgICBcImNhbG9yaWVzXCI6IHsgXCJ2YWx1ZVwiOiAzOTIuMCB9LFxuICAgICAgICBcImZhdFwiOiB7IFwidmFsdWVcIjogMC4yIH0sXG4gICAgICAgIFwiY2FyYnNcIjogeyBcInZhbHVlXCI6IDk4LjAgfSxcbiAgICAgICAgXCJwcm90ZWluXCI6IHsgXCJ2YWx1ZVwiOiAwLjAgfSxcbiAgICAgICAgXCJzb2RpdW1cIjogeyBcInZhbHVlXCI6IDM4LjAgfSxcbiAgICAgICAgXCJjYWxjaXVtXCI6IHsgXCJ2YWx1ZVwiOiAwLjAgfSxcbiAgICAgICAgXCJpcm9uXCI6IHsgXCJ2YWx1ZVwiOiAyLjAgfVxuICAgICAgfSwge1xuICAgICAgICBcIm5hbWVcIjogXCJIb25leWNvbWJcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiT3RoZXJcIixcbiAgICAgICAgXCJjYWxvcmllc1wiOiB7IFwidmFsdWVcIjogNDA4LjAgfSxcbiAgICAgICAgXCJmYXRcIjogeyBcInZhbHVlXCI6IDMuMiB9LFxuICAgICAgICBcImNhcmJzXCI6IHsgXCJ2YWx1ZVwiOiA4Ny4wIH0sXG4gICAgICAgIFwicHJvdGVpblwiOiB7IFwidmFsdWVcIjogNi41IH0sXG4gICAgICAgIFwic29kaXVtXCI6IHsgXCJ2YWx1ZVwiOiA1NjIuMCB9LFxuICAgICAgICBcImNhbGNpdW1cIjogeyBcInZhbHVlXCI6IDAuMCB9LFxuICAgICAgICBcImlyb25cIjogeyBcInZhbHVlXCI6IDQ1LjAgfVxuICAgICAgfSwge1xuICAgICAgICBcIm5hbWVcIjogXCJEb251dFwiLFxuICAgICAgICBcInR5cGVcIjogXCJQYXN0cnlcIixcbiAgICAgICAgXCJjYWxvcmllc1wiOiB7IFwidmFsdWVcIjogNDUyLjAgfSxcbiAgICAgICAgXCJmYXRcIjogeyBcInZhbHVlXCI6IDI1LjAgfSxcbiAgICAgICAgXCJjYXJic1wiOiB7IFwidmFsdWVcIjogNTEuMCB9LFxuICAgICAgICBcInByb3RlaW5cIjogeyBcInZhbHVlXCI6IDQuOSB9LFxuICAgICAgICBcInNvZGl1bVwiOiB7IFwidmFsdWVcIjogMzI2LjAgfSxcbiAgICAgICAgXCJjYWxjaXVtXCI6IHsgXCJ2YWx1ZVwiOiAyLjAgfSxcbiAgICAgICAgXCJpcm9uXCI6IHsgXCJ2YWx1ZVwiOiAyMi4wIH1cbiAgICAgIH0sIHtcbiAgICAgICAgXCJuYW1lXCI6IFwiS2l0S2F0XCIsXG4gICAgICAgIFwidHlwZVwiOiBcIkNhbmR5XCIsXG4gICAgICAgIFwiY2Fsb3JpZXNcIjogeyBcInZhbHVlXCI6IDUxOC4wIH0sXG4gICAgICAgIFwiZmF0XCI6IHsgXCJ2YWx1ZVwiOiAyNi4wIH0sXG4gICAgICAgIFwiY2FyYnNcIjogeyBcInZhbHVlXCI6IDY1LjAgfSxcbiAgICAgICAgXCJwcm90ZWluXCI6IHsgXCJ2YWx1ZVwiOiA3LjAgfSxcbiAgICAgICAgXCJzb2RpdW1cIjogeyBcInZhbHVlXCI6IDU0LjAgfSxcbiAgICAgICAgXCJjYWxjaXVtXCI6IHsgXCJ2YWx1ZVwiOiAxMi4wIH0sXG4gICAgICAgIFwiaXJvblwiOiB7IFwidmFsdWVcIjogNi4wIH1cbiAgICAgIH1cbiAgICBdXG4gIH07XG4gIFxuICAkc2NvcGUuZWRpdENvbW1lbnQgPSBmdW5jdGlvbiAoZXZlbnQsIGRlc3NlcnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gaW4gY2FzZSBhdXRvc2VsZWN0IGlzIGVuYWJsZWRcbiAgICBcbiAgICB2YXIgZWRpdERpYWxvZyA9IHtcbiAgICAgIG1vZGVsVmFsdWU6IGRlc3NlcnQuY29tbWVudCxcbiAgICAgIHBsYWNlaG9sZGVyOiAnQWRkIGEgY29tbWVudCcsXG4gICAgICBzYXZlOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgaWYoaW5wdXQuJG1vZGVsVmFsdWUgPT09ICdEb25hbGQgVHJ1bXAnKSB7XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlucHV0LiRtb2RlbFZhbHVlID09PSAnQmVybmllIFNhbmRlcnMnKSB7XG4gICAgICAgICAgcmV0dXJuIGRlc3NlcnQuY29tbWVudCA9ICdGRUVMIFRIRSBCRVJOISdcbiAgICAgICAgfVxuICAgICAgICBkZXNzZXJ0LmNvbW1lbnQgPSBpbnB1dC4kbW9kZWxWYWx1ZTtcbiAgICAgIH0sXG4gICAgICB0YXJnZXRFdmVudDogZXZlbnQsXG4gICAgICB0aXRsZTogJ0FkZCBhIGNvbW1lbnQnLFxuICAgICAgdmFsaWRhdG9yczoge1xuICAgICAgICAnbWQtbWF4bGVuZ3RoJzogMzBcbiAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHZhciBwcm9taXNlO1xuICAgIFxuICAgIGlmKCRzY29wZS5vcHRpb25zLmxhcmdlRWRpdERpYWxvZykge1xuICAgICAgcHJvbWlzZSA9ICRtZEVkaXREaWFsb2cubGFyZ2UoZWRpdERpYWxvZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UgPSAkbWRFZGl0RGlhbG9nLnNtYWxsKGVkaXREaWFsb2cpO1xuICAgIH1cbiAgICBcbiAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGN0cmwpIHtcbiAgICAgIHZhciBpbnB1dCA9IGN0cmwuZ2V0SW5wdXQoKTtcbiAgICAgIFxuICAgICAgaW5wdXQuJHZpZXdDaGFuZ2VMaXN0ZW5lcnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlucHV0LiRzZXRWYWxpZGl0eSgndGVzdCcsIGlucHV0LiRtb2RlbFZhbHVlICE9PSAndGVzdCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIFxuICAkc2NvcGUuZ2V0VHlwZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFsnQ2FuZHknLCAnSWNlIGNyZWFtJywgJ090aGVyJywgJ1Bhc3RyeSddO1xuICB9O1xuICBcbiAgJHNjb3BlLmxvYWRTdHVmZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAkc2NvcGUucHJvbWlzZSA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGxvYWRpbmdcbiAgICB9LCAyMDAwKTtcbiAgfVxuICBcbiAgJHNjb3BlLmxvZ0l0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIGNvbnNvbGUubG9nKGl0ZW0ubmFtZSwgJ3dhcyBzZWxlY3RlZCcpO1xuICB9O1xuICBcbiAgJHNjb3BlLmxvZ09yZGVyID0gZnVuY3Rpb24gKG9yZGVyKSB7XG4gICAgY29uc29sZS5sb2coJ29yZGVyOiAnLCBvcmRlcik7XG4gIH07XG4gIFxuICAkc2NvcGUubG9nUGFnaW5hdGlvbiA9IGZ1bmN0aW9uIChwYWdlLCBsaW1pdCkge1xuICAgIGNvbnNvbGUubG9nKCdwYWdlOiAnLCBwYWdlKTtcbiAgICBjb25zb2xlLmxvZygnbGltaXQ6ICcsIGxpbWl0KTtcbiAgfVxufV0pO1xuXG4vLyBhcHAuY29udHJvbGxlcignQWRtaW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbi8vICAgICAkc2NvcGUucXVlcnkgPSB7XG4vLyAgICAgICAgIG9yZGVyOiAnbmFtZScsXG4vLyAgICAgICAgIGxpbWl0OiA1LFxuLy8gICAgICAgICBwYWdlOiAxXG4vLyAgICAgfTtcbi8vICAgICAkc2NvcGUuZGVzc2VydHMgPSB7fVxuLy8gICAgICRzY29wZS5kZXNzZXJ0cy5kYXRhID0gW3tcbi8vICAgICAgICAgbmFtZTogXCJobW1cIixcbi8vICAgICAgICAgY2Fsb3JpZXM6IDgwLFxuLy8gICAgICAgICBmYXQ6IDEwMDAsXG4vLyAgICAgICAgIGNhcmJzOiAxOTksXG4vLyAgICAgICAgIHByb3RlaW46IDIsXG4vLyAgICAgICAgIHNvZGl1bTogMjAwLFxuLy8gICAgICAgICBjYWxjaXVtOiAyLFxuLy8gICAgICAgICBpcm9uOiAzXG4vLyAgICAgfSwge1xuLy8gICAgICAgICBuYW1lOiBcImhtbVwiLFxuLy8gICAgICAgICBjYWxvcmllczogMTAsXG4vLyAgICAgICAgIGZhdDogMTAwMCxcbi8vICAgICAgICAgY2FyYnM6IDE5OSxcbi8vICAgICAgICAgcHJvdGVpbjogMixcbi8vICAgICAgICAgc29kaXVtOiAyMDAsXG4vLyAgICAgICAgIGNhbGNpdW06IDIsXG4vLyAgICAgICAgIGlyb246IDNcbi8vICAgICB9LCB7XG4vLyAgICAgICAgIG5hbWU6IFwiaG1tXCIsXG4vLyAgICAgICAgIGNhbG9yaWVzOiAyMCxcbi8vICAgICAgICAgZmF0OiAxMDAwLFxuLy8gICAgICAgICBjYXJiczogMTk5LFxuLy8gICAgICAgICBwcm90ZWluOiAyLFxuLy8gICAgICAgICBzb2RpdW06IDIwMCxcbi8vICAgICAgICAgY2FsY2l1bTogMixcbi8vICAgICAgICAgaXJvbjogM1xuLy8gICAgIH0sIHtcbi8vICAgICAgICAgbmFtZTogXCJobW1cIixcbi8vICAgICAgICAgY2Fsb3JpZXM6IDgzMCxcbi8vICAgICAgICAgZmF0OiAxMDAwLFxuLy8gICAgICAgICBjYXJiczogMTk5LFxuLy8gICAgICAgICBwcm90ZWluOiAyLFxuLy8gICAgICAgICBzb2RpdW06IDIwMCxcbi8vICAgICAgICAgY2FsY2l1bTogMixcbi8vICAgICAgICAgaXJvbjogM1xuLy8gICAgIH0sIHtcbi8vICAgICAgICAgbmFtZTogXCJobW1cIixcbi8vICAgICAgICAgY2Fsb3JpZXM6IDEyODAsXG4vLyAgICAgICAgIGZhdDogMTAwMCxcbi8vICAgICAgICAgY2FyYnM6IDE5OSxcbi8vICAgICAgICAgcHJvdGVpbjogMixcbi8vICAgICAgICAgc29kaXVtOiAyMDAsXG4vLyAgICAgICAgIGNhbGNpdW06IDIsXG4vLyAgICAgICAgIGlyb246IDNcbi8vICAgICB9LCB7XG4vLyAgICAgICAgIG5hbWU6IFwiaG1tXCIsXG4vLyAgICAgICAgIGNhbG9yaWVzOiA4MTIwLFxuLy8gICAgICAgICBmYXQ6IDEwMDAsXG4vLyAgICAgICAgIGNhcmJzOiAxOTksXG4vLyAgICAgICAgIHByb3RlaW46IDIsXG4vLyAgICAgICAgIHNvZGl1bTogMjAwLFxuLy8gICAgICAgICBjYWxjaXVtOiAyLFxuLy8gICAgICAgICBpcm9uOiAzXG4vLyAgICAgfV1cblxuLy8gICAgICRzY29wZS5zdGF0dXNlcyA9IFtcInBlbmRpbmdcIiwgXCJzaGlwcGVkXCIsIFwiY29tcGxldGVcIl1cblxuLy8gICAgICRzY29wZS5vcmRlcnMgPSBbe1xuLy8gICAgICAgICBfaWQ6IFwiMTIzXCIsXG4vLyAgICAgICAgIHRvdGFsOiAxMDAsXG4vLyAgICAgICAgIHN0YXR1czogXCJzaGlwcGVkXCJcbi8vICAgICB9LCB7XG4vLyAgICAgICAgIF9pZDogXCIxMjNcIixcbi8vICAgICAgICAgdG90YWw6IDEwMCxcbi8vICAgICAgICAgc3RhdHVzOiBcInNoaXBwZWRcIlxuLy8gICAgIH0sIHtcbi8vICAgICAgICAgX2lkOiBcIjEyM1wiLFxuLy8gICAgICAgICB0b3RhbDogMTAwLFxuLy8gICAgICAgICBzdGF0dXM6IFwic2hpcHBlZFwiXG4vLyAgICAgfSwge1xuLy8gICAgICAgICBfaWQ6IFwiMTIzXCIsXG4vLyAgICAgICAgIHRvdGFsOiAxMDAsXG4vLyAgICAgICAgIHN0YXR1czogXCJzaGlwcGVkXCJcbi8vICAgICB9XVxuXG4vLyB9KTtcbiIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2J1aWxkYm94Jywge1xuICAgICAgICB1cmw6ICcvYnVpbGRib3gnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2J1aWxkYm94L2J1aWxkYm94Lmh0bWwnXG4gICAgfSk7XG59KTtcblxuXG5hcHAuY29udHJvbGxlcignQnVpbGRCb3hDdHJsJywgQnVpbGRCb3hDdHJsKTtcbiAgZnVuY3Rpb24gQnVpbGRCb3hDdHJsICggJHNjb3BlICkge1xuICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgc2VsZWN0ZWRJbmRleDogMCxcbiAgICAgIHNlY29uZExvY2tlZDogIHRydWUsXG4gICAgICBzZWNvbmRMYWJlbDogICBcIkl0ZW0gVHdvXCIsXG4gICAgICBib3R0b206ICAgICAgICBmYWxzZVxuICAgIH07XG4gICAgJHNjb3BlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkSW5kZXggPSBNYXRoLm1pbigkc2NvcGUuZGF0YS5zZWxlY3RlZEluZGV4ICsgMSwgMik7XG4gICAgfTtcbiAgICAkc2NvcGUucHJldmlvdXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5kYXRhLnNlbGVjdGVkSW5kZXggPSBNYXRoLm1heCgkc2NvcGUuZGF0YS5zZWxlY3RlZEluZGV4IC0gMSwgMCk7XG4gICAgfTtcbn0iLCJhcHAuZGlyZWN0aXZlKCdjYXJ0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY2FydC9jYXJ0Lmh0bWwnXG4gICAgfTtcbn0pOyIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4gICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgfSk7XG5cbiAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4gICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbiAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbiAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0JyxcbiAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbiAgICB9KTtcblxuICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4gICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbiAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbiAgICAgICAgICAgICckaW5qZWN0b3InLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZShkYXRhLmlkLCBkYXRhLnVzZXIpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YS51c2VyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4gICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2VcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbiAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbiAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4gICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChzZXNzaW9uSWQsIHVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCdcbiAgICB9KTtcbn0pO1xuXG5cbiIsImFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBBdXRoU2VydmljZSwgJHN0YXRlKSB7XG5cbiAgICAkc2NvcGUubG9naW4gPSB7fTtcbiAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXG4gICAgJHNjb3BlLnNlbmRMb2dpbiA9IGZ1bmN0aW9uIChsb2dpbkluZm8pIHtcblxuICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXG4gICAgICAgIEF1dGhTZXJ2aWNlLmxvZ2luKGxvZ2luSW5mbykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJztcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG59KTsiLCJhcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21lbWJlcnNPbmx5Jywge1xuICAgICAgICB1cmw6ICcvbWVtYmVycy1hcmVhJyxcbiAgICAgICAgdGVtcGxhdGU6ICc8aW1nIG5nLXJlcGVhdD1cIml0ZW0gaW4gc3Rhc2hcIiB3aWR0aD1cIjMwMFwiIG5nLXNyYz1cInt7IGl0ZW0gfX1cIiAvPicsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsIFNlY3JldFN0YXNoKSB7XG4gICAgICAgICAgICBTZWNyZXRTdGFzaC5nZXRTdGFzaCgpLnRoZW4oZnVuY3Rpb24gKHN0YXNoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0YXNoID0gc3Rhc2g7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBkYXRhLmF1dGhlbnRpY2F0ZSBpcyByZWFkIGJ5IGFuIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIC8vIHRoYXQgY29udHJvbHMgYWNjZXNzIHRvIHRoaXMgc3RhdGUuIFJlZmVyIHRvIGFwcC5qcy5cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYXV0aGVudGljYXRlOiB0cnVlXG4gICAgICAgIH1cbiAgICB9KTtcblxufSk7XG5cbmFwcC5mYWN0b3J5KCdTZWNyZXRTdGFzaCcsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4gICAgdmFyIGdldFN0YXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL21lbWJlcnMvc2VjcmV0LXN0YXNoJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0U3Rhc2g6IGdldFN0YXNoXG4gICAgfTtcblxufSk7IiwiYXBwLmZhY3RvcnkoJ0Z1bGxzdGFja1BpY3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CN2dCWHVsQ0FBQVhRY0UuanBnOmxhcmdlJyxcbiAgICAgICAgJ2h0dHBzOi8vZmJjZG4tc3Bob3Rvcy1jLWEuYWthbWFpaGQubmV0L2hwaG90b3MtYWsteGFwMS90MzEuMC04LzEwODYyNDUxXzEwMjA1NjIyOTkwMzU5MjQxXzgwMjcxNjg4NDMzMTI4NDExMzdfby5qcGcnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0ItTEtVc2hJZ0FFeTlTSy5qcGcnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I3OS1YN29DTUFBa3c3eS5qcGcnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0ItVWo5Q09JSUFJRkFoMC5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I2eUl5RmlDRUFBcWwxMi5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NFLVQ3NWxXQUFBbXFxSi5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NFdlpBZy1WQUFBazkzMi5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NFZ05NZU9YSUFJZkRoSy5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NFUXlJRE5XZ0FBdTYwQi5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NDRjNUNVFXOEFFMmxHSi5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NBZVZ3NVNXb0FBQUxzai5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NBYUpJUDdVa0FBbElHcy5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NBUU93OWxXRUFBWTlGbC5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0ItT1FiVnJDTUFBTndJTS5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I5Yl9lcndDWUFBd1JjSi5wbmc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I1UFRkdm5DY0FFQWw0eC5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I0cXdDMGlDWUFBbFBHaC5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0IyYjMzdlJJVUFBOW8xRC5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0J3cEl3cjFJVUFBdk8yXy5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0JzU3NlQU5DWUFFT2hMdy5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NKNHZMZnVVd0FBZGE0TC5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NJN3d6akVWRUFBT1BwUy5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NJZEh2VDJVc0FBbm5IVi5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NHQ2lQX1lXWUFBbzc1Vi5qcGc6bGFyZ2UnLFxuICAgICAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0NJUzRKUElXSUFJMzdxdS5qcGc6bGFyZ2UnXG4gICAgXTtcbn0pO1xuIiwiYXBwLmZhY3RvcnkoJ1JhbmRvbUdyZWV0aW5ncycsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBnZXRSYW5kb21Gcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuICAgIH07XG5cbiAgICB2YXIgZ3JlZXRpbmdzID0gW1xuICAgICAgICAnSGVsbG8sIHdvcmxkIScsXG4gICAgICAgICdBdCBsb25nIGxhc3QsIEkgbGl2ZSEnLFxuICAgICAgICAnSGVsbG8sIHNpbXBsZSBodW1hbi4nLFxuICAgICAgICAnV2hhdCBhIGJlYXV0aWZ1bCBkYXkhJyxcbiAgICAgICAgJ0lcXCdtIGxpa2UgYW55IG90aGVyIHByb2plY3QsIGV4Y2VwdCB0aGF0IEkgYW0geW91cnMuIDopJyxcbiAgICAgICAgJ1RoaXMgZW1wdHkgc3RyaW5nIGlzIGZvciBMaW5kc2F5IExldmluZS4nLFxuICAgICAgICAn44GT44KT44Gr44Gh44Gv44CB44Om44O844K244O85qeY44CCJyxcbiAgICAgICAgJ1dlbGNvbWUuIFRvLiBXRUJTSVRFLicsXG4gICAgICAgICc6RCcsXG4gICAgICAgICdZZXMsIEkgdGhpbmsgd2VcXCd2ZSBtZXQgYmVmb3JlLicsXG4gICAgICAgICdHaW1tZSAzIG1pbnMuLi4gSSBqdXN0IGdyYWJiZWQgdGhpcyByZWFsbHkgZG9wZSBmcml0dGF0YScsXG4gICAgICAgICdJZiBDb29wZXIgY291bGQgb2ZmZXIgb25seSBvbmUgcGllY2Ugb2YgYWR2aWNlLCBpdCB3b3VsZCBiZSB0byBuZXZTUVVJUlJFTCEnLFxuICAgIF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBncmVldGluZ3M6IGdyZWV0aW5ncyxcbiAgICAgICAgZ2V0UmFuZG9tR3JlZXRpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSYW5kb21Gcm9tQXJyYXkoZ3JlZXRpbmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pO1xuIiwiYXBwLmRpcmVjdGl2ZSgnZnVsbHN0YWNrTG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL2Z1bGxzdGFjay1sb2dvL2Z1bGxzdGFjay1sb2dvLmh0bWwnXG4gICAgfTtcbn0pOyIsImFwcC5kaXJlY3RpdmUoJ25hdmJhcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsIEF1dGhTZXJ2aWNlLCBBVVRIX0VWRU5UUywgJHN0YXRlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywkbWREaWFsb2csJG1kTWVkaWEpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9uYXZiYXIvbmF2YmFyLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xuXG4gICAgICAgICAgICBzY29wZS50b2dnbGVSaWdodCA9IGJ1aWxkVG9nZ2xlcigncmlnaHQnKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkbWRTaWRlbmF2KG5hdklEKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvZ2dsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbG9nLmRlYnVnKFwidG9nZ2xlIFwiICsgbmF2SUQgKyBcIiBpcyBkb25lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBEaWFsb2dDb250cm9sbGVyKHNjb3BlLCAkbWREaWFsb2cpIHtcbiAgICAgICAgICAgICAgICAgIHNjb3BlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJG1kRGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIHNjb3BlLmFuc3dlciA9IGZ1bmN0aW9uKGFuc3dlcikge1xuICAgICAgICAgICAgICAgICAgICAkbWREaWFsb2cuaGlkZShhbnN3ZXIpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NvcGUuc2hvd0FkdmFuY2VkID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlRnVsbFNjcmVlbiA9ICgkbWRNZWRpYSgnc20nKSB8fCAkbWRNZWRpYSgneHMnKSkgJiYgJHNjb3BlLmN1c3RvbUZ1bGxzY3JlZW47XG4gICAgICAgICAgICAgICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogRGlhbG9nQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiB1c2VGdWxsU2NyZWVuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5pdGVtcyA9IFtcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnSG9tZScsIHN0YXRlOiAnaG9tZScgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnQWJvdXQnLCBzdGF0ZTogJ2Fib3V0JyB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdEb2N1bWVudGF0aW9uJywgc3RhdGU6ICdkb2NzJyB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdNZW1iZXJzIE9ubHknLCBzdGF0ZTogJ21lbWJlcnNPbmx5JywgYXV0aDogdHJ1ZSB9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBzY29wZS51c2VyID0gbnVsbDtcblxuICAgICAgICAgICAgc2NvcGUuaXNMb2dnZWRJbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBdXRoU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEF1dGhTZXJ2aWNlLmxvZ291dCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHNldFVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBBdXRoU2VydmljZS5nZXRMb2dnZWRJblVzZXIoKS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcmVtb3ZlVXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnVzZXIgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2V0VXNlcigpO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MsIHNldFVzZXIpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubG9nb3V0U3VjY2VzcywgcmVtb3ZlVXNlcik7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgcmVtb3ZlVXNlcik7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSk7XG4iLCJhcHAuZGlyZWN0aXZlKCdyYW5kb0dyZWV0aW5nJywgZnVuY3Rpb24gKFJhbmRvbUdyZWV0aW5ncykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9yYW5kby1ncmVldGluZy9yYW5kby1ncmVldGluZy5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS5ncmVldGluZyA9IFJhbmRvbUdyZWV0aW5ncy5nZXRSYW5kb21HcmVldGluZygpO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
