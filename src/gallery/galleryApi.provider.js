// frontend/gallery/galleryApi.service.js
'use strict';

angular.module('gallery')
.provider('galleryApi', function blogApiProvider() {
	var galleryBackendEndpoint = 'undefined';
    
    this.setBackendEndpoint = function(url) {
        galleryBackendEndpoint = url;
    }
    
    this.$get = ['$http', '$q', 'Upload', function($http, $q, Upload) {
        // API definition
    	return {
    		getAllImages: _getAllImages,
    		uploadImage: _uploadImage,
    	};
	
    	// Function definitions:
    	// hoisted during runtime
    	function _getAllImages() {
    		var deferred = $q.defer();
    		//deferred.resolve(MOCKpostList);
    		$http.get(galleryBackendEndpoint)
    		.then(
    			function(response) {
    				deferred.resolve(response.data);
    			}
    			//handle error
    		);
    		return deferred.promise;
		
    	}

    	function _uploadImage(file, imageData) {
            //var deferred = $q.defer();
            return Upload.upload({
                url: galleryBackendEndpoint,
                data: {
                    file: file,
                    title: imageData.title,
                    tags: imageData.tags
                }
            });
            //return deferred.promise;
    	}
    }]
});