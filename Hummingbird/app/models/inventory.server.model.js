'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Inventory Schema
 */
var InventorySchema = new Schema({
	itemId: {
		type: Number,
		required: 'Item needs ID number',
		unique: ''
	},
	name: {
		type: String,
		trim: true,
		default: ''
	},
	count: {
		type: Number
	},
	price: {
		type: Number
	}
});

InventorySchema.pre('save', function(next) {
	this.itemId = this.getItemId();
	next();
});

InventorySchema.methods.getItemId = function() {
	var d = new Date().getTime();
	var id = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, 
		function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c==='x' ? r : (r&0x7|0x8)).toString(16);
		});
	return id;
};

mongoose.model('Inventory', InventorySchema);