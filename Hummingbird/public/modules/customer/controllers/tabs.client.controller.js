'use strict';

angular.module('customer').controller('TabsDemoCtrl', function ($scope) {
	$scope.tabs = [
	  //  { title:'New Order', content:'/modules/customer/views/new-order.client.view.html' },
	   // { title:'Pending Orders', content:'/modules/customer/views/pending.client.view.html' },	 
	    { title:'Register-Kit', content:'/modules/customer/views/register-kit.client.view.html' },
	     { title:'Order History', content:'/modules/customer/views/history.client.view.html' }
	  ];
	  var test = true;
	  $scope.tabs[0].active = true;
});