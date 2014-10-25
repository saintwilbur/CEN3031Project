'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
	orderId: {
		type: Number,
		unique: '',
		required: 'Order needs Id number'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	item: {
		type: String
	},
	status: {
		type: String,
		trim: true,
		default: 'pending'
	},
	created: {
		type: Date,
		default: Date.now
	},
	result: [{
		type: Schema.ObjectId,
		ref: 'Result'
	}],
	tracking: {
		type: String,
		default: 'XXXXXXXXXX'
	},
	field1: {
		type: String
	},
	field2: {
		type: String
	}
	/**	
	 *item: {
	 *	type: String,
	 *	required: 'Order item required'
	 *},
	 *form: {
	 *	type: Schema.ObjectId,
	 *	ref: 'Form'
	 *},
	 */

});

mongoose.model('Order', OrderSchema);