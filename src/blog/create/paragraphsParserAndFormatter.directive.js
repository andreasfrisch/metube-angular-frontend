// frontend/blog/create/paragraphParserAndFormatter.directive.js
'use strict';

angular.module('blogCreate')
.directive('paragraphsParserAndFormatter', function() {
	return {
		// element $parsers and $formatters resides in ngModel
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, element, attributes, ngModel) {
			ngModel.$parsers.push(function toModel(input) {
				//split tags by comma and trim them
				return (input || '').split('\n\n').map(function(tag) {
					return {
						type: 'text',
						content: tag.trim()
					};
				});
			});
			ngModel.$formatters.push(function toView(input) {
				//comma-join all tags
				return (input || []).reduce(function(text, paragraph) {
					//console.log('ParagraphParserAndFormatter: ', paragraph.content, ' and ', text);
					return (text + '\n\n' + paragraph.content).trim();
				}, '');
			});
		}
	};
});