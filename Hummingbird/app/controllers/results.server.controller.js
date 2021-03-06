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
    _ = require('lodash');

var core = require('../../app/controllers/core.server.controller.js');

/**
 * Create a Result
 * controller will need to pass in 
 * userId (user submitting), orderId, verifiedBy (chosen userId), 
 * outcome (positive, negative), comment (from submitter)
 */
exports.create = function(req, res) {
	var result = new Result();
	result.comments = req.body.comments;
	result.result = req.body.result;
	result.submittedBy = req.body.userId;
	result.verifiedBy = req.body.verifiedBy;
	result.resultId = core.getId();
	var size;
	//order the result belongs to
	var resultOrder;
	//Check if the order ID exists
	Order.find({orderId: req.body.orderId, status: 'registered'}).exec(function(err, orderId){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{

			if(orderId.length<=0)
			{
				return res.send({
					message: 'Order does not exist or is not registered in system.'
				});
			}
			size = orderId[0].result.length; 
			resultOrder = orderId[0];
			result.user = resultOrder.user;

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
					if (size === 0 || resultOrder.result[size-1].status == 'Rejected') {
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
								resultOrder.result.push(result);
								resultOrder.status = 'recieved';
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
					else {
						return res.send(
						{
							message: 'This order already has a result that is waiting to be verified.'
						});
					}	
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
exports.listCanVerify = function(req, res) {
	Result.find({verifiedBy: req.body.userId, status: 'Submitted'}, {_id:0, 'resultId':1, 'created':1, }).sort('-created').exec(function(err, result){
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
exports.submitResult = function(req, res) {
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
	var results = req.body.result_id;
	var order = '';
	var date = Date.prototype.toDateString(Date.now());
	Result.findOne({_id: results}).sort('-created').exec(function(err, resultFound){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			resultFound = _.extend(resultFound, {verifiedBy: req.user.userId, verifiersComments: req.body.verifierComment, status: 'Verified', completed: date});

			if(req.user.userId != results.submittedBy)
			{
				order = Order.findOnd({result: results});
				order =_.extend(order, {status: 'Completed', completed: date});
				resultFound.save(function(err) {
					if (err) {
						return res.send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.jsonp(resultFound);
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
	Result.findOne({resultId: req.body.resultId}, {'result':1, _id:0}).exec(function(err, result){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(req.body.resultId);
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

	Order.findOne({result: req.body.resultId}, {_id:0, 'orderId':1, 'fields':1, 'created':1}).exec(function(err, orderItem) {
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
	

	Result.find({_id: results._id}).sort('-created').exec(function(err, resultFound){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			resultFound[0] = _.extend(resultFound[0], {verifiedBy: req.user.userId, verifiersComments: req.body.verifierComment, status: 'Rejected', completed: Date.prototype.toDateString(Date.now())});
			if(req.user.userId != results.submittedBy)
			{
				resultFound[0].save(function(err) {
					if (err) {
						return res.send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.jsonp(resultFound[0]);
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
 * Controller will need to pass in the userId of the lab.
 * req.body.userId
 * The list of results will contain the resultId, result, 
 * comments, and the date completed.
 */
exports.rejectedList = function(req, res) {
	var labsId = req.body.labId;

	Result.find({submittedBy: labsId, status: 'Rejected'}, {_id:0, 'resultId':1, 'result':1, 'comments':1, 'verifiersComments':1, 'completed':1}).exec(function(err, results)
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




exports.test = function(req, res) {
	var tests = 'test';
	res.jsonp(tests);
};
