'use strict';

angular.module('customer').controller('TabsDemoCtrl', function ($scope) {
  $scope.tabs = [
    { title:'New Order', content:'/modules/customer/views/new-order.client.view.html' },
    { title:'Pending Orders', content:'' },
    { title:'Order History', content:'' },
    { title:'Medical Background', content:'' }
  ];
  var test = true;
  $scope.tabs[0].active = true;
  $scope.alertMe = function() {
    setTimeout(function() {
      alert('You\'ve selected the alert tab!');
    });
  };
});