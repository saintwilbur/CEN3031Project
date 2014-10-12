'use strict';

angular.module('core').controller('ContactController', ['$scope',
	function($scope) {
		
		$scope.mail = {};

		$scope.sendContact = function() {
			$scope.$emit('closeModal');
		};

		$scope.cancelContact = function() {
			$scope.$emit('closeModal');
		};

	}
]);