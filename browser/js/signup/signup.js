app.controller('SignupCtrl', function ($scope, AuthService, $state,$mdDialog) {

    $scope.signup = {};
    $scope.error = null;
    $scope.cancel = function(){
        $mdDialog.cancel();
    }

    $scope.sendSignup = function (signupInfo) {
        AuthService.signup(signupInfo).then(function () {
            $mdDialog.cancel();
            $state.go('home');
        }).catch(function () {
            $scope.error = 'An account with that email already exists.';
        });
    };

});