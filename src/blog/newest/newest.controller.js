'use strict';

angular.module('blogNewest')
.controller('blogNewest', ['$state', 'blogApi', function($state, blogApi) {
    var cannotFindNewest = false;
    blogApi.getNewestPost()
    .then(
        function(response) {
            $state.go('blog.view', {slug: response.data.slug});
        },
        function(error) {
            cannotFindNewest = true;
        }
    )
}]);