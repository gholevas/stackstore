app.directive('userProfile', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/user-profile/user-profile.directive.html',
        controller: function($scope, $mdDialog) {
            $scope.showTabDialog = function(ev) {

                $mdDialog.show({
                    controller: function DialogController(AuthService) {
                        AuthService.getLoggedInUser()
                            .then(function(user) {
                                $scope.user = user;
                                $scope.orders = user.orders;
                                $scope.states = "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming".split(",");
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
                        $scope.save = function(user) {
                            AuthService.saveUser(user)
                            $scope.cancel();
                        };
                    },

                    templateUrl: 'tabDialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            };
        }
    };
});
