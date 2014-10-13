'use strict';

module.exports = function(app) {
	// Order Routes
	var orders = require('../../app/controllers/orders.server.controller.js');

	// Setting up the Order api
	app.route('/order/new').post(orders.create);
	app.route('/order/pending').get(orders.list);

};