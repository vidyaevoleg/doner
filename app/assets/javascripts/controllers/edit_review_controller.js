Topdoner.controller('EditReviewCtrl', ['$scope','$filter','$stateParams','places','reviews','$rootScope','$location','$http',function ($scope,$filter,$stateParams,places,reviews,$rootScope,$location,$http) {
  $scope.openExtRates = function() {
    var panel = $('.add-review-extrate');
    if (panel.hasClass('hidden')) {
      panel.removeClass('hidden').css('opacity', '0').fadeTo(600,1);
    }
  }

  $scope.new_images_id = '';

  $scope.signIn = function(){
    if ($rootScope.current_user){
      return true
    } else {
      $location.path('/places/'+$stateParams.id); 
      $rootScope.openPopup('.popup-login')
    }
  }  

  $scope.updateReview = function() {
    var review = $rootScope.review;
    review['place_id'] = $scope.place.properties.id;
    delete review['images'];
	  review.body = review.body_nl;
    review['images_id'] = $scope.new_images_id; 
    if ($scope.reviewValid(review)){
      $http.put('/reviews/'+review.id,{review: review}).then(function(res) {
        var updated_place = res.data.place;
        $rootScope.places.splice($rootScope.places.indexOf($rootScope.place), 1);
        $rootScope.places.push(updated_place);
        $location.path('/places/'+ updated_place.properties.id); 
      })
    } 
  }

  $scope.reviewValid = function(review){
    if (review.body.length < 400) {
      return false
    } else {
      return true
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
