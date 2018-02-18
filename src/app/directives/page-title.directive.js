(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
		.directive("dtepPageTitle", [
			"$log",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$timeout",
			"$interval",
			"$parse",
			"$state",
			dtepPageTitleDirective
		]);

	function dtepPageTitleDirective(
		$log,
		$rootScope,
		$window,
		$document,
		$location,
		$timeout,
		$interval,
		$parse,
		$state
	) {
		return {
			restrict: "A",
			link: link
		};
		function link(scope, element, attrs) {
			$rootScope.$on("$viewContentLoaded", function(event, viewConfig) {
				if ($state.$current.data && $state.$current.data.pageInfo) {
					element.text($state.$current.data.pageInfo.title || "DTEP");
				} else {
					element.text("DTEP");
				}
			});
		}
	}
})(window.angular);
