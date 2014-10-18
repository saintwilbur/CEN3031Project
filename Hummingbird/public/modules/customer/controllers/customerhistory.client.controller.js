'use strict';

var app1 = angular.module('customer');

app1.controller('CustomerhistoryController', 
	function($scope, OrderService) {
		$scope.order = OrderService.getData();
		$scope.checked = OrderService.getData().length !== 0;
	}
);

app1.factory('OrderService', 
	function() {
		return {
			getData: function() {
				return [
					{
						invoice: '5689',
						description: 'Gonorrhea Test',
						date: '10/02/2014',
						status: 'Open',
						shipDate: '10/12/2014',
						totalAmount:'$150.00'
					},

					{
						invoice: '2357',
						description: 'Herpes Test',
						date: '9/6/2014',
						status: 'Paid',
						shipDate:'11/15/2014',
						totalAmount:'$140.00'
					}
				];
			}
		};
	}
);