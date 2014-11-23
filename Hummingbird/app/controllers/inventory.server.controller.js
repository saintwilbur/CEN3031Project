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
 * Controller will need to pass in the item name, item start count and,
 * item price. 
 * req.body.name, req.body.count, req.body.price
 */
exports.create = function(req, res) {
	var item = new Inventory(req.body);
	item.itemId = Math.floor((Math.random() * 100000000000) + 1000000);
	item.save(function(err) {
		if (err) {
			return res.send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(item);
		}
	});
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
 * req.body.itemId and req.body.count
 */
exports.updateCount = function(req, res) {
	var newCount = req.body.count;
	Inventory.findOne({itemId: req.body.itemId}).exec(function(err, item)
	{
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			newCount = Number(newCount) + Number(item.count);
			item = _.extend(item, {count: newCount});
			item.save(item);
			return res.send({
				message: req.body.count + ' kits have been added to inventory item ' + item.name + '.'
			});
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