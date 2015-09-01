'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Address = mongoose.model('Address'),
	ContactInformation = mongoose.model('ContactInformation');

/**
 * Globals
 */
var user, address, contactInformation;

/**
 * Unit tests
 */
describe('Contact information Model Unit Tests:', function() {
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

		address = new Address({
				streetNumber: '1864',
	            streetName: 'Stadium Rd',
				//apt/suite
				city: 'Gainesville',
				state: 'Florida',
				zipcode: '32608'
		});

		user.save(function() { 
			contactInformation = new ContactInformation({
				//user: user,
				cellNumber: '3211231234',
				homeNumber: '1234567890',
				primaryAddress: address
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return contactInformation.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		ContactInformation.remove().exec();
		User.remove().exec();

		done();
	});
});