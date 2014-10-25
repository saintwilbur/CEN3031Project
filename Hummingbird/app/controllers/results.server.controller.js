'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Result = mongoose.model('Result'),
	errorHandler = require('./errors'),
    _ = require('lodash');

/**
 * Create a Result
 */
exports.create = function(req, res) {
	var result = new Result(req.body);
	
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
			res.jsonp(result);
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
 * List of Results
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
 * List of Results
 */
exports.listCanVerify = function(req, res) {
	Result.find({submittedBy: {$not: req.user.displayName }}).sort('-created').exec(function(err, result){
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

	results = _.extend(results, {submittedBy: req.user.userId, result: req.result, status: 'submitted'});

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

	results = _.extend(results, {verifiedBy: req.user.userId, status: 'verified'});

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