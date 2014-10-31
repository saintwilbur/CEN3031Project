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
		if(!(property[i] === 'pending' || property[i] === 'shipped' || property[i] === 'recieved' || property[i] === 'Completed')) {
			valid = false;
			break;
		}
	}
	return valid;
};

/**
 * Order Schema
 */
var OrderSchema = new Schema({
	orderId: {
		type: Number,
		unique: '',
		required: 'Order needs Id number'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	item: {
		type: String
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'shipped', 'recieved', 'Completed']
		}],
		trim: true,
		default: 'pending',
		validate: [validateStatus, 'wrong status']
	},
	created: {
		type: Date,
		default: Date.now
	},
	result: [{
		type: Schema.ObjectId,
		ref: 'Result'
	}],
	tracking: {
		type: String,
		default: 'XXXXXXXXXX'
	},
	field1: {
		type: String
	},
	field2: {
		type: String
	}
	/**	
	 *item: {
	 *	type: String,
	 *	required: 'Order item required'
	 *},
	 *form: {
	 *	type: Schema.ObjectId,
	 *	ref: 'Form'
	 *},
	 */

});

mongoose.model('Order', OrderSchema);