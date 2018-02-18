(function(angular, AmCharts) {
	"use strict";
	angular
		.module("dtepApp")
		.controller("AutomationDashboardController", [
			"$log",
			"$scope",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$uibModal",
			"$state",
			"AutomationDashboardService",
			AutomationDashboardController
		]);

	function AutomationDashboardController(
		$log,
		$scope,
		$rootScope,
		$window,
		$document,
		$location,
		$uibModal,
		$state,
		AutomationDashboardService
	) {
		$scope.testPlanTraceabilityChartConfig = null;
		$scope.totalDefectsChartConfig = null;
		$scope.defectsSeverityChartConfig = null;
		$scope.scheduleVarianceChartConfig = null;
		$scope.executionCoverageChartConfig = null;

		$scope.setTestPlanTraceabilityChartConfig = setTestPlanTraceabilityChartConfig;
		$scope.setTotalDefectsChartConfig = setTotalDefectsChartConfig;
		$scope.setDefectsSeverityChartConfig = setDefectsSeverityChartConfig;
		$scope.setScheduleVarianceChartConfig = setScheduleVarianceChartConfig;
		$scope.setExecutionCoverageChartConfig = setExecutionCoverageChartConfig;
		$scope.project = {};
		$scope.projectName = null;
		$scope.selectedProject = {};
		$scope.init = init;

		$scope.init();

		function init() {
			$scope.setTestPlanTraceabilityChartConfig();
			$scope.setTotalDefectsChartConfig();
			$scope.setDefectsSeverityChartConfig();
			$scope.setScheduleVarianceChartConfig();
			$scope.setExecutionCoverageChartConfig();
		}

		$scope.$on("getGraphData", function(event, data) {
			/** $scope.setTotalDefectsChartConfig(data);
           $scope.setDefectsSeverityChartConfig(data);
           $scope.setTestPlanTraceabilityChartConfig();
           $scope.setScheduleVarianceChartConfig(data);
           $scope.setExecutionCoverageChartConfig(data);**/
		});

		/** function getProjectList() {
            $scope.projectList = ["a","b"];
            $scope.projectName="vineeth";
            automationDashboardService.getProjectList()
            .then(function(response) {
                console.log(response.data);
                $scope.projectList = response.data;
                console.log($scope.projectList);
			})
			.catch(function(error) {
				$window.alert("error in getting project list");
				console.log(error);
			})
			.finally(function() {
				$log.info("finally of getProjectList url call");
			});
        }**/

		function setTestPlanTraceabilityChartConfig() {
			// console.log("traceability graph");
			$scope.testPlanTraceabilityChartConfig = {
				theme: "light",
				type: "serial",
				depth3D: 15,
				// "dataProvider": DataVisualizationService.sampleData,
				dataProvider: [
					{
						buildName: "build1.0",
						buildId: 1,
						noOfTestCasesDesigned: 11,
						noOfRequirements: 5
					},
					{
						buildName: "1.0",
						buildId: 1,
						noOfTestCasesDesigned: 11,
						noOfRequirements: 5
					},
					{
						buildName: "1.1",
						buildId: 2,
						noOfTestCasesDesigned: 3,
						noOfRequirements: 4
					},
					{
						buildName: "1.2",
						buildId: 3,
						noOfTestCasesDesigned: 4,
						noOfRequirements: 6
					},
					{
						buildName: "1.3",
						buildId: 4,
						noOfTestCasesDesigned: 6,
						noOfRequirements: 3
					},
					{
						buildName: "1.4",
						buildId: 5,
						noOfTestCasesDesigned: 8,
						noOfRequirements: 2
					},
					{
						buildName: "1.5",
						buildId: 6,
						noOfTestCasesDesigned: 12,
						noOfRequirements: 7
					},
					{
						buildName: "1.6",
						buildId: 7,
						noOfTestCasesDesigned: 10,
						noOfRequirements: 5
					},
					{
						buildName: "1.7",
						buildId: 8,
						noOfTestCasesDesigned: 14,
						noOfRequirements: 6
					},
					{
						buildName: "1.8",
						buildId: 9,
						noOfTestCasesDesigned: 7,
						noOfRequirements: 1
					}
				],
				valueAxes: [
					{
						//							"stackType": "3d",
						//							"unit": "%",
						position: "left",
						title: "Count"
					}
				],
				startDuration: 1,
				graphs: [
					{
						balloonText: "[[category]] No. of Requirements: <b>[[value]]</b>",
						labelText: "[[value]]",
						fillAlphas: 1,
						lineAlpha: 0.2,
						title: "No of Requirements",
						type: "column",
						valueField: "noOfRequirements"
					},
					{
						balloonText:
							"[[category]] No. of Test Cases Designed: <b>[[value]]</b>",
						labelText: "[[value]]",
						fillAlphas: 1,
						lineAlpha: 0.2,
						title: "No of Test Cases Designed",
						type: "column",
						valueField: "noOfTestCasesDesigned"
					}
				],
				plotAreaFillAlphas: 0.1,
				depth3D: 60,
				angle: 30,
				categoryField: "buildName",
				categoryAxis: {
					gridPosition: "start"
				},
				export: {
					enabled: true
				}
			};
		}

		function setTotalDefectsChartConfig() {
			// console.log("total defects graphs");
			AutomationDashboardService.getDefects($rootScope.release.releaseId)
				.then(function(response) {
					$scope.totalDefectsChartConfig = {
						type: "serial",
						theme: "light",
						dataProvider: response.data,
						gridAboveGraphs: true,
						startDuration: 1,
						graphs: [
							{
								balloonText: "[[category]] No. of Defects: <b>[[value]]</b>",
								labelText: "[[value]]",
								fillAlphas: 0.8,
								lineAlpha: 0.2,
								type: "column",
								valueField: "NoOfDefects"
							}
						],
						chartCursor: {
							categoryBalloonEnabled: false,
							cursorAlpha: 0,
							zoomable: false
						},
						categoryField: "BuildName",
						categoryAxis: {
							gridPosition: "start",
							gridAlpha: 0,
							tickPosition: "start",
							tickLength: 20
						},
						export: {
							enabled: true
						}
					};
				})
				.catch(function(error) {
					$window.alert("error in getting defects");
					console.log(error);
				})
				.finally(function() {
					$log.info("finally of setTotalDefectsChartConfig url call");
				});
		}

		function setDefectsSeverityChartConfig() {
			// console.log("total defects graphs");
			AutomationDashboardService.getDefectsSeverity(
				$rootScope.release.releaseId
			)
				.then(function(response) {
					$scope.defectsSeverityChartConfig = {
						type: "serial",
						theme: "black",
						legend: {
							horizontalGap: 10,
							maxColumns: 1,
							position: "right",
							useGraphSettings: true,
							markerSize: 10
						},
						dataProvider: response.data,
						valueAxes: [
							{
								stackType: "regular",
								axisAlpha: 0.3,
								gridAlpha: 0
							}
						],
						graphs: [
							{
								balloonText:
									"<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
								fillAlphas: 0.8,
								labelText: "[[value]]",
								lineAlpha: 0.3,
								title: "High",
								type: "column",
								color: "#000000",
								valueField: "NoOfHighSeverityDefects"
							},
							{
								balloonText:
									"<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
								fillAlphas: 0.8,
								labelText: "[[value]]",
								lineAlpha: 0.3,
								title: "Medium",
								type: "column",
								color: "#000000",
								valueField: "NoOfMediumSeverityDefects"
							},
							{
								balloonText:
									"<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
								fillAlphas: 0.8,
								labelText: "[[value]]",
								lineAlpha: 0.3,
								title: "Low",
								type: "column",
								color: "#000000",
								valueField: "NoOfLowSeverityDefects"
							}
						],
						categoryField: "buildName",
						categoryAxis: {
							gridPosition: "start",
							axisAlpha: 0,
							gridAlpha: 0,
							position: "left"
						},
						export: {
							enabled: true
						}
					};
				})
				.catch(function(error) {
					$window.alert("error in getting defects");
					console.log(error);
				})
				.finally(function() {
					$log.info("finally of setDefectsSeverityChartConfig url call");
				});
		}

		function setScheduleVarianceChartConfig() {
			AutomationDashboardService.getScheduleVariance(
				$rootScope.release.releaseId
			)
				.then(function(response) {
					console.log("data------" + JSON.stringify(response.data));
					$scope.scheduleVarianceChartConfig = {
						type: "serial",
						theme: "light",
						marginRight: 80,
						autoMarginOffset: 20,
						marginTop: 7,
						dataProvider: response.data,
						valueAxes: [
							{
								axisAlpha: 0.2,
								dashLength: 1,
								position: "left"
							}
						],
						mouseWheelZoomEnabled: true,
						graphs: [
							{
								id: "g1",
								balloonText: "[[value]]",
								bullet: "round",
								bulletBorderAlpha: 1,
								bulletColor: "#FFFFFF",
								hideBulletsCount: 50,
								title: "red line",
								valueField: "effortVariance",
								useLineColorForBulletBorder: true,
								balloon: {
									drop: true
								}
							}
						],
						chartCursor: {
							limitToGraph: "g1"
						},
						categoryField: "build",
						categoryAxis: {
							parseDates: false,
							axisColor: "#DADADA",
							dashLength: 1,
							minorGridEnabled: true
						},
						export: {
							enabled: true
						}
					};
				})
				.catch(function(error) {
					$window.alert("error in getting project list");
					console.log(error);
				})
				.finally(function() {
					$log.info("finally of getProjectList url call");
				});
		}

		function setExecutionCoverageChartConfig() {
			AutomationDashboardService.getExecutionCoverage(
				$rootScope.release.releaseId
			)
				.then(function(response) {
					$scope.executionCoverageChartConfig = {
						theme: "light",
						type: "serial",
						startDuration: 5,
						dataProvider: response.data,
						valueAxes: [
							{
								position: "left",
								axisAlpha: 0,
								gridAlpha: 0
							}
						],
						graphs: [
							{
								balloonText: "[[category]]: <b>[[value]]</b>",
								color: "#98FB98",
								fillAlphas: 0.85,
								lineAlpha: 0.1,
								type: "column",
								topRadius: 1,
								valueField: "executionCoverage"
							}
						],
						depth3D: 40,
						angle: 30,
						chartCursor: {
							categoryBalloonEnabled: false,
							cursorAlpha: 0,
							zoomable: false
						},
						categoryField: "build",
						categoryAxis: {
							gridPosition: "start",
							axisAlpha: 0,
							gridAlpha: 0
						},
						export: {
							enabled: true
						}
					};
				})
				.catch(function(error) {
					$window.alert("error in getting project list");
					console.log(error);
				})
				.finally(function() {
					$log.info("finally of getProjectList url call");
				});
		}
	}
})(window.angular, window.AmCharts);
