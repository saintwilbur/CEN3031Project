'use strict';

//Setting up route
angular.module('customer').config(['$stateProvider',
	function($stateProvider) {
		// Customer state routing
		$stateProvider.
		state('dashboard', {
			url: '/customerdashboard',
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
