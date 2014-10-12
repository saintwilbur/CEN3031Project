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
		type: Schema.ObjectId,
		ref: 'Inventory'
	},
	billingInformation: {
		type: Schema.ObjectId,
		ref: 'BillingInformation'
	},
	status: {
		type: String,
		trim: true,
		default: 'pending',
		require: 'Status field is required'
	},
	result: {
		type: Schema.ObjectId,
		ref: 'Result'
	},
	tracking: {},
	form: {
		type: Schema.ObjectId,
		ref: 'Form'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Order', OrderSchema);