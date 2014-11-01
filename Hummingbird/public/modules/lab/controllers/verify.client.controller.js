'use strict';

angular.module('lab').controller('VerifyController', ['$scope', '$rootScope', 'Authentication','$http', 
	function($scope, $rootScope, Authentication, $http) {
			$scope.authentication = Authentication;
			$scope.orders = [{orderId: '12345', date: 'dateHere' }];
			$scope.searchOrders = [];
			//getOrders to verify  
			$scope.searchOrders = function() {
				
				$http.get('/order/verify',{user: $scope.authentication.user._id}).success(function(response) 
				{
					$scope.searchOrders=response;
					return $scope.searchOrders;
				}).error(function(response) 
				{
					$scope.error = response.message;
				}); 
			};
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
			$scope.$on('refreshOrders', function (event) 
			{
				$scope.getPendingOrders();
			});
				
			$scope.searchOrder = function()
			{
				//var fieldArray = [$scope.formData.field1, $scope.formData.field2, $scope.formData.field3];

				var search = 
				{
					ID: $scope.search
				};
				$http.post('/order/verify', search).success(function(response) {
					$rootScope.$broadcast('refreshOrders');
					$scope.search={};
				}).error(function(response) {
					$scope.error = response.message;
				});
			};
				
				
			}





			$scope.dynamicPopover = 'Hello, World!';
  			$scope.dynamicPopoverTitle = 'Title';
		]);
