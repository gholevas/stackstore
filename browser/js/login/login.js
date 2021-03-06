app.controller('LoginCtrl', function ($scope, AuthService, $state,$mdDialog) {

    $scope.login = {};
    $scope.error = null;
    $scope.close = function(){
        $mdDialog.cancel();
    }

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $mdDialog.cancel();
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});