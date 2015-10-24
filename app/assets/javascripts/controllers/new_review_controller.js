Topdoner.controller('NewReviewCtrl', ['$scope','$stateParams','places','$rootScope','$location',function ($scope,$stateParams,places,$rootScope,$location) {
  $scope.place = places.getPlace($stateParams.id)
}]);