app.config(function($stateProvider) {
    $stateProvider.state('store', {
        url: '/store/:url',
        templateUrl: 'js/store/store.html',
        controller: 'StoreCtrl',
        resolve: {
            storeInfo: function(StoreFactory,$stateParams) {
                console.log("store state",$stateParams.url)
                return StoreFactory.getStoreInfo($stateParams.url);
            }
        }
    });
});

app.directive('sibs', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.parent().children().removeClass('md-warn');
                element.addClass('md-warn');
            })
        },
    }
});


app.controller('StoreCtrl', function($scope,storeInfo,StoreFactory,$state,$stateParams) {
    $scope.storeInfo = storeInfo;
    
    $scope.answers = {};

    $scope.selectAnswer = function(question,answer){
        $scope.answers[question._id] = answer;
        $scope.answers[question._id].selected = true;
        // for(var i=0; i<question.answers.length; i++){
        //     if(question.answers[i] !== answer) question.answers.selected = false;
        // }
    }

    $scope.next = function() {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };


    $scope.previous = function() {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

    $scope.submitAnswers = function(){
        var tags = [];
        //TODO ensure all questions answered
        for(var answer in $scope.answers){
            tags = tags.concat($scope.answers[answer].tags);
        }
        console.log(tags)
        StoreFactory.sendAnswers($stateParams.url,tags)
        .then(function(bestProduct){
            $state.go('foundproduct',{productId:bestProduct._id})
        })
    }

});


app.factory('StoreFactory', function($http) {
    return {
        getStoreInfo: function(url) {
            return $http.get('/api/store/'+url)
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
        sendAnswers: function(url,tags) {
            return $http.post('/api/products/store/'+url+'/tags',tags)
                .then(function(res){
                    return res.data
                })
        }
    };
});


