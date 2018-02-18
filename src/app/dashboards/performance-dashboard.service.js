(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
		.factory("PerformanceDashboardService", [
			"$log",
			"$http",
			"$resource",
			"$httpParamSerializer",
			"$httpParamSerializerJQLike",
			"DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL",
			PerformanceDashboardService
		]);

	function PerformanceDashboardService(
		$log,
		$http,
		$resource,
		$httpParamSerializer,
		$httpParamSerializerJQLike,
		DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL
	) {
		var services = {
			getPerformanceData: getPerformanceData,
			getMobiWatchExecutionsData: getMobiWatchExecutionsData
		};

		return services;

		function getMobiWatchExecutionsData(releaseId) {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL +
					"/project/getMobiWatchExecutionsData",
				params: {
					releaseId: releaseId
				}
			});
		}

		function getPerformanceData(mobiWatchExecutionData) {
			return $http({
				method: "POST",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL +
					"/project/getPerformanceSystemData",
				data: mobiWatchExecutionData
			});
		}
	}
})(window.angular);
