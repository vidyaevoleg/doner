Topdoner.factory('reviews', ['$http','$location','$rootScope', '$filter', function($http, $location, $rootScope, $filter){
	this.getReview = function(review_id){
    return $http.get('/reviews/'+ review_id)
      .then(function(res) {
        return res.data;
    	}
    );
	}
	this.deleteReview = function(review_id, place_id) {
		return $http.delete('/reviews/'+review_id)
      .then(function(res){

        var old_place = $filter('getPlaceById')($rootScope.places, place_id),
          updated_place = res.data;

        $rootScope.places.splice($rootScope.places.indexOf($rootScope.old_place), 1);
        $rootScope.places.push(updated_place);
        $rootScope.place = updated_place;
        // debugger
        $location.path('/places/'+ updated_place.properties.id)
      })
	}
  return this   
}]);