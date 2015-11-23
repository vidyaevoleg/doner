Topdoner.controller('ShareReviewCtrl', ['$scope','$location','$rootScope', function ($scope,$location,$rootScope) {
	var enviroment = 'http://localhost:3000/#',
		enviroment_rails = 'http://localhost:3000';
	
	$scope.reviewUrlHelper = function(review){
		return enviroment + $location.path() + '/reviews/' + review.id;
	};

	$scope.reviewTitleHelper = function(review) {
		return review.title + ' (отзыв на topdoner.com)';
	};

	$scope.reviewDescriptionHelper = function(review) {
		// return review.body
		return 'huynz'
	};

	$scope.reviewMediaHelper = function(review) {
		if (review.images.length > 0) {
			return enviroment_rails + review.images[0].url; 
		}
	};	
	
	$scope.sharevk = function(purl, ptitle, pimg, text) {
		console.log('sss');
		url  = 'http://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		$scope.popup(url);
		console.log('sss');
	}
	
	
	$scope.popup = function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
	
	$scope.Share = {
	vkontakte: function(purl, ptitle, pimg, text) {
		console.log('sss');
		url  = 'http://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
				console.log('sss');

	},
	odnoklassniki: function(purl, text) {
		url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
		url += '&st.comments=' + encodeURIComponent(text);
		url += '&st._surl='    + encodeURIComponent(purl);
		Share.popup(url);
	},
	facebook: function(purl, ptitle, pimg, text) {
		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + encodeURIComponent(ptitle);
		url += '&p[summary]='   + encodeURIComponent(text);
		url += '&p[url]='       + encodeURIComponent(purl);
		url += '&p[images][0]=' + encodeURIComponent(pimg);
		Share.popup(url);
	},
	twitter: function(purl, ptitle) {
		url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl);
		url += '&counturl=' + encodeURIComponent(purl);
		Share.popup(url);
	},
	mailru: function(purl, ptitle, pimg, text) {
		url  = 'http://connect.mail.ru/share?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&imageurl='    + encodeURIComponent(pimg);
		Share.popup(url)
	},

	popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
};
	
	
	
}]);
