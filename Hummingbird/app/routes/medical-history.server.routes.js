'use strict';

module.exports = function(app) {
	// medicalHistory Routes
	var medicalHistory = require('../../app/controllers/medical-history.server.controller.js');

	// Setting up the medicalHistory api
	app.route('/medicalHistory/create').post(medicalHistory.create);
	app.route('/medicalHistory/get').get(medicalHistory.list);
	//app.route('/medicalHistory/myTest').get(medicalHistory.read);
};