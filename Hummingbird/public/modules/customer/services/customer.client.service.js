'use strict';

angular.module('customer').factory('User', ['$resource',
	function($resource) {
		// Customer service logic
		// ...

		// Public API
		return $resource('user/:userId', {
			userId: '@_id'
		}, {
			update:{method: 'PUT'}
		});
	}
]);

angular.module('customer').factory('MedicalHistory', ['$resource',
	function($resource) {
		// Customer service logic
		// ...

		// Public API
		return $resource('MedicalHistory');
	}
]);

angular.module('customer').factory('Order', ['$resource',
	function($resource) {
		// Customer service logic
		// ...

		// Public API
		return $resource('Order');
	}
]);