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
  
  
$scope.show = function(what, how) {
	var p = what,
		hdn = 'hidden',
		dur = 200;
	p.removeClass(hdn);
	p.fadeTo(dur, 1);
}

$scope.hide = function(what, how) {
	var p = what,
		hdn = 'hidden',
		dur = 200;
	p.fadeTo(dur, 0);
		setTimeout(function(){
		p.addClass(hdn);
	}, dur+10)
}

$scope.prnj_is = false;
//$scope.

$scope.prnj = function() {
	var p = $('.prnj');
	if ($scope.prnj_is) {
		$scope.hide(p, 200);
		$scope.prnj_is = false;
	} else {
		$scope.show(p, 200);
		$scope.prnj_is = true;
	}
}

$scope.ppReview = function() {
	var pp = $('.popup');
	$scope.prnj();
	$scope.show(pp);
}

$scope.closePp = function() {
	var prnj = $('.prnj'),
		pp = $('.popup');
//	$scope.hide(pp);
}

});

