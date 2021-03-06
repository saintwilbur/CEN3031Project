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
		
			
			it('Should get some specific lab info', inject(function(User) {
				// The test logic
				scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
				console.log('Get the lab info');
				$httpBackend.when('GET', '/users/labs').respond(200, 'labs');

				scope.getLabs();
				$httpBackend.flush();
				expect(scope.labs).toEqual('labs');
			}));

			it('Checking for error in the get lab info', inject(function(User) {
				// The test logic
				scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
				console.log('Get the lab info');
				$httpBackend.when('GET', '/users/labs').respond(200, 'labs');

				scope.getLabs();
				$httpBackend.flush();
				expect(scope.error).toEqual(undefined);
			}));

			it('Should get some specific customer info', inject(function() {
			// The test logic
			console.log('Get the customer info');
			$httpBackend.when('GET', '/users/customers').respond(200, 'customers');
			//
			scope.getCustomer();
			$httpBackend.flush();
			expect(scope.customers).toEqual('customers');
		}));
		it('Checking for error in customers info', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			console.log('Get the customer info');
			$httpBackend.when('GET', '/users/customers').respond(200, 'customers');
			//
			scope.getCustomer();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));

		it('Should get the waiting orders', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			console.log('Get waiting orders');
			$httpBackend.when('GET', '/order/placed').respond(200, 'placed');

			scope.getWaitingOrders();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));
		it('Should get the waiting orders', inject(function(User) {
			// The test logic
			console.log('Get waiting orders');
			$httpBackend.when('GET', '/order/placed').respond(200, 'placed');

			scope.getWaitingOrders();
			$httpBackend.flush();
			expect(scope.waitingOrders).toEqual('placed');
		}));

		it('Should get the other orders', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			console.log('Get the other orders');
			$httpBackend.when('GET', '/order/list').respond(200, 'list');

			scope.getOtherOrders();
			$httpBackend.flush();
			expect(scope.otherOrders).toEqual('list');
		}));

		it('Checking for errors from the  other orders function', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			console.log('Get the other orders');
			$httpBackend.when('GET', '/order/list').respond(200, 'list');

			scope.getOtherOrders();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));

		it('Should get a list of inventory', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			console.log('Get the other orders');
			$httpBackend.when('GET', '/inventory/listAll').respond(200, 'listAll');

			scope.getInventory();
			$httpBackend.flush();
			expect(scope.inventory).toEqual('listAll');
		}));
		it('Checking for error in the response for the list of inventory', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			console.log('Get the other orders');
			$httpBackend.when('GET', '/inventory/listAll').respond(200, 'listAll');

			scope.getInventory();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));


		it('Should add the kits using the addNewKits() function', inject(function() {
			// The test logic
			console.log('Post the kits');
			$httpBackend.when('post', '/inventory/newKit').respond(200, 'newKit');
			expect(scope.newKit).toEqual({});
		}));

		
		it('Checking for errors from the shipKit response function', inject(function() {
			// The test logic
			//scope.authentication.user = new User({userId:'525cf20451979dea2c000003'});
			console.log('Get waiting orders');
			$httpBackend.when('post', '/order/shipped').respond(200, 'shipped');

			scope.getWaitingOrders();
			expect(scope.error).toEqual(undefined);
		}));
		
		
	});
}());