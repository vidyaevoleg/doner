Topdoner.controller('NewPlaceCtrl', ['$scope','places','$location','$rootScope', function ($scope,places,$location,$rootScope) {
  $scope.images_id = ''
  var creating =  true
  $scope.createPlace = function(e){
    if (creating) {
        var new_place = $scope.new_place
      new_place['images_id'] = $scope.images_id
      places.createPlace(new_place)  
    };
    creating = false;
  }
  
  $scope.signIn = function(){
    if ($rootScope.current_user){
      return true
    } else {
      $location.path('/home'); 
      $rootScope.openPopup('.popup-login');
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
      $('.lo-r-card').css('background-image','url('+responseText.image.file.url+')')
      $('.add-place-dropzone').fadeOut(500)
      if ($scope.images_id.length > 0){
        $scope.$apply( $scope.images_id = $scope.images_id + ','+ responseText.image.id.toString())
      } else {
        $scope.$apply( $scope.images_id = $scope.images_id + responseText.image.id.toString())
      }
    });
  }
}]);
