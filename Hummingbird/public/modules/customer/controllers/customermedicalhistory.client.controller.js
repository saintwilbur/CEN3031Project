'use strict';

angular.module('customer').controller('CustomermedicalhistoryController', ['$scope', '$rootScope', '$http', 'Authentication',
	function($scope, $rootScope, $http, Authentication) {
		// Customerorder controller logic
		// ...
		$scope.authentication = Authentication;

		$scope.getMedicalHistory = function() 
		{
			$http.get('/medicalHistory/get', {user: $scope.authentication.user._id}).success(function(response){
				$scope.medicalHistory = response;
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
				labId: $scope.authentication.user.userId
			};

			$http.get('/auth/labTech', send).success(function(response){
   				console.log(response);
   				console.log($scope.authentication.user.userId);
   				alert(response);
   			}).error(function(response){
   				$scope.error = response.message;
   				alert('bad');
   			});
		};
	}
]);