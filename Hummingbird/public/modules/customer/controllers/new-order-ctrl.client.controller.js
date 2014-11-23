'use strict';

angular.module('customer').controller('NewOrderCtrl', ['$scope', '$rootScope', 'Authentication', '$http',
	function($scope,$rootScope, Authentication, $http) {
		
		$scope.authentication = Authentication;

		$scope.availableKits = [];
		$scope.getKits = function()
		{
			$http.get('/inventory/listAll').success(function(response) 
			{
				$scope.availableKits=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
					console.log(response.message);

			}); 
		};
		$scope.formData = {};
		$scope.submitOrder = function()
		{
			//var fieldArray = [$scope.formData.field1, $scope.formData.field2, $scope.formData.field3];
			var send = 
			{
				item: $scope.formData.kitName,
				billing: {
					cardHolderName: 'holderName',
					cardNumber: '123456789',
					address: {
						streetNumber: '123',
						streetName: 'street',
						city: 'city',
						state: 'Florida',
						zipCode: 12345
					}
				},		
				shippingAddress: {
					streetNumber: '123',
					streetName: 'street',
					city: 'city',
					state: 'Florida',
					zipCode: 12345
				}
			};
			$http.post('/order/new', send).success(function(response) {
				alert('Your Order for a '+ send.item +' test kit has been submitted.');
				console.log(response);
			}).error(function(response) {
				$scope.error = response.message;
			});
			$scope.closeOrderForm();
		};
		$scope.closeOrderForm = function()
		{
			$scope.formData = {};
			$scope.sampleTest.$setPristine();
			$scope.$emit('closeModal');
		};
	}
]);