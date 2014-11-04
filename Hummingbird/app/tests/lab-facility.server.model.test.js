'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	LabFacility = mongoose.model('LabFacility');

/**
 * Globals
 */
var user, labFacility, labFacility2;

/**
 * Unit tests
 */
describe('Lab facility Model Unit Tests:', function() {
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

		labFacility2 = new LabFacility({
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

		user.save(function() { 
			labFacility = new LabFacility({
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

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return labFacility.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should fail to save an existing facility again', function(done) {
			labFacility.save();
			return labFacility2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without ficility name', function(done) {
			labFacility.facilityName = '';
			return labFacility.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should encounter an error without user ID', function(done) {
			labFacility.location = null;
			return labFacility.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	afterEach(function(done) { 
		LabFacility.remove().exec();
		User.remove().exec();

		done();
	});
});