'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order'),
	//Inventory = mongoose.model('Inventory'),
	Address = mongoose.model('Address'),
	BillingInformation = mongoose.model('BillingInformation'),
	Result = mongoose.model('Result'),
	Form = mongoose.model('Form');

/**
 * Globals
 */
var user, inventory, address, billingInformation, result, form, order;

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
		address = new Address({
				streetNumber: '1864',
	            streetName: 'Stadium Rd',
				//apt/suite
				city: 'Gainesville',
				state: 'Florida',
				zipcode: '32608'
			});

		billingInformation = new BillingInformation({
				user: user,
				address: address
			});

		result = new Result({
				user: user,
				item: inventory
			});

		form = new Form({
				name: 'Test Form'
			});

		user.save(function() { 
			order = new Order({
				orderId: '12345',
				user: user,
				item: 'General',
				billingInformation: billingInformation,
				result: result,
				form: form
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

		it('should be able to show an error when try to save without item', function(done) {
			order.item = '';
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