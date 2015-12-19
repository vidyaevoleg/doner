Topdoner.controller('ShareReviewCtrl', ['$scope','$location','$rootScope', '$stateParams', function ($scope, $location, $rootScope, $stateParams) {
	var enviroment = BASE_URL + '#',
		enviroment_rails = BASE_URL;

	var reviewUrlHelper = function(review){
		if (review) {
			return 'http://topdoner.com/#/places/' + $scope.place.properties.id +'/reviews/' + review.id; 
		}
	}

	var reviewTitleHelper = function(review) {
		return review.title;
	};

	var reviewDescriptionHelper = function(review) {
		return review.body.split(/\s+/).slice(0,50).join(" ") + '...'
	};

	var reviewMediaHelper = function(review) {
		if (review.images.length > 0) {
			return enviroment_rails + review.images[0].url; 
		}
	};	
	
	$scope.share_vk_main = function() {
		url  = 'http://vkontakte.ru/share.php?';
		url += '&url='         + 'http://topdoner.com/';
		url += '&noparse=false';
		$scope.share_popup(url);		
	}

	$scope.share_fb_main = function() {
		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + 'TOPDONER dote COM';
		url += '&p[url]='       + 'http://topdoner.com/';

		$scope.share_popup(url);		
	};
	

	$scope.share_vk = function(review) {
		url  = 'http://vkontakte.ru/share.php?';
		url += '&url='         + encodeURIComponent(reviewUrlHelper(review));
		url += '&title='       + encodeURIComponent(reviewTitleHelper(review));
		url += '&description=' + encodeURIComponent(reviewDescriptionHelper(review));
		url += '&image='       + encodeURIComponent(reviewMediaHelper(review));
		url += '&noparse=false';
		$scope.share_popup(url);
	};
	
	$scope.share_fb = function(review) {
		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + encodeURIComponent(reviewTitleHelper(review));
		url += '&p[summary]='   + encodeURIComponent(reviewDescriptionHelper(review));
		url += '&p[url]='       + encodeURIComponent(reviewUrlHelper(review));
		url += '&p[images][0]=' + encodeURIComponent(reviewMediaHelper(review));
		$scope.share_popup(url);		
	};
	
	$scope.share_popup = function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	};	
	
}]);
