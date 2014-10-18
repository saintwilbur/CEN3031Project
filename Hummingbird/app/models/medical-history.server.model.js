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
		type: String
	},
	field3: {
		type: String
	}
});

mongoose.model('MedicalHistory', MedicalHistorySchema);