/*jshint eqeqeq:false, eqnull:true*/
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Order = mongoose.model('Order'),
	Result = mongoose.model('Result'),
	//Forms = mongoose.model('Form'),
	//BillingInformation = mongoose.model('BillingInformation'), 
    _ = require('lodash');

/**
 * Create a Order
 */
exports.create = function(req, res) 
{
	//var form = new Forms(req.body.forms);
	//var billingInformation = new BillingInformation(req.body.billing);
	//var results = new Result();
	//results.user = req.user;
	var order = new Order(req.body);
	order.orderId = Math.floor((Math.random() * 100000000000) + 1000000);
	//order.result = results;


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
	res.jsonp(req.body.order);
};

/**
 * Update a Order
 */
exports.update = function(req, res) {
	var order = req.body.order;
	if (req.body.orderStatus === 'completed') {		
		order = _.extend(order, {status: req.body.orderStatus, completed: Date.now()});
	} else {
		order = _.extend(order, {status: req.body.orderStatus});
	}
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
 * Delete an Order
 */
exports.delete = function(req, res) {

};

/**
 * List of Orders
 */
exports.list = function(req, res) 
{
	Order.find({status: 'pending', user: req.user}).sort('-created').exec(function(err, order){
		if (err) 
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

//lists labTech's completed orders
exports.listLabCompletedOrders = function(req, res) 
{
	Order.find({ result: { $elemMatch: { submittedBy: req.body.userId } } }).sort('-created').exec(function(err, orders){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
		{
			res.jsonp(orders);
		}
	});
};