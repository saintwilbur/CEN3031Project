'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Facility = mongoose.model('LabFacility'),
	Order = mongoose.model('Order');

/**
 * Globals
 */
var user, facility, order;

/**
 * Unit tests
 */