'use strict';

//Setting up route
angular.module('lab').config(['$stateProvider',
	function($stateProvider) {
		// Lab state routing
		$stateProvider.
		state('lab-dashboard', {
			url: '/labdashboard',
			templateUrl: 'modules/lab/views/lab-dashboard.client.view.html',
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