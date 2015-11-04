Topdoner.controller('UsersCtrl', ['$scope','$location','$rootScope','users',function ($scope,$location,$rootScope,users) {
  users.getCurrentUser().then(function(data){
    $rootScope.current_user = data
    $rootScope.signIn = function() {
      if ($scope.current_user){
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
  })


}]);

