(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// inject service to protect against minification
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;
  list.items = ShoppingListCheckOffService.getToBuyItems();

  list.moveItem = function (itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  };

  list.isEmpty = function () {
    return ShoppingListCheckOffService.isToBuyEmpty();
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list = this;
  list.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

  list.isEmpty = function () {
    return ShoppingListCheckOffService.isAlreadyBoughtEmpty();
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    {
      name: "Milk",
      quantity: 2,
      pricePerItem: 2
    },
    {
      name: "Donuts",
      quantity: 12,
      pricePerItem: .25
    },
    {
      name: "Cookies",
      quantity: 24,
      pricePerItem: .1
    },
    {
      name: "Chocolate",
      quantity: 5,
      pricePerItem: 1
    },
    {
      name: "Strawberries",
      quantity: 5,
      pricePerItem: .75
    }
  ];

  // initially blank
  var alreadyBoughtItems = [];

  service.getToBuyItems = function () {
    return toBuyItems;
  }

  service.isToBuyEmpty = function () {
    return (toBuyItems.length == 0);
  }

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  }

  service.isAlreadyBoughtEmpty = function () {
    return (alreadyBoughtItems.length == 0);
  }

  service.moveItem = function (itemIndex) {
    // save item to move
    var itemToMove = toBuyItems[itemIndex];

    // Allow buying "0", ignore blank entry
    if ( itemToMove.quantity >= 0 ) {
      // remove item from toBuyItems
      toBuyItems.splice(itemIndex, 1);

      // push item removed to alreadyBoughtItems
      alreadyBoughtItems.push(itemToMove);
    }
  }
}

})();
