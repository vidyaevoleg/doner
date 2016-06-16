Topdoner.controller('MapCtrl', ['$scope','$stateParams','places','$location','$rootScope', function ($scope,places,$stateParams,$location,$rootScope) {

	$rootScope.setDefaultZoom = function(){
		var place = $rootScope.place;
		if (place) {
			$rootScope.MAP.setCenter(place.geometry.coordinates, 12, {duration: 500});
		}
	}

	$rootScope.goToPlace = function(place,zoom,location) {
		if ($rootScope.MAP) {
		  	$rootScope.MAP.panTo(location || place.geometry.coordinates,{duration: 600});
		  	old_zoom = $rootScope.MAP._zoom;
		  	if (old_zoom > 14 ) {
		  		new_zoom = zoom || old_zoom;
		  	} else {
		  		new_zoom = zoom || 16;
		  	}
		  	setTimeout(function() {
			    $rootScope.MAP.setCenter(location || place.geometry.coordinates, new_zoom, {duration: 500});
		  	}, 600);
		}
	}

	$rootScope.toggleSearch = function() {
		if (!$('.lo-l-map-opnsearch').hasClass('opened')) {
			$('.lo-l-map-opnsearch').html('Скрыть').addClass('opened');
			$scope.opn($('.ymaps-2-1-41-search'));
			$('.ymaps-2-1-41-input__control').focus();
		} else {
			$('.lo-l-map-opnsearch').html('Найти').removeClass('opened');
			$scope.cls($('.ymaps-2-1-41-search'));
		}
	}

}]);
