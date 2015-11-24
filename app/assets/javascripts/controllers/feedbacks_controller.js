Topdoner.controller('FeedbackCtrl', ['$scope','$location','$http',function ($scope,$location,$http) {
  var creating =  true;
 
  $scope.types = ['Проблема', 'Пожелание', 'Партнерство', 'Другое'];

  $scope.new_feedback = {
    body: '',
    images_id: '',
    feedback_type: ''
  };
	
	
	$scope.addFeedbackImg = function() {
	  $scope.cls($('.lo-r-fb-addimg'));
	  setTimeout(function(){
		  $scope.opn($('.lo-r-fb-dropzone'));
	  }, 300);
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
      if ($scope.new_feedback.images_id.length > 0){
        $scope.$apply( $scope.new_feedback.images_id = $scope.new_feedback.images_id + ','+ responseText.image.id.toString())
      } else {
        $scope.$apply( $scope.new_feedback.images_id = $scope.new_feedback.images_id + responseText.image.id.toString())
      }
    });
  }
  

  $scope.submitFeedback = function(current_user){
	  if (!current_user) {
		  if ($('.lo-r-fb-body').val().length > 0 && $('.lo-r-fb-who input').val().length > 0) {
			var feedback = $scope.new_feedback;
			if (creating) {
			  $http.post('/feedbacks',{feedback: feedback}).success(function(data){
				$location.path('/home')
			  }).error(function(data,status){
				$location.path('/home')
			  })       
			}
			creating = false;  
		  }
	  } else {
		  if ($('.lo-r-fb-body').val().length > 0) {
			var feedback = $scope.new_feedback;
			if (creating) {
			  $http.post('/feedbacks',{feedback: feedback}).success(function(data){
				$location.path('/home')
			  }).error(function(data,status){
				$location.path('/home')
			  })       
			}
			creating = false;  
		  }
	  }
  }
  
  
}]);
