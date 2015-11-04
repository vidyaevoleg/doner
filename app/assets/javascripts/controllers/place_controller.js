Topdoner.controller('PlaceCtrl', ['$scope','$stateParams','places','$rootScope','$location',function ($scope,$stateParams,places,$rootScope,$location) {

  $scope.reviews = places.getReviews($stateParams.id)
  $scope.place = places.getPlace($stateParams.id)
  $scope.closePlace = function(place){
    $location.path('/home')
  }
  
  $scope.current_review = [];
  $scope.makeReviewCurrent = function(review){
	 $scope.current_review.push(review.id);
  }
  
  $scope.openReview = function(review) {
  	if ($scope.current_review.indexOf(review.id) !== -1) {
  		return 'ext'
  	}
  }
  
	$scope.isReviewCurrent = function(review) {
		if ($scope.current_review.indexOf(review.id) !== -1) {
			return true
		} else {
			return false
		}
	}

  $scope.closeReview = function(){
    $scope.current_review = undefined
  }
  
  $scope.changeWritingReview = function(){
    $scope.writing_review = !$scope.writing_review
  }
  $scope.writeReview = function(place){
    $location.path('/places/'+place.properties.id+'/new_review')
  }
  
  
//	$scope.colorPlace = function(place) {
//		console.log('as');
//		if (place == $scope.place) {
//			
//			return {preset: 'islands#blueIcon'}
//		} else {
//			console.log(place.prpoerties.street);
//			console.log($scope.place.prpoerties.street);
//			return {preset: 'islands#redIcon'}
//		}
//	}
//	$scope.colorChoosenPlace = function(e, place) {
//		if (place == $scope.place) {
//			e.get('target').options.set('preset', 'islands#greenIcon');
//		}
//	}
}]);