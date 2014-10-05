'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ContactInformation Schema
 */
var ContactInformationSchema = new Schema({
	// ContactInformation model fields   
	// ...
});

mongoose.model('ContactInformation', ContactInformationSchema);