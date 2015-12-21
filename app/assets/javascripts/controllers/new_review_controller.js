Topdoner.controller('NewReviewCtrl', ['$scope','$stateParams','places','$rootScope','$location','$http',function ($scope,$stateParams,places,$rootScope,$location,$http) {
  var creating =  true;
  $scope.signIn = function(){
    if ($rootScope.current_user){
      return true
    } else {
      $location.path('/places/'+$stateParams.id); 
      $rootScope.openPopup('.popup-login')
    }
  }  
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
    anonym: false,
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
        $scope.$apply( $scope.new_review.images_id = $scope.new_review.images_id + ','+ responseText.image.id.toString())
      } else {
        $scope.$apply( $scope.new_review.images_id = $scope.new_review.images_id + responseText.image.id.toString())
      }
    });
  }

  $rootScope.reviewValid = function(review){
    if (review.body.length < 300) {
      return false
    } else {
      return true
    }
  }

  $scope.submitReview = function(){
    var review = $scope.new_review
      if ($rootScope.reviewValid(review)){
        $http.post('/reviews',{review: review}).success(function(data){
          var updated_place = data.place;
          $rootScope.places.splice($rootScope.places.indexOf($rootScope.place), 1);
          $rootScope.places.push(updated_place);
          $location.path('/places/'+ $stateParams.id)
        }).error(function(data,status){
          alert('error')
        })
      } else {
		  $('.add-review-submit').after('<p class="add-review-error" style="color: red;">Слишком немногословный обзор. Попробуйте еще</p>');
		  setTimeout(function(){
			  $('.add-review-error').fadeTo(900, 0);
			  setTimeout(function(){
				  $('.add-review-error').addClass('hidden');
			  }, 901);
		  }, 500);
	  }
  }
  $scope.closePlace = function(place){
    $location.path('/home')
  }  
  
  $scope.openExtRates = function() {
	  var panel = $('.add-review-extrate');
	  if (panel.hasClass('hidden')) {
		  panel.removeClass('hidden').css('opacity', '0').fadeTo(600,1);
	  }
  }
  
  
}]);