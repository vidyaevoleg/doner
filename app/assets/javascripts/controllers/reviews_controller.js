// только один активынй отзыв
Topdoner.controller('ReviewsCtrl', function ($scope,places, reviews) {
  $scope.reviews = reviews;
  $scope.makeReviewCurrent = function(review){
    $scope.current_review = review;
  }
});

// сколько хочешь
//Topdoner.controller('ReviewsCtrl', function ($scope,places, reviews) {
//	$scope.reviews = reviews;
//	
//	$scope.openedReviews = [];
//	$scope.openReview = function(review){
//		$scope.openedReviews.push(review);
//	}
//});