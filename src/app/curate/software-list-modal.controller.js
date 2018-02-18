(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
		.controller("SoftwareListModalController", [
			"$log",
			"$scope",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$uibModal",
			"$uibModalInstance",
			"$state",
			SoftwareListModalController
		]);

	function SoftwareListModalController(
		$log,
		$scope,
		$rootScope,
		$window,
		$document,
		$location,
		$uibModal,
		$uibModalInstance,
		$state
	) {
		// declaring and initializing scope properties
		$scope.selectedSoftware = null;

		// scope properties getters and setters
		$scope.getSelectedSoftware = getSelectedSoftware;
		$scope.setSelectedSoftware = setSelectedSoftware;

		// scope properties helper methods
		$scope.holdSelectedSoftware = holdSelectedSoftware;
		$scope.unholdSelectedSoftware = unholdSelectedSoftware;

		$scope.closeModal = closeModal;
		$scope.dismissModal = dismissModal;
		$scope.openSoftwareConnectFormModal = openSoftwareConnectFormModal;
		$scope.openSoftwareProvisionFormModal = openSoftwareProvisionFormModal;

		function getSelectedSoftware() {
			return $scope.selectedSoftware;
		}

		function setSelectedSoftware(selectedSoftware) {
			$scope.selectedSoftware = selectedSoftware;
		}

		function holdSelectedSoftware(selectedSoftware) {
			$scope.setSelectedSoftware(selectedSoftware);
		}

		function unholdSelectedSoftware() {
			$scope.setSelectedSoftware(null);
		}

		function closeModal() {
			$uibModalInstance.close("closed modal");
		}

		function dismissModal() {
			$uibModalInstance.dismiss("dismissed modal");
		}

		function openSoftwareConnectFormModal(software) {
			$scope.holdSelectedSoftware(software);
			var softwareConnectFormModal = $uibModal.open({
				animation: true,
				ariaLabelledBy: "dtep-curate-project-software-connect-form-modal-title",
				ariaDescribedBy: "dtep-curate-project-software-connect-form-modal-body",
				templateUrl: "app/curate/software-connect-form-modal.view.html",
				controller: "SoftwareConnectFormModalController",
				backdrop: "static",
				scope: $scope,
				keyboard: true,
				appendTo: angular.element($document[0].querySelector("body"))
			});

			softwareConnectFormModal.result
				.then(function(response) {
					$log.info(response);
					$log.info("Modal closed at: " + new Date());
				})
				.catch(function(errorResponse) {
					$log.info(errorResponse);
					$log.info("Modal dismissed at: " + new Date());
				})
				.finally(function(notify) {
					$log.info("finally at: " + new Date());
					$scope.unholdSelectedSoftware();
				});
			return softwareConnectFormModal;
		}

		function openSoftwareProvisionFormModal(software) {
			$scope.holdSelectedSoftware(software);
			var softwareProvisionFormModal = $uibModal.open({
				animation: true,
				ariaLabelledBy: "dtep-curate-projectsoftware-list-modal-title",
				ariaDescribedBy: "dtep-curate-projectsoftware-list-modal-body",
				templateUrl: "app/curate/software-provision-form-modal.view.html",
				controller: "SoftwareProvisionFormModalController",
				backdrop: "static",
				scope: $scope,
				keyboard: true,
				appendTo: angular.element($document[0].querySelector("body"))
			});

			softwareProvisionFormModal.result
				.then(function(response) {
					$log.info(response);
					$log.info("Modal closed at: " + new Date());
				})
				.catch(function(errorResponse) {
					$log.info(errorResponse);
					$log.info("Modal dismissed at: " + new Date());
				})
				.finally(function(notify) {
					$log.info("finally at: " + new Date());
					$scope.unholdSelectedSoftware();
				});
			return softwareProvisionFormModal;
		}
	}
})(window.angular);
