
'use strict';

angular.module('customer').controller('RegisterKitController', ['$scope', '$rootScope', 'Authentication', '$http',
	function($scope,$rootScope, Authentication, $http) {
		
		$scope.authentication = Authentication;

		$scope.checkRegisterCode = function()
		{
			console.log($scope.registerField);
			var send = 
			{
				user: $scope.authentication.user._id,
				item: 'KitA',
//				registerCode: $scope.registerField
			};

			$http.post('/order/checkRegisterCode/', send).success(function(response) {
				$rootScope.$broadcast('refreshOrders');
				 alert('Your kit is registered.');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);