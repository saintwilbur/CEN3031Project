'use strict';

angular.module('customer').controller('CustomerHistoryController', ['$scope', 'Authentication', '$http', 'User',
  function($scope, Authentication, $http, User) {
    $scope.authentication = Authentication;
    $scope.orderHistory = [];
    //getHistory();  

    $scope.getHistory = function()
    {
      var send = {
        users: $scope.authentication.user._id   
      };

      $http.get('/order/listorders',send).success(function(response) 
      {
        console.log(response);
        $scope.orderHistory=response;
        return $scope.orderHistory;
      }).error(function(response) 
      {
        $scope.error = response.message;
      });

    };
  }
]);
