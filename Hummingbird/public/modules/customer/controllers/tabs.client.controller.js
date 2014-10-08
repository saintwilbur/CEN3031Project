'use strict';

angular.module('customer').controller('TabsDemoCtrl', function ($scope) {
  $scope.tabs = [
    { title:'New Order', content:'/modules/forms/contact.html' },
    { title:'Pending Orders', content:'Dynamic content 2' },
    { title:'Order History', content:'/modules/customer/views/history.client.view.html' },
    { title:'Medical Background', content:'Dynamic content 1' }
  ];
  var test = true;
  $scope.tabs[0].active = true;
  $scope.alertMe = function() {
    setTimeout(function() {
      alert('You\'ve selected the alert tab!');
    });
  };
});