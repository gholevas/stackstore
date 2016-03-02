app.config(function($stateProvider) {
    $stateProvider.state('buildbox', {
        url: '/buildbox',
        templateUrl: 'js/buildbox/buildbox.html',
        controller: 'BuildBoxCtrl',
        resolve: {
            questions: function(QuestionFactory) {
                return QuestionFactory.fetchem();
            }
        }
    });
});


app.controller('BuildBoxCtrl', function($scope,questions) {
    $scope.questions = questions;
    $scope.data = {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two",
        bottom: false
    };
    $scope.next = function() {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };
    $scope.previous = function() {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

});



app.factory('QuestionFactory', function($http) {
    return {
        fetchem: function() {
            return $http.get('/api/questions')
                .then(function(res) {
                    return res.data;
                })
        }
    };
});


