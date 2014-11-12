'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Inventory = mongoose.model('Inventory'),
    _ = require('lodash');

/**
 * Create a Inventory
 */
exports.create = function(req, res) {

};

/**
 * Show the current Inventory
 */
exports.read = function(req, res) {

};

/**
 * Update a Inventory
 */
exports.update = function(req, res) {

};

/**
 * Delete an Inventory
 */
exports.delete = function(req, res) {

};

/**
 * List of Inventories
 */
exports.list = function(req, res) {
	Inventory.find().execute(function(err, item){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(item);
		}
	});
};