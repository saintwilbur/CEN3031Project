'use strict';

module.exports = function(app) {
	// Routing logic   
	var email = require('../../app/controllers/email.server.controller.js');

	// Setting up the medicalHistory api
	app.route('/email/notifyCustomer').post(email.emailNotification);
};