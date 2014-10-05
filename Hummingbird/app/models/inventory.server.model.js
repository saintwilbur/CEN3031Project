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
	// Inventory model fields   
	// ...
});

mongoose.model('Inventory', InventorySchema);