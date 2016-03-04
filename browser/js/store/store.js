app.config(function($stateProvider) {
    $stateProvider.state('store', {
        url: '/store',
        templateUrl: 'js/store/store.html',
        controller: 'StoreCtrl',
        resolve: {
            storeInfo: function(StoreFactory) {
                return StoreFactory.getStoreInfo();
            }
        }
    });
});




app.controller('StoreCtrl', function($scope,storeInfo,StoreFactory,$state) {
    $scope.storeInfo = storeInfo;
    $scope.data = {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two",
        bottom: false
    };

    var answers = {};

    $scope.selectAnswer = function(question,answer){
        answers[question._id] = answer;
        if(question._id === $scope.questions[$scope.questions.length-1]._id){
            submitAnswers()
            $state.go('checkout')
        }
        $scope.next();
    }

    $scope.next = function() {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };


    $scope.previous = function() {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

    var submitAnswers = function(){
        return StoreFactory.sendAnswers(answers)
    }

});



app.factory('StoreFactory', function($http) {
    return {
        getStoreInfo: function() {
            return $http.get('/api/store/56d9afbb296f81fc2b04dc5b')
                .then(function(res) {
                    return res.data;
                })
        },
        getAllStores: function() {
            return $http.get('/api/store/')
                .then(function(res) {
                    return res.data;
                })
        },
        sendAnswers: function(answers) {
            return $http.post('/api/answers',answers)
                .then(function(res){
                    return res.data
                })
        }
    };
});


