/*jshint eqeqeq:false, eqnull:true*/
'use strict';

angular.module('core').controller('UserController', ['$scope', '$http', '$location', 'Authentication', '$rootScope',
	function($scope, $http, $location, Authentication, $rootScope) {

		$scope.authentication = Authentication;

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
		/* jshint ignore:start */
		$rootScope.$on('$locationChangeStart', function (event, next, current) {
		       
			if($scope.authentication.user=='')
			{
				if($location.path()!='/customer/' && $location.path()!='/lab/' && $location.path()!='/admin/')
				{
					$location.path('/');
				}
			}
			else if($scope.authentication.user.roles!='customer' && $scope.authentication.user.roles!='lab' && $scope.authentication.user.roles!='admin')
			{
				alert('Unauthorized Account');
				$http.get('/auth/signout').success(function(response) {
				}).error(function(response) {
					$scope.error = response.message;

				});
			}
			else if ($location.path().lastIndexOf('/'+$scope.authentication.user.roles+'/',0)!==0)
			{
				$location.path('/'+$scope.authentication.user.roles+'/');
			}
		 });
		/* jshint ignore:end */
	}
]);