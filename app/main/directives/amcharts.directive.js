(function(angular, AmCharts) {
    "use strict";
    angular.module("dtepApp")
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
                chartConfig: "=dtepAmcharts"
            },
            // transclude: true,
            template: "<div id='{{chartdivId}}'></div>",
            // template: "<div id='chartdiv'></div>",
            link: link
        };

        function link(scope, element, attrs) {
            // scope.name = "dtepAmchartsDirective link function";
            // console.log(attrs);
            console.log("dtepAmchartsDirective link function", scope);
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
                console.log(chartConfigNext);
                console.log(chartConfigPrev);
                plotChart();
                // }
                // });
            });

            scope.$on("$destroy", function(event) {
                console.log("scope is destroyed");
                console.log("event is", event);
                if (chart) {
                    // console.log(chart.destroy);
                    chart.destroy();
                }
            });

            element.on("$destroy", function(event) {
                console.log("element is destroyed");
                console.log("event is", event);
                if (chart) {
                    // console.log(chart.destroy);
                    chart.destroy();
                }
            });

            function plotChart() {
                if (chart) {
                    chart.destroy();
                }
                // console.log(scope.chartConfig);
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