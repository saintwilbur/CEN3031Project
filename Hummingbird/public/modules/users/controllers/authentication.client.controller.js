/*jshint eqeqeq:false*/
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/customerdashboard');

		$scope.signup = function() {
			if($location.path().lastIndexOf('/customer/',0)===0)
			{
				$scope.credentials.roles='customer';
			}
			else if($location.path().lastIndexOf('/lab/',0)===0)
			{
				$scope.credentials.roles='lab';
			} 
			else if($location.path().lastIndexOf('/admin/',0)===0)
			{
				$scope.credentials.roles='admin';
			}
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				// And redirect to the index page according to user role
				if(response.roles=='customer')
				{
					$location.path('/customer/customerdashboard');
				}
				else if(response.roles=='lab')
				{
					$location.path('/lab/labdashboard');
				}
				else if(response.roles=='admin')
				{
					$location.path('/admin/admindashboard');

				}
				//Close Login modal
				$scope.$emit('closeModal');
			}).error(function(response) {
				$scope.error = response.message;

			});
		};

        $scope.checked = false;
        $scope.toggle = function() {
            $scope.checked = true;
        };
        $scope.noVerification = function(){
		$scope.checked = false;

	    };

	    $scope.credentials = {};
		$scope.signin = function() {
			$scope.credentials.path = $location.path();
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				// And redirect to the index page according to user role
				if(response.roles=='customer')
				{
					$location.path('/customer/customerdashboard');
				}
				else if(response.roles=='lab')
				{
					$location.path('/lab/labdashboard');
				}
				else if(response.roles=='admin')
				{
					$location.path('/admin/admindashboard');

				}
				//Close Login modal
				$scope.$emit('closeModal');
				
			}).error(function(response) {
				$scope.error = response.message;

			});
		};
	}
]);