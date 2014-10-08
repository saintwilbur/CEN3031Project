'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Inventory Schema
 */
var InventorySchema = new Schema({
	itemId: {
		type: Number,
		unique: 'testing error message',
		required: 'Please fill in an id'
	},
	name: {
		type: String,
		trim: true,
		default: ''
	},
	count: {
		type: Number
	},
	price: {
		type: Number
	}
});

mongoose.model('Inventory', InventorySchema);