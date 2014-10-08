'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Messaging Schema
 */
var MessagingSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		default: ''
	},
	subject: {
		type: String,
		trim: true,
		default: ''
	},
	message: {
		type: String,
		trim: true,
		default: ''
	}
});

mongoose.model('Messaging', MessagingSchema);