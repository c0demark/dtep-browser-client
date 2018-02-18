(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
		.controller("CurateProjectController", [
			"$log",
			"$scope",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$uibModal",
			"$state",
			"LifecycleComponentsService",
			"SoftwaresService",
			CurateProjectController
		]);

	function CurateProjectController(
		$log,
		$scope,
		$rootScope,
		$window,
		$document,
		$location,
		$uibModal,
		$state,
		LifecycleComponentsService,
		SoftwaresService
	) {
		// declaring and initializing scope properties
		$scope.lifecycleComponetCategorizations = [];
		$scope.accordionGroupCategories = {};
		$scope.draggedLifecycleComponent = null;
		$scope.allSoftwaresByComponentCode = {};

		// scope properties getters and setters
		$scope.getLifecycleComponetCategorizations = getLifecycleComponetCategorizations;
		$scope.setLifecycleComponetCategorizations = setLifecycleComponetCategorizations;
		$scope.getAccordionGroupCategories = getAccordionGroupCategories;
		$scope.setAccordionGroupCategories = setAccordionGroupCategories;
		$scope.getDraggedLifecycleComponent = getDraggedLifecycleComponent;
		$scope.setDraggedLifecycleComponent = setDraggedLifecycleComponent;
		$scope.getAllSoftwaresByComponentCode = getAllSoftwaresByComponentCode;
		$scope.setAllSoftwaresByComponentCode = setAllSoftwaresByComponentCode;

		// scope properties helper methods
		$scope.holdDraggedLifecycleComponent = holdDraggedLifecycleComponent;
		$scope.unholdDraggedLifecycleComponent = unholdDraggedLifecycleComponent;

		// api call methods
		$scope.fetchLifecycleComponentCategorizations = fetchLifecycleComponentCategorizations;
		$scope.fetchAllSoftwaresByComponentCode = fetchAllSoftwaresByComponentCode;

		$scope.openSoftwareListModal = openSoftwareListModal;

		// init method - executes after view renders and controller is loaded. Similar to jQuery $(document).ready(function() {})
		$scope.init = init;

		$scope.init();

		function getLifecycleComponetCategorizations() {
			return $scope.lifecycleComponetCategorizations;
		}

		function setLifecycleComponetCategorizations(
			lifecycleComponetCategorizations
		) {
			$scope.lifecycleComponetCategorizations = lifecycleComponetCategorizations;
		}

		function getAccordionGroupCategories() {
			return $scope.accordionGroupCategories;
		}

		function setAccordionGroupCategories(accordionGroupCategories) {
			$scope.accordionGroupCategories = accordionGroupCategories;
		}

		function getDraggedLifecycleComponent() {
			return $scope.draggedLifecycleComponent;
		}

		function setDraggedLifecycleComponent(draggedLifecycleComponent) {
			$scope.draggedLifecycleComponent = draggedLifecycleComponent;
		}

		function getAllSoftwaresByComponentCode() {
			return $scope.allSoftwaresByComponentCode;
		}

		function setAllSoftwaresByComponentCode(allSoftwaresByComponentCode) {
			$scope.allSoftwaresByComponentCode = allSoftwaresByComponentCode;
		}

		function init() {
			$scope.fetchLifecycleComponentCategorizations();
		}

		function fetchLifecycleComponentCategorizations() {
			LifecycleComponentsService.fetchLifecycleComponentCategorizations()
				.then(function(response) {
					$scope.setLifecycleComponetCategorizations(response.data);
				})
				.catch(function(errorResponse) {})
				.finally(function(notify) {});
		}

		function fetchAllSoftwaresByComponentCode(componentCode) {
			SoftwaresService.fetchAllSoftwaresByComponentCode(componentCode)
				.then(function(response) {
					$scope.setAllSoftwaresByComponentCode(response.data);
				})
				.catch(function(errorResponse) {})
				.finally(function(notify) {});
		}

		function holdDraggedLifecycleComponent(component) {
			$scope.setDraggedLifecycleComponent(component);
		}

		function unholdDraggedLifecycleComponent() {
			$scope.setDraggedLifecycleComponent(null);
		}

		function openSoftwareListModal() {
			var softwareListModal = $uibModal.open({
				animation: true,
				ariaLabelledBy: "dtep-curate-project-software-list-modal-title",
				ariaDescribedBy: "dtep-curate-project-software-list-modal-body",
				templateUrl: "app/curate/software-list-modal.view.html",
				controller: "SoftwareListModalController",
				backdrop: "static",
				scope: $scope,
				keyboard: true,
				appendTo: angular.element($document[0].querySelector("body"))
			});

			// softwareListModal.result
			//     .then(function(response) {
			//         console.log($scope);
			//         $log.info(response);
			//         $log.info("Modal closed at: " + new Date());
			//     })
			//     .catch(function(errorResponse) {
			//         $log.info(errorResponse);
			//         $log.info("Modal dismissed at: " + new Date());
			//     })
			//     .finally(function(notify) {
			//         $log.info("finally at: " + new Date());
			//     });
			return softwareListModal;
		}
	}
})(window.angular);
