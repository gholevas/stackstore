app.config(function($stateProvider) {

    $stateProvider.state('forgot', {
        url: '/forgot',
        controller: 'ForgotController',
        templateUrl: 'js/forgot/forgot.html'
    })

    $stateProvider.state('reset', {
        url: '/reset',
        controller: 'ResetController',
        templateUrl: 'js/forgot/reset.html',
        resolve: {
            user: function (AuthService) {
                 return AuthService.getTokenUser()
            } 
        }
    })

});

app.controller('ForgotController', function($scope,AuthService){
    
    $scope.resetPassword = function () {
        AuthService.resetPassword($scope.email)
        .then(function (data) {
            $scope.reset = true;
        })
    }

})

app.controller('ResetController', function($scope,AuthService){
    
    $scope.updatePassword = function () {
        AuthService.saveUser($scope.user)
        .then(function () {
            $state.go('home');      
        })
    }

})