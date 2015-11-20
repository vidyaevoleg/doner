Topdoner.controller('EditPlaceCtrl', ['$scope','places','$http','$location','$rootScope', function ($scope,places,$http,$location,$rootScope) {
  $scope.images_id = ''
  $scope.signIn = function(){
    if ($rootScope.current_user){
      return true
    } else {
      $location.path('/home'); 
      $rootScope.openPopup('.popup-login');
    }
  }
  $scope.updatePlace = function () {
  	var place = $rootScope.place
  	$http.put('/places/'+ place.properties.id, {place: {images_id: $scope.images_id}}).then(function(res){
      var updated_place = res.data;
      $rootScope.places.splice($rootScope.places.indexOf(place), 1);
      $rootScope.places.push(updated_place)
      $location.path('/places/'+ updated_place.properties.id)
    })
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
      $('.lo-r-card-bg').css('background-image','url('+responseText.image.file.url+')')
      if ($scope.images_id.length > 0){
        $scope.$apply( $scope.images_id = $scope.images_id + ','+ responseText.image.id.toString())
      } else {
        $scope.$apply( $scope.images_id = $scope.images_id + responseText.image.id.toString())
      }
    });
  }
}]);
