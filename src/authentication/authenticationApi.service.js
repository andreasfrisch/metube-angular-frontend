//frontend/authentication/authenticationApi.service.js
'use strict';

angular.module('authentication')
.service('authenticationApi', ['$q', '$http', 'authenticationStatus', function($q, $http, authenticationStatus) {
	return {
		login: _login,
		register: _register,
		logout: _logout,
        verify: _verify,
	};
	
	function _login(username, password) {
		console.log('authenticationApi > login attempt..');
		var deferred = $q.defer();
		$http.post('/api/auth/login/', {
			username: username,
			password: password
		})
		.then(
			function(responseData) {
				console.log('authenticationApi > login successful: ', responseData.data);
				sessionStorage.setItem('accessToken', responseData.data.token);
				authenticationStatus.isAuthenticated = true;
				deferred.resolve(200);
			},
			function(error) {
				console.log('authenticationApi > login failed: ', error);
				deferred.reject(error.status);
			}
		);
		return deferred.promise;
	}
	
	function _register(username, password) {
		console.log('authenticationApi > registration attempt..');
		var deferred = $q.defer();
		$http.post('/api/auth/register/', {
			username: username,
			password: password
		})
		.then(
			function(userData) {
				console.log('authenticationApi > registration successful: ', userData);
				deferred.resolve(userData);
			},
			function(error) {
				console.log('authenticationApi > registration failed: ', error);
				deferred.reject(error.status);
			}
		);
		return deferred.promise;
	}
	
	function _logout() {
		console.log('authenticationApi > logging out');
		sessionStorage.removeItem('accessToken');
		authenticationStatus.isAuthenticated = false;
	}
    
    function _verify() {
        console.log('authenticationApi > verify key');
        var deferred = $q.defer();
        console.log('verifying');
        $http.post('/api/auth/verify/', {})
        .then(
            function(responseData) {
                console.log('authentication verification success');
                deferred.resolve(200);
            },
            function(error) {
                console.log('authentication verification failed: ', error);
                deferred.reject(error.status);
            }
        );
        return deferred.promise;
    }
}]);