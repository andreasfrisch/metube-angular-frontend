// frontend/blog/create/edit.controller.js
'use strict';

angular.module('blogEdit')
.controller('blogEdit', [
		'$scope', '$state', '$stateParams', 'blogEditService', 'paragraphTypes',
		function($scope, $state, $stateParams, blogEditService, paragraphTypes) {
            
    $scope.loading = true;
    // TODO: do someting when loading
    blogEditService.getExistingPost(parseInt($stateParams.id)).then(
        function() {
            $scope.loading = false;
            $scope.draft = blogEditService.getDraft();
        }
    );
    $scope.paragraphTypes = paragraphTypes; 
	
	$scope.goToContent = function() {
    	blogEditService.setDraft($scope.draft);
		$state.go('blog.edit.content');
	};	
	$scope.goToLayout = function() {
		blogEditService.setDraft($scope.draft);
		$state.go('blog.edit.layout');
	};
	$scope.goToPreview = function() {
		blogEditService.setDraft($scope.draft);
		$state.go('blog.edit.preview');
	};
	$scope.submitPost = function() {
		blogEditService.submitPost();
	};
}]);