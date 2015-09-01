'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2, user3;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
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
		user2 = new User({
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
		user3 = new User({
			userId: '12345',
			firstName: 'Full1',
			lastName: 'Name1',
			displayName: 'Full1 Name1',
			email: 'test1@test.com',
			username: 'username1',
			password: 'password1',
			provider: 'local',
			dateOfBirth: '1992-06-14',
			gender: 'male'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without last name', function(done) {
			user.lastName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should encounter an error without user ID', function(done) {
			user.userId = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should require an email', function(done) {
			user.email = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should cause an error without username', function(done) {
			user.username = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should have password length longer than six', function(done) {
			user.password = '123';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should set with specific role', function(done) {
			user.roles = 'user';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should ask for birthday', function(done) {
			user.dateOfBirth = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should select a gender', function(done) {
			user.gender = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});