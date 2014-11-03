'use strict';

(function() {
	// Customermedicalhistory Controller Spec
	describe('Customermedicalhistory Controller Tests', function() {
		// Initialize global variables
		var CustomermedicalhistoryController,
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
			// Initialize the Customermedicalhistory controller.
			CustomermedicalhistoryController = $controller('CustomermedicalhistoryController', {
				$scope: scope
			});
		}));

		it('$scope.submit() with valid form data should create a new MedicalHistory for user ', inject(function(User, MedicalHistory) {
			scope.authentication.user= new User({_id:'525cf20451979dea2c000002'});
			scope.medicalHistory = new MedicalHistory({
				field1: 'field1',
				field2: 'field2',
				field3: 'field3'
			});
			$httpBackend.when('POST', '/medicalHistory/create').respond(200, 'medicalHistory');

			scope.submit();
			$httpBackend.flush();
			expect(scope.medicalHistory).toEqual({});
		}));

		it('$scope.getMedicalHistory() with valid user should return the medicalHistory for user ', inject(function(User, MedicalHistory) {
			scope.authentication.user= new User({_id:'525cf20451979dea2c000002'});
			
			$httpBackend.when('GET', '/medicalHistory/get').respond(200, 'medicalHistory');

			scope.getMedicalHistory();
			$httpBackend.flush();
			expect(scope.medicalHistory).toEqual('medicalHistory');
		}));		
	});
}());