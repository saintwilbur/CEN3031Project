'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Order = mongoose.model('Order'),
	Forms = mongoose.model('Form'),
	BillingInformation = mongoose.model('BillingInformation'), 
    _ = require('lodash');

/**
 * Create a Order
 */
exports.create = function(req, res) 
{
	var form = new Forms(req.body.forms);
	var billingInformation = new BillingInformation(req.body.billing);
	var order = new Order(req.body);
	order.user = req.user;

	order.save(function(err) {
		if (err) 
		{
			return res.send(
			{
				message: errorHandler.getErrorMessage(err)
			});
		}
		else 
		{
			res.jsonp(order);
		}
	});
};

/**
 * Show the current Order
 */
exports.read = function(req, res) 
{
	res.jsonp(req.order);
};

/**
 * Update a Order
 */
exports.update = function(req, res) {

};

/**
 * Delete an Order
 */
exports.delete = function(req, res) {

};

/**
 * List of Orders
 */
exports.list = function(req, res) 
{
<<<<<<< HEAD
	Order.find({status: 'pending', user: req.user}).sort('-created').exec(function(err, order){
		if (err) 
=======
	Order.find().sort('-created').exec(function(err, order){
		if (order.user.id !== req.user.id)
		{
			return res.status(403).send({
				message: 'User is not autorized'
			});
		}
		else if (err) 
>>>>>>> c16539ef91423e85017ed021e449473f133755b2
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(order);
		}
	});
};