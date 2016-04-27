app.controller('SignupCtrl', function($scope, AuthService, $state, $mdDialog,StoreUrlFactory) {

    $scope.signup = {};
    $scope.error = null;
    $scope.close = function() {
        $mdDialog.cancel();
    }

    $scope.sendSignup = function(signupInfo) {
        AuthService.signup(signupInfo).then(function(signedUp) {
            $mdDialog.cancel();
            StoreUrlFactory.getStoreUrl(signedUp.store)
            .then(function(url){
                $state.go('storeEdit', { url: url });
            })
        }).catch(function() {
            $scope.error = 'An account with that email already exists.';
        });
    };

});

app.factory('StoreUrlFactory', function($http) {
    return {
        getStoreUrl: function(id) {
            return $http.get('/api/store/id/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})
