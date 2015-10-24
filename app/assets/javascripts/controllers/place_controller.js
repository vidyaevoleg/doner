Topdoner.controller('PlaceCtrl', ['$scope','$stateParams','places','$rootScope','$location',function ($scope,$stateParams,places,$rootScope,$location) {
  $scope.reviews = places.getReviews($stateParams.id)
  $rootScope.place = places.getPlace($stateParams.id)

  $scope.closePlace = function(place){
    $location.path('/home')
  }
  
  $scope.makeReviewCurrent = function(review){
    $scope.current_review = review;
    console.log(review)
    
  }
  $scope.closeReview = function(){
    $scope.current_review = undefined
  }
  
  $scope.changeWritingReview = function(){
    $scope.writing_review = !$scope.writing_review
  }
  $scope.writeReview = function(place){
    $location.path('/places/'+place.properties.id+'/new_review')
  }
}]);