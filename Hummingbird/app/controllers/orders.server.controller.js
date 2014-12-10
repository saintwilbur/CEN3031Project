/*jshint eqeqeq:false, eqnull:true*/
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Order = mongoose.model('Order'),
	Item = mongoose.model('Inventory'),
	Result = mongoose.model('Result'),
	//Forms = mongoose.model('Form'),
	//BillingInformation = mongoose.model('BillingInformation'), 
    _ = require('lodash');

var inventory = require('../../app/controllers/inventory.server.controller.js');
var core = require('../../app/controllers/core.server.controller.js');

var getResultId = function() {
	var d = new Date().getTime();
	var id = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, 
		function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c==='x' ? r : (r&0x7|0x8)).toString(16);
		});
	return id;
};

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
	order.registerCode = core.getId();	
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
			console.log(order);
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

/***
 * Update a Order
 */
exports.update = function(req, res) {
	var order = req.body.order;
	if (req.body.orderStatus === 'Completed') {		
		order = _.extend(order, {status: req.body.orderStatus, completed: Date.prototype.toDateString(Date.now())});
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
 * List of Orders for customer
 */
exports.customerList = function(req, res) 
{
	console.log('Called:');
	Order.find({user: req.user}, {_id:1, 'orderId': 1,'fields': 1, 'created': 1, 'completed': 1, 'item': 1, 'shippingAddress': 1, 'status': 1, 'result': 1}).sort('-created').exec(function(err, order){
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

/**
 * List of Orders for admin
 */
exports.adminList = function(req, res) 
{
	Order.find({}).sort('-created').exec(function(err, order){
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


//list user's placed order
exports.listPlacedForUser = function(req, res) 
{
	Order.find({status: 'Placed', user: req.user}).sort('-created').exec(function(err, order){
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

/** List all placed orders for admin module
 */
exports.listPlaced = function(req, res) 
{
	Order.find({status: 'Placed'}).sort('-created').exec(function(err, order){
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

/* Function will list all orders with status shipped
 * front end does not neeed to pass in any parameters
 */
exports.listShipped = function(req, res) 
{
	Order.find({status: 'Shipped'}).sort('-created').exec(function(err, order){
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

/* Function will list all orders with status placed
 * front end does not neeed to pass in any parameters
 */
exports.listRegistered = function(req, res) 
{
	Order.find({status: 'Registered'}).sort('-created').exec(function(err, order){
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

/* Function will list all orders with any status but placed
 * front end does not neeed to pass in any parameters
 */
exports.listAllButPlaced = function(req, res) 
{
	Order.find({'status': {$ne:'Placed'}}).sort('-created').exec(function(err, order){
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
	Order.find({ status: 'Completed'}).sort('-created').exec(function(err, orders){
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

/**
 * Function will check to make sure the Register Code from the order exists on a 'placed' order for the user. 
 * req.body will need to contain the 
 * register code, req.body.registerCode, and the customer's id, req.body.userId
 */
exports.checkRegisterCode = function(req, res) 
{
	Order.findOne({status: 'Shipped', registerCode: req.body.registerCode}).exec(function(err, orders) 
	{

		if(err) 
		{
			return res.status(400).send({
				message:errorHandler.getErrorMessage(err)
			});
		}
		else 
		{
			if(orders == null) {
				return res.send({
					message: 'Matching order for this code does not exist in the system.'
				});
			}
			else
			{
				orders = _.extend(orders, {user: req.body.user, status: 'Registered'});
				orders.save(function(err) {
					if (err) {
						return res.send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						return res.send({
							message: 'Kit for Order ID ' + orders.orderId + ' has been registered.'
						});
					}
				});
			}
		}
	});
};

/** 
 * Function to set status of orders to shipped
 * Function is only for Admins 
 * req.body.orderId will need to be the orderId of the the order
 * req.body.item will need to be the name of the kit
 */
exports.setShipped = function(req, res) 
{
	Order.findOne({orderId: req.body.orderId, status: 'Placed'}).exec(function(err, orders){
		if (err) 
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} 
		else 
		{
			if(orders == null) {
				return res.send({
					message: 'Order does not exist in system.'
				});
			}
			Item.findOne({name: req.body.item, count: { $gt: 0 }}).exec(function(err, items){
				if(items == null) {
					return res.send({
						message: 'Not enough item in the inventory.'
					});
				}
				else 
				{
					console.log(items);
					orders = _.extend(orders, {status: 'Shipped'});
					var req1 = 
					{
						body : { 
								itemId: items.itemId, 
								count: -1
							}
					};
					var res1 = 
					{
						send: function(){}
					};
					inventory.updateCount(req1, res1);
					console.log(items);
					orders.save(function(err) {
						if (err) {
							return res.send({
								message: errorHandler.getErrorMessage(err)
							});
						} else {
							res.send({
								message: 'Kit for Order ID ' + orders.orderId + ' has been shipped.'
							});
						}
					});
				}
			});
		}
	});
};

/* Function will check to see if the order for the passed in orderId is registered
 * Controler will need to pass in the orderId 
 * req.body.orderId
 * function will return a statement,
 * 'Valid order id' or 'Invalid order id'
 */
exports.checkIsRegistered = function(req, res)
{
	var result= '';
	Order.findOne({orderId: req.body.orderId}).exec(function(err, orders) 
	{
		if(err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			if(orders.status == 'Registered'){
				result = 'Valid order id';
			}
			else {
				result = 'Invalid order id';
			}

			return res.send({
				message: result
			});
		}
	});
};

/** Function wil return the shipping address of an order
 * controller must pass in the order id 
 * req.body.orderId
 * will return the shipping address for the order
 */
exports.shippingAddress = function(req, res) 
{
	Order.findOne({orderId: req.body.orderId}, {_id:0, 'orderId': 1, 'shippingAddress':1}).exec(function(err, orderFound)
	{
		if(err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.jsonp(orderFound);
		}
	});
};

exports.verifyList = function(req, res)
{

};