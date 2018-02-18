(function(angular, d3, AmCharts) {
	"use strict";
	angular
		.module("dtepApp")
		.directive("dtepDraggableLifecycleComponent", [
			"$log",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$timeout",
			"$interval",
			"$parse",
			"$state",
			dtepDraggableLifecycleComponentDirective
		]);
	function dtepDraggableLifecycleComponentDirective(
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
			restrict: "EA",
			scope: {
				onDragging: "&"
			},
			link: link
		};
		function link(scope, element, attrs) {
			element.attr({
				draggable: true
			});
			element.on("dragstart", dragstartEventHandler);
			scope.$on("$destroy", function(event) {
				element.off("dragstart", dragstartEventHandler);
			});
			function dragstartEventHandler(event) {
				scope.onDragging();
			}
		}
	}
})(window.angular, window.d3, window.AmCharts);
