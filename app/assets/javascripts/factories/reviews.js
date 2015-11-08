Topdoner.factory('reviews', ['$http','$location','$rootScope',function($http,$location,$rootScope){
	this.getReview = function(review_id){
    return $http.get('/reviews/'+ review_id)
      .then(function(res) {
        return res.data;
    	}
    );
	}
	this.deleteReview = function(review_id){
		$http.delete('/reviews/'+review_id)
	}
  return this   
}]);