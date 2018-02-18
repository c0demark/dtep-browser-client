(function(angular) {
	"use strict";
	angular.module("dtepApp").config(["$locationProvider", configFn]);

	function configFn($locationProvider) {
		$locationProvider.hashPrefix("");
		// $locationProvider.html5Mode(true);
	}
})(window.angular);
