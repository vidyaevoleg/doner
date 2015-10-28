Topdoner.controller('NewPlaceCtrl', ['$scope','places','$location','$rootScope', function ($scope,places,$location,$rootScope) {
	

  $scope.createPlace = function(){
    var new_place = $scope.new_place
//    places.createPlace(new_place)
	console.log(new_place);
  }
}]);
