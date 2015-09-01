'use strict';

angular.module('customer').controller('RegisterKitController', ['$scope', '$rootScope', 'Authentication', '$http',
	function($scope,$rootScope, Authentication, $http) {
		
		$scope.authentication = Authentication;
		$scope.registerField = '';

		$scope.checkRegisterCode = function()
		{
			var send = 
			{
				user: $scope.authentication.user._id,
				item: 'KitA',
				registerCode: $scope.registerField
			};

			$http.post('/order/checkRegisterCode/', send).success(function(response) {
				alert(response.message);
				$scope.registerField = 'Enter Register Code';
				$scope.registerKit.$setPristine();
				$scope.$emit('closeModal');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);