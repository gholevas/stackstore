app.directive('questionItem', function(){
	return {
		restrict:'E',
		templateUrl:'js/store/question.directive.html',
		scope:{
			question:'@'
		},
		controller:function($scope,StoreEditFactory){
			console.log($scope.question);
			$scope.removeQuestion = function(){};
		}
	};
});