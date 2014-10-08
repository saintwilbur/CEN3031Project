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
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	address: {
		type: Schema.ObjectId,
		ref: 'Address'
	},
	cardInfomation:{
		//???
	}
});

mongoose.model('BillingInformation', BillingInformationSchema);