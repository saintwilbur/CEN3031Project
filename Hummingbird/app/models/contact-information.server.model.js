'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ContactInformation Schema
 */
var ContactInformationSchema = new Schema({
	cellNumber: {
		type: Number	
	},
	homeNumber:{
		type: Number
	},
	primaryAddress: {
		type: Schema.ObjectId,
		ref: 'Address'
	},
	secondaryAddress: {
		type: Schema.ObjectId,
		ref: 'Address'
	}
});

mongoose.model('ContactInformation', ContactInformationSchema);