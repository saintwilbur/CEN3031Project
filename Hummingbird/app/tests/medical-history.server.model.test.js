'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MedicalHistory = mongoose.model('MedicalHistory');

/**
 * Globals
 */
var user, medicalHistory;

/**
 * Unit tests
 */
describe('Medical history Model Unit Tests:', function() {
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
			medicalHistory = new MedicalHistory({
				user: user,
				field1: 'Test',
				field2: 'test2',
				field3: 'test3'
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return medicalHistory.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		MedicalHistory.remove().exec();
		User.remove().exec();

		done();
	});
});