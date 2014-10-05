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
	// BillingInformation model fields   
	// ...
});

mongoose.model('BillingInformation', BillingInformationSchema);