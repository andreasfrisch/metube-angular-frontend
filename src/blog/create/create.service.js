// frontend/blog/create/create.service.js
'use strict';

angular.module('blogCreate')
.service('blogCreateService', [function() {
	this.blogPostDraft = {};
	
	this.getDraft = function() {
		return this.blogPostDraft;
	};
	
	this.setDraft = function(draft) {
		this.blogPostDraft = draft;
	};
	
	this.cleanDraft = function() {
		this.blogPostDraft = {};
	};
}]);