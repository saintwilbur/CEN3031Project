'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order'),
	//Inventory = mongoose.model('Inventory'),
	Result = mongoose.model('Result');

/**
 * Globals
 */
var user, inventory, result, order;

/**
 * Unit tests
 */
describe('Order Model Unit Tests:', function() {
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

		/**
		*inventory = new Inventory({
		*		itemId: '123456789',
		*		name: 'Test kit',
		*		count: '10',
		*		price: '1000'
		*	});
		*/

		result = new Result({
				user: user,
				object: inventory
			});				

		user.save(function() { 
			order = new Order({
				orderId: '12345',
				user: user,
				item: 'General',
				result: result
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return order.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to save with different shipped status', function(done) {
			order.status = 'shipped';
			return order.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without order ID', function(done) {
			order.orderId = '';
			return order.save(function(err) {
				should.exist(err);
				done();
			});
		});		
	});

	afterEach(function(done) { 
		Order.remove().exec();
		User.remove().exec();

		done();
	});
});