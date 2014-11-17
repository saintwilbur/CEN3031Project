'use strict';

module.exports = function(app) {
	// Order Routes
	var orders = require('../../app/controllers/orders.server.controller.js');

	// Setting up the Order api
	app.route('/order/new').post(orders.create);
	app.route('/order/placed').get(orders.listPlaced);
	app.route('/order/pending').get(orders.listPlacedForUser);
	app.route('/order/list').get(orders.list);
	app.route('/order/listRegistered').get(orders.listRegistered);
	app.route('/order/listNotPlaced').get(orders.listAllButPlaced);
	app.route('/order/listShipped').get(orders.listShipped);	
	app.route('/order/labCompletedOrders').get(orders.listLabCompletedOrders);
	app.route('/order/checkRegisterCode').post(orders.checkRegisterCode);
	app.route('/order/shipped').post(orders.setShipped);
	app.route('/order/isRegistered').get(orders.checkIsRegistered);
};