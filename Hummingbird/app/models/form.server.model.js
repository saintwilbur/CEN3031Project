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
	name: {
		type: String,
		trim: true,
		default: 'Test'
	}
	//other fields
});

mongoose.model('Form', FormSchema);