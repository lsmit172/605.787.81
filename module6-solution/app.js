(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

// inject scope service to protect against minification
LunchController.$inject = ['$scope'];
function LunchController($scope) {
  $scope.response = "";
  $scope.meal = "";
  $scope.responseStyle = "";
  $scope.lunchMenuStyle = "";

  $scope.checkIfTooMuch = function () {
    var meal = $scope.meal;
    var items = meal.split(",");

    var count = 0;
    var i = 0;

    // Count number of items in meal, ignoring whitespace
    for ( i = 0; i < items.length; i++ ) {
      if ( items[i].trim().length != 0 ) {
        count += 1;
      }
    }

    if ( count == 0 ) {
      $scope.response = "Please enter data first";
      $scope.responseStyle = "redText";
      $scope.lunchMenuStyle = "redBorder";
    } else if ( count <= 3 ) {
      $scope.response = "Enjoy!";
      $scope.responseStyle = "greenText";
      $scope.lunchMenuStyle = "greenBorder";
    } else {
      $scope.response = "Too much!";
      $scope.responseStyle = "greenText";
      $scope.lunchMenuStyle = "greenBorder";
    }
  };
}

})();
