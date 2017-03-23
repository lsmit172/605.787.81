(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'items' is injected through state's resolve
ItemsController.$inject = ['items']
function ItemsController(items) {
  var ItemsCtrl = this;
  ItemsCtrl.items = items;
}

})();
