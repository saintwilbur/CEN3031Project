'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('customer', {
			url: '/customer/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
		$stateProvider.
		state('lab', {
			url: '/lab/',
			templateUrl: 'modules/core/views/lab-home.client.view.html'
		});
		$stateProvider.
		state('admin', {
			url: '/admin/',
			templateUrl: 'modules/core/views/admin-home.client.view.html'
		});
	}
]);
