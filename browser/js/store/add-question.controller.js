app.controller('AddQuestionCtrl', function($timeout, $rootScope, $scope, $mdDialog, StoreEditFactory){
	$scope.answers = [];
	$scope.question = {};
	$scope.answerText = "";
	$scope.answerTags = "";
	$scope.questionText = "";

	$scope.addAnswer = function(){
		var str = $scope.answerText;
		var tags = $scope.answerTags;
		var found = false;

		for(var i = 0; i < $scope.answers.length; i++) {
		    if ($scope.answers[i].text == str) {
		        found = true;
		        break;
		    }
		}

		if(!found && str.length && tags.length){
			var answer = {text: str, tags: tags.split(" ")};
			$scope.answers.push(answer);
		}
		$scope.answerText = "";
		$scope.answerTags = "";
	};

	$scope.saveQuestion = function(){
    var question = $scope.question;
    question.text = $scope.questionText;
    question.answers = $scope.answers;
    return StoreEditFactory.addQuestion(question)
    .then(function(store){
    	StoreEditFactory.store = store;
    	$rootScope.$broadcast("newQuestion");
    	$scope.cancel();
    });
  };

	$scope.cancel = function() {
    $mdDialog.cancel();
  };
});