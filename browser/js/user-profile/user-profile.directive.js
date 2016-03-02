app.directive('userProfile', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/user-profile/user-profile.directive.html',
        
        controller: function($scope, $mdDialog){
        	$scope.showTabDialog = function(ev) {

			    $mdDialog.show({
			      controller: function DialogController($scope, $mdDialog, AuthService) {
			      	AuthService.getLoggedInUser()
			      	.then(function(user){
			      		$scope.user = user;
			      	});
						  $scope.hide = function() {
						    $mdDialog.hide();
						  };
						  $scope.cancel = function() {
						    $mdDialog.cancel();
						  };
						  $scope.answer = function(answer) {
						    $mdDialog.hide(answer);
						  };
						  $scope.save = function(user){
						  	AuthService.saveUser(user);
						  };
						},

			      templateUrl: 'tabDialog.tmpl.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true
			    });
        };
    }
  };
});