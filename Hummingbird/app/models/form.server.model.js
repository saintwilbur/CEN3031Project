'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Form Schema
 */
var FormSchema = new Schema({
	// Form model fields   
	// ...
});

mongoose.model('Form', FormSchema);