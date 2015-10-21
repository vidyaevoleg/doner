Topdoner.controller('PlacesCtrl', function ($scope,places) {
  $scope.places = places.getPlaces()
//  $scope.func = function(place){
//    console.log(place)
//  }
  $scope.openPlacePopup = function(place){
    console.log(place)
  };

  $scope.closePlacePopup = function(){
    $scope.current_place = undefined
  };
});

