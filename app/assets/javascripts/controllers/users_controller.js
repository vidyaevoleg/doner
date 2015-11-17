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
    var user = $rootScope.current_user;
    if (user){
      if (object.id){
        // review
        if ((user.id == object.author.id) || (user.role == 'admin')){
          return true
        } else {
          return false
        } // place
      } else if (object.properties){
        if ((user.id == object.properties.author.id) || (user.role == 'admin')){
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

