app.controller('ManageQuestionCtrl', function($scope, $mdDialog, StoreEditFactory){

	$scope.removeQuestion =function(question){
		StoreEditFactory.removeQuestion(question)
		.then(function(){
			setTimeout($scope.$digest,500);
		});
	};
	$scope.cancel = function() {
    $mdDialog.cancel();
  };
});