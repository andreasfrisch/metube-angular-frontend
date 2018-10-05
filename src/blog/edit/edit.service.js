// frontend/blog/create/edit.service.js
'use strict';

angular.module('blogEdit')
.service('blogEditService', ['$state', '$q', 'blogApi', function($state, $q, blogApi) {
    var that = this;
	that.blogPostDraft = {};
	that.editting_existing = false;
    that.editting_existing_id = null;
    
	this.getDraft = function() {
        return that.blogPostDraft;
	};
	
	this.setDraft = function(draft) {
		that.blogPostDraft = draft;
	};
    
    this.cleanDraft = function() {
        that.blogPostDraft = {};
        that.editting_existing = false;
    }
    
    this.submitPost = function() {
		blogApi.createNewPost(that.blogPostDraft)
		.then(
			function() {
				that.cleanDraft();
				$state.go('blog.archive');
			}
		);
    }
    
    this.getExistingPost = function(id) {
        var deferred = $q.defer();
        if (isNaN(parseInt(id))) {
            deferred.resolve('ok');
        } else {
            if (that.editting_existing_id == parseInt(id)) {
                deferred.resolve('ok');
            } else {
                blogApi.getSpecificPostById(id).then(
            		 //success
            		function(postObject) {
                        that.editting_existing = true;
            			that.blogPostDraft = postObject;
                        deferred.resolve('ok');
            		}
            		//handle error
            	);
            }
        }
		return deferred.promise;
    };
}]);