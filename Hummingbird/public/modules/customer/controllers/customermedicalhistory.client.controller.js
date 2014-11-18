'use strict';

angular.module('customer').controller('CustomermedicalhistoryController', ['$scope', '$rootScope', '$http', 'Authentication', 'User', 'MedicalHistory',
	function($scope, $rootScope, $http, Authentication, User, MedicalHistory) {
		// Customerorder controller logic
		// ...
		$scope.authentication = Authentication;
		$scope.medicalHistory = null;
		$scope.getMedicalHistory = function() 
		{
			$http.get('/medicalHistory/get', {user: $scope.authentication.user._id}).success(function(response){
				$scope.medicalHistory = response;
				//console.log(response);
				console.log($scope.authentication.user._id);
				return $scope.medicalHistory;
			}).error(function(response){
				$scope.error = response.message;
			});
		};
		$scope.$on('refreshMedHis', function (event) {
			$scope.getMedicalHistory();
		});
		
		$scope.cancel = function() {
			$scope.$emit('closeModal');
		};

		$scope.submit = function() {

			var send = 
			{
				user: $scope.authentication.user._id,
				field1: $scope.medicalHistory.field1,
				field2: $scope.medicalHistory.field2,
				field3: $scope.medicalHistory.field3
			};

			$http.post('/medicalHistory/create', send).success(function(response) 
			{
				$rootScope.$broadcast('refreshMedicalHistory');
				$scope.medicalHistory={};

				alert('Your medical hisory has been submitted.');
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		};

		$scope.myTesting = function() {

			var send= {
				item: 'nancytest6',
				user: $scope.authentication.user._id,
				fields: {
					field1: 'field1',
					field2: 'field2'
				},
				billing: {
					cardHolderName: 'Nancy',
					cardNumber: 48456564464,
					address: {
						streetNumber: 955,
						streetName: 'Main',
						city: 'Gaines',
						state: 'Florida',
						zipCode: 3595
					}
				}
			};

			var orderIdParm = {
				orderId: 59249781995
			};
			$http.get('/order/getShipping', orderIdParm).success(function(response){
					console.log(response);
					alert(response);
				}).error(function(response){
					$scope.error = response.message;
					alert('bad');
				});
		};

		$scope.customers = function() {

			$http.get('/users/customers').success(function(response){
					alert(response);
				}).error(function(response){
					$scope.error = response.message;
					alert('bad');
				});
		};

		$scope.labs = function() {
			
			$http.get('/users/labs').success(function(response){
					alert(response);
				}).error(function(response){
					$scope.error = response.message;
					alert('bad');
				});
		};

		$scope.placed = function() {
			
			$http.get('/order/placed').success(function(response){
					alert(response);
				}).error(function(response){
					$scope.error = response.message;
					alert('bad');
				});
		};

		$scope.shipped = function() {
			
			$http.get('/order/listShipped').success(function(response){
					alert(response);
				}).error(function(response){
					$scope.error = response.message;
					alert('bad');
				});
		};
	}
]);