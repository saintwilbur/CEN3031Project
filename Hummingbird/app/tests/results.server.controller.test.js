'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order'),
	Result = mongoose.model('Result'),
	results = require('../../app/controllers/results');

/**
 * Globals
 */
var user, result;

/**
 * Unit tests
 */
describe('Result Controller Unit Tests:', function() {
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
			roles: 'lab',
			dateOfBirth: '1992-06-14',
			gender: 'male'
		});		

		result = new Result({
			resutlId: '12345',
			user: user._id,
			result: 'positive',
			submittedBy: '12345',
			verifiedBy: '12345'
		});		

		user.save();
		result.save();		
		done();
	
	});
	
	describe('Method list', function() {
		it('should be able to list all results without problems', function(done) {
			var req = {};

			var res = {
				jsonp: function(object) {
					//object.user.should.equal(user._id);
				}
			};
			results.list(req, res);
			done();
		});
	});
	
	afterEach(function(done) { 
		Order.remove().exec();
		User.remove().exec();

		done();
	});
});
