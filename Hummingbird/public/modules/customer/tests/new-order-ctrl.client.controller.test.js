'use strict';

(function() {
	// New order ctrl Controller Spec
	describe('New order ctrl Controller Tests', function() {
		// Initialize global variables
		var NewOrderCtrl,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the New order ctrl controller.
			NewOrderCtrl = $controller('NewOrderCtrl', {
				$scope: scope
			});
		}));

		it('$scope.submitOrder Should add new Order for User', inject(function(Order, User) {
			var sampleUser = new User({
				_id: '564',
				userId: '12345',
				firstName: 'Full',
				lastName: 'Name',
				displayName: 'Full Name',
				email: 'test@test.com',
				username: 'username',
				password: 'password',
				provider: 'local',
				dateOfBirth: '1992-06-14',
				gender: 'male'
			});
			
			scope.authentication.user = sampleUser;
			$httpBackend.when('POST', '/order/new').respond(200, 'order');

			//scope.submitOrder();
			//$httpBackend.flush();

				
			// expect(scope.item).toEqual('');
			
			//expect(scope.orders).toEqual(sampleOrderRespond);
			// Test scope value
			//expect(scope.user).toEqual(send.user);
		}));
	});
}());