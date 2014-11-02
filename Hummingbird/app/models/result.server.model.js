'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateStatus = function(property) {
	if(!property.length) {
		return false;
	}
	var valid = true;
	for(var i=0; i<property.length; i++) {
		if(!(property[i] === 'Submitted' || property[i] === 'Verified' || property[i] === 'Rejected' || property[i] === 'Completed')) {
			valid = false;
			break;
		}
	}
	return valid;
};

/**
 * Result Schema
 */
var ResultSchema = new Schema({
	resultId: {
		type: Number
		//unique: '',
		//required: 'result needs Id number'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},	
	result: {
		type: String,
		trim: true,
		default: 'No result yet'
	},
	submittedBy: {
		type: String
	},
	verifiedBy: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	completed: {
		type: Date
	},
	status: {
		type: [{
			type: String,
			enum: ['Submitted', 'Verified', 'Rejected', 'Completed']
		}],
		default: 'Submitted',
		validate: [validateStatus, 'wrong status']
	},
	comments: {
		type: String
	},
	verifiersComments: {
		type: String
	}
});

mongoose.model('Result', ResultSchema);