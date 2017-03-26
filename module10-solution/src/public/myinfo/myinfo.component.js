(function () {
"use strict";

angular.module('public')
.component('myInfo', {
  templateUrl: 'src/public/myinfo/myinfo.html',
  bindings: {
    user: '<',
    item: '<'
  },
  controller: MyInfoController
});

MyInfoController.$inject = ['ApiPath'];
function MyInfoController(ApiPath) {
  var ctrl = this;
  ctrl.basePath = ApiPath;
}

})();
