/*jshint eqeqeq:false, eqnull:false*/
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
				$scope.customers=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
		};

		/**
		 * ship.client.view.html
		 */
		$scope.waitingOrders = 
		[
		/*	{
				orderId: '012asfwe231',
				kit: 'Kit A',
				created: 'yesterday',
			},
			{
				orderId: '82fs0721jl',
				kit: 'Kit B',
				created: 'tomorrow',
			}*/
		];
		$scope.getWaitingOrders = function() 
		{
			$http.get('/order/placed').success(function(response) 
			{
				$scope.waitingOrders=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		}; 
		$scope.shipKit = function(index)
		{	
			var send = 
			{
				orderId: $scope.waitingOrders[index].orderId,
				item: $scope.waitingOrders[index].item
			};
			
			$http.post('/order/shipped', send).success(function(response) 
			{
				alert(response.message);
				$scope.getWaitingOrders();
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
			
		};

		 /**
		 * admin-orders.client.view.html
		 */
		$scope.otherOrders = [];
		$scope.getOtherOrders = function() 
		{
			$http.get('/order/listAll').success(function(response) 
			{
				$scope.otherOrders=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		}; 
		
			
		/**
		 * inventory.client.view.html
		 */
		
		$scope.kitSelect = {};
		$scope.changeKitAmount = {};
		$scope.increaseKitCount = function()
		{
			//Check to see if amount entered is an integer
			$scope.increaseKitSuccess = {};
			if(!isNaN($scope.kitSelect.amount) && ($scope.kitSelect.amount%1 === 0)) {
				console.log('is an Integer');
				var send = 
				{
					itemId: $scope.kitSelect.itemId,
					count: $scope.kitSelect.amount
				};	
				$http.post('/inventory/increment',send).success(function(response) 
				{
					alert(response.message);

				}).error(function(response) 
				{
					$scope.error = response.message;
				});
				$scope.increaseKitSuccess = true;
			}
			else {
				alert('Please enter in a number.');
				$scope.increaseKitSuccess = false;
			}
			$scope.kitSelect = {};

			$scope.getInventory();
			return $scope.increaseKitSuccess;
		};

		$scope.inventory = [];
		$scope.getInventory = function()
		{
			$http.get('/inventory/listAll').success(function(response) 
			{
				$scope.inventory=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
					console.log(response.message);

			}); 
		};
		/* jshint ignore:start */
		$scope.newKit = {};
		$scope.addNewKit = function()
		{
		$scope.addKitSuccess;
		console.log($scope.newKit.amount);

		if(!isNaN($scope.newKit.amount) && ($scope.newKit.amount%1 === 0)) {
			var send = 
			{
				name: $scope.newKit.itemId,
				count: $scope.newKit.amount
			};
			$http.post('/inventory/newKit', send).success(function(response) 
			{
				alert(send.name + ' has been created.');
				$scope.addKitSuccess = true;

			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		}
			else {
				alert('Please enter in a number.');
				$scope.addKitSuccess = false;
			}			
			$scope.newKit = {};
			$scope.getInventory();
			return $scope.addKitSuccess;
		};
		/* jshint ignore:end */
	}
]);
