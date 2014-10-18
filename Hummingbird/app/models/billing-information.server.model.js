'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * BillingInformation Schema
 */
var BillingInformationSchema = new Schema({
	order: {
		type: Schema.ObjectId,
		ref: 'Order'
	},
	address: {
		streetNumber: {
			type: Number,
			required: ''
		},
		streetName: {
			type: String,
			required: ''
		},
		//apt/suite
		city: {
			type:String,
			required: ''
		},
		state: {
			//change to state picker
			type:String,
			required: ''
		},
		zipcode: {
			type:Number,
			required: ''
		}
	},
	cardInformation: {}
});

mongoose.model('BillingInformation', BillingInformationSchema);