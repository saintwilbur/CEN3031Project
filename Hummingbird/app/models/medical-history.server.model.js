'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
//	SeqId = require('seqid'),
	Schema = mongoose.Schema;

//var id = new SeqId(0);
/**
 * MedicalHistory Schema
 */
var MedicalHistorySchema = new Schema({
	// MedicalHistory model fields   
	historyId: {
		type: Number,
		//default: id.next()
	},
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