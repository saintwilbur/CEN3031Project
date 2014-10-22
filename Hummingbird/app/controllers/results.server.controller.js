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