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
        for(var i = 0; i<response.length; i++)
        {
         getResultInfo(response[i], response[i].result[response[i].result.length-1]);
        }
      }).error(function(response) 
      {
        $scope.error = response.message;
      });

      console.log($scope.orderHistory);
    };

    var getResultInfo = function(order, result_id)
    {
      var orderInfo = {};
      var send  = 
      {
        _id: result_id
      };
      console.log(order);
      $http.get('/result/outcome', send).success(function(response) 
      {
        orderInfo = {
            orderId: order.orderId,
            created: order.created,
            status: order.status,
            result: response
        };
        console.log(response);
        $scope.orderHistory.push(orderInfo);
      }).error(function(response) 
      {
        $scope.error = response.message;
      });

    };
  }
]);
