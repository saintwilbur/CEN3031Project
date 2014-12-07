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
var user, user2, result, result2;

/**
 * Unit tests
 */
describe('Result Controller Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			userId: '54321',
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local',
			roles: 'customer',
			dateOfBirth: '1992-06-14',
			gender: 'male'
		});	

		user2 = new User({
			userId: '23456',
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
			resutlId: '12346',
			user: user._id,
			result: 'positive',
			status: 'Submitted',
			submittedBy: '12345',
			verifiedBy: '23456'
		});	
		result2 = new Result({
			resutlId: '12895',
			user: user._id,
			result: 'positive',
			submittedBy: '12345',
			verifiedBy: '23456'
		});	

		user.save();
		result.save();
		user2.save();		
		done();
	
	});
	
	describe('Method list', function() {
		it('result.list() should be able to list all results without problems', function(done) {
			var req = {};

			var res = {
				jsonp: function(object) {
					object[0].result.should.equal('positive');
					object[0].submittedBy.should.equal('12345');
				}
			};

			results.list(req, res);
			done();
		});

		it('result.list() should not return wrong information', function(done) {
			var req = {};

			var res = {
				jsonp: function(object) {
					object[0].result.should.not.equal('negative');
					object[0].submittedBy.should.not.equal('1234');
				}
			};

			results.list(req, res);
			done();
		});

		it('result.listCanVerify() should return correct list of results', function(done) {
			var req = {
				user: user2				
			};
			
			var res = {
				jsonp: function(object) {
					object[0].submittedBy.should.not.equal('23456');
				}
			};

			results.listCanVerify(req, res);
			done();
		});

	});

	
	afterEach(function(done) { 
		Result.remove().exec();
		User.remove().exec();
		done();
	});
});
