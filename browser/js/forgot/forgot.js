app.config(function($stateProvider) {

    $stateProvider.state('forgot', {
        url: '/forgot',
        controller: 'ForgotController',
        templateUrl: 'js/forgot/forgot.html'
    }).state('reset', {
        url: '/reset/:token',
        controller: 'ResetController',
        templateUrl: 'js/forgot/reset.html',
        resolve: {
            user: function (AuthService,$stateParams) {
                return AuthService.getTokenUser($stateParams.token)
            } 
        }
    })

});

app.controller('ForgotController', function($scope,AuthService){
    
    $scope.resetPassword = function (email) {
        AuthService.resetPassword(email)
        .then(function (data) {
            $scope.reset = true;
        })
    }

})

app.controller('ResetController', function($state,$scope,AuthService,user){
    
    $scope.user = user;
    $scope.user.password = ""

    $scope.updatePassword = function () {
        console.log($scope.user)
        AuthService.updateTokenUser($scope.user)
        .then(function () {
            $state.go("home")
        })
    }

})