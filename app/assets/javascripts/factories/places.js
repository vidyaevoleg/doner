Topdoner.factory('places', ['$http','$location','$rootScope',function($http,$location,$rootScope){
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
      },
      deletePlace: function (place_id) {
        $http.delete('/places/'+place_id)
      },
      createPlace: function(place){
        $http.post('/places',{place: place}).success(function(data){
          $rootScope.place = data
          $rootScope.places.push(data)
          $location.path('/places/'+data.properties.id)
        })
      }      
    }
    return places
}]);