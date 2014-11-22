'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateLocalStrategyProperty = function(property) {
	return (property.length);
};

/**
 * Messaging Schema
 */
var MessagingSchema = new Schema({
	created: {
		type: String,
		default: Date.prototype.toDateString(Date.now())
	},
	firstName: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in your first name'
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in a last name'
	},
	email: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in a email'
	},
	subject: {
		type: String,
		trim: true,		
		default: '',
		required: 'Please fill in a subject'
	},
	message: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in a message']
	}
});

mongoose.model('Messaging', MessagingSchema);