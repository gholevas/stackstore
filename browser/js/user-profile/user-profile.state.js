app.config(function($stateProvider){

	$stateProvider.state('profile', {
    url: '/profile',
    onEnter: function($state, AuthService) {
        if (!AuthService.isAuthenticated()) $state.go("home");
    },
    templateUrl: 'js/user-profile/user-profile.html',
    resolve: {
        user: function(AuthService) {
            return AuthService.getLoggedInUser();
        },
        allMyOrders: function(AuthService, OrdersFactory) {
                return OrdersFactory.getAllMyOrders()
                    .catch(console.log.bind(console))
        },
        orderDetails: function(){return null},
        confNum: function(){return null}
    },

    controller: function($scope, user,$state, allMyOrders, orderDetails, OrdersFactory, confNum, AuthService){

    	$scope.user = user;
    	$scope.orders = user.orders;
        /* TMK: This seems like something you could store in app.constant. You use it in multiple places! */
        $scope.states = "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming".split(",");
        $scope.saved = false;

			$scope.save = function() {
		    AuthService.saveUser($scope.user);
		    $scope.saved = true;
	    };

        if(allMyOrders) allMyOrders = allMyOrders.map(function(order) {
            order.numItems = order.contents.reduce(function(prev, next) {
                return prev + next.quantity;
            }, 0);
            return order;
        });
        $scope.allMyOrders = allMyOrders;
        $scope.orderDetails = orderDetails;
        $scope.confNum = confNum;

        $scope.isAuthenticated = AuthService.isAuthenticated;

        $scope.goHome = function(){
            $state.go("home");
        }

        $scope.selectRow = function(order){
            $scope.orderDetails = order;
        }

		}
	});

});
