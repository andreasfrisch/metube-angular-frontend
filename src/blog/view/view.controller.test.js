// frontend/blog/view/view.controller.test.js
'use strict';

describe('BlogView', function () {
	beforeEach(module('metube'));
	
	var $stateParams;
	var $scope;
	var mockBlogApi;
	var controllerGenerator;

	/*
	beforeEach(module(function($provide) {
		$provide.value('blogApi', mockBlogApi);
	}));
	*/

	beforeEach(module(function($urlRouterProvider) {
		//override default URL to prevent fetching
		$urlRouterProvider.otherwise(function() {return false;});
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope, _$stateParams_, $q) {
		$stateParams = _$stateParams_;
		$scope = $rootScope.$new();

		mockBlogApi = {
			getSpecificPost: function(postSlug) {
				var deferred = $q.defer();
				deferred.resolve(
					postSlug
					/*
					{
						id: 42,
						slug: postSlug,
					//...
					}
					*/
				);
				return deferred.promise;
				//console.log(' >>> HUZZAH;', postSlug);
			}
		};

		controllerGenerator = function() {
			return $controller('blogView', {
				'$scope': $scope,
				'$stateParams': $stateParams,
				'blogApi': mockBlogApi
			});
		};
	}));
	
	/*
	afterEach(function() {
		//...
	});
	*/
	
	it ('should set a post object on scope', function() {
		$stateParams.slug = 'test-test';
		controllerGenerator();
		$scope.$apply();
		//..
	});
	
});