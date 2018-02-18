(function(angular) {
	"use strict";
	angular.module("dtepApp").config(["$httpProvider", configFn]);

	function configFn($httpProvider) {
		$httpProvider.interceptors.push("CorsHttpResponseInterceptor");
		$httpProvider.interceptors.push("AuthTokenRequestHeaderInterceptor");
	}

	angular
		.module("dtepApp")
		.factory("CorsHttpResponseInterceptor", [
			"$log",
			"$rootScope",
			"$q",
			"$window",
			"$document",
			"$location",
			"$injector",
			CorsHttpResponseInterceptor
		])
		.factory("AuthTokenRequestHeaderInterceptor", [
			"$log",
			"$rootScope",
			"$q",
			"$window",
			"$document",
			"$location",
			"$injector",
			"store",
			"$localStorage",
			"$sessionStorage",
			AuthTokenRequestHeaderInterceptor
		]);

	function CorsHttpResponseInterceptor(
		$log,
		$rootScope,
		$q,
		$window,
		$document,
		$location,
		$injector
	) {
		return {
			response: function(response) {
				// console.log(response);
				// Not working as expected becasue browser does not expose the response headers even after successful network call.
				// So angular is not able to set the below mentioned header. The idea is to set "Access-Control-Allow-Origin"
				// to allow browser to render cross origin contents.
				response.config.headers["Access-Control-Allow-Origin"] = "*";
				return response || $q.when(response);
			}
		};
	}

	var logErrorMessage = true;

	function AuthTokenRequestHeaderInterceptor(
		$log,
		$rootScope,
		$q,
		$window,
		$document,
		$location,
		$injector,
		store,
		$localStorage,
		$sessionStorage
	) {
		return {
			request: function(config) {
				var userCredentials;
				try {
					// after successful authentication you
					// should set the key dtep.user.credentials as a strigified json object in sessionStorage.
					// at retrieval time the object should be parsed to get back the original object.
					// fallback try catch is provided in case the json object is not stringified before setting
					// or if the object is not at all a json object. Suitable error message on console will be printed.
					// $window.sessionStorage.setItem("dtep.user.credentials", JSON.stringify());
					userCredentials = JSON.parse(
						$window.sessionStorage.getItem("dtep.user.credentials")
					);
					logErrorMessage = false;
				} catch (e) {
					if (logErrorMessage) {
						console.log(e);
						console.log("check sessionStorage for 'dtep.user.credentials'.");
						console.log(
							"It might be missing or may not be a stringified json object at all."
						);
						console.log(
							"If found then check whether it is a strigified json object."
						);
						console.log(
							"You need to stringify it explicitly to resolve this issue."
						);
					}
					logErrorMessage = false;
				}
				if (userCredentials && angular.isDefined(userCredentials.authToken)) {
					var authToken = userCredentials.authToken;
					config.headers["X-Auth-Token"] = authToken;
				}
				return config || $q.when(config);
			}
		};
	}
})(window.angular);
