Topdoner.controller('MainCtrl', ['$scope','$filter','places','reviews','$location','$rootScope','$stateParams', function ($scope,$filter,places,reviews,$location,$rootScope,$stateParams) {
	$rootScope.MAP;
	$rootScope.list_limit = 4;
	$rootScope.placesSort = 'r';
	$rootScope.places_list_order = '-properties.rating';
	$rootScope.lastViewedPlace = undefined;

	$rootScope.noBackspaceEvent = function(){
		var rx = /INPUT|SELECT|TEXTAREA/i;

		$(document).bind("keydown keypress", function(e){
			if( e.which == 8 ){ // 8 == backspace
				if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
					e.preventDefault();
				}
			}
		});
	}

	$rootScope.place_query = {};

	$rootScope.$watch('place_query.keyword', function(val) { 
		if (val && val.length) {
			$rootScope.list_limit = $rootScope.places.length;
			$rootScope.query = val;
//			$rootScope.cls($('.load-more'));
			$('.load-more').addClass('hidden');
		} else {
			$rootScope.list_limit = 4;
			$rootScope.query = '';
//			$rootScope.opn($('.load-more'));
			$('.load-more').removeClass('hidden');
		}
	}); 
	
	$rootScope.opened_search = false;
	
	$rootScope.openSearch = function() {
		$rootScope.opn($('.lo-r-nav-select-search'));
		$('.lo-r-nav-select-search input').focus();
		$rootScope.opened_search = true;
	}
  
	$rootScope.clearSearch = function() {
		$rootScope.place_query = {};
		$rootScope.list_limit = 4;
		$rootScope.cls($('.lo-r-nav-select-search'));
		$rootScope.opened_search = false;
	}
	$rootScope.showLastViewedPlace = function() {
		var place = $rootScope.lastViewedPlace;
		if (place) {
			$rootScope.scrollToPlace(place);
		}
	} 

//	$scope.logoCycle;
	
//	$scope.startLogo = function() {
//		var colors = ['#FFFF00', '#FF00FF', '#FF0000', '#C0C0C0', '#808000', '#800000', '#00FF00', '#008080', '#0000FF', '#000080'],
//			l = colors.length,
//			logo = $('.lo-l-head-logo'),
//			i=0;
//		$scope.logoCycle = setInterval(function(){
//			if (i > l) {
//				i=0;
//				logo.css('background-color', colors[i]);
//				i++;
//			} else {
//				logo.css('background-color', colors[i]);
//				i++;
//			}
//		}, 100);
//	}
//	$scope.stopLogo = function() {
//		clearInterval($scope.logoCycle);
//		$('.lo-l-head-logo').css('background-color', '#000');
//	}
	
	
	$rootScope.loadMore = function() {
		if ($rootScope.list_limit < $scope.places.length) {
			$rootScope.list_limit = $scope.list_limit + 8;
		} else {
			$rootScope.list_limit = $scope.list_limit + 1;
			$rootScope.cls($('.load-more'));
		}
	}
		
  $rootScope.choosePlace = function(place){
		$location.path('/places/'+place.properties.id);
	  if (!$('.lo-l-head-menu').hasClass('hidden')) {
		  if ($('.lo-l').css('position') === 'relative') {
				setTimeout(function(){
					$('body').animate({ scrollTop: $('.lo-r-card-cur').offset().top - 10}, 1000);
				}, 800);
		  }
	  }
//	  $rootScope.clearSearch();
  };
	
	$rootScope.deletePlace = function(place_id) {
		if (confirm('Удалить место?')) {
			places.deletePlace(place_id)
			var place = $filter('getPlaceById')($rootScope.places, place_id)
			$rootScope.places.splice($rootScope.places.indexOf(place), 1 );
			$location.path('/home')
		}
	}

	$rootScope.deleteReview = function(review_id){
		if (confirm('Удалить обзор?')) {
			var place_id = $stateParams.id;
			reviews.deleteReview(review_id, place_id)
			$('#review-'+review_id).toggle(500)
		}
	}

	$rootScope.copyReviewUrl = function(place, review) {
		var url = 'http://topdoner.com/#/places/'+ place.properties.id +'/reviews/' + review.id;
		prompt("Copy to clipboard: Ctrl+C, Enter", url);
	}
		
	$rootScope.showDist = function(d){
		if (d >= 1000) {
			return Math.round(d/1000) + ' км';
		} else {
			return d + ' м';
		}
	}
	
	$rootScope.isDistExist = function(d) {
		if (d >= 0) {
			return true
		} else {
			return false
		}
	}
		
	$rootScope.mapClick=function(e){
    var coords = e.get('coords');
		
    $rootScope.new_place = {coordinates: coords.toString(),
    										city: '',
    										metro: '',
					  						metro_line: '',
    										street: ''
    									};
    ymaps.geocode(coords,{kind: 'metro'}).then(function (res) {
      var metros = [];
      res.geoObjects.each(function (obj) {
          metros.push(obj.properties.get('name'));
      });
      var metro = metros[0];
      $rootScope.$apply(function(){
        $rootScope.new_place['metro'] = metro.replace('метро ', '');
		  	$rootScope.new_place['metro_line'] = $rootScope.getMetroLine($scope.new_place['metro']);
      });
    });

    ymaps.geocode(coords,{kind: 'house'}).then(function (res) {
        var houses = [];
        res.geoObjects.each(function (obj) {
            houses.push(obj.properties.get('name'));
        });
        var house = houses[0];

        $rootScope.$apply(function(){
          $rootScope.new_place['street'] = house
        });
    });

    ymaps.geocode(coords).then(function (res) {
      var names = [];
      res.geoObjects.each(function (obj) {
          names.push(obj.properties.get('name'));
      });
      var loc = names[names.length-3],
      		dist = names[names.length-4];
      for (var i=1;i<names.length;i++) {
      	var word = names[i];
      	if (word.indexOf('городской') !== -1 ) {
      		dist = names[names.indexOf(dist)-1];
      		break;
      	};
      };
     	$rootScope.$apply(function() {
       	if (dist == loc) {
        	$rootScope.new_place['city'] = loc;
        } else {
        	$rootScope.new_place['city'] = dist + ', ' + loc
        }
  	  });
		});

		if ($rootScope.new_place) {
			$rootScope.opn($('.lo-r-addplace-checkmark-place'));
			$rootScope.validNewPlace();
		}
	};
		
	$rootScope.createFuckingPlace = function(place){
		places.createPlace(place);
	}

	$rootScope.fixDropzone = function() {
		$('.dz-message').html('Кликните или перетащите сюда фотографии');
	}
	
	$rootScope.findUser = function () {
		if (!$rootScope.places[1].properties.dist) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				console.log('geolocation error :(');
			}
			function showPosition(position) {
				var location = [position.coords.longitude, position.coords.latitude];
				var list_order = $scope.places_list_order;
				$rootScope.user_location = location;
				$rootScope.goToPlace(null, 12, location);
				$rootScope.addUserLocationPlacemark(location);
				$rootScope.showListDisp();
				$rootScope$scope.$apply($rootScope.places_list_order = 'properties.rating');
				$rootScope.$apply($rootScope.places_list_order = list_order);
			}
		} else {
			$rootScope.goToPlace(null, 12, $rootScope.user_location)
		}
	}
	
	
	$rootScope.addUserLocationPlacemark = function (loc) {
		var placemark = new $rootScope.YMAPS.Placemark(loc, {
				balloonContent: '<img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />',
				iconContent: "Ты тут уёбок"
			}, {
				preset: "islands#dotIcon",
				iconColor: '#0014ff',
				// Отключаем кнопку закрытия балуна.
				balloonCloseButton: true,
				// Балун будем открывать и закрывать кликом по иконке метки.
				hideIconOnBalloonOpen: false
			});
		$rootScope.MAP.geoObjects.add(placemark);
	}
	


	$rootScope.whatPlacesSort = function(i) {
		if (i === $rootScope.placesSort) {
			return 'active';
		} else {
			return '';
		}
	}

	$rootScope.afterMapInit=function(Map){
		$rootScope.MAP = Map;
		$rootScope.YMAPS = ymaps;

		setTimeout(function() {
			var place = $rootScope.place;
			if (place) {
				$rootScope.goToPlace(place)
			}
		}, 1000);
	}
	
	$rootScope.calcDist = function(me, place) {
		function toRads(angle) {
			return angle * (Math.PI / 180);
		}
		return Math.round(1000 * 6371 * Math.acos(Math.sin(toRads(me[0]))*Math.sin(toRads(place[0])) + Math.cos(toRads(me[0]))*Math.cos(toRads(place[0]))*Math.cos(toRads(me[1]) - toRads(place[1]))));
	}
	
  $rootScope.isUserLocation = function() {
	  if ($rootScope.user_location) {
		  return true
	  } else {
		  return false
	  }
  }
  
  $rootScope.showPlaceDist = function() {
	  if ($rootScope.isUserLocation()) {
		  var place = $rootScope.place.geometry.coordinates,
		  me = $rootScope.user_location;
	  	
	  	return $rootScope.showDist($rootScope.calcDist(me, place));
	  }
  }

}]);