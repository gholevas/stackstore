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
        link: function(scope, element) {
            element.bind('click', function() {
                element.parent().children().removeClass('md-warn');
                element.addClass('md-warn');
            })
        },
    }
});


app.controller('StoreCtrl', function($scope,storeInfo,StoreFactory,$state,$stateParams,AuthService,$timeout) {
    $scope.storeInfo = storeInfo;
    
    $scope.answers = {};

    $scope.selectAnswer = function(question,answer){
        $scope.answers[question._id] = answer;
        $scope.answers[question._id].selected = true;
    }

    $scope.goToStoreEdit = function () {
                $timeout(function() {
                    AuthService.getLoggedInUser()
                    .then(function(user){
                        console.log(user)
                        $state.go('storeEdit',{url:user.store.url});
                    })
                }, 0);
            }

    $scope.next = function() {
        $scope.showWarningMsg(false);
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };

    $scope.previous = function() {
        $scope.showWarningMsg(false);
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

    $scope.submitAnswers = function(){
        //TODO ensure all questions answered
        if(Object.keys($scope.answers).length !== storeInfo.questions.length){
            $scope.showWarningMsg(true);
            return;
        }

        var tags = [];
        for(var answer in $scope.answers){
            tags = tags.concat($scope.answers[answer].tags);
        }

        StoreFactory.sendAnswers($stateParams.url,tags)
        .then(function(bestProduct){
            if(!bestProduct) {
                $state.go('foundproduct',{productId:storeInfo.products[0]._id});
            }else{
                $state.go('foundproduct',{productId:bestProduct._id})
            }
        })
    }

    $scope.showWarningMsg = function(bool){
        $scope.pleaseAnswerAllMsg = bool;
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
        getActiveStores: function() {
            return $http.get('/api/store/active')
                .then(function(res) {
                    return res.data;
                })
        },
        sendAnswers: function(url,tags) {
            return $http.post('/api/products/store/'+url+'/tags',tags)
                .then(function(res){
                    return res.data
                })
        },
        getStoreById: function(id){
            return $http.get('/api/store/id/'+id);
        }
    };
});


