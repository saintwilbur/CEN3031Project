'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * LabFacility Schema
 */
var LabFacilitySchema = new Schema({
	// LabFacility model fields   
	facilityId: {
		type: Number,
		unique: '',
		required: 'facility needs Id number'
	},
	facilityName: {
		type: String,
		required: ''
	},
	location: {
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
	verificationCode: [{
		type: String
	}]
});

mongoose.model('LabFacility', LabFacilitySchema);