'use strict';

(function() {
		// Admin Controller Spec
		describe('Admin Controller Tests', function() {
			// Initialize global variables
			var AdminController,
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

				// Initialize the Admin controller.
				AdminController = $controller('AdminController', {
					$scope: scope
				});
			}));

			
			it('Should get some specific lab info', inject(function() {
				// The test logic
				console.log('get the lab info');
				$httpBackend.when('GET', '/users/labs').respond(200, 'labs');

				scope.getLabs();
				$httpBackend.flush();
				expect(scope.labs).toEqual('labs');
			}));

			it('Should get some specific customer info', inject(function() {
			// The test logic
			console.log('get the customer info');
			$httpBackend.when('GET', '/users/customers').respond(200, 'customers');

			scope.getCustomer();
			$httpBackend.flush();
			expect(scope.customers).toEqual('customers');
		}));

		it('Should get the order ID', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			console.log('Get the order ID');
			$httpBackend.when('GET', '/order/new').respond(200, 'new');

			scope.orderId();
			$httpBackend.flush();
			expect(scope.orders).toEqual('new');
		}));
		/*
		it('Should add the kits using the addKits() function', inject(function() {
			// The test logic
			//scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			console.log('Get the kits');
			$httpBackend.when('post', '/inventory/increment').respond(200, 'increment');

			scope.addKits();
			$httpBackend.flush();
			//expect(scope.results).toEqual('increment');
		}));
		*/
	});
}());