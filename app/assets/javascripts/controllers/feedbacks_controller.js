Topdoner.controller('FeedbackCtrl', ['$scope','$location','$http', '$rootScope', function ($scope,$location,$http,$rootScope) {
  var creating =  true;
 
  $scope.types = ['Проблема', 'Пожелание', 'Партнерство', 'Другое'];

  $scope.new_feedback = {
    body: '',
    images_id: '',
    contacts: ''
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
  

  $scope.submitFeedback = function() {
  	var feedback = $scope.new_feedback,
  			current_user = $rootScope.current_user;

	  if (!current_user) {
		  if (feedback.body.length > 0 && feedback.contacts.length > 0) {
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
		  if (feedback.body.length > 0) {
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
