'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	MedicalHistory = mongoose.model('MedicalHistory'),
	SeqId = require('seqid'),
	Result = mongoose.model('Result'),
    _ = require('lodash');
var id = new SeqId(0);
/**
 * Create a Medical history
 */
exports.create = function(req, res) 
{
	var medicalHistory = new MedicalHistory(req.body);
	medicalHistory.historyId = id.next();
	medicalHistory.save(function(err) {
		if (err) {
			return res.send({
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
	MedicalHistory.findOne({user: req.body.user}).exec(function(err, medicalHistory){
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

