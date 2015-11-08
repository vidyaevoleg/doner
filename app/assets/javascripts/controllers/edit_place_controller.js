Topdoner.controller('EditPlaceCtrl', ['$scope','places','$location','$rootScope', function ($scope,places,$location,$rootScope) {
  $scope.signIn = function(){
    if ($rootScope.current_user){
      return true
    } else {
      $location.path('/home'); 
      $rootScope.openPopup('.popup-login');
    }
  }
}]);
