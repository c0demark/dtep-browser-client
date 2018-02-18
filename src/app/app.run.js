(function(angular) {
	"use strict";
	angular.module("dtepApp").run(["$log", "$rootScope", "$state", runFn]);

	function runFn($log, $rootScope, $state) {
		$rootScope.$on("$viewContentLoaded", function(event, viewConfig) {
			$rootScope.pageInfo = {};
			if ($state.$current.data && $state.$current.data.pageInfo) {
				$rootScope.pageInfo.title =
					$state.$current.data.pageInfo.title || "DTEP";
			} else {
				$rootScope.pageInfo.title = "DTEP";
			}
		});
	}
})(window.angular);
