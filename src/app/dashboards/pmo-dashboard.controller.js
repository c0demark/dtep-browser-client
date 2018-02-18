(function(angular, AmCharts) {
	"use strict";
	angular
		.module("dtepApp")
		.controller("PmoDashboardController", [
			"$log",
			"$scope",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$uibModal",
			"$state",
			"PmoDashboardService",
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
		$state,
		PmoDashboardService
	) {
		// declaring and initializing scope properties
		$scope.allProjectsList = [];
		$scope.selectedProject = {};
		$scope.allReleasesListByProjectId = [];
		$scope.selectedRelease = {};
		$scope.releaseDetailsDataByReleaseId = {};

		// scope properties getters and setters
		$scope.getAllProjectsList = getAllProjectsList;
		$scope.setAllProjectsList = setAllProjectsList;
		$scope.getSelectedProject = getSelectedProject;
		$scope.setSelectedProject = setSelectedProject;
		$scope.getAllReleasesListByProjectId = getAllReleasesListByProjectId;
		$scope.setAllReleasesListByProjectId = setAllReleasesListByProjectId;
		$scope.getSelectedRelease = getSelectedRelease;
		$scope.setSelectedRelease = setSelectedRelease;
		$scope.getReleaseDetailsDataByReleaseId = getReleaseDetailsDataByReleaseId;
		$scope.setReleaseDetailsDataByReleaseId = setReleaseDetailsDataByReleaseId;

		// scope properties helper methods
		$scope.getDefectsData = getDefectsData;

		// api call methods
		$scope.fetchAllProjectsList = fetchAllProjectsList;
		$scope.fetchAllReleasesListByProjectId = fetchAllReleasesListByProjectId;
		$scope.fetchReleaseDetailsDataByReleaseId = fetchReleaseDetailsDataByReleaseId;

		// init method - executes after view renders and controller is loaded. Similar to jQuery $(document).ready(function() {})
		$scope.init = init;

		$scope.init();

		function getAllProjectsList() {
			return $scope.allProjectsList;
		}

		function setAllProjectsList(allProjectsList) {
			$scope.allProjectsList = allProjectsList;
		}

		function getSelectedProject() {
			return $scope.selectedProject;
		}

		function setSelectedProject(selectedProject) {
			$scope.selectedProject = selectedProject;
		}

		function getAllReleasesListByProjectId() {
			return $scope.allReleasesListByProjectId;
		}

		function setAllReleasesListByProjectId(allReleasesListByProjectId) {
			$scope.allReleasesListByProjectId = allReleasesListByProjectId;
		}

		function getSelectedRelease() {
			return $scope.selectedRelease;
		}

		function setSelectedRelease(selectedRelease) {
			$scope.selectedRelease = selectedRelease;
		}

		function getReleaseDetailsDataByReleaseId() {
			return $scope.releaseDetailsDataByReleaseId;
		}

		function setReleaseDetailsDataByReleaseId(releaseDetailsDataByReleaseId) {
			$scope.releaseDetailsDataByReleaseId = releaseDetailsDataByReleaseId;
		}

		function init() {
			$scope.fetchAllProjectsList();
		}

		function fetchAllProjectsList() {
			PmoDashboardService.fetchAllProjectsList()
				.then(function(response) {
					$scope.setAllProjectsList(response.data);
					$scope.setSelectedProject(response.data[0]);
					$scope.fetchAllReleasesListByProjectId($scope.getSelectedProject());
				})
				.catch(function(errorResponse) {
					$window.alert("error in getting project list");
					console.log(errorResponse);
				})
				.finally(function() {
					$log.info("finally of fetchAllProjectsList url call");
				});
		}

		function fetchAllReleasesListByProjectId(selectedProject) {
			PmoDashboardService.fetchAllReleasesListByProjectId(
				selectedProject.projectId
			)
				.then(function(response) {
					$scope.setAllReleasesListByProjectId(response.data);
				})
				.catch(function(errorResponse) {
					$window.alert("error in getting releases");
				})
				.finally(function() {
					$log.info("finally of fetchAllReleasesListByProjectId url call");
				});
		}

		function fetchReleaseDetailsDataByReleaseId(selectedRelease) {
			PmoDashboardService.fetchReleaseDetailsDataByReleaseId(
				selectedRelease.releaseId
			)
				.then(function(response) {
					$scope.setReleaseDetailsDataByReleaseId(response.data);
				})
				.catch(function(errorResponse) {
					$window.alert("error in getting release Data");
				})
				.finally(function() {
					$log.info("finally of getReleaseData url call");
				});
		}

		function getDefectsData(release) {
			$rootScope.release = release;
			$scope.parentData = release;
			$scope.$broadcast("getGraphData", $scope.parentData);
		}
	}
})(window.angular, window.AmCharts);
