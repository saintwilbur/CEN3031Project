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
	object: {
		type: Schema.ObjectId,
		ref: 'Object'
	},
	result: {
		type: String,
		trim: true,
		default: 'No result yet'
	}
});

mongoose.model('Result', ResultSchema);