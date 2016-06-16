Topdoner.controller('MapCtrl', ['$scope', 'vkposts', 'places', 'geocodingService', 'postsStorage', '$http', 'mapsDriver',
	 function ($scope, vkposts, places, geocodingService, postsStorage, $http, mapsDriver) {

	var
		states = ['current_place', 'new_review', 'new_place'],
		paranja = $('.paranja'),
		popup_image = $('.popup-vkphoto-img');


	$scope.current = {
		state: undefined,
		place: undefined,
		new_place: undefined,
		photo: undefined,
		vkpost: undefined,
		next_post_id: undefined,
		prev_post_id: undefined
	}

	$scope.changeState = function (which_state) {
		$scope.current.place = undefined;
		$scope.current.new_place = undefined
		$scope.current.state = which_state;
	}

	$scope.getPlacesData = function () {
		places.getPlacesWithReviews().then(function (res) {
			$scope.places = res.data;
		});
	}

	$scope.openPopup = function (url) {
		paranja.toggle(500);
		// $scope.opn(paranja);
		$scope.current.photo = url;
	}

	$scope.closePopup = function () {
		// $scope.cls(paranja);
		paranja.toggle(500);

		$scope.current.photo = undefined;
	}

	$scope.nextPhoto = function () {
		photos = $scope.current.vkpost.attachments.map(function (attch) {
			return attch.url;
		})
		current_photo = $scope.current.photo;
		old_index = photos.indexOf(current_photo);
		if (old_index < photos.length - 1 ) {
			next_photo = photos[old_index+1]
		} else {
			next_photo = photos[0]
		}
		$scope.current.photo = next_photo;
	}

	$scope.deleteVkPost = function () {
		current_id = $scope.current.vkpost.post_id;
		next_id = $scope.current.next_post_id;
		vkposts.deleteVkPost(current_id).then(function () {
			$scope.getVkPost(next_id);
		});
	}

	$scope.deleteAttachment = function (url) {
		urls = $scope.current.vkpost.attachments.map(function (url) {
			return url.url;
		});
		url_index = urls.indexOf(url);
		urls.splice(url_index, 1);
		$scope.current.vkpost.attachments = urls.map(function (url) {
			return {url: url};
		});
		setTimeout(function() {
			initDragAndDrop();
		}, 100);
	}

	$scope.addAttachment = function (url) {
		urls = $scope.current.vkpost.attachments.map(function (url) {
			return url.url;
		});
		urls.push(url)
		$scope.current.vkpost.attachments = urls.map(function (url) {
			return {url: url};
		});
		setTimeout(function() {
			initDragAndDrop();
		}, 100);
	}

	$scope.createPlace = function () {
		place = $scope.current.new_place;

		if (!(place)) {
			return ;
		}

		if (!(place.image_url)) {
			alert('прикрепи фото');
			return ;
		}

		$scope.changeState('current_place');

		$http.post('/places', {place: place}).then(function (res) {
			new_place = res.data;
			new_record = {place: new_place, reviews: []}
			$scope.places.push(new_record);
			$scope.choosePlace(new_record);
		});

	}

	$scope.toThisPlace = function () {
		place = $scope.current.place;

		if (!(place)) {
			alert('выбери ларек')
			return;
		}

		post = $scope.new_post;

		if (post.title.length < 1) {
			alert('введи хотя бы заголовок');
			return;
		}

		vkpost = $scope.current.vkpost;
		vkpost_id = vkpost.post_id;
		body = vkpost.body;
		place_id = $scope.current.place.properties.id;
		attachments = vkpost.attachments.map( function (attachment) {
			return attachment.url;
		}).join(',');

		post.body = body;
		post.place_id = place_id;
		post.image_urls = attachments;

		vkposts.approve(vkpost_id, post).then(function (res) {
			review = res.data.review;
			$scope.reviews.push(review);
			$scope.toNextPost();
		})

	}

	$scope.initVkPost = function () {
		posts_ids = postsStorage.get();
		if (posts_ids) {
			current_id = posts_ids.current_id;
			next_id = posts_ids.next_id;
			prev_id = posts_ids.prev_id;
			$scope.getVkPost(current_id || next_id || prev_id);
		} else {
			$scope.getVkPost();
		}

	}

	$scope.getVkPost = function (id) {
		vkposts.getVkPost(id || undefined).then( function (res) {
			$scope.current.vkpost = JSON.parse(res.data.current_post);
			$scope.current.next_post_id = res.data.next_id;
			$scope.current.prev_post_id = res.data.prev_id;
			updateStorage();
			setTimeout(function() {
				clearPlaceAvatar();
				initDragAndDrop();
			}, 100);
		});
		$scope.initNewPost();
	}

	$scope.initNewPost = function () {
		$scope.new_post = {
			total: 1,
			vegetables: 1,
			meat: 1,
			service: 1,
			sanitation: 1,
			title: '',
			min_price: undefined,
			max_price: undefined
		}
		setTimeout(function() {
			initDragAndDrop();
		}, 100);
	}

	$scope.fullAdress = function (current_place) {
		if (!current_place) { return };

		city = current_place.properties.city;
		street = current_place.properties.street;
		metro = current_place.properties.metro;

		return [metro, street, city].join();
	}

	$scope.toNextPost = function () {
		next_post_id = $scope.current.next_post_id;
		if (next_post_id == null) {
			alert('no post')
		}
		$scope.getVkPost(next_post_id);
	}

	$scope.toPrevPost = function () {
		prev_post_id = $scope.current.prev_post_id;
		if (prev_post_id == null) {
			alert('no post');
		}
		$scope.getVkPost(prev_post_id);
	}

	$scope.defineNewPlace = function() {
	  	$scope.changeState('new_place');
	}

	function geocodePoint (e) {
	    coords = e.get('coords');
	  	geocodingService.get(coords).then(function (place) {
	  		$scope.$apply($scope.current.new_place = place);
	  		initDragAndDrop();
	  	})
	}

	$scope.mapClick = function (e) {
		if (!($scope.current.state == 'new_place')) {
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
		$scope.current.place = place_data.place;
		$scope.reviews = place_data.reviews;
		mapsDriver.goTo(place_data.place.geometry.coordinates, $scope.MAP);
	}

	$scope.afterMapInit = function(Map){
		$scope.MAP = Map;
		$scope.YMAPS = ymaps;
	}


	$scope.toggleSearch = function() {
		if (!$('.lo-l-map-opnsearch').hasClass('opened')) {
			$('.lo-l-map-opnsearch').html('Скрыть').addClass('opened');
			$scope.opn($('.ymaps-2-1-41-search'));
			$('.ymaps-2-1-41-input__control').focus();
		} else {
			$('.lo-l-map-opnsearch').html('Найти').removeClass('opened');
			$scope.cls($('.ymaps-2-1-41-search'));
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

	function initDragAndDrop() {
		photos = $('.vkpost-photos-one');
		dropzone = $('.state_new_place');
		photos.draggable({revert: true});
		dropzone.droppable({
			drop: function (event, ui) {
				draggable = ui.draggable;
				url = draggable.find('img').attr('src');
				draggable.fadeOut(300);
				current_url = $scope.current.new_place.image_url
				if (current_url) {
					$scope.addAttachment(current_url);
				}
				$scope.deleteAttachment(url);
				$scope.$digest($scope.current.new_place.image_url = url);
				initDragAndDrop();
			},
			dropout: function (event, ui) {
				alert('ne suda')
			}
		});
	}

	function updateStorage() {
		ids = {
			current_id: $scope.current.vkpost.post_id,
			next_id: $scope.current.next_post_id,
			prev_id: $scope.current.prev_post_id
		}
		postsStorage.update(ids);
	}

	function clearPlaceAvatar() {
		if ($scope.current.new_place) {
			$scope.$digest($scope.current.new_place.image_url = undefined);
		}
	}

}]);
