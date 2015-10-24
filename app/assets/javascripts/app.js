var Topdoner = angular.module('Topdoner', ['yaMap','ui.router']);

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
	.state('new_review', {
	  url: '/places/{id}/new_review',
	  templateUrl: '/new_review.html',
	  controller: 'NewReviewCtrl'
	});
  $urlRouterProvider.otherwise('home');
}])