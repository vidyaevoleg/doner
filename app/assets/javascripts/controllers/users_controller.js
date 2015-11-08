Topdoner.controller('UsersCtrl', ['$scope','$location','$rootScope','users',function ($scope,$location,$rootScope,users) {
  $rootScope.signIn = function() {
    if ($rootScope.current_user){
      true
    } else {
      false
    }
  }
  $rootScope.logOut = function(){
    users.logOut().then(function(){
      $rootScope.current_user = undefined
      $location.path('/home');
    }) 
  }
  $rootScope.can = function(object) {
    if ($rootScope.current_user){
      if (object.id){
        // review
        if ($rootScope.current_user.id == object.author.id){
          return true
        } else {
          return false
        }
      } else if (object.properties){
        if ($rootScope.current_user.id == object.properties.author.id){
          return true
        } else {
          return false
        }
      } else { return false }
    } else {
      return false
    } 
  }
}]);

