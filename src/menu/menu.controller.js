//frontend/menu/menu.controller.js
'use strict';

angular.module('menu')
.controller('menu', ['$scope', '$state', 'authenticationApi', 'authenticationStatus', 'menuService', function($scope, $state, authenticationApi, authenticationStatus, menuService) {
	$scope.menuLinks = [];
	
	$scope.$watch(
		function() {
			return menuService.links
		},
		function(newLinksList) {
			$scope.menuLinks = newLinksList;
		}
	)
	
	$scope.isActive = function linkIsActive(linkState) {
		return $state.includes(linkState);
	}

	$scope.authenticationStatus = authenticationStatus;
		
	$scope.logout = function() {
		authenticationApi.logout();
		$state.go('portal');
	}
		
}]);