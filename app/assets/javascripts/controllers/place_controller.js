Topdoner.controller('PlaceCtrl', ['$scope','$stateParams','places','$rootScope','$location',function ($scope,$stateParams,places,$rootScope,$location) {

  $scope.closePlace = function(place){
    $location.path('/home')
  }
  
  $scope.current_review = [];

  $scope.makeReviewCurrent = function(review){
    // $('#review-' + review.id).find('.lo-r-cont-review-body').addClass('ext');
	  if ($scope.current_review.indexOf(review.id) === -1){
		  $scope.current_review.push(review.id);
	  }
//	  console.log($scope.calcTime(review.date));
//	  console.log($scope.current_review);
    
  }
  $scope.unmakeReviewCurrent = function(review) {
//	  console.log($scope.current_review);
//	  console.log('--------');
//	  console.log($scope.current_review.indexOf(review.id));
	  if ($scope.current_review.indexOf(review.id) !== -1) {
		  $scope.current_review.splice($scope.current_review.indexOf(review.id), 1);
	  }
//	  $scope.current_review.indexOf(review.id)
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
  
  $scope.findCurrentReview = function() {
    var review = $rootScope.review
    if ($stateParams.review_id) {
      setTimeout(function() {
        $('body').animate({ scrollTop: $('#review-' + review.id).offset().top}, 1000);
      }, 100);
      $scope.current_review.push(review.id);
    }
  }
  
	$scope.isReviewCurrent = function(review) {
    if ($scope.current_review.indexOf(review.id) !== -1) {
      return true
    } else {
      return false
    };      

	};

  $scope.closeReview = function(){
    $scope.current_review = undefined
  };
  
  $scope.changeWritingReview = function(){
    $scope.writing_review = !$scope.writing_review
  };
  $scope.writeReview = function(place){
    $location.path('/places/'+place.properties.id+'/new_review')
  };
  

//	$scope.colorPlace = function(place) {
//		console.log('as');
//		if (place == $scope.place) {
//			
//			return {preset: 'islands#blueIcon'}
//		} else {
//			console.log(place.prpoerties.street);
//			console.log($scope.place.prpoerties.street);
//			return {preset: 'islands#redIcon'}
//		}
//	}
//	$scope.colorChoosenPlace = function(e, place) {
//		if (place == $scope.place) {
//			e.get('target').options.set('preset', 'islands#greenIcon');
//		}
//	}
}]);
