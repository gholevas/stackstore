app.controller('SignupCtrl', function ($scope, AuthService, $state,$mdDialog) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {

        console.log(signupInfo)

        AuthService.signup(signupInfo).then(function () {
            $mdDialog.cancel();
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});