Topdoner.controller('NewPlaceCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
  

  $scope.images_id = '';
  
  var creating =  true
  
  $scope.createPlace = function(e){
    if (creating) {
        var new_place = $scope.new_place
      new_place['images_id'] = $scope.images_id
      $rootScope.createFuckingPlace(new_place)  
    };
    creating = false;
  }
  
  $scope.undefineNewPlace = function() {
      $rootScope.new_place = undefined;
  }

  $scope.signIn = function(){
    if ($rootScope.current_user){
      return true
    } else {
      $location.path('/home'); 
      $rootScope.openPopup('.popup-login');
    }
  }
  
  $scope.updateImg = function() {
	  $scope.cls($('.add-place-updateimg'));
	  setTimeout(function(){
		  $rootScope.opn($('.add-place-title'));
	  	$rootScope.opn($('.add-place-dropzone'));
	  }, 201);
  }

  $rootScope.validNewPlace = function() {
    if ($scope.new_place_img) {
      $('.lo-r-card-newplace').mouseenter(function(){
        $rootScope.stopBlur();
      }).mouseleave(function(){
        $rootScope.startBlur();
      });
    }
    if ($scope.new_place && $rootScope.new_place_img) {
      $rootScope.opn($('.add-place-submit'));
    } else {
      return false;
    }
  }
  
  $scope.dropzone = function(){
    var mediaDropzone = new Dropzone("#media-dropzone")
    mediaDropzone.options.dropzone = {
      maxFiles: 1,
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
      $('.lo-r-card-bg').css('cssText','background-image: url('+responseText.image.file.url+'); background-position: center; background-size: 100%;');
		
		setTimeout(function(){
			$scope.opn($('.lo-r-addplace-checkmark-img'));
			$scope.opn($('.add-place-submit-wrap'));
			$scope.opn($('.add-place-updateimg'));
			$rootScope.new_place_img = true;
			$scope.validNewPlace();
		}, 400);
      if ($scope.images_id.length > 0){
        $scope.$apply( $scope.images_id = $scope.images_id + ','+ responseText.image.id.toString())
      } else {
        $scope.$apply( $scope.images_id = $scope.images_id + responseText.image.id.toString())
      }
    });
  }
}]);
