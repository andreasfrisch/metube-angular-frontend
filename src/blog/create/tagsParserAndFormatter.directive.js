// frontend/blog/create/paragraphParserAndFormatter.directive.js
'use strict';

angular.module('blogCreate')
.directive('tagsParserAndFormatter', function() {
	return {
		// element $parsers and $formatters resides in ngModel
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, element, attributes, ngModel) {
			ngModel.$parsers.push(function toModel(input) {
				//split tags by comma and trim them
				return (input || '').split(',').map(function(tag) {
					return tag.trim();
				});
			});
			ngModel.$formatters.push(function toView(input) {
				//comma-join all tags
				return (input || []).join(', ');
			});
		}
	};
});