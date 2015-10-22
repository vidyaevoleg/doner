// только один активынй отзыв
Topdoner.controller('ReviewsCtrl',function ($scope,places,reviews) {
	$scope.reviews = reviews;

	$scope.makeReviewCurrent = function(review){
		$scope.current_review = review;
	}
	$scope.closeReview = function(){
		$scope.current_review = undefined
	}
//	$scope.openedReview = [];
//	$scope.openReview = function(review) {
////		console.log(review.id);
//		var id = review.id;
//		if !(id in $scope.openedReview) {
//			$scope.openedReview.push(review.id);
//		}
//		console.log($scope.openedReview);
//	}
	
	
//	$scope.getExtClass = function(review) {
//		var id = review.id;
//		
//		if (id in $scope.openedReview) {
//			return false
//		} else {
//			$scope.openedReview.push(id);
//			return true
//		}
//	}
	
//	$scope.closeCurrentReview = function(review){
//		$scope.current_review = {};
//		console.log('no');
//	}


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