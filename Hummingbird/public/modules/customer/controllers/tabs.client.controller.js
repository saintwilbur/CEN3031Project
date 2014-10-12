'use strict';

angular.module('customer').controller('TabsDemoCtrl', function ($scope) {
  $scope.tabs = [
    { title:'New Order', content:'/modules/forms/contact.html' },
    { title:'Pending Orders', content:'' },
    { title:'Order History', content:'/modules/customer/views/history.client.view.html' },
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