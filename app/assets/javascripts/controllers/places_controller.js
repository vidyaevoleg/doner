Topdoner.controller('PlacesCtrl', function ($scope,places) {

  $scope.places = places.getPlaces()
  
  $scope.choosePlace = function(place){
//      $scope.current_place = place.properties.title
//	  console.log(place.properties.street);
	  $scope.place_title = place.properties.street;
	  $scope.place_metro = place.properties.metro;
	  $scope.place_id = place.properties.id;
	  
	  document.location.hash = "place/" + $scope.place_id;
//	  console.log($scope.cp);
  };
	
	$scope.closePlace = function(place){
		$scope.place_title = undefined;
	}

//  $scope.closePlacePopup = function(){
//    $scope.current_place = undefined
//  };
});

