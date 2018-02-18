(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
		.factory("AutomationDashboardService", [
			"$log",
			"$http",
			"$resource",
			"$httpParamSerializer",
			"$httpParamSerializerJQLike",
			"DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL",
			AutomationDashboardService
		]);

	function AutomationDashboardService(
		$log,
		$http,
		$resource,
		$httpParamSerializer,
		$httpParamSerializerJQLike,
		DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL
	) {
		var services = {
			getProjectList: getProjectList,
			getDefects: getDefects,
			getDefectsSeverity: getDefectsSeverity,
			getScheduleVariance: getScheduleVariance,
			getExecutionCoverage: getExecutionCoverage
		};

		return services;

		function getProjectList() {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL + "/project/getProjects"
			});
		}

		function getDefects(releaseId) {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL + "/project/getDefects",
				params: {
					releaseId: releaseId
				}
			});
		}

		function getDefectsSeverity(releaseId) {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL +
					"/project/getDefectsSeverity",
				params: {
					releaseId: releaseId
				}
			});
		}

		function getScheduleVariance(releaseId) {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL +
					"/project/getBuildScheduleVariance",
				params: {
					releaseId: releaseId
				}
			});
		}

		function getExecutionCoverage(releaseId) {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL +
					"/project/getExecutionCoverage",
				params: {
					releaseId: releaseId
				}
			});
		}
	}
})(window.angular);
