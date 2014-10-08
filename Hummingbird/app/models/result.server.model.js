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
	item: {
		type: Schema.ObjectId,
		ref: 'Inventory'
	},
	result: {
		type: String,
		trim: true,
		default: 'No result yet'
	}
});

mongoose.model('Result', ResultSchema);