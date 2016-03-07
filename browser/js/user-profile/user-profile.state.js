app.config(function($stateProvider){

	$stateProvider.state('profile', {

		
    url: '/profile',
    templateUrl: 'js/user-profile/user-profile.html',
    resolve: {
        user: function(AuthService) {
            return AuthService.getLoggedInUser();
        }
    },

    controller: function($scope, user, AuthService){

    	$scope.user = user;
    	$scope.orders = user.orders;
      $scope.states = "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming".split(",");
      $scope.saved = false;

			$scope.save = function() {
		    AuthService.saveUser($scope.user);
		    $scope.saved = true;
	    };



		}
	});

});