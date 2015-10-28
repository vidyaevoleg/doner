var Topdoner = angular.module('Topdoner', ['yaMap','ui.router']);
Topdoner.filter('isRated', function () {
  return function(items) {
    return items.filter(function(item){
      return item.properties.rating
    })
  }
})

Topdoner.directive('starRating',
	function() {
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
	}
);

Topdoner.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	  $stateProvider
		.state('home', {
		  url: '/home',
		  templateUrl: '/index.html',
		  controller: 'PlacesCtrl'
		})
		.state('places', {
		  url: '/places/{id}',
		  templateUrl: '/place.html',
		  controller: 'PlaceCtrl'
		})
		.state('new_place', {
		  url: '/create_place',
		  templateUrl: '/create_place.html',
		  controller: 'NewPlaceCtrl'
		})
		.state('new_review', {
		  url: '/places/{id}/new_review',
		  templateUrl: '/new_review.html',
		  controller: 'NewReviewCtrl'
		});
	  $urlRouterProvider.otherwise('home');
}])