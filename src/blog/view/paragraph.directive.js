'use strict';

angular.module('blogView')
.directive('blogParagraph', function () {
	return {
		restrict: 'E',
		scope: {
			paragraph: '=',
			first: '='
		},
		templateUrl: '//blog/view/paragraph.html',
	};
});