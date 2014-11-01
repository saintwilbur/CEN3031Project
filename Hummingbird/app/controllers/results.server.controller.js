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

/**
 * Create a Result
 * controller will need to pass in 
 * userId (user submitting), orderId, verfiedBy (chosen userId), 
 * outcome (positive, negative), comment (from submitter)
 */
exports.create = function(req, res) {
	var result = new Result();
	result.comments = req.comment;
	result.result = req.outcome;
	result.submittedBy = req.userId;
	var size;

	//order the result belongs to
	var resultOrder;
	//Check if the order ID exists
	Order.find({orderId: req.orderId}).exec(function(err, resOrder){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			size = resultOrder.result.length-1; 
			resultOrder = resOrder;
		}
	});
	result.user = resultOrder.user;
	//Check if the verifier ID matches user ID
	User.find({userID: req.verfiedBy}).exec(function(err, verifierId){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} 
	});
	result.verifiedBy = req.verfiedBy
	//Check if there is no result or the result has been rejected
	if (resultOrder.result.length == 0 || resultOrder.result[size].status == 'Rejected') {
		result.save(function(err){
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
				res.jsonp(result);							
			}
		});
	}
	else {
		return res.send(
		{
			message: 'there is already a result'
		});
	}		
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
 * scrap.
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
	Result.find({verifiedby: req.userId, status: 'Submitted'}).sort('-created').exec(function(err, result){
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
	var results = req.results;

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
 * Verifies the result
 * controller needs to pass in 
 * userId and verifierComment.
 */
exports.verifyResult = function(req, res) {
	var results = req.results;

	results = _.extend(results, {verifiedBy: req.userId, verifiersComments: req.verifierComment, status: 'Verified'});

	results.save(function(err) {
		if (err) {
			return res.send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(results);
		}
	});

	//send email
};

/**
 *  Returns the result of the test. 
 *  Controller needs to pass in the resultId
 *  Will return object with the result of the test inside.
 */

exports.getResultData = function(req, res)
{
	Result.find({resultId: req.resultId}, {'result':1, _id:0}).exec(function(err, result){
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
 * Will update the result to rejected. 
 * Controller needs to pass in the resultId, userId, 
 * and a comment for why user rejected the result
 */ 

exports.rejectResult = function(req, res) {
	var results = req.results;

	results = _.extend(results, {verifiedBy: req.userId, comments: req.comment, status: 'Rejected'});

	results.save(function(err) {
		if (err) {
			return res.send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(results);
		}
	});

	//send email
};

exports.test = function(req, res) {
	var tests = 'test';
	res.jsonp(tests);
};