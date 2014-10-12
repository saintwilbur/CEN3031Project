'use strict';

angular.module('customer').controller('NewOrderCtrl', ['$scope', 'Authentication',
	function($scope, Authentication) {
		
		$scope.authentication = Authentication;

		$scope.test = function()
		{
			console.log('Testing: ', $scope.authentication.user);
		};
	}
]);