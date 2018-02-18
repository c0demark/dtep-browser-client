(function(angular, AmCharts) {
	"use strict";
	angular
		.module("dtepApp")
		.directive("dtepAmcharts", [
			"$log",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$timeout",
			"$interval",
			"$parse",
			"$state",
			dtepAmchartsDirective
		]);
	function dtepAmchartsDirective(
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
			replace: true,
			scope: {
				chartdivId: "@",
				chartConfig: "=dtepAmchartsChartConfig"
			},
			// transclude: true,
			template: "<div id='{{chartdivId}}'></div>",
			link: link
		};
		function link(scope, element, attrs) {
			var chart = false;
			// angular.element($document).ready(function() {
			//     plotChart();
			// });
			// angular.element(document).ready(function() {
			//     plotChart();
			// });
			// angular.element(function() {
			//     plotChart();
			// });
			scope.$watch("chartConfig", function(chartConfigNext, chartConfigPrev) {
				// angular.element(function() {
				// if (chartConfigNext != chartConfigPrev) {
				if (scope.chartConfig && scope.chartdivId) {
					if (scope.chartConfig.constructor !== {}.constructor) {
						$log.error("!!!!!!! Not able to plot AmCharts graph.");
						$log.error(
							"the value of the attribute 'data-dtep-amcharts-chart-config' is " +
								(scope.chartConfig.constructor === [].constructor
									? "array"
									: typeof scope.chartConfig)
						);
						$log.error(
							"dtepAmcharts directive needs 'data-dtep-amcharts-chart-config' attribute with chartConfig JSON object from the controller scope in order to plot AmCharts"
						);
					}
					plotChart();
				} else {
					$log.error("!!!!!!! Not able to plot AmCharts graph.");
					if (!scope.chartConfig) {
						$log.error(
							"the value of the attribute 'data-dtep-amcharts-chart-config' is " +
								typeof scope.chartConfig
						);
						$log.error(
							"dtepAmcharts directive needs 'data-dtep-amcharts-chart-config' attribute with chartConfig JSON object from the controller scope in order to plot AmCharts"
						);
					}
					if (!scope.chartdivId) {
						$log.error(
							"the value of the attribute 'data-chartdiv-id' is " +
								typeof scope.chartConfig
						);
						$log.error(
							"dtepAmcharts directive needs 'data-chartdiv-id' attribute with string value in order to plot AmCharts"
						);
					}
				}
				// }
				// });
			});
			scope.$on("$destroy", function(event) {
				if (chart) {
					chart.destroy();
				}
			});
			function plotChart() {
				if (chart) {
					chart.destroy();
				}
				var config = scope.chartConfig || {};
				// chart = AmCharts.makeChart("chartdiv", config);
				chart = AmCharts.makeChart(scope.chartdivId, config);
				// chart = $window.AmCharts.makeChart(scope.chartdivId, config);
				// chart = AmCharts.makeChart(attrs.chartdivId, config);
				// chart = AmCharts.makeChart(attrs.id, config);
			}
		}
	}
})(window.angular, window.AmCharts);
