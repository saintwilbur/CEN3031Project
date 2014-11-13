'use strict';

angular.module('admin').controller('AdminController',['$scope', '$http',
	function($scope,$http) {

		/**
		 * ship.client.view.html
		 */
		 



		 /**
		 * admin-orders.client.view.html
		 */

		 $scope.orders = [];
			//get orderId to verify  
			$scope.orderId = function() {
				var send = 
				{
					user: $scope.authentication.user._id
				};

				$http.get('/order/new',send).success(function(response) 
				{
					$scope.orders=response;
					return $scope.searchOrders;
				}).error(function(response) 
				{
					$scope.error = response.message;
				}
			}(); 
			
			
			






		 /**
		 * inventory.client.view.html
		 */
		var kitSelect = {};
		$scope.addKits = function()
		{
			var send = 
			{
				name: $scope.kitSelect.name,
				count: $scope.kitSelect.amount,
			};
			console.log(send);
			$http.post('/inventory/increment',send).success(function(response) 
			{
				$scope.results=response;

			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
		};		 	




		 /**
		 * customer-lab.client.view.html
		 */
	}
]);
