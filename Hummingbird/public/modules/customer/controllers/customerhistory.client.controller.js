'use strict';
/*jshint eqeqeq:false, eqnull:true*/
angular.module('customer').controller('CustomerHistoryController', ['$scope', 'Authentication', '$http', 'User', '$filter',
  function($scope, Authentication, $http, User, $filter) {
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
    };

    var getResultInfo = function(order, result_id)
    {
      /* jshint ignore:start */
      var orderInfo = {};
      var send  = 
      {
        _id: result_id
      };
      $http.post('/result/outcome',send).success(function(response) 
      {
        orderInfo = {
            orderId: order.orderId,
            item: order.item,
            created:  $filter('date')(order.created, 'yyyy-MM-dd HH:mm'),
            completed:  $filter('date')(order.completed, 'yyyy-MM-dd HH:mm'),
            status: order.status,
            result: response.result,
            comments: '"' +response.comments + '"'
        };
        if(order.completed === undefined)
        {
          orderInfo.completed = 'In Progress';
        }
        if(response.comments === undefined)
        {
          orderInfo.comments = 'None';
        }
        $scope.orderHistory.push(orderInfo);
      }).error(function(response) 
      {
        $scope.error = response.message;
      });
      /* jshint ignore:end */
    };
  }
]);

