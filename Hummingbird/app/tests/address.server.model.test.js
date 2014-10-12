'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Address = mongoose.model('Address');

/**
 * Globals
 */
var user, address;

/**
 * Unit tests
 */
describe('Address Model Unit Tests:', function() {
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

		user.save(function() { 
			address = new Address({
				streetNumber: '1864',
	            streetName: 'Stadium Rd',
				//apt/suite
				city: 'Gainesville',
				state: 'Florida',
				zipcode: '32608'
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return address.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Address.remove().exec();
		User.remove().exec();

		done();
	});
});