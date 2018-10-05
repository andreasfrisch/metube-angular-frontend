'use strict';

angular.module('metube', [
	'ui.router',
	'menu',
	'authentication',
    'portal',
	'blog',
    'gallery',
])
.factory('tokenInterceptor', ['$q', 'authenticationStatus', function($q, authenticationStatus) {
	return {
		request: _request,
		requestError: _requestError,
		response: _response,
		responseError: _responseError
	};
	
	function _request(config) {
		config.headers = config.headers || {};
        if (sessionStorage.accessToken){
			config.headers.Authorization = 'Token ' + sessionStorage.getItem('accessToken');
		}
		return config;
	}
	function _requestError(rejection) {
		$q.reject(rejection);
	}
	// set local authentication status if request is successful and we have an accesstoken
	// this would happen after browser refresh
	function _response(response) {
		if (response !== null && response.status === 200 && sessionStorage.accessToken && !authenticationStatus.isAuthenticated) {
			authenticationStatus.isAuthenticated = true;
		}
		return response;
	}
	// revoke client authentication if 401 is recieved
	function _responseError(rejection) {
		if (rejection !== null && rejection.status === 401 && (sessionStorage.accessToken || authenticationStatus.isAuthenticated)) {
			sessionStorage.removeItem('accessToken');
			authenticationStatus.isAuthenticated = false;
		}
		return $q.reject(rejection);
	}
}])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'blogApiProvider', 'galleryApiProvider',
        function($stateProvider, $urlRouterProvider, $httpProvider, blogApiProvider, galleryApiProvider) {
    
    //set blogEndpoint
    blogApiProvider.setBackendEndpoint('www.metube.dk/api/blog/posts/');
    galleryApiProvider.setBackendEndpoint('www.metube.dk/api/gallery/images/');
    
    //CSRF protection
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    
    $httpProvider.interceptors.push('tokenInterceptor');
    
	$urlRouterProvider.otherwise('/'); // redirect illegal urls to root
	$stateProvider
	.state('portal', {
		url: '/',
		templateUrl: './portal.html',
        controller: 'portal',
		access: {requiresLogin: false}	
	})
	
	//Authentication
	.state('login', {
		url: '/auth/login',
		templateUrl: 'authentication/login.html',
		controller: 'authentication',
		access: {requiresLogin: false}
	})
	
	// Blog
	.state('blog', {
		url: '/blog',
		//abstract: true,
		template: '<div ui-view></div>', //'blog/menu.html',
		controller: 'blogMenu',
		access: {requiresLogin: false}
	})
	.state('blog.archive', {
		url: '/archive?tags&',
		templateUrl: 'blog/archive/archive.html',
		controller: 'blogArchive',
		access: {requiresLogin: false}	
	})
    .state('blog.newest', {
        url: '/newest',
        templateUrl: 'blog/newest/newest.html',
        controller: 'blogNewest',
        access: {requiresLogin: false}
    })
	.state('blog.view', {
		url: '/entry/:slug',
		templateUrl: 'blog/view/view.html',
		controller: 'blogView',
		access: {requiresLogin: false}	
	})
	.state('blog.edit', {
		url: '/edit',
		abstract: true,
		templateUrl: 'blog/edit/edit.frame.html',
		access: {requiresLogin: true}
	})
	.state('blog.edit.content', {
		url: '/content/:id',
		templateUrl: 'blog/edit/edit.content.html',
		controller: 'blogEdit',
		access: {requiresLogin: true}
	})
	.state('blog.edit.layout', {
		url: '/layout/:id',
		templateUrl: 'blog/edit/edit.layout.html',
		controller: 'blogEdit',
		access: {requiresLogin: true}
	})
	.state('blog.edit.preview', {
		url: '/preview/:id',
		templateUrl: 'blog/edit/edit.preview.html',
		controller: 'blogEdit',
		access: {requiresLogin: true}
	})
    
	// Gallery
	.state('gallery', {
		url: '/gallery',
		templateUrl: 'gallery/gallery.index.html',
		controller: 'galleryIndex',
		access: {requiresLogin: false}
    })
}])
.run(['$rootScope', '$state', 'authenticationStatus', 'authenticationApi', function($rootScope, $state, authenticationStatus, authenticationApi) {
	// redirect to login if attempting to access restricted pages without authentication
	$rootScope.$on('$stateChangeStart', function(event, nextState){
		if (nextState.access.requiresLogin) {
            if (!authenticationStatus.isAuthenticated) {
			    event.preventDefault();
			    $state.go('login');
		    } else {
                console.log('trying to verify')
                authenticationApi.verify()
                .then(
                    function(success) {
                        //pass
                    },
                    function(error) {
        			    event.preventDefault();
        			    $state.go('login');
                    }
                );
            }
        }
	});
}]);