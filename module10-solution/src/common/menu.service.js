(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var users = [];

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.storeUser = function( user) {
    return $http.get(ApiPath + '/menu_items/' + user.shortname + '.json').then(function (response) {
      // Clear users array so we only store user
      users = [];
      users.push(user);

      // return response
      return response.data;
    }).catch(function (error) {
      return undefined;
    });
  };

  service.getUser = function() {
    if (users.length == 1 ) {
      var user = users[0];
      return user;
    } else {
      return undefined;
    }
  };

  service.getUserItem = function() {
    if (users.length != 1 ) {
      return undefined;
    }

    var user = users[0];
    var shortName = user.shortname;

    return service.getItem(shortName);
  };

  service.getItem = function(shortName) {
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {
      return response.data;
    }).catch(function (error) {
      return undefined;
    });
  };

}

})();
