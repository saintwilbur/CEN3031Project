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

		it('Should add new Order for User', inject(function() {
			var fieldArray = ['field1', 'field2', 'field3'];

			var send = 
			{
				user: '1234567',
				item: 'SampleTest',
				forms: 
				{
					name: 'Sample Test',
					fieldTest: fieldArray
				}
			};
			var test = [];
			$httpBackend.when('POST', '/order/new').respond(200, send);
			scope.send=send;
			scope.submitOrder();
			$httpBackend.flush();
			console.log(scope.user);
			expect(scope.user).toEqual('1234567');
			// Test scope value
			//expect(scope.user).toEqual(send.user);
		}));
	});
}());