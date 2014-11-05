'use strict';
/* jshint ignore:start */
angular.module('lab').controller('VerifyController', ['$scope', '$rootScope', 'Authentication','$http', 
	function($scope, $rootScope, Authentication, $http) {
			$scope.authentication = Authentication;

			$scope.results = 
			[
				/*{orderId: '2345fsd', date: 'dateHere' },
				{orderId: '123asdfw235245', date: 'dateHere' },
				{orderId: '24y4h5fa', date: 'dateHere' }*/
			];

			$scope.orders = [{orderId: '2231', date: '231341'},{orderId: '4598', date: '120931'}];

			$scope.searchOrders = [];
			//getOrders to verify  
			$scope.searchOrders = function() {
				
				$http.get('/order/verify',{user: $scope.authentication.user._id}).success(function(response) 
				{
					$scope.searchOrders=response;
					return $scope.searchOrders;
				}).error(function(response) 
				{
					$scope.error = response.message;
				}); 
			};
			$scope.getSubmittedResults = function()
			{
				$http.get('/result/verifierList',{userId: $scope.authentication.user.userId}).success(function(response) 
				{
					$scope.results=response;
					console.log('testingsubmitresults');

				}).error(function(response) 
				{
					$scope.error = response.message;
				}); 
			};

			$scope.acceptResult = function(resultObj, verifierComment)
			{
				var send = 
				{
					userId: $scope.authentication.user.userId,
					results: resultObj,
					verifierComment: verifierComment
				};
				$http.post( '/result/verify', send).success(function(response) 
				{
					/*var resultInfo = 
					{
						result_id: resultObj._id
					};
					console.log(send);
					$http.get( '/result/getOrderInfo', send).success(function(response) 
					{
						console.log(response);
					}).error(function(response) 
					{
						$scope.error = response.message;
					});*/
					alert('Order Completed');
					$scope.getSubmittedResults();
				}).error(function(response) 
				{
					$scope.error = response.message;
				});
			};

			$scope.$on('refreshOrders', function (event) 
			{
				$scope.getPendingOrders();
			});
				



			$scope.rejectResult = function(resultObj, verifierComment)
			{
				var send = 
				{
					userId: $scope.authentication.user.userId,
					results: resultObj,
					verifierComment: verifierComment
				};
				$http.post( '/result/reject', send).success(function(response) 
				{
					
					alert('Order Incomplete. Result needs to be reviewed by Submitter.');
					$scope.getSubmittedResults();
				}).error(function(response) 
				{
					$scope.error = response.message;
				});
			};

			$scope.$on('refreshOrders', function (event) 
			{
				$scope.getPendingOrders();
			});
		/*	$scope.searchOrder = function()
			{
				//var fieldArray = [$scope.formData.field1, $scope.formData.field2, $scope.formData.field3];

				var search = 
				{
					ID: $scope.search
				};
				$http.post('/order/verify', search).success(function(response) {
					$rootScope.$broadcast('refreshOrders');
					$scope.search={};
				}).error(function(response) {
					$scope.error = response.message;
				});
			};
			*/
  	}
]);

