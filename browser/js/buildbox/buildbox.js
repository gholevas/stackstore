app.config(function ($stateProvider) {
    $stateProvider.state('buildbox', {
        url: '/buildbox',
        templateUrl: 'js/buildbox/buildbox.html'
    });
});


app.controller('BuildBoxCtrl', BuildBoxCtrl);
  function BuildBoxCtrl ( $scope ) {
    $scope.data = {
      selectedIndex: 0,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
}