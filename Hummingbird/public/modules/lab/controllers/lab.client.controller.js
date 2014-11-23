/* jshint ignore:start */
'use strict';

angular.module('lab').controller('LabController', ['$scope', '$rootScope', '$http', 'Authentication',
	function($scope, $rootScope, $http, Authentication) {
		$scope.authentication = Authentication;

		/**
		 * input-result.client.view.html
		 */
		$scope.verifiers = [];
		$scope.getVerifiers = function()
		{	var send = {labId: $scope.authentication.user.userId};
			$http.get('/auth/labTech', send).success(function(response) 
			{
				$scope.verifiers=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		};
		
			/*{DisplayName: 'John Doe', id:'7aa8fae044969e'},
			{DisplayName: 'Jane Doe', id:'6dcf9de1eecd21'},
			{DisplayName: 'Chicken Little', id: 'e96b881f111303'}*/
	
		$scope.formData = {};
		$scope.submitResult = function()
		{	
			$scope.formData.userId=$scope.authentication.user.userId;
			$http.post('/result/new', $scope.formData).success(function(response) 
			{
				alert(response.message);
			}).error(function(response) 
			{
				$scope.error = response.message;
				alert(response.message);
			});
			$scope.resetResult();
		};
		$scope.resetResult = function()
		{
			$scope.formData = {};
			 $scope.inputResult.$setPristine();
		};

		/**
		 * verify.client.view.html
		 */

		/**
		 * completed-order.client.view.html
		 */
		$scope.completedOrders = [];
		$scope.completedOrderList = function()
		{
			
			$http.get('/order/labCompletedOrders').success(function(response) 
			{
				$scope.completedOrders = response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
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
		};

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
			$rootScope.$broadcast('Rejected Count Update', [3]);	
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
		};
		$scope.registeredOrders = [];
		$scope.getRegistered = function() 
		{
			$http.get('/order/listRegistered').success(function(response) 
			{
				$scope.registeredOrders=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		}; 
	}
]);
/* jshint ignore:end */
