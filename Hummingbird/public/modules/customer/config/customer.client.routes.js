'use strict';

//Setting up route
angular.module('customer').config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider,$urlRouterProvider) {

		// Customer state routing
		$stateProvider.
		state('customer-dashboard', {
			url: '/customer/customerdashboard',
			templateUrl: 'modules/customer/views/dashboard.client.view.html',
			onEnter: function()
			{
				document.body.style.backgroundImage='none';

			},
			onExit: function()
			{
				document.body.style.backgroundImage='url("/modules/core/img/tree1.jpg")';

			}
		});
	
	}
]);
