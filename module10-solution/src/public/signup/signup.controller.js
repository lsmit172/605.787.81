(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var ctrl = this;

  ctrl.submit = function(user) {
    // Store user (firstname, lastname, email, phone, shortname)
    var promise = MenuService.storeUser(user);

    ctrl.menuNumberMessage = undefined;
    ctrl.message = undefined;

    promise.then(function (response) {
     // Response is undefined if menu item doesn't exist
     if ( response == undefined ) {
       ctrl.menuNumberMessage = "No such menu number exists";
     } else {
       ctrl.message = "Your information has been saved.";
     }
    })
    .catch(function (error) {
      ctrl.message = "Unable to contact server";
    })
  };

  ctrl.getItem = function(shortName) {
    console.log("Item is " + shortName);

    var promise = MenuService.getItem(shortName);

    ctrl.menuNumberMessage = undefined;
    ctrl.message = undefined;

    promise.then(function (response) {
     // Response is undefined if menu item doesn't exist
     if ( response == undefined ) {
       ctrl.menuNumberMessage = "No such menu number exists";
     } 
    })
    .catch(function (error) {
      ctrl.message = "Unable to contact server";
    })
  };
}

})();
