'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * MedicalHistory Schema
 */
var MedicalHistorySchema = new Schema({
	// MedicalHistory model fields   
	user: {
		type: Schema.ObjectId, 
		ref: 'User'
	},
	field1: {
		type: String
	},
	field2: {
		type: Boolean
	},
	field3: {
		type: Number
	}
});

mongoose.model('MedicalHistory', MedicalHistorySchema);