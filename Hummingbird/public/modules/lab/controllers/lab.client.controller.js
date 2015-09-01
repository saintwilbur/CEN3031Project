/* jshint ignore:start */
'use strict';

angular.module('lab').controller('LabController', ['$scope', '$rootScope', '$http', 'Authentication', '$filter',
	function($scope, $rootScope, $http, Authentication, $filter) {
		$scope.authentication = Authentication;

		/**
		 * input-result.client.view.html
		 */
		$scope.verifiers = [];
		$scope.getVerifiers = function()
		{	var send = {labId: $scope.authentication.user.userId};
			$http.get('/auth/labTech', send).success(function(response) 
			{
				$scope.verifiers=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		};
		
			/*{DisplayName: 'John Doe', id:'7aa8fae044969e'},
			{DisplayName: 'Jane Doe', id:'6dcf9de1eecd21'},
			{DisplayName: 'Chicken Little', id: 'e96b881f111303'}*/
	
		$scope.formData = {};
		$scope.submitResult = function()
		{	
			$scope.formData.userId=$scope.authentication.user.userId;
			$http.post('/result/new', $scope.formData).success(function(response) 
			{
				alert(response.message);
			}).error(function(response) 
			{
				$scope.error = response.message;
				alert(response.message);
			});
			$scope.resetResult();
		};
		$scope.resetResult = function()
		{
			$scope.formData = {};
			 $scope.inputResult.$setPristine();
		};

		/**
		 * verify.client.view.html
		 */

		/**
		 * completed-order.client.view.html
		 */
		$scope.completedOrders = [];
		$scope.completedOrderList = function()
		{
			
			$http.get('/order/labCompletedOrders').then(function(response) 
			{
				$scope.completedOrders = response.data;
				for(var i = 0; i<$scope.completedOrders.length; i++)
				{
					$scope.completedOrders[i].completed =  $filter('date')($scope.completedOrders[i].completed, 'yyyy-MM-dd HH:mm');

				}
				for(var i = 0; i<$scope.completedOrders.length; i++)
				{
					setVerifierView(i);
				}
			});
		};
		var setVerifierView = function (index)
		{
			if($scope.completedOrders.result !== undefined) {
			var send = 
			{
			 	result_id: $scope.completedOrders[index].result[$scope.completedOrders[index].result.length-1]
			 };

					$http.post('/result/verifier', send).success(function(response) 
					{
						$scope.completedOrders[index].verifier = response.verifiedBy;
						$scope.completedOrders[index].resultView = response.result;
						$scope.completedOrders[index].comments = '"' + response.comments + '"';
						if(response.comments == undefined)
				        {
				          $scope.completedOrders[index].comments = 'None';
				        }
					}).error(function(verifier) 
					{
						$scope.error = verifier.message;
					});
				}
			else {
				//alert('no Completed Orders');
			}
		};

		$scope.completedOrderInfo = {};
		$scope.getCompletedOrderInfo = function(orderId)
		{
			var index = 0;
			for( var i = 0; i<$scope.completedOrders.length; i++)
			{
				if($scope.completedOrders[i].orderId == orderId)
				{
					index = i;
				}
			}
			var send = 
			{
				_id: $scope.completedOrders[index].result[$scope.completedOrders[index].result.length-1]
			};
			$http.post('/result/outcome',send).then(function(response) 
			{
				$scope.completedOrderInfo = 
				{
					kit: $scope.completedOrders[index].item,
					orderId: $scope.completedOrders[index].orderId,
					orderCreated: $scope.completedOrders[index].created,
					submittedBy: response.submittedBy,
					resultCreated: response.data.created,
					result: response.data.result,
					comments: response.data.comments
				};
			});
			console.log($scope.completedOrderInfo);

		};

		//lab-notifications view

		$scope.rejectedList = function()
		{
			/*$http.get('RETURN REJECT METHOD',{user: $scope.authentication.user._id}).success(function(response) 
			{
				return response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});*/
		}();

		$scope.getResultInfo = function()
		{
			/*$http.get('RETURN ResultInfo METHOD',{user: $scope.authentication.user._id}).success(function(response) 
			{
				return response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});*/
		};
		$scope.registeredOrders = [];
		$scope.getRegistered = function() 
		{
			$http.get('/order/listRegistered').success(function(response) 
			{
				$scope.registeredOrders=response;
			}).error(function(response) 
			{
				$scope.error = response.message;
			});
		};

		$scope.notifications = [];
		$scope.getNotifications = function()
		{
			var notificationCount = [];
			$http.get('/results/submitterRejectedList').success(function(response)
			{
				$scope.notifications=response;
				notificationCount = [response.length];
				$rootScope.$broadcast('Rejected Count Update', notificationCount);	
			}).error(function(response)
			{
				$scope.error = response.message;
			});


		/*	for(var i = 0; i++; i < $scope.notifications.length) {
			console.log($scope.notificationCount);
			console.log($scope.notifications);
				if($scope.notifications[i].status == 'Rejected') {
					notificationCount++;
				}
				else
					$scope.notifications.remove(i);
			} */
		}; 
	}
]);
/* jshint ignore:end */
