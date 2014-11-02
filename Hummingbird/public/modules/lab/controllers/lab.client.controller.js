'use strict';

angular.module('lab').controller('LabController', ['$scope', '$rootScope',
	function($scope, $rootScope) {
		
		//input-result view 

		//verify view

		//completed view
		$scope.completedOrderList = function()
		{
			/*$http.get('RETURN COMPLETED METHOD',{user: $scope.authentication.user._id}).success(function(response) 
			{
				return response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});*/
		}();

		$scope.getOrderInfo = function(orderID)
		{
			/*$http.get('RETURN OrderInfo METHOD',{orderID}).success(function(response) 
			{
				return response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});*/
		}

		//lab-notifications view

		$scope.rejectedList = function()
		{
			/*$http.get('RETURN REJECT METHOD',{user: $scope.authentication.user._id}).success(function(response) 
			{
				return response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});*/
			$rootScope.$broadcast('Rejected Count Update', [1]);	
		}();

		$scope.getResultInfo = function()
		{
			/*$http.get('RETURN ResultInfo METHOD',{user: $scope.authentication.user._id}).success(function(response) 
			{
				return response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});*/
		}
	}
]);