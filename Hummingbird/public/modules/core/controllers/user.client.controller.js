'use strict';

angular.module('core').controller('UserController', ['$scope', '$location',
	function($scope, $location) {
		this.user = 
		{
			header: '/modules/core/views/customer-header.client.view.html'
		};
		this.lab = 
		{
			header: '/modules/core/views/lab-header.client.view.html'
		};
		this.admin = 
		{
			header: '/modules/core/views/admin-header.client.view.html'
		};

		this.getHeader = function()
		{
			if($location.path().lastIndexOf('/customer/',0)===0)
			{
				return this.user.header;
			}
			else if($location.path().lastIndexOf('/lab/',0)===0)
			{
				return this.lab.header;
			} 
			else if($location.path().lastIndexOf('/admin/',0)===0)
			{
				return this.admin.header;
			}
		};
	}
]);