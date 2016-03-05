app.controller('AddQuestionCtrl', function($scope, $mdDialog, StoreEditFactory){
	$scope.answers = [];
	$scope.question = {};
	$scope.answerText = "";
	$scope.answerTag = "";
	$scope.questionText = "";

	$scope.addAnswer = function(){
		var str = $scope.answerText;
		var tag = $scope.answerTag;
		var found = false;

		for(var i = 0; i < $scope.answers.length; i++) {
		    if ($scope.answers[i].text == str) {
		        found = true;
		        break;
		    }
		}

		if(!found && str.length && tag.length){
			var answer = {text: str, tag: tag};
			$scope.answers.push(answer);
		}
		$scope.answerText = "";
		$scope.answerTag = "";
	};

	$scope.saveQuestion = function(){
		var question = $scope.question;
		question.text = $scope.questionText;
		question.answers = $scope.answers;
		StoreEditFactory.addQuestion(question);
	};

	$scope.cancel = function() {
    $mdDialog.cancel();
  };
});