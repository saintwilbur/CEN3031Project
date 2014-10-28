'use strict';

angular.module('lab').controller('LabNavController', ['$scope',
	function($scope) {
		$scope.navLinks = [
		    { open: 'open', icon: 'glyphicon glyphicon-plus', title:'Input New Result', content:'/modules/customer/views/new-order.client.view.html' },
		    { open: '', icon: 'glyphicon glyphicon-ok-sign',title:'Verify Pending Results', content:'/modules/customer/views/pending.client.view.html' },
		    { open: '', icon: 'glyphicon glyphicon-list-alt',title:'View Completed Orders', content:'' },
		    { open: '', icon: 'glyphicon glyphicon-exclamation-sign',title:'Notifications', content:'' }
		  ];
		$scope.currentLink = $scope.navLinks[0];
		$scope.changeCurrent = function( index )
		{
			$scope.currentLink.open = '';
			$scope.currentLink = $scope.navLinks[index];
			$scope.currentLink.open = 'open';
		};
	}
]);