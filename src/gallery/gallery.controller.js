//frontend/gallery/gallery.controller.js
'use strict';

angular.module('gallery')
.controller('galleryIndex', ['$scope', 'galleryApi', '$timeout', function($scope, galleryApi, $timeout) {
	galleryApi.getAllImages().then(
		 //success
		function(images) {
			$scope.images = images;
		}
		//handle error
	);
    
    $scope.uploadImage = function(file, imageData) {
        galleryApi.uploadImage(file, imageData).then(
            function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            },
            function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            },
            function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            }
        );
    }
}]);