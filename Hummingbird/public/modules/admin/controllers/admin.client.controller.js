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
				orderId: $scope.waitingOrders[index].orderId
			};
			/* jshint ignore:start */
			$http.post('/order/shipped', send).success(function(response) 
			{
				if(response.message != '')
				{
					alert(response.message);
				}
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
			/* jshint ignore:end */
		};

		 /**
		 * admin-orders.client.view.html
		 */
		$scope.shippedOrders = [];
		$scope.getOtherOrders = function() 
		{
			$http.get('/order/list').success(function(response) 
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
		$scope.increaseKitCount = function()
		{
			console.log($scope.kitSelect);

			var send = 
			{
				name: $scope.kitSelect.itemId,
				count: $scope.kitSelect.amount,
			};
			$http.post('/inventory/increment',send).success(function(response) 
			{
				$scope.results=response;

			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
			$scope.newKit = {};
			$scope.changeKitAmount.$setPristine(); 
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
			console.log($scope.newKit);
			var send = 
			{
				name: $scope.newKit.name,
				count: $scope.newKit.initalAmount
			};
			$http.post('/inventory/newKit', send).success(function(response) 
			{
				console.log('hi');
				if(response.message != '')
				{
					alert(response.message);
				}
			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
			$scope.newKit = {};
			$scope.addToInventory.$setPristine();
		};
		/* jshint ignore:end */
	}
]);
