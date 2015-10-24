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
	});
  $urlRouterProvider.otherwise('home');
}])