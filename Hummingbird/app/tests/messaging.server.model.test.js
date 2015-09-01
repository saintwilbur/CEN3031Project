'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Messaging = mongoose.model('Messaging');

/**
 * Globals
 */
var user, messaging;

/**
 * Unit tests
 */
describe('Messaging Model Unit Tests:', function() {
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
			messaging = new Messaging({
				firstName: 'Full',
				lastName: 'Name',
				email: 'test@test.com',
				subject: 'Test Message',
				message: 'This is just a test'
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return messaging.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without subject', function(done) {
			messaging.subject = '';
			return messaging.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Messaging.remove().exec();
		User.remove().exec();

		done();
	});
});