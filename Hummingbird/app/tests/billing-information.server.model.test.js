'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Address = mongoose.model('Address'),
	BillingInformation = mongoose.model('BillingInformation');

/**
 * Globals
 */
var user, address, billingInformation;

/**
 * Unit tests
 */
describe('Billing information Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
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

		address = new Address({
				streetNumber: '1864',
	            streetName: 'Stadium Rd',
				//apt/suite
				city: 'Gainesville',
				state: 'Florida',
				zipcode: '32608'
		});

		user.save(function() { 
			billingInformation = new BillingInformation({
				user: user,
				address: address
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