Topdoner.controller('ShareReviewCtrl', ['$scope','$location','$rootScope', function ($scope,$location,$rootScope) {
	var enviroment = 'http://localhost:3000/#',
		enviroment_rails = 'http://localhost:3000';
	
	$scope.reviewUrlHelper = function(review){
		return enviroment + $location.path() + '/reviews/' + review.id;
	};

	$scope.reviewTitleHelper = function(review) {
		return review.title + ' (отзыв на topdoner.com)';
	};

	$scope.reviewMediaHelper = function(review) {
		if (review.images.length > 0) {
			return enviroment_rails + review.images[0].url; 
		}
	};	
}]);
