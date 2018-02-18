(function(angular, AmCharts) {
	"use strict";
	angular
		.module("dtepApp")
		.controller("PerformanceDashboardController", [
			"$log",
			"$scope",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$uibModal",
			"$state",
			"PerformanceDashboardService",
			PerformanceDashboardController
		]);

	function PerformanceDashboardController(
		$log,
		$scope,
		$rootScope,
		$window,
		$document,
		$location,
		$uibModal,
		$state,
		PerformanceDashboardService
	) {
		$scope.systemCpuChartConfig = null;
		$scope.mobiWatchExecutionsList = [];
		$scope.mobiWatchExecutionData = {};

		$scope.setPerformanceChartsConfig = setPerformanceChartsConfig;
		$scope.setMobiWatchExecutionsList = setMobiWatchExecutionsList;

		$scope.$on("getGraphData", function(event, data) {
			if (
				JSON.stringify($scope.mobiWatchExecutionData) === JSON.stringify({})
			) {
				$scope.setMobiWatchExecutionsList();
			}
		});

		function setMobiWatchExecutionsList() {
			PerformanceDashboardService.getMobiWatchExecutionsData(
				$rootScope.release.releaseId
			)
				.then(function(response) {
					console.log(response.data);
					$scope.mobiWatchExecutionsList = response.data;
				})
				.catch(function(error) {
					$window.alert("error in getting MobiWatch Executions");
					console.log(error);
				})
				.finally(function() {
					$log.info("finally of setMobiWatchExecutionsList url call");
				});
		}

		function setPerformanceChartsConfig(mobiWatchExecutionData) {
			// console.log("traceability graph");
			PerformanceDashboardService.getPerformanceData(mobiWatchExecutionData)
				.then(function(response) {
					$scope.systemCpuChartConfig = {
						type: "serial",
						theme: "light",
						legend: {
							useGraphSettings: true
						},
						dataProvider: response.data.SystemCPU,
						synchronizeGrid: true,
						graphs: [
							{
								valueAxis: "v1",
								lineColor: "#FF6600",
								bullet: "round",
								bulletBorderThickness: 1,
								hideBulletsCount: 30,
								title: "kernel",
								valueField: "kernel",
								fillAlphas: 0
							},
							{
								valueAxis: "v2",
								lineColor: "#FCD202",
								bullet: "square",
								bulletBorderThickness: 1,
								hideBulletsCount: 30,
								title: "user",
								valueField: "user",
								fillAlphas: 0
							},
							{
								valueAxis: "v3",
								lineColor: "#B0DE09",
								bullet: "triangleUp",
								bulletBorderThickness: 1,
								hideBulletsCount: 30,
								title: "total",
								valueField: "total",
								fillAlphas: 0
							}
						],

						categoryField: "date",
						categoryAxis: {
							parseDates: false,
							axisColor: "#DADADA",
							minorGridEnabled: true
						},
						export: {
							enabled: true,
							position: "bottom-right"
						}
					};

					$scope.systemMemoryChartConfig = {
						type: "serial",
						theme: "light",
						marginRight: 40,
						marginLeft: 40,
						autoMarginOffset: 20,
						mouseWheelZoomEnabled: true,
						//"dataDateFormat": "YYYY-MM-DD",
						valueAxes: [
							{
								id: "v1",
								axisAlpha: 0,
								position: "left",
								ignoreAxisWidth: true
							}
						],
						balloon: {
							borderThickness: 1,
							shadowAlpha: 0
						},
						graphs: [
							{
								id: "g1",
								balloon: {
									drop: true,
									adjustBorderColor: false,
									color: "#ffffff"
								},
								bullet: "round",
								bulletBorderAlpha: 1,
								bulletColor: "#FFFFFF",
								bulletSize: 5,
								hideBulletsCount: 50,
								lineThickness: 2,
								title: "red line",
								useLineColorForBulletBorder: true,
								valueField: "y",
								balloonText: "<span style='font-size:18px;'>[[value]]</span>"
							}
						],
						categoryField: "x",
						categoryAxis: {
							parseDates: false,
							dashLength: 1,
							minorGridEnabled: true
						},
						export: {
							enabled: true
						},
						dataProvider: response.data.SystemMemory.RSS
					};

					$scope.systemBatteryChartConfig = {
						type: "serial",
						theme: "light",
						marginRight: 40,
						marginLeft: 40,
						autoMarginOffset: 20,
						mouseWheelZoomEnabled: true,
						//"dataDateFormat": "YYYY-MM-DD",
						valueAxes: [
							{
								id: "v1",
								axisAlpha: 0,
								position: "left",
								ignoreAxisWidth: true
							}
						],
						balloon: {
							borderThickness: 1,
							shadowAlpha: 0
						},
						graphs: [
							{
								id: "g1",
								balloon: {
									drop: true,
									adjustBorderColor: false,
									color: "#ffffff"
								},
								bullet: "round",
								bulletBorderAlpha: 1,
								bulletColor: "#FFFFFF",
								bulletSize: 5,
								hideBulletsCount: 50,
								lineThickness: 2,
								title: "red line",
								useLineColorForBulletBorder: true,
								valueField: "y",
								balloonText: "<span style='font-size:18px;'>[[value]]</span>"
							}
						],
						categoryField: "x",
						categoryAxis: {
							parseDates: false,
							dashLength: 1,
							minorGridEnabled: true
						},
						export: {
							enabled: true
						},
						dataProvider: response.data.SystemBattery.level
					};

					$scope.systemDiskChartConfig = {
						type: "serial",
						theme: "light",
						marginRight: 40,
						marginLeft: 40,
						autoMarginOffset: 20,
						mouseWheelZoomEnabled: true,
						//"dataDateFormat": "YYYY-MM-DD",
						valueAxes: [
							{
								id: "v1",
								axisAlpha: 0,
								position: "left",
								ignoreAxisWidth: true
							}
						],
						balloon: {
							borderThickness: 1,
							shadowAlpha: 0
						},
						graphs: [
							{
								id: "g1",
								balloon: {
									drop: true,
									adjustBorderColor: false,
									color: "#ffffff"
								},
								bullet: "round",
								bulletBorderAlpha: 1,
								bulletColor: "#FFFFFF",
								bulletSize: 5,
								hideBulletsCount: 50,
								lineThickness: 2,
								title: "red line",
								useLineColorForBulletBorder: true,
								valueField: "y",
								balloonText: "<span style='font-size:18px;'>[[value]]</span>"
							}
						],
						categoryField: "x",
						categoryAxis: {
							parseDates: false,
							dashLength: 1,
							minorGridEnabled: true
						},
						export: {
							enabled: true
						},
						dataProvider: response.data.SystemDisk.dataUsed
					};

					$scope.appCpuChartConfig = {
						type: "serial",
						theme: "light",
						legend: {
							useGraphSettings: true
						},
						dataProvider: response.data.AppCPU,
						synchronizeGrid: true,
						graphs: [
							{
								valueAxis: "v1",
								lineColor: "#FF6600",
								bullet: "round",
								bulletBorderThickness: 1,
								hideBulletsCount: 30,
								title: "kernel",
								valueField: "kernel",
								fillAlphas: 0
							},
							{
								valueAxis: "v2",
								lineColor: "#FCD202",
								bullet: "square",
								bulletBorderThickness: 1,
								hideBulletsCount: 30,
								title: "user",
								valueField: "user",
								fillAlphas: 0
							},
							{
								valueAxis: "v3",
								lineColor: "#B0DE09",
								bullet: "triangleUp",
								bulletBorderThickness: 1,
								hideBulletsCount: 30,
								title: "total",
								valueField: "total",
								fillAlphas: 0
							}
						],

						categoryField: "date",
						categoryAxis: {
							parseDates: false,
							axisColor: "#DADADA",
							minorGridEnabled: true
						},
						export: {
							enabled: true,
							position: "bottom-right"
						}
					};

					$scope.appMemoryChartConfig = {
						type: "serial",
						theme: "light",
						marginRight: 40,
						marginLeft: 40,
						autoMarginOffset: 20,
						mouseWheelZoomEnabled: true,
						//"dataDateFormat": "YYYY-MM-DD",
						valueAxes: [
							{
								id: "v1",
								axisAlpha: 0,
								position: "left",
								ignoreAxisWidth: true
							}
						],
						balloon: {
							borderThickness: 1,
							shadowAlpha: 0
						},
						graphs: [
							{
								id: "g1",
								balloon: {
									drop: true,
									adjustBorderColor: false,
									color: "#ffffff"
								},
								bullet: "round",
								bulletBorderAlpha: 1,
								bulletColor: "#FFFFFF",
								bulletSize: 5,
								hideBulletsCount: 50,
								lineThickness: 2,
								title: "red line",
								useLineColorForBulletBorder: true,
								valueField: "y",
								balloonText: "<span style='font-size:18px;'>[[value]]</span>"
							}
						],
						categoryField: "x",
						categoryAxis: {
							parseDates: false,
							dashLength: 1,
							minorGridEnabled: true
						},
						export: {
							enabled: true
						},
						dataProvider: response.data.AppMemory.RSS
					};

					$scope.appNetworkChartConfig = {
						type: "serial",
						theme: "light",
						legend: {
							useGraphSettings: true
						},
						dataProvider: response.data.AppNetwork,
						synchronizeGrid: true,
						graphs: [
							{
								valueAxis: "v1",
								lineColor: "#FF6600",
								bullet: "round",
								bulletBorderThickness: 1,
								hideBulletsCount: 30,
								title: "Sent Bytes",
								valueField: "sentBytes",
								fillAlphas: 0
							},
							{
								valueAxis: "v2",
								lineColor: "#FCD202",
								bullet: "square",
								bulletBorderThickness: 1,
								hideBulletsCount: 30,
								title: "Recieved Bytes",
								valueField: "recievedBytes",
								fillAlphas: 0
							}
						],

						categoryField: "date",
						categoryAxis: {
							parseDates: false,
							axisColor: "#DADADA",
							minorGridEnabled: true
						},
						export: {
							enabled: true,
							position: "bottom-right"
						}
					};

					$scope.appGraphicsChartConfig = {
						type: "serial",
						theme: "light",
						marginRight: 40,
						marginLeft: 40,
						autoMarginOffset: 20,
						mouseWheelZoomEnabled: true,
						//"dataDateFormat": "YYYY-MM-DD",
						valueAxes: [
							{
								id: "v1",
								axisAlpha: 0,
								position: "left",
								ignoreAxisWidth: true
							}
						],
						balloon: {
							borderThickness: 1,
							shadowAlpha: 0
						},
						graphs: [
							{
								id: "g1",
								balloon: {
									drop: true,
									adjustBorderColor: false,
									color: "#ffffff"
								},
								bullet: "round",
								bulletBorderAlpha: 1,
								bulletColor: "#FFFFFF",
								bulletSize: 5,
								hideBulletsCount: 50,
								lineThickness: 2,
								title: "red line",
								useLineColorForBulletBorder: true,
								valueField: "y",
								balloonText: "<span style='font-size:18px;'>[[value]]</span>"
							}
						],
						categoryField: "x",
						categoryAxis: {
							parseDates: false,
							dashLength: 1,
							minorGridEnabled: true
						},
						export: {
							enabled: true
						},
						dataProvider: response.data.AppGraphics.percentDropped
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
	}
})(window.angular, window.AmCharts);
