'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order'),
	BillingInformation = mongoose.model('BillingInformation');

/**
 * Globals
 */
var user, result, order, billingInformation;

/**
 * Unit tests
 */
describe('Billing information Model Unit Tests:', function() {
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

		order = new Order({
			orderId: '12345',
			user: user,
			item: 'General',
			result: result,
			billingInformation: billingInformation
		});

		user.save(function() { 
			billingInformation = new BillingInformation({
				order: order,
				address: {
					streetNumber: '1864',
					streetName: 'Stadium',
					city: 'Gainesville',
					state: 'Florida',
					zipcode: '32608'
				}
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return billingInformation.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		BillingInformation.remove().exec();
		User.remove().exec();

		done();
	});
});