Topdoner.controller('PlaceCtrl', ['$scope','$stateParams','places','$rootScope',function ($scope,$stateParams,places,$rootScope) {
  $scope.reviews = places.getReviews($stateParams.id)
  $scope.place = places.getPlace($stateParams.id)
  $scope.closePlace = function(place){
    $scope.place = undefined;
  }
  
  $scope.makeReviewCurrent = function(review){
    $scope.current_review = review;
    
  }
  $scope.closeReview = function(){
    $scope.current_review = undefined
  }
  
  $scope.changeWritingReview = function(){
    $scope.writing_review = !$scope.writing_review
  }
}]);