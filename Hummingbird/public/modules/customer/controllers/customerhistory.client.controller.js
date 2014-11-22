'use strict';

angular.module('customer').controller('CustomerHistoryController', ['$scope', 'Authentication', '$http', 'User',
  function($scope, Authentication, $http, User) {
    $scope.authentication = Authentication;
    $scope.orders = [];
    //getHistory();  

    $scope.getHistory = function()
    {
      var send = {
        users: $scope.authentication.user._id   
      };

      $http.get('/order/listorders',send).success(function(response) 
      {
        console.log(send.users);
        $scope.orders=response;
        return $scope.orders;
      }).error(function(response) 
      {
        $scope.error = response.message;
      });
      /* Refresh Current Page */
      $scope.$on('refreshOrders', function (event) {
      $scope.getHistory();
    }); 
    };
  }
]);
