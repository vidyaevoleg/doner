Topdoner.controller('PlaceCtrl', ['$scope','$stateParams','places','$rootScope','$location',function ($scope,$stateParams,places,$rootScope,$location) {

  $scope.closePlace = function(place){
    $location.path('/home')
  }
  
  $scope.current_review = undefined;

  $scope.makeReviewCurrent = function(review){
   $location.path(/places/ + $stateParams.id + '/reviews/' + review.id)
  }
  
  $scope.findCurrentReview = function() {
    if ($stateParams.review_id) {
      $scope.current_review = $rootScope.review;
    }
  }

  $scope.openedReview = function(review) {
    if ($scope.current_review) {
      if ($scope.current_review.id == review.id) {
        return 'ext'
      };
    };
  };
  
	$scope.isReviewCurrent = function(review) {
    if ($scope.current_review) {
      if ($scope.current_review.id == review.id) {
        return true
      } else {
        return false
      };
    };
	};

  $scope.closeReview = function(){
    $scope.current_review = undefined
  };
  
  $scope.changeWritingReview = function(){
    $scope.writing_review = !$scope.writing_review
  };
  $scope.writeReview = function(place){
    $location.path('/places/'+place.properties.id+'/new_review')
  };
  

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