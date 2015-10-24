Topdoner.controller('NewReviewCtrl', ['$scope','$stateParams','places','$rootScope','$location','$http',function ($scope,$stateParams,places,$rootScope,$location,$http) {
  $scope.place = places.getPlace($stateParams.id)
  $scope.new_review = {
    place_id: $stateParams.id,
    meat: '',
    body: '',
    vegetables: '',
    service: '',
    sanitation: '',
    images_id: ''
  }
  $scope.dropzone = function(){
    var mediaDropzone = new Dropzone("#media-dropzone")
    return mediaDropzone.on("success", function(file, responseText) {
      if ($scope.new_review.images_id.length > 0){
        $scope.$apply( $scope.new_review.images_id = $scope.new_review.images_id + ','+ responseText.id.toString())
      } else {
        $scope.$apply( $scope.new_review.images_id = $scope.new_review.images_id + responseText.id.toString())
      }
    });
  }
  $scope.submitReview = function(){
    var review = $scope.new_review
    $http.post('/reviews',{review: review}).success(function(data){
      console.log('allright')
      $location.path('/places/'+ $stateParams.id)
    }).error(function(data,status){
      alert('error')
    })      
  }
}]);