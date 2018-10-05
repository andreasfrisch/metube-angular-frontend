'use strict';

angular.module('blog', [
	'blogView',
	'blogArchive',
	'blogEdit',
    'blogNewest',
])
.constant('paragraphTypes', [
	'header',
	'text',
	'image'
]);