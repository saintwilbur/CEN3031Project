'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Facility = mongoose.model('LabFacility'),
	Result = mongoose.model('Result');

/**
 * Globals
 */
var user, facility, result;

/**
 * Unit tests
 */
describe('Result Model Unit Tests:', function() {
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
		
		result = new Result ({
			user:user,
			result: 'Positive',
			submittedBy: '12',
			verifiedBy: '456',
			comments: 'Test'
		});

		result.save();
		user.result = result;

		user.save();
		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return result.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save with wrong status', function(done) {
			result.status = 'Denied';
			return result.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should encounter an error with wrong type of data', function(done) {
			result.created = 'Today';
			return result.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should save without comment', function(done) {
			result.comments = '';
			return result.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Result.remove().exec();
		User.remove().exec();

		done();
	});
});