Topdoner.factory('places', ['$http',function($http){
  // return $resource('/places/:id',{id: '@id'},{
  //   get_places: {method: 'GET',isArray: true, responseType: 'json'}
  // });
    var places = {
      getPlaces: function(){
        var places = []
        $http.get('/places/get_places').success(function(data){
            angular.copy(data,places);
        })      
        return places
      },
      getReviews: function(place){
        var reviews = []
        $http.get('/places/'+place.properties.id+'/get_reviews').success(function(data){
            angular.copy(data,reviews);
        })      
        return reviews
      }      
    }
    return places
}]);