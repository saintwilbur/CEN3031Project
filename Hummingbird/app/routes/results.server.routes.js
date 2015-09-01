'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var results = require('../../app/controllers/results.server.controller.js');

	// Setting up the Order api
	app.route('/result/new').post(results.create);
	//app.route('/result/allPending').get(results.list);
	app.route('/result/pending').get(results.listPerLab);
	app.route('/result/verifierList').get(results.listCanVerify);
	//app.route('/result/submit').post(results.submitResult);
	app.route('/result/verify').post(results.verifyResult);
	app.route('/result/reject').post(results.rejectResult);
	app.route('/result/outcome').post(results.getResultData);
	app.route('/result/getOrderInfo').get(results.getOrderInfo);
	app.route('/results/submitterRejectedList').get(results.rejectedList);
	app.route('/result/verifier').post(results.getVerifier);
	
};