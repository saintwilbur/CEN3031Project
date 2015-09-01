'use strict';
/*jshint quotmark: false */
/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order'),
	config = require('../../config/config'),
	//nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto'),
	mandrill = require('mandrill-api/mandrill'),
	mandrill_client = new mandrill.Mandrill('y6EIYNIwNBbIaneTap-iXw');
/**
 * Create a Email
 */
exports.emailNotification = function(req, res) {
	var message = {
		//Email content	    
	};
	var async = true;
	var ip_pool = "587";
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
	    console.log(result);
	    return;
	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});
};

exports.resultMail = function(req, res, next) {
	// Init Variables
	var message = null;
	async.waterfall([
		function(done) {
			Order.findOne({result: req.body.result_id}).exec(function(err, order){
				if (err) 
				{
					return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
					});
				} else {
					User.findOne({_id: order.user}).exec(function(err, user){
						if (err) 
						{
							return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
							});
						} else {
							done(err, user);
						}
					});
				}			
			});
		},
		function(user, done) {
			res.render('templates/complete-result-email', {
				name: user.displayName,
				appName: config.app.title,
				url: 'localhost:3000/customer/'
			}, function(err, emailHTML) {
				done(err, emailHTML, user);
			});
		},
		// If valid email, send email using service
		function(emailHTML, user, done) {			
			var message = {
	    		'html': emailHTML,
	    		'subject': 'Test Complete',
	    		'from_email': 'sltalty@gmail.com',
	    		'from_name': 'Customer Support',
	    		'to': [{
	            	'email': user.email,
	            	'name': 'Recipient Name',
	            	'type': 'to'
	    		}],
	    		'headers': {
	        		'Reply-To': 'sltalty@gmail.com'
	    		}
	    	};			
			var async = true;
			var ip_pool = '587';
			mandrill_client.messages.send({'message': message, 'async': async, 'ip_pool': ip_pool}, function(result) {
				console.log(result);			
				return;
			}, function(e) {
	    			// Mandrill returns the error as an object with name and message keys
	    			console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    	});
		}
	]);
};