var Topdoner = angular.module('Topdoner_admin', ['yaMap']);

Topdoner.filter('isRated', function () {
  return function (items) {
    return items.filter(function (item) {
      return parseInt(item.properties.rating) > 0
    })
  }
});

Topdoner.filter('getPlaceById', function() {
  return function (input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].properties.id == id) {
        return input[i];
      }
    }
    return null;
  }
});

Topdoner.filter('getReviewById', function () {
  return function (input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].id == id) {
        return input[i];
      }
    }
    return null;
  }
});




Topdoner.service('dataProvider', ['places','users', 'vkposts', '$filter', function (places, users, vkposts, reviews, $filter) {


	// if (!($scope.current_user)) {
	//     users.getCurrentUser().then(function(data){
	//     	$scope.current_user = data;
	//     })
	// }
		
	var obj = {
		

	}

	return obj;
}]);



Topdoner.directive('starRating',
	['$compile',function($compile) {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	}]
);

