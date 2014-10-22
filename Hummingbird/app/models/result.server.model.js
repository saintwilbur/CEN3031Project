'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Result Schema
 */
var ResultSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	result: {
		type: String,
		trim: true,
		default: 'No result yet'
	},
	submittedBy: {
		type: String
	},
	verifiedBy: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Result', ResultSchema);