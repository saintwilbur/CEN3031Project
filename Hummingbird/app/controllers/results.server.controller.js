'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Oreder = mongoose.model('Order'),
	Result = mongoose.model('Result'),
	errorHandler = require('./errors'),
    _ = require('lodash');

/**
 * Create a Result
 */
exports.create = function(req, res) {
	var result = new Result(req.body);
	var matchOrder;
	var size;

	Order.find({orderId: req.orderId}).exec(function(err, resultOrder){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			matchOrder = resultOrder;
			size = matchOrder.result.length-1; 
		}
	});
	if (matchOrder.result.length == 0 || matchOrder.result[size].status == 'Rejected') {
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
				matchOrder.result.push(result);
				res.jsonp(result);
			}
		});
	}
	else {
		return res.send(
		{
			message: errorHandler.getErrorMessage(err)
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
 * List of specific lab Results
 */
exports.listPerLab = function(req, res) {
	Result.find({facility: req.facility}).sort('-created').exec(function(err, result){
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
 * List of Results
 */
exports.listCanVerify = function(req, res) {
	Result.find({submittedBy: {$not: req.user.displayName }, facility: req.facility, status: 'Submitted'}).sort('-created').exec(function(err, result){
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
 * Submits the result, passes in the result._id
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
 * Verifies the result, passes in the result._id
 */
exports.verifyResult = function(req, res) {
	var results = req.results;

	results = _.extend(results, {verifiedBy: req.user.userId, status: 'Verified'});

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

exports.rejectedResult = function(req, res) {
	var results = req.results;

	results = _.extend(results, {verifiedBy: req.user.userId, status: 'Rejected'});

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