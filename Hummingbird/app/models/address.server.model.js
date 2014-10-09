'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Address Schema
 */
var AddressSchema = new Schema({
	streetNumber: {
		type: Number
	},
	streetName: {
		type: String
	},
	//apt/suite
	city: {
		type:String
	},
	state: {
		//change to state picker
		type:String
	},
	zipcode: {
		type:Number
	}
});

mongoose.model('Address', AddressSchema);