'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Inventory = mongoose.model('Inventory');

/**
 * Globals
 */
var user, inventory, inventory2;

/**
 * Unit tests
 */
describe('Inventory Model Unit Tests:', function() {
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
			inventory = new Inventory({
				itemId: '123456789',
				name: 'Test kit',
				count: '10',
				price: '1000'
			});
			inventory2 = new Inventory({
				itemId: '123456789',
				name: 'Test kit',
				count: '10',
				price: '1000'
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return inventory.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should fail to save an existing item again', function(done) {
			inventory.save();
			return inventory2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without item ID', function(done) {
			inventory.itemId = '';
			return inventory.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Inventory.remove().exec();
		User.remove().exec();

		done();
	});
});