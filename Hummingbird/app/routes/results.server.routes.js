'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var results = require('../../app/controllers/results.server.controller.js');

	// Setting up the Order api
	app.route('/result/new').post(results.create);
	app.route('/result/pending').get(results.list);
	app.route('/result/submitted').get(results.listCanVerify);
	app.route('/result/submit').post(results.submitResult);
	app.route('/result/verify').post(results.verifyResult);
};