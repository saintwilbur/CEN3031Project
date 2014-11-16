'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {	

		// Admin state routing
		$stateProvider.
		state('admin-dashboard', {
			url: '/admin/admindashboard',
			templateUrl: 'modules/admin/views/admin-dashboard.client.view.html',
			onEnter: function()
			{
				document.body.style.backgroundImage='none';
				document.getElementById('appFooter').style.display='none';

			},
			onExit: function()
			{
				document.body.style.backgroundImage='url("/modules/core/img/tree1.jpg")';
				document.getElementById('appFooter').style.display='block';
			}
		});
	}
]);