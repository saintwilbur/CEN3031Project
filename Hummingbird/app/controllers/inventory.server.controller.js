'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Inventory = mongoose.model('Inventory'),
    _ = require('lodash');

/**
 * Create an Inventory item
 */
exports.create = function(req, res) {

};

/**
 * Show the current Inventory
 */
exports.read = function(req, res) {

};

/**
 * Update a Inventory's count
 * Controller will need to pass in the id of the item 
 * and the count to be added. 
 * req.body.itemId and req.body.amount
 */
exports.updateCount = function(req, res) {
	var newCount = req.body.amount;
	Inventory.findOne({itemId: req.body.itemId}).execute(function(err, item)
	{
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			newCount += item.count;
			item = _.extend(item, {count: newCount});
		}
	});
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
	Inventory.find({ }).sort('-created').exec(function(err, item){
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