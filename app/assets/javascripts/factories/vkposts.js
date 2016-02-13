Topdoner.factory('vkposts', ['$http', '$q',function($http, $q){
      
      this.getVkPosts = function () {
        return $http.get('/vkposts.json').success( function (res) {
          return res;
        });
      }

      return this
}]);