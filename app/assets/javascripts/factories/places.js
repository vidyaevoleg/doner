Topdoner.factory('places', ['$http','$location','$rootScope','$q',function($http,$location,$rootScope,$q){
      this.getPlaces = function(){
        return $http.get('/places/get_places').then(function(res){
            return res.data;
        })      
      }
      this.getPlace = function(place_id){
        return $http.get('/places/'+place_id).success(function(res){
            return res.data
        })  
      }
      this.getReviews = function(place_id){
        return $http.get('/places/'+place_id+'/get_reviews').success(function(res){
            if (res.data){
              return res.data
            }
        })      
      }
      this.deletePlace = function (place_id) {
        $http.delete('/places/'+place_id)
      }
      
      this.createPlace = function(place){
        $http.post('/places',{place: place}).success(function(data){
          $rootScope.place = data
          $rootScope.places.push(data)
          $location.path('/places/'+data.properties.id)
        })
      }

      return this
}]);