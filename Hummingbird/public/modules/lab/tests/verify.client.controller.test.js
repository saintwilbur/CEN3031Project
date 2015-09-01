'use strict';

(function() {
	// Verify Controller Spec
	describe('Verify Controller Tests', function() {
		// Initialize global variables
		var VerifyController,
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

			// Initialize the Verify controller.
			VerifyController = $controller('VerifyController', {
				$scope: scope
			});
		}));

		it('$scope.getSubmittedResults should get the submitted results for the lab worker', inject(function(User) {
			scope.authentication.user = new User({_id:'525cf20451979dea2c000001'});
			$httpBackend.when('GET', '/result/verifierList').respond(200, 'Result');

			scope.getSubmittedResults();
			$httpBackend.flush();

			// test scope value
			expect(scope.results).toBe('Result');
		}));

		it('$scope.getSubmittedResults check for undefined response value', inject(function(User) {
			scope.authentication.user = new User({_id:'525cf20451979dea2c000001'});
			$httpBackend.when('GET', '/result/verifierList').respond(200, 'Result');

			scope.getSubmittedResults();
			$httpBackend.flush();

			// test scope value
			expect(scope.error).toEqual(undefined);
		}));


		it('Should search order for user', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({_id:'525cf20451979dea2c000002'});
			
			$httpBackend.when('GET', '/order/verify').respond(200, 'verify');

			scope.searchOrders();
			$httpBackend.flush();
			expect(scope.searchOrders).toEqual('verify');
		}));

		it('Should search order for user', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({_id:'525cf20451979dea2c000002'});
			
			$httpBackend.when('GET', '/order/verify').respond(200, 'verify');

			scope.searchOrders();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));

		it('Should get the submitted results of the user', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			$httpBackend.when('GET', '/result/verifierList').respond(200, 'Verifier list');

			scope.getSubmittedResults();
			$httpBackend.flush();
			expect(scope.results).toEqual('Verifier list');
		}));
		it('checking for errors in the submitted results', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({userId:'525cf20451979dea2c000003'});
			$httpBackend.when('GET', '/result/verifierList').respond(200, 'Verifier list');

			scope.getSubmittedResults();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));
				
		it('Should get the acceptResult results', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({_id:'525cf20451979dea2c000004'});

			$httpBackend.when('POST', '/result/verify').respond(200, 'result');
			//$httpBackend.when('GET', '/result/verifierList').respond(200, 'Verifier list');

			//scope.getSubmittedResults();
			//$httpBackend.flush();
			//expect(scope.error).toEqual(undefined);
			
		}));
		
		//GetverifyView info Test
		it('Should reject the result', inject(function(User) {
			// The test logic
			scope.authentication.user= new User({_id:'525cf20451979dea2c000005'});

			$httpBackend.when('POST', '/result/reject').respond(200, 'reject');
			//$httpBackend.when('GET', '/result/verifierList').respond(200, 'Verifier list');

			//scope.getSubmittedResults();
			//$httpBackend.flush();
			//expect(scope.rejectResult).toEqual();
			
		}));
	});
}());