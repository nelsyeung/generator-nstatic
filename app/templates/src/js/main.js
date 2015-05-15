'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	/**
	 * Routes
	 */
	$locationProvider.html5Mode(true);
	// $locationProvider.hashPrefix('!');

	$routeProvider.
		when('/', {
			templateUrl: 'partials/home.html'
		}).
	otherwise({
		redirectTo: '/'
	});
}]);
