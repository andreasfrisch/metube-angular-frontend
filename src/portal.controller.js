'use strict';

angular.module('portal', [])
.controller('portal', ['menuService', function(menuService) {
    menuService.removeLinks();
}]);