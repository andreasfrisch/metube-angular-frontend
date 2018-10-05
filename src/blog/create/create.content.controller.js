//newPost.controller.js
'use strict';

angular.module('blogCreate')
.controller('blogCreateContent', ['$scope', '$state', 'blogCreateService', 'blogApi', function($scope, $state, blogCreateService, blogApi) {
	
	$scope.draft = blogCreateService.getDraft();

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