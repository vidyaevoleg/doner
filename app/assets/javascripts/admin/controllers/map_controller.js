Topdoner.controller('MapCtrl', ['$scope', 'vkposts', 'places', 'geocodingService', function ($scope, vkposts, places, geocodingService) {

	var states = ['current_place', 'new_review', 'new_place'];

	$scope.current_state = undefined

	$scope.changeState = function (which_state) {
		$scope.current_place = undefined;
		$scope.new_place = undefined
		$scope.current_state = which_state;
	}


	$scope.getAllData = function () {
		
		places.getPlacesWithReviews().then(function (res) {
			$scope.places = res.data;
		})

		vkposts.getVkPosts().then( function (res) {
			$scope.vkposts = res.data;
			$scope.initCurrentPost();
		})	
	}

	$scope.fullAdress = function (current_place) {
		if (!current_place) { return }
		city = current_place.properties.city;
		street = current_place.properties.street;
		metro = current_place.properties.metro;

		return [metro, street, city].join();
	}

	$scope.initCurrentPost = function() {
		$scope.current_post = $scope.vkposts[0]
		$scope.next_post = $scope.vkposts[1]
	}

	$scope.toNextPost = function () {
		current_index = $scope.vkposts.indexOf($scope.current_post)
		$scope.prev_post = (current_index < 0) ? undefined : $scope.vkposts[current_index-1];
		$scope.next_post = ((current_index+2) > $scope.places.length) ? undefined : $scope.vkposts[current_index+2];
		$scope.current_post = $scope.vkposts[current_index+1];
	}

	$scope.toPrevPost = function () {
		current_index = $scope.vkposts.indexOf($scope.current_post)
		$scope.prev_post = ((current_index-2) < 0) ? undefined : $scope.vkposts[current_index-1];
		$scope.next_post = (current_index > $scope.places.length) ? undefined : $scope.vkposts[current_index+2];
		$scope.current_post = $scope.vkposts[current_index-1];
	}
	$scope.afterMapInit = function(Map){
		$scope.MAP = Map;
		$scope.YMAPS = ymaps;
	}

	$scope.defineNewPlace = function() {
		$scope.creating_place = true
	  	$scope.changeState('new_place');

	}


	function geocodePoint (e) {
	    coords = e.get('coords');
	  	geocodingService.get(coords).then(function (place) {
	  		$scope.$apply($scope.new_place = place);
	  	})
	}


	
	$scope.mapClick = function (e) {
		if (!($scope.current_state == 'new_place')) {
			return
		}
	  	geocodePoint(e);
	}


	$scope.calcTime = function(t) {
		var post = Date.parse(t),
			now = new Date,
			d = (now - post)/(1e3*24*3.6e3);

		if (d >= 7) {
			return Math.round(d/7) + ' нед. назад'
		} else {
			if (d >= 1) {
				return Math.round(d) + ' д. назад'
			} else {
				if (d >= 1/24) {
					return 'недавно'
				} else {
					return 'только что'
				}
			}
		}
	}
	
	$scope.choosePlace = function (place_data) {
		$scope.changeState('current_place');
		$scope.current_place = place_data.place;
		$scope.reviews = place_data.reviews;
		console.log($scope.current_place)
	}


	$scope.toggleSearch = function() {
		if (!$('.lo-l-map-opnsearch').hasClass('opened')) {
			$('.lo-l-map-opnsearch').html('Скрыть').addClass('opened');
			$scope.opn($('.ymaps-2-1-35-search'));
			$('.ymaps-2-1-35-input__control').focus();
		} else {
			$('.lo-l-map-opnsearch').html('Найти').removeClass('opened');
			$scope.cls($('.ymaps-2-1-35-search'));
		}
	}

	$scope.opn = function(what) {
	    what.css('opacity', 0)
	      .removeClass('hidden')
	      .fadeTo(200,1);
	}
	
	$scope.cls = function(what){
	    what.fadeTo(200,0);
	    setTimeout(function(){
	      what.addClass('hidden');
	    }, 210);
	}

}]);

