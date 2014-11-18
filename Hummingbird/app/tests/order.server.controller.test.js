'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order'),
	Facility = mongoose.model('LabFacility'),
	Result = mongoose.model('Result'),
	orders = require('../../app/controllers/orders');

/**
 * Globals
 */
var user, facility, result, order;

/**
 * Unit tests
 */
 describe('Order Controller Unit Tests:', function() {
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

		result = new Result({
				user: user,
				facility: facility
		});				

		user.save(function() { 
			order = new Order({
				orderId: '12345',
				user: user,
				item: 'General',
				result: result,
				field1: 'Test',
				field2: 'Test'
			});
			order.save();
			done();
		});
	});

	/*describe('Method Create', function() {
		it('should be able to create without problems', function(done) {
			var req = {};
			req.body = {
				user: user,
				item: 'sample'
			};

			var res = {
				jsonp: function(object) {
					//object[0].user.should.equal(user._id);
					//object[0].item.should.equal('sample');
				}
			};

			orders.create(req, res);
			done();
		});
	});*/

	afterEach(function(done) { 
		Order.remove().exec();
		User.remove().exec();

		done();
	});
});