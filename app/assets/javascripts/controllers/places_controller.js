Topdoner.controller('PlacesCtrl', function ($scope,places) {

  $scope.places = places.getPlaces()
  
  $scope.choosePlace = function(place){
	  $scope.place = place
	  $scope.reviews = places.getReviews(place)
    document.location.hash = "place/" + $scope.place.properties.id;
  };
	
	$scope.closePlace = function(place){
		$scope.place = undefined;
	}
  
  $scope.makeReviewCurrent = function(review){
    $scope.current_review = review;
  }
  $scope.closeReview = function(){
    $scope.current_review = undefined
  }

});

