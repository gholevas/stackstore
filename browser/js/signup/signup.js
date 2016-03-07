app.controller('SignupCtrl', function ($scope, AuthService, $state,$mdDialog) {

    $scope.signup = {};
    $scope.error = null;
    $scope.close = function(){
        $mdDialog.cancel();
    }

    $scope.sendSignup = function (signupInfo) {
        AuthService.signup(signupInfo).then(function (signedUp) {
            console.log('look who just signed up',signedUp)
            $mdDialog.cancel();
            $state.go('storeEdit',{url:'store-1'});
        }).catch(function () {
            $scope.error = 'An account with that email already exists.';
        });
    };

});