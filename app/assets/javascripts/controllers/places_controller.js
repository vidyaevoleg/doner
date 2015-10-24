Topdoner.controller('PlacesCtrl', ['$scope','places','$location','$rootScope', function ($scope,places,$location,$rootScope) {
  $rootScope.places = places.getPlaces();

	$scope.dropPlace = function(){
    $scope.new_place = undefined
  }
  $scope.choosePlace = function(place){    
    $location.path('/places/'+place.properties.id);    
  };
	$scope.mapClick=function(e){
//		console.log('pop');
      var coords = e.get('coords');
      $scope.new_place = {coordinates: coords.toString()}
      ymaps.geocode(coords,{kind: 'metro'}).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var metro = names[0]
          $scope.$apply(function(){
            $scope.new_place['metro'] = metro
          });
      });
      ymaps.geocode(coords).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var adress = names[0]
          $scope.$apply(function(){
            $scope.new_place['street'] = adress
          });
      });
    };

    $scope.createPlace = function(){
      var new_place = $scope.new_place
      places.createPlace(new_place)
    }
	

  // $scope.show = function(what, how) {
  // 	var p = what,
  // 		hdn = 'hidden',
  // 		dur = 200;
  // 	p.removeClass(hdn);
  // 	p.fadeTo(dur, 1);
  // }

  // $scope.hide = function(what, how) {
  // 	var p = what,
  // 		hdn = 'hidden',
  // 		dur = 200;
  // 	p.fadeTo(dur, 0);
  // 		setTimeout(function(){
  // 		p.addClass(hdn);
  // 	}, dur+10)
  // }

  // $scope.prnj_is = false;
  // //$scope.

  // $scope.prnj = function() {
  // 	var p = $('.prnj');
  // 	if ($scope.prnj_is) {
  // 		$scope.hide(p, 200);
  // 		$scope.prnj_is = false;
  // 	} else {
  // 		$scope.show(p, 200);
  // 		$scope.prnj_is = true;
  // 	}
  // }

  // $scope.ppReview = function() {
  // 	var pp = $('.popup');
  // 	$scope.prnj();
  // 	$scope.show(pp);
  // }

  // $scope.closePp = function() {
  // 	var prnj = $('.prnj'),
  // 		pp = $('.popup');
  // //	$scope.hide(pp);
  // }

}]);

