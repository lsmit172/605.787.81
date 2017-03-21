(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.isEmpty = function () {
    if ( list.found == undefined || 
         list.found.length == 0 ) {
      return true;
    }

    return false;
  };
}

// inject service to protect against minification
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.getMatched = function(searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      list.found = response;
    })
    .catch(function (error) {
      console.log("getMatched() - Error Occurred");
    })
  };

  list.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
    // Clear foundItems array
    foundItems = [];

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      var menuItems =  result.data.menu_items;
      var i = 0;

      if ( searchTerm != undefined && searchTerm.length != 0 ) { 
        for ( i = 0; i < menuItems.length; i++ ) {
	  // Note: Case insensitive
          if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
            // Item matches! Add to list
  	    foundItems.push(menuItems[i]);
  	  }
        }
      }

      return foundItems;
    }).catch(function (error) {
      console.log("getMatchedMenuItems() - Error Occurred");
    });  
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };
}

})();
