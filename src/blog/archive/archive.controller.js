'use strict';

angular.module('blogArchive')
.controller('blogArchive', ['$scope', 'blogApi', function($scope, blogApi) {
	
	$scope.searchArchives = function() {
		blogApi.getFilteredPosts().then(
			//success
			function(postObjects) {
				$scope.posts = postObjects;
				$scope.archiveSearchFilter = '';
			}
			//handle error
		);
	};
	
	blogApi.getAllPosts().then(
		 //success
		function(postObjects) {
			$scope.posts = postObjects;
		}
		//handle error
	);
}]);