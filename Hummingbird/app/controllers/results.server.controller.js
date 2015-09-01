/*jshint eqeqeq:false, eqnull:true*/
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Order = mongoose.model('Order'),
	User = mongoose.model('User'),
	Result = mongoose.model('Result'),
	errorHandler = require('./errors'),
	mandrill = require('mandrill-api/mandrill'),
	mandrill_client = new mandrill.Mandrill('y6EIYNIwNBbIaneTap-iXw'),
    _ = require('lodash');

var core = require('../../app/controllers/core.server.controller.js'),
	email = require('../../app/controllers/email.server.controller.js');

/**
 * Create a Result
 * controller will need to pass in 
 * userId (user submitting), orderId, verifiedBy (chosen userId), 
 * outcome (positive, negative), comment (from submitter)
 */
exports.create = function(req, res) {
	var resultInfo = {};
	resultInfo.comments = req.body.comments;
	resultInfo.result = req.body.result;
	resultInfo.submittedBy = req.body.userId;
	resultInfo.verifiedBy = req.body.verifiedBy;
	resultInfo.resultId = core.getId();
	var result = new Result(resultInfo);
	var size;
	//order the result belongs to
	var resultOrder;
	//Check if the order ID exists
	Order.findOne({orderId: req.body.orderId,  $or: [ { status: 'Registered' }, { status: 'Received' } ]}).exec(function(err, resultOrder){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			if(resultOrder == null)
			{
				return res.send({
					message: 'Order does not exist or is not registered in system.'
				});
			}
			size = resultOrder.result.length; 
			result = _.extend(result, {user: resultOrder.user, status: 'Submitted'});

			//Check if the verifier ID matches user ID
			User.find({userId: req.body.verifiedBy, roles: 'lab'}).exec(function(err, verifierId){
				if (err) 
				{
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else
				{
					if(verifierId.length<=0)
					{
						return res.send({
							message: 'Verifier does not exist in this lab.'
						});
					}
					//Check if there is no result or the result has been rejected
					Result.findOne({_id: resultOrder.result[size-1]}).sort('-created').exec(function(err, resultFound){
						if (err) 
						{
							return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
							});
						} else 
						{
							//check if  no results submitted or latest Result is rejected
							if(size === 0 || resultFound.status == 'Rejected')
							{
								result.save(function(err) {
										if (err) 
										{
											return res.send(
											{
												message: errorHandler.getErrorMessage(err)
											});
										}
										else 
										{	
											resultOrder.result.push(result._id);
											resultOrder = _.extend(resultOrder, {status: 'Received'});
											resultOrder.save(function(err) {
												if (err) {
													return res.send({
														message: errorHandler.getErrorMessage(err)
													});
												} else {
													return res.send({
														message: 'Result submitted and waiting for verification.'
													});
												}
											});
																
										}
								});
							}
							else
							{
								return res.send({
									message: 'Result has already been submitted and is waiting for verification.'
								});
							}
						}
					});
				}
			});
		}
	});			
};

/**
 * Show the current Result
 */
exports.read = function(req, res) {

};

/**
 * Update a Result
 */
exports.update = function(req, res) {

};

/**
 * Delete an Result
 */
exports.delete = function(req, res) {

};

/**
 * List of all Results
 */
exports.list = function(req, res) {
	Result.find().sort('-created').exec(function(err, result){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(result);
		}
	});
};

/**
 * Scrap.
 */
exports.listPerLab = function(req, res) {
	Result.find().sort('-created').exec(function(err, result){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(result);
		}
	});
};

/**
 * Function will return the list of results that the current user can verify
 * Controller will need to pass in the userId
 * will return an array of result objects
 */
exports.listCanVerify = function(req, res) 
{
	Result.find({verifiedBy: req.user.userId, status: 'Submitted'}, {_id:1, 'resultId':1, 'created':1, 'submittedBy':1}).sort('-created').exec(function(err, result){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(result);
		}
	});
};

/*
 * Submits the result
 */
exports.submitResult = function(req, res) 
{
	var results = req.body;

	results = _.extend(results, {submittedBy: req.user.userId, result: req.result, status: 'Submitted'});

	results.save(function(err) {
		if (err) {
			return res.send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(results);
		}
	});
};

/*
 * Verifies(accepts) the result
 * controller needs to pass in 
 * userId, result_id, and verifierComment.
 * req.body.userId, req.body.result_id, req.body.verifierComment
 */
exports.verifyResult = function(req, res) {
	var result_id = req.body.result_id;
	var order = '';
	var date = Date.prototype.toDateString(Date.now());

	Result.findOne({_id: result_id}).sort('-created').exec(function(err, resultFound){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{																

			resultFound = _.extend(resultFound, {verifiedBy: req.user.userId, verifiersComments: req.body.verifierComment, status: 'Verified'});
			resultFound.save(function(err) {
				if (err) {
					return res.send({
						message: errorHandler.getErrorMessage(err)
					});
				} 
				else 
				{																
						if(req.user._id != resultFound.submittedBy)
						{

							Order.findOne({result: resultFound._id}).exec(function(err, orderFound){
								if (err) 
								{
									return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
									});
								} 
								else 
								{
									orderFound =_.extend(orderFound, {status: 'Completed', completed: Date.now()});
									orderFound.save(function(err) {
										if (err) {
											return res.send({
												message: errorHandler.getErrorMessage(err)
											});
										} else {
														email.resultMail(req, res);

											return res.send(
											{
												message: 'Order ' + orderFound.orderId + ' has been completed.'
											});
										}
									});	
								}
							});
						}
						else
						{
							return res.send(
							{
								message: 'Submitter cannot be verifier!'
							});
						}
				}
			});	
			//send email
			//res.jsonp(results);
		}
	});
};

/**
 *  Returns the result of the test. 
 *  Controller needs to pass in the resultId
 *  Will return object with the result of the test inside.
 */

exports.getResultData = function(req, res)
{
	Result.findOne({_id: req.body._id}).exec(function(err, result){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			console.log(result);
			res.jsonp(result);
		}
	});
};

/* Function will return the order info for the given result
 * Controller will need to pass in the result_id 
 * req.body.resultId
 * Will return an order object 
 */
exports.getOrderInfo = function(req, res) 
{
	var results = req.body.resultId;

	Order.findOne({result: req.body.resultId}, {_id: 0, 'orderId': 1, 'fields': 1, 'created': 1}).exec(function(err, orderItem) {
		if(err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.json(orderItem);
		}
	});	
};

/**
 * Will update the result to rejected. 
 * Controller needs to pass in the resultId, userId, 
 * and a comment for why user rejected the result
 */
exports.rejectResult = function(req, res) {
	
	var results = req.body.results;
	
	Result.findOne({resultId: results.resultId, status: 'Submitted'}).sort('-created').exec(function(err, resultFound){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			if(resultFound == null) {
				return res.send({
					message: 'Result cannot be found'
				});
			}
			// Need verifiersComments to be input. HardCoded now. 
			resultFound = _.extend(resultFound, {verifiersComments: 'Comments not connected', status: 'Rejected'});
			
			if(req.user.userId == resultFound.verifiedBy)
			{	
				resultFound.save(function(err) {
					if (err) {
						return res.send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						return res.send({
							message: 'Result rejected; order Incomplete. Results need to be reviewed.'
						});
					}
				});	
			}
			else
			{
				return res.send(
				{
					message: 'Submitter cannot be verifier!'
				});
			}
			//res.jsonp(results);
		}
	});
};

/* rejectedList() will return a list of rejected results 
 * of the passed in lab user. 
 * The list of results will contain the resultID, the verifierComment, and the Date verified
 */
exports.rejectedList = function(req, res) {
	Result.find({status: 'Rejected'}).sort('-created').exec(function(err, results)
	{
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(results);
		}
	});

};

/**
 * Function will return the verifier of the result
 * Controller will need to pass in the resultId
 * will return a userId
 */
exports.getVerifier = function(req, res) 
{

	Result.findOne({_id: req.body.result_id}, {_id: 0, 'verifiedBy':1, 'result': 1, 'comments': 1}).sort('-created').exec(function(err, userId){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(userId);
		}
	});
};
exports.test = function(req, res) {
	var tests = 'test';
	res.jsonp(tests);
};
