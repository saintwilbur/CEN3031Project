'use strict';

angular.module('customer').controller('PendingController', ['$scope', 'Authentication', '$http', 'User',
	function($scope, Authentication, $http, User) {
		$scope.authentication = Authentication;
		$scope.orders = [];
		//getPendingOrders();  

		$scope.getPendingOrders = function()
		{
			$http.get('/order/pending',{user: $scope.authentication.user._id}).success(function(response) 
			{
				$scope.orders=response;
				return $scope.orders;
			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
		};
		$scope.$on('refreshOrders', function (event) {
			$scope.getPendingOrders();
		});
	}
]);
