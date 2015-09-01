
'use strict';

(function() {
	// Pending Controller Spec
	describe('Pending Controller Tests', function() {
		// Initialize global variables
		var PendingController,
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

			// Initialize the Pending controller.
			PendingController = $controller('PendingController', {
				$scope: scope
			});
		}));

		it('$scope.getPendingOrders should return the pending orders for user', inject(function(User) {
			scope.authentication.user = new User({_id:'525cf20451979dea2c000001'});
			$httpBackend.when('GET', '/order/pending').respond(200, 'order');

			scope.getPendingOrders();
			$httpBackend.flush();

			// test scope value
			expect(scope.orders).toBe('order');
		}));
		it('$scope.getPendingOrders should return the pending orders for user', inject(function(User) {
			scope.authentication.user = new User({_id:'525cf20451979dea2c000001'});
			$httpBackend.when('GET', '/order/pending').respond(200, 'order');

			scope.getPendingOrders();
			$httpBackend.flush();

			// test scope value
			expect(scope.error).toEqual(undefined);
		}));

		it('$scope.getPendingOrders should fail to return the pending orders for no user', inject(function(User) {
			scope.authentication.user = 'foo';
			$httpBackend.when('GET', '/order/pending').respond(400, {
				'message' : 'unknown user'
			});

			scope.getPendingOrders();
			$httpBackend.flush();

			// test scope value
			expect(scope.error).toEqual('unknown user');
		}));
	});
}());
