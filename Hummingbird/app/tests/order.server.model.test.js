'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order'),
	Facility = mongoose.model('LabFacility'),
	Result = mongoose.model('Result');

/**
 * Globals
 */
var user, facility, result, order;

/**
 * Unit tests
 */
describe('Order Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
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

		facility = new Facility({
			facilityId: '12345',
			facilityName: 'UF',
			location: {
				streetNumber: '1864',
				streetName: 'Stadium',
				city: 'Gainesville',
				state: 'Florida',
				zipcode: '32608'
			}
		});

		result = new Result({
				user: user,
				facility: facility
		});				

		user.save(function() { 
			order = new Order({
				orderId: '12345',
				user: user,
				item: 'General',
				status: 'Placed',
				result: result,
				field1: 'Test',
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
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return order.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without order ID', function(done) {
			order.orderId = '';
			return order.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should encounter an error with wrong type of data', function(done) {
			order.user = '';
			return order.save(function(err) {
				should.exist(err);
				done();
			});
		});		

		it('should not save with invalid status', function(done) {
			order.status = 'status';
			return order.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should require billing', function(done) {
			order.billing = null;
			return order.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should ask for shippingAddress', function(done) {
			order.shippingAddress = null;
			return order.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Order.remove().exec();
		User.remove().exec();

		done();
	});
});