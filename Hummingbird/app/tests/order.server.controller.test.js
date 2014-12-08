'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order'),
	Facility = mongoose.model('LabFacility'),
	Result = mongoose.model('Result'),
	orders = require('../../app/controllers/orders');

/**
 * Globals
 */
var user, order;

/**
 * Unit tests
 */
describe('Order Controller Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			userId: '54321',
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
		
		user.save();
		done();
	
	});

	describe('Method Create', function() {
		it('should be able to create without problems', function(done) {
			var req = 
			{
				body : {
					user: user._id,
					item: 'General',
					field1: 'Test',
					field2: 'Test',
					billing: {
						cardHolderName: 'holderName',
						cardNumber: '123456789',
						address: {
							streetNumber: '123',
							streetName: 'street',
							city: 'city',
							state: 'Florida',
							zipCode: 12345
						}
					},		
					shippingAddress: {
						streetNumber: '123',
						streetName: 'street',
						city: 'city',
						state: 'Florida',
						zipCode: 12345
					}
				}
			};

			var res = {				
				jsonp: function(object) {
					object.user.should.equal(user._id);
					object.item.should.equal('General');					
				}
			};
			orders.create(req, res);
			done();
		});

		it('should return error with invalid inputs', function(done) {
			var req = 
			{
				body : {
					user: user._id,
					item: 'General',
					field1: 'Test',
					field2: 'Test',
					shippingAddress: {
						streetNumber: '123',
						streetName: 'street',
						city: 'city',
						state: 'Florida',
						zipCode: 12345
					}
				}
			};

			var res = {				
				jsonp: function(object) {
				},
				send: function(message) {					
				}
			};
			orders.create(req, res);
			done();
		});
	});

	afterEach(function(done) { 
		Order.remove().exec();
		User.remove().exec();

		done();
	});
});