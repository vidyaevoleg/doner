Topdoner.factory('users', ['$http','$location','$rootScope','$q',function($http,$location,$rootScope,$q){
    this.getCurrentUser = function(){            
      return $http.get('/get_current_user')
        .then(function(response) {
          return response.data.user;
      });            
    }
    this.logOut = function(){
      return $http.get('/logout').then(function(response){
        return response
      })
    } 
    return this;
}]);