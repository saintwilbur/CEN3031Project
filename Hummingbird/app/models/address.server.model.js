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
});

mongoose.model('Address', AddressSchema);