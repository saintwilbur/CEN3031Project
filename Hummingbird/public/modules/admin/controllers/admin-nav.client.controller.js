'use strict';

angular.module('admin').controller('AdminNavController', ['$scope','Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.notificationCount; // jshint ignore:line
		$scope.navLinks = [
		    { open: 'open', icon: 'glyphicon glyphicon-inbox', title:'Ship Kits', content:'/modules/admin/views/ship.client.view.html' },
		    { open: '', icon: 'glyphicon glyphicon-stats',title:'Order Status', content:'/modules/admin/views/admin-orders.client.view.html' },
		    { open: '', icon: 'glyphicon glyphicon-th-list',title:'Inventory', content:'/modules/admin/views/inventory.client.view.html' },
		    { open: '', icon: 'glyphicon glyphicon-list-alt',title:'View Labs & Customers', content:'/modules/admin/views/customer-lab.client.view.html' }
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