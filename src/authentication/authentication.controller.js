'use strict';

angular.module('authentication')
.controller('authentication', ['$scope', '$state', 'authenticationApi', 'authenticationStatus', function($scope, $state, authenticationApi, authenticationStatus) {

	$scope.authenticationStatus = authenticationStatus;

	$scope.login = function(username, password) {
		console.log('loginController > login attempt..');
		authenticationApi.login(username, password)
		.then(
			function(userData) {
				console.log('loginController > login successful: ', userData);
				$state.go('portal');
			},
			function(error) {
				console.log('loginController > login failed: ', error);
			}
		);
	};
	
	$scope.register = function(username, password) {
		console.log('loginController > registration attempt..');
		authenticationApi.register(username, password)
		.then(
			function(userData) {
				console.log('loginController > registration successful: ', userData);
			},
			function(error) {
				console.log('loginController > registration failed: ', error);
			}
		);
	};

	$scope.logout = function() {
		console.log('loginCtrl > logging out..');
		authenticationApi.logout();
		console.log('loginCtrl > ..done!');
		$state.go('portal');
	};
}]);