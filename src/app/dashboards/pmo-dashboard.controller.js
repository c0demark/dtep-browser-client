(function(angular, AmCharts) {
    "use strict";
    angular.module("dtepApp")
        .controller("PmoDashboardController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            PmoDashboardController
        ]);

    function PmoDashboardController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModal,
        $state
    ) {
        // $scope.name = { firstName: "PmoDashboardController" };
        console.log("PmoDashboardController", $scope);
        $scope.projects = [];
        $scope.selectedProject = null;
        $scope.chartConfig = null;
        $scope.fetchProjects = fetchProjects;
        $scope.setTestPlanTraceabilityChartConfig = setTestPlanTraceabilityChartConfig;
        $scope.setTotalDefectsChartConfig = setTotalDefectsChartConfig;
        $scope.init = init;

        $scope.init();

        function init() {
            $scope.fetchProjects();
            $scope.setTestPlanTraceabilityChartConfig();
        }

        function fetchProjects() {
            $scope.projects = [
                { projectId: 1, projectName: "MindtreeTest" },
                { projectId: 2, projectName: "MindtreeTest2" },
            ];

            if ($scope.projects.length > 0) {
                $scope.selectedProject = $scope.projects[0];
            }
        }

        function setTestPlanTraceabilityChartConfig() {
            // console.log("traceability graph");
            $scope.chartConfig = {
                "theme": "light",
                "type": "serial",
                // "dataProvider": DataVisualizationService.sampleData,
                "dataProvider": [{
                    "country": "USA",
                    "year2004": 3.5,
                    "year2005": 4.2
                }, {
                    "country": "UK",
                    "year2004": 1.7,
                    "year2005": 3.1
                }, {
                    "country": "Canada",
                    "year2004": 2.8,
                    "year2005": 2.9
                }, {
                    "country": "Japan",
                    "year2004": 2.6,
                    "year2005": 2.3
                }, {
                    "country": "France",
                    "year2004": 1.4,
                    "year2005": 2.1
                }, {
                    "country": "Brazil",
                    "year2004": 2.6,
                    "year2005": 4.9
                }, {
                    "country": "Russia",
                    "year2004": 6.4,
                    "year2005": 7.2
                }, {
                    "country": "India",
                    "year2004": 8,
                    "year2005": 7.1
                }, {
                    "country": "China",
                    "year2004": 9.9,
                    "year2005": 10.1
                }],
                "valueAxes": [{
                    "stackType": "3d",
                    "unit": "%",
                    "position": "left",
                    "title": "GDP growth rate",
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "GDP grow in [[category]] (2004): <b>[[value]]</b>",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.2,
                    "title": "2004",
                    "type": "column",
                    "valueField": "year2004"
                }, {
                    "balloonText": "GDP grow in [[category]] (2005): <b>[[value]]</b>",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.2,
                    "title": "2005",
                    "type": "column",
                    "valueField": "year2005"
                }],
                "plotAreaFillAlphas": 0.1,
                "depth3D": 60,
                "angle": 30,
                "categoryField": "country",
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "export": {
                    "enabled": true
                }
            };
        }

        function setTotalDefectsChartConfig() {
            // console.log("total defects graphs");
            $scope.chartConfig = {
                "type": "serial",
                "theme": "light",
                "dataProvider": [{
                    "country": "USA",
                    "visits": 2025
                }, {
                    "country": "China",
                    "visits": 1882
                }, {
                    "country": "Japan",
                    "visits": 1809
                }, {
                    "country": "Germany",
                    "visits": 1322
                }, {
                    "country": "UK",
                    "visits": 1122
                }, {
                    "country": "France",
                    "visits": 1114
                }, {
                    "country": "India",
                    "visits": 984
                }, {
                    "country": "Spain",
                    "visits": 711
                }, {
                    "country": "Netherlands",
                    "visits": 665
                }, {
                    "country": "Russia",
                    "visits": 580
                }, {
                    "country": "South Korea",
                    "visits": 443
                }, {
                    "country": "Canada",
                    "visits": 441
                }, {
                    "country": "Brazil",
                    "visits": 395
                }],
                "valueAxes": [{
                    "gridColor": "#FFFFFF",
                    "gridAlpha": 0.2,
                    "dashLength": 0
                }],
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "visits"
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "country",
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                },
                "export": {
                    "enabled": true
                }
            };
        }
    }
})(window.angular, window.AmCharts);