// frontend/blog/create/create.layout.controller.js
'use strict';

angular.module('blogCreate')
.controller('blogCreateLayout', [
		'$scope', '$state', 'blogCreateService', 'blogApi', 'paragraphTypes',
		function($scope, $state, blogCreateService, blogApi, paragraphTypes) {
	$scope.draft = blogCreateService.getDraft();
	$scope.paragraphTypes = paragraphTypes;
	

	$scope.goToContent = function() {
		blogCreateService.setDraft($scope.draft);
		$state.go('blog.create.content');
	};	
	$scope.goToLayout = function() {
		blogCreateService.setDraft($scope.draft);
		$state.go('blog.create.layout');
	};
	$scope.goToPreview = function() {
		blogCreateService.setDraft($scope.draft);
		$state.go('blog.create.preview');
	};
	$scope.submitPost = function() {
		blogApi.createNewPost(blogCreateService.getDraft())
		.then(
			function() {
				$state.go('blog.archive');
			}
		);
	};
}]);