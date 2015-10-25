Topdoner.controller('PlacesCtrl', ['$scope','places','$location','$rootScope', function ($scope,places,$location,$rootScope) {
  $rootScope.places = places.getPlaces();
	
//	$scope.mapCenter=[37.415983, 55.792559];
  $scope.choosePlace = function(place){
    $location.path('/places/'+place.properties.id);
//	$rootScope.mapCenter = place.geometry.coordinates;
//	  console.log(place.geometry.coordinates);
  };
	
	$scope.mapClick=function(e){
//		console.log('pop');
      var coords = e.get('coords');
      $scope.coords = coords;
      ymaps.geocode(coords,{kind: 'metro'}).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var metro = names[0]
          $scope.$apply(function(){
            $scope.metro = metro
          });
      });
      ymaps.geocode(coords).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var adress = names[0]
          $scope.$apply(function(){
            $scope.adress = adress
          });
      });
      // $('#place_cooridnates') = 
    };

	

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

