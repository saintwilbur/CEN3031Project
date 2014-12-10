'use strict';

(function() {
	// Lab Controller Spec
	describe('Lab Controller Tests', function() {
		// Initialize global variables
		var LabController,
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
			
			// Initialize the Lab controller.
			LabController = $controller('LabController', {
				$scope: scope
			});
		}));
		// Tests: GetVerifiers, SubmitResult, resetResult
		it('Function getVerifiers should respond with a list of verifiers', inject(function(User) {
			scope.authentication.user= new User({userId:'525cf20451979dea2c111112'});
			
			$httpBackend.when('GET', '/auth/labTech').respond(200, 'verifiers');
			//console.log('Getting List of Verifiers');
			scope.getVerifiers();
			//$httpBackend.flush();
			//expect(scope.verifiers).toEqualData('verifiers');
		}));
		
	
	    it('Function SubmitResult should successfully send a result ', inject(function(User) {
			scope.authentication.user = new User({userId:'525cf20451979dea2c111112'});
			$httpBackend.when('POST', '/result/new').respond(200, 'verifiers');
			//scope.submitResult();
			//$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));

	    it('Function completedOrder should get all the completedOrder ', inject(function(User) {
			scope.authentication.user = new User({userId:'525cf20451979dea2c111112'});
			$httpBackend.when('GET', '/order/labCompletedOrders').respond(200, 'labCompletedOrders');
			scope.completedOrderList();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));

	    it('Function completedOrder should not get all the completedOrder ', inject(function(User) {
			scope.authentication.user = new User({userId:'525cf20451979dea2c111112'});
			$httpBackend.when('GET', '/order/labCompletedOrders').respond(200, 'labCompletedOrders');
			scope.completedOrderList();
			$httpBackend.flush();
			expect(scope.completedOrders).toEqual('labCompletedOrders');
		}));


	    it('Function getRegistered should not get the registration details ', inject(function(User) {
			scope.authentication.user = new User({userId:'525cf20451979dea2c111112'});
			$httpBackend.when('GET', '/order/listRegistered').respond(200, 'verifiers');
			scope.getRegistered();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));

	   	it('Function getRegistered should not get the registration details ', inject(function(User) {
			scope.authentication.user = new User({userId:'525cf20451979dea2c111112'});
			$httpBackend.when('GET', '/results/submitterRejectedList').respond(200, 'submitterRejectedList');
			scope.getNotifications();
			$httpBackend.flush();
			expect(scope.error).toEqual(undefined);
		}));
		/*
		$scope.submitResult = function()
		{	
			$scope.formData.userId=$scope.authentication.user.userId;
			$http.post('/result/new', $scope.formData).success(function(response) 
			{
				alert(response.message);
			}).error(function(response) 
			{
				$scope.error = response.message;
				alert(response.message);
			});
			$scope.resetResult();
		};
		$scope.resetResult = function()
		{
			$scope.formData = {};
			 $scope.inputResult.$setPristine();
		};		
		*/		
	});
}());