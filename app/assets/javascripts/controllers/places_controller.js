Topdoner.controller('PlacesCtrl', function ($scope,places) {
  $scope.places = places
  $scope.func = function(place){
    console.log(place)
  }
  
  $scope.openPlacePopup = function(place){
      $scope.current_place = place.properties.title
  };

  $scope.closePlacePopup = function(){
    $scope.current_place = undefined
  }
});

