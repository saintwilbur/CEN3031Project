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

			$scope.orders = [];

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
					console.log(response);
					$scope.results=response;

				}).error(function(response) 
				{
					$scope.error = response.message;
				}); 
			};
			$scope.currentOrderInfo = {};
			$scope.currentResultInfo = {};
			$scope.getVerifyViewInfo = function(index)
			{
				$scope.currentOrderInfo =
				{

				};
				$scope.currentResultInfo =
				{

				};
			};

			$scope.acceptResult = function(resultObj, verifierComment)
			{
				console.log(resultObj)
				var send = 
				{
					userId: $scope.authentication.user.userId,
					result_id: resultObj._id,
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
					alert(response.message);
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
				console.log(send);
				$http.post( '/result/reject', send).success(function(response) 
				{
					
					alert(response.message);
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
			
  	}
]);

