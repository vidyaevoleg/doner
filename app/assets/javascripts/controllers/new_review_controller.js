Topdoner.controller('NewReviewCtrl', ['$scope','$stateParams','places','$rootScope','$location','$http',function ($scope,$stateParams,places,$rootScope,$location,$http) {


//  $scope.rateFunction = function(rating) {
////   console.log('Rating selected - ' + rating);
//  };
  $scope.signIn = function(){
    if ($rootScope.current_user){
      return true
    } else {
      // вернуться назад нужно
      $rootScope.openPopup('.popup-login')
    }
  }
  $scope.place = places.getPlace($stateParams.id)
  $scope.new_review = {
    place_id: $stateParams.id,
    meat: 1,
    body: '',
    vegetables: 1,
    service: 1,
    sanitation: 1,
    images_id: '',
    min_price: '',
    max_price: '',
    total: 1,
    title: ''
  }
  $scope.dropzone = function(){
    var mediaDropzone = new Dropzone("#media-dropzone")
    mediaDropzone.options.dropzone = {
      maxFiles: 3,
      accept: function(file, done) {
        console.log("uploaded");
        done();
      },
      init: function() {
        this.on("maxfilesexceeded", function(file){
            alert("No more files please!");
        });
      }
    }
    return mediaDropzone.on("success", function(file, responseText) {
      if ($scope.new_review.images_id.length > 0){
        $scope.$apply( $scope.new_review.images_id = $scope.new_review.images_id + ','+ responseText.id.toString())
      } else {
        $scope.$apply( $scope.new_review.images_id = $scope.new_review.images_id + responseText.id.toString())
      }
    });
  }
  function reviewValid(review){
    if ((review.place_id.length < 1) || (review.meat.length < 1) || (review.vegetables.length < 1) || (review.body.length < 1) || (review.service.length<1) || (review.sanitation.length <1)){
      alert('чувак заполни все формы')
      return false
    }
    return true
  }

  $scope.submitReview = function(){
    var review = $scope.new_review
    if (reviewValid(review)){
      $http.post('/reviews',{review: review}).success(function(data){
        $location.path('/places/'+ $stateParams.id)
      }).error(function(data,status){
        alert('error')
      })       
    }  
  }
  $scope.closePlace = function(place){
    $location.path('/home')
  }  
}]);