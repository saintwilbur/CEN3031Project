'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/customerdashboard');

		$scope.signup = function() {
			console.log($scope.credentials);
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				console.log(response);
				// And redirect to the index page according to user role
				if(response.roles=='user')
				{
					$location.path('/customerdashboard');
				}
				else if(response.roles=='lab')
				{
					$location.path('/labdashboard');
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


		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				// And redirect to the index page according to user role
				console.log(response.roles);
				if(response.roles=='user')
				{
					$location.path('/customerdashboard');
				}
				else if(response.roles=='lab')
				{
					$location.path('/labdashboard');
				}
				//Close Login modal
				$scope.$emit('closeModal');
				
			}).error(function(response) {
				$scope.error = response.message;

			});
		};
	}
]);