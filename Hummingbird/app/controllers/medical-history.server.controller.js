'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	MedicalHistory = mongoose.model('MedicalHistory'),
    _ = require('lodash');

/**
 * Create a Medical history
 */
exports.create = function(req, res) 
{
	var medicalHistory = new MedicalHistory(req.body);

	medicalHistory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicalHistory);
		}
	});
};

/**
 * Show the current Medical history
 */
exports.read = function(req, res) {

};

/**
 * Update a Medical history
 */
exports.update = function(req, res) {

};

/**
 * Delete an Medical history
 */
exports.delete = function(req, res) {

};

/**
 * List of Medical histories
 */
exports.list = function(req, res) {
	MedicalHistory.find({user: req.user}).exec(function(err, medicalHistory){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(medicalHistory);
		}
	});
};