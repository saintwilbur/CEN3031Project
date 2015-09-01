'use strict';

angular.module('core').controller('ModalController', function ($scope, $modal, $log) {

  $scope.open = function (size, tmplt) {

    var modalInstance = $modal.open({
      templateUrl: tmplt,
      controller: 'ModalInstanceController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('core').controller('ModalInstanceController', function ($scope, $modalInstance) {


  $scope.ok = function () {
    $modalInstance.close('close');
  };


  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.$on('closeModal', function (event) {
      $scope.ok();
  });

});