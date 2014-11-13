'use strict';

angular.module('admin').controller('AdminController',['$scope', '$http','Authentication',
	function($scope,$http, Authentication) {
		$scope.authentication = Authentication;

		/**
		 * customer-lab.client.view.html
		 */
		$scope.tabs = [
			{ title:'Lab', content:'/modules/admin/views/lab-info.client.view.html' },
			{ title:'Customer', content:'/modules/admin/views/customer-info.client.view.html' }
		];
		var test = true;
		$scope.tabs[0].active = true;

		$scope.alertMe = function() 
		{
			setTimeout(function() 
			{
				alert('You\'ve selected the alert tab!');
			});
		};

		$scope.getSubmittedResults = function()
		{
			$http.get('/result/verifierList',{userId: $scope.authentication.user.userId}).success(function(response) 
			{
				$scope.results=response;
				console.log('Testing Submit Results');

			}).error(function(response) 
			{
				$scope.error = response.message;
			}); 
		};


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
		)}; 
		
			
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
		

	}
]);
