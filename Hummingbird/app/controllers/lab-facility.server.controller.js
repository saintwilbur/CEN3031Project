'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	SeqId = require('seqid'),
	LabFacility = mongoose.model('LabFacility'),
    _ = require('lodash');
var id = new SeqId(0);
/**
 * Create a Lab facility
 */
exports.create = function(req, res) {
	var labFacility = new LabFacility(req.body);
	labFacility.facilityId = id.next();
	labFacility.save(function(err) {
		if (err) {
			return res.send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(labFacility);
		}
	});
};

/**
 * Show the current Lab facility
 */
exports.read = function(req, res) {

};

/**
 * Update a Lab facility
 */
exports.update = function(req, res) {

};

/**
 * Delete an Lab facility
 */
exports.delete = function(req, res) {

};

/**
 * List of Lab facilities
 */
exports.list = function(req, res) {

};