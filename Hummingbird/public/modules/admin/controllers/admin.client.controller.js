'use strict';

angular.module('admin').controller('AdminController',['$scope', '$http','Authentication',
	function($scope,$http, Authentication) {
		$scope.authentication = Authentication;

		/**
		 * customer-lab.client.view.html
		 */
		$scope.tabs = [
			{ title:'Lab Technicians', content:'/modules/admin/views/lab-info.client.view.html' },
			{ title:'Customers', content:'/modules/admin/views/customer-info.client.view.html' }
		];
		var test = true;
		$scope.tabs[0].active = true;


		$scope.getLabs = function()
		{
			$http.get('/users/labs').success(function(response) 
			{
				//console.log(response);
				$scope.labs=response;

			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
		};

		$scope.getCustomer = function()
		{
			$http.get('/users/customers').success(function(response) 
			{
				//console.log(response);
				$scope.customers=response;

			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
		};

		/**
		 * ship.client.view.html
		 */
		$scope.waitingOrders = [];
		$scope.getWaitingOrders = function() {
			$http.get('/order/listRegistered').success(function(response) 
			{
				$scope.waitingOrders=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		}; 



		 /**
		 * admin-orders.client.view.html
		 */
		$scope.shippedOrders = [];
		$scope.getShippedOrders = function() {
			$http.get('/order/listNotPlaced').success(function(response) 
			{
				$scope.shippedOrders=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		}; 
		
			
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
			$http.post('/inventory/increment',send).success(function(response) 
			{
				$scope.results=response;

			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
		};		 	
		$scope.inventory = {};
		$scope.getInventory = function()
		{
			$http.get('/inventory/listAll').success(function(response) 
			{
				$scope.inventory=response;

			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
		};
		

	}
]);
