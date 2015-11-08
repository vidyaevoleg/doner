Topdoner.controller('EditReviewCtrl', ['$scope','$stateParams','places','reviews','$rootScope','$location','$http',function ($scope,$stateParams,places,reviews,$rootScope,$location,$http) {
  $scope.place = places.getPlace($stateParams.id)
  $scope.openExtRates = function() {
    var panel = $('.add-review-extrate');
    if (panel.hasClass('hidden')) {
      panel.removeClass('hidden').css('opacity', '0').fadeTo(600,1);
    }
  }

  $scope.new_images_id = ''
  $scope.signIn = function(){
    if ($rootScope.current_user){
      return true
    } else {
      $location.path('/places/'+$stateParams.id); 
      $rootScope.openPopup('.popup-login')
    }
  }  

  $scope.updateReview = function(){
    var review = $rootScope.review
    review['place_id'] = $scope.place.properties.id
    delete review['images']
    review['images_id'] = $scope.new_images_id    
    if ($rootScope.reviewValid(review)){
      console.log('valid')
      $http.put('/reviews/'+review.id,{review: review}).then(function(){
        $location.path('/places/'+ $stateParams.id)
      })
    } 
  }

  $scope.deleteImage = function (image_id) {
    $('#image-'+image_id).toggle(400)
    $http.delete('/images/'+image_id)
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
      console.log(responseText)
      if ($scope.new_images_id.length > 0){
        $scope.$apply( $scope.new_images_id = $scope.new_images_id + ','+ responseText.image.id.toString())
      } else {
        $scope.$apply( $scope.new_images_id = $scope.new_images_id + responseText.image.id.toString())
      }
    });
  }

  
  
}]);