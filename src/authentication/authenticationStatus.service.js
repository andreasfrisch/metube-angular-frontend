//frontend/authentication/authenticationStatus.js
'use strict';

angular.module('authentication')
.service('authenticationStatus', [function() {
	this.isAuthenticated = false;
}]);