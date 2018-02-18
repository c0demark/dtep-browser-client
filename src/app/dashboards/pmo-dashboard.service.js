(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
		.factory("PmoDashboardService", [
			"$log",
			"$http",
			"$resource",
			"$httpParamSerializer",
			"$httpParamSerializerJQLike",
			"DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL",
			PmoDashboardService
		]);

	function PmoDashboardService(
		$log,
		$http,
		$resource,
		$httpParamSerializer,
		$httpParamSerializerJQLike,
		DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL
	) {
		var services = {
			fetchAllProjectsList: fetchAllProjectsList,
			fetchAllReleasesListByProjectId: fetchAllReleasesListByProjectId,
			fetchReleaseDetailsDataByReleaseId: fetchReleaseDetailsDataByReleaseId
		};

		return services;

		function fetchAllProjectsList() {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL + "/project/getProjects"
			});
		}

		function fetchAllReleasesListByProjectId(projectId) {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL + "/project/getReleases",
				params: {
					projectId: projectId
				}
			});
		}

		function fetchReleaseDetailsDataByReleaseId(releaseId) {
			return $http({
				method: "GET",
				url:
					DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL +
					"/project/getReleaseData",
				params: {
					releaseId: releaseId
				}
			});
		}
	}
})(window.angular);
