Topdoner.controller('PlaceCtrl', ['$scope','$stateParams','places',function ($scope,$stateParams,places) {
  $scope.place = places.getPlace($stateParams.id)
  $scope.reviews = places.getReviews($stateParams.id)
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