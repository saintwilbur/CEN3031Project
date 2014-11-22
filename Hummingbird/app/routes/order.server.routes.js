'use strict';

module.exports = function(app) {
	// Order Routes
	var orders = require('../../app/controllers/orders.server.controller.js');

	// Setting up the Order api

	//Customer routes
	app.route('/order/new').post(orders.create);
	app.route('/order/pending').get(orders.listPlacedForUser);
	app.route('/order/listorders').get(orders.customerList);

	//Lab routes
	app.route('/order/labCompletedOrders').get(orders.listLabCompletedOrders);
	//app.route('/order/verify').get(orders.verifyList);

	//Admin routes
	app.route('/order/placed').get(orders.listPlaced);
	app.route('/order/listAll').get(orders.adminList);
	app.route('/order/listRegistered').get(orders.listRegistered);
	app.route('/order/listNotPlaced').get(orders.listAllButPlaced);
	app.route('/order/listShipped').get(orders.listShipped);	
	app.route('/order/checkRegisterCode').post(orders.checkRegisterCode);
	app.route('/order/shipped').post(orders.setShipped);
	app.route('/order/isRegistered').get(orders.checkIsRegistered);
	app.route('/order/getShipping').get(orders.shippingAddress);
};