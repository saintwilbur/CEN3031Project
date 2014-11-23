'use strict';

angular.module('lab').controller('LabNavController', ['$scope','Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.notificationCount; // jshint ignore:line
		$scope.navLinks = [
			{ open: 'open', icon: 'glyphicon glyphicon-inbox', title: 'View Incoming Orders', content: '/modules/lab/views/list-orders.client.view.html'},
		    { open: '', icon: 'glyphicon glyphicon-plus', title:'Input New Result', content:'/modules/lab/views/input-result.client.view.html' },
		    { open: '', icon: 'glyphicon glyphicon-ok-sign',title:'Verify Pending Results', content:'/modules/lab/views/verify.client.view.html' },
		    { open: '', icon: 'glyphicon glyphicon-list-alt',title:'View Completed Orders', content:'/modules/lab/views/completed-order.client.view.html' },
		    { open: '', icon: 'glyphicon glyphicon-exclamation-sign',title:'Notifications', content:'/modules/lab/views/notifications.client.view.html' }

		  ];
		$scope.currentLink = $scope.navLinks[0];
		$scope.changeCurrent = function( index )
		{
			$scope.currentLink.open = '';
			$scope.currentLink = $scope.navLinks[index];
			$scope.currentLink.open = 'open';
		};

		$scope.$on('Rejected Count Update', function (event, args) 
		{
			$scope.notificationCount = args[0];
			var label = 'success';
			if(parseInt($scope.notificationCount)>0)
			{
				label = 'danger';
			}
			$scope.navLinks[4].html ='&nbsp;&nbsp;&nbsp;<span class="label label-'+label+ '">'+$scope.notificationCount+'</span>'; 
		});
	}
]);