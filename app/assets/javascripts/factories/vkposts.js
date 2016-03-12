Topdoner.factory('vkposts', ['$http', '$q',function($http, $q){
      
      this.getVkPosts = function () {
        return $http.get('/vkposts.json').success( function (res) {
          return res;
        });
      }

      this.getVkPost = function (id) {
      	if (id) {
			   return $http.get('/vkposts/get_post', {params: {id: id}}).success( function (res) {
          		return res;
        	});  
      	} else {
			    return $http.get('/vkposts/get_post').success( function (res) {
          		return res;
        	});      		
      	}
      }

      this.deleteVkPost = function (id) {
      	return $http.delete('/vkposts/'+ id);
      }


      this.approve = function (vkpost_id, review) {
        return $http.post('/vkposts/' + vkpost_id + '/approve', {new_review: review});
      }

      return this
}]);