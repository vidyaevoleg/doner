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
      getPlace: function(place_id){
        var place = []
          $http.get('/places/'+place_id).success(function(data){
              angular.copy(data,place);
          })      
        return place     
      },
      getReviews: function(place_id){
        var reviews = []
        $http.get('/places/'+place_id+'/get_reviews').success(function(data){
            angular.copy(data,reviews);
        })      
        return reviews
      }      
    }
    return places
}]);