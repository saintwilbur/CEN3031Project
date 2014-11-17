'use strict';

angular.module('customer').controller('NewOrderCtrl', ['$scope', '$rootScope', 'Authentication', '$http',
	function($scope,$rootScope, Authentication, $http) {
		
		$scope.authentication = Authentication;

		$scope.submitOrder = function()
		{
			//var fieldArray = [$scope.formData.field1, $scope.formData.field2, $scope.formData.field3];

			var send = 
			{
				user: $scope.authentication.user._id,
				item: 'KitA'
				/**
				 *forms: 
				 *{
				 *	name: 'Sample Test',
				 *	fieldTest: fieldArray
				 *}
				 */
			};
			$http.post('/order/new', send).success(function(response) {
				$rootScope.$broadcast('refreshOrders');
				$scope.formData={};
				$scope.item='';
				 alert('Your Order has been submitted.');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);