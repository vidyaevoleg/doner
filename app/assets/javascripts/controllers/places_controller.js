Topdoner.controller('PlacesCtrl', function ($scope,places) {

  $scope.places = places.getPlaces()
  $scope.choosePlace = function(place){
//      $scope.current_place = place.properties.title
	  console.log('yas');
  };

  $scope.closePlacePopup = function(){
    $scope.current_place = undefined
  };
});

