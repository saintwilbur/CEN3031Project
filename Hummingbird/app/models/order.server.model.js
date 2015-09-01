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
		if(!(property[i] === 'Placed' || property[i] === 'Shipped' || property[i] === 'Registered' || property[i] === 'Received' || property[i] === 'Completed')) {
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
			enum: ['Placed', 'Shipped', 'Registered', 'Received', 'Completed']
		}],
		trim: true,
		default: 'Placed',
		validate: [validateStatus, 'wrong status']
	},
	billing: {
		type:{
			cardHolderName: String,
			cardNumber: Number,
			address: {
				streetNumber: Number,
				streetName: String,
				city: String,
				state: String,
				zipCode: Number
			}
		},		
		required: 'Need Billing Information'
	},
	shippingAddress: {
		type: {
			streetNumber: Number,
			streetName: String,
			city: String,
			state: String,
			zipCode: Number
		},
		required: 'Need Shipping address'
	},
	created: {
		type: Date,
		default: Date.now()
	},
	completed: {
		type: Date
	},
	result: [{
		type: Schema.ObjectId,
		ref: 'Result'
	}],
	tracking: {
		type: String,
		default: 'XXXXXXXXXX'
	},
	fields: [{
		type: String
	}],
	registerCode: {
		type: String,
		unique: ''
	},
	registered: {
		type: Boolean,
		default: 'false'
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

/*
OrderSchema.pre('save', function(next) {
	this.registerCode = this.createRegisterCode();
	next();
});

OrderSchema.methods.createRegisterCode = function() {
	var d = new Date().getTime();
	var registerCode = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, 
		function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c==='x' ? r : (r&0x7|0x8)).toString(16);
		});
	return registerCode;
};
*/

mongoose.model('Order', OrderSchema);