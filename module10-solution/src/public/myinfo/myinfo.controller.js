(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'item'];
function MyInfoController(user,item) {
  var $ctrl = this;
  $ctrl.user = user;
  $ctrl.item = item;
}


})();
