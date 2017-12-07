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
            "ProjectComponentsService",
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
        ProjectComponentsService,
        SoftwaresService
    ) {
        // declaring and initializing scope properties
        $scope.categorizations = [];
        $scope.categoryAccordionGroup = {};
        $scope.draggedProjectComponent = null;
        $scope.showSoftwareListFlag = false;

        // scope properties getters and setters
        $scope.getCategorizations = getCategorizations;
        $scope.setCategorizations = setCategorizations;
        $scope.getCategoryAccordionGroup = getCategoryAccordionGroup;
        $scope.setCategoryAccordionGroup = setCategoryAccordionGroup;
        $scope.getDraggedProjectComponent = getDraggedProjectComponent;
        $scope.setDraggedProjectComponent = setDraggedProjectComponent;
        $scope.getShowSoftwareListFlag = getShowSoftwareListFlag;
        $scope.setShowSoftwareListFlag = setShowSoftwareListFlag;

        // scope properties helper methods
        $scope.holdDraggedProjectComponent = holdDraggedProjectComponent;
        $scope.unholdDraggedProjectComponent = unholdDraggedProjectComponent;
        $scope.toggleShowSoftwareListFlag = toggleShowSoftwareListFlag;

        // api call methods
        $scope.fetchProjectComponentCategorizations = fetchProjectComponentCategorizations;
        $scope.fetchContinousIntegrationSoftwares = fetchContinousIntegrationSoftwares;

        $scope.openSoftwareListModal = openSoftwareListModal;

        // init method - executes after view renders adn controller is loaded. Similar to $(document).ready(function() {})
        $scope.init = init;

        $scope.init();

        function getCategorizations() {
            return $scope.categorizations;
        }

        function setCategorizations(categorizations) {
            $scope.categorizations = categorizations;
        }

        function getCategoryAccordionGroup() {
            return $scope.categoryAccordionGroup;
        }

        function setCategoryAccordionGroup(categoryAccordionGroup) {
            $scope.categoryAccordionGroup = categoryAccordionGroup;
        }

        function getDraggedProjectComponent() {
            return $scope.draggedProjectComponent;
        }

        function setDraggedProjectComponent(draggedProjectComponent) {
            $scope.draggedProjectComponent = draggedProjectComponent;
        }

        function getShowSoftwareListFlag() {
            return $scope.showSoftwareListFlag;
        }

        function setShowSoftwareListFlag(showSoftwareListFlag) {
            $scope.showSoftwareListFlag = showSoftwareListFlag;
        }

        function init() {
            $scope.fetchProjectComponentCategorizations();
        }

        function fetchProjectComponentCategorizations() {
            ProjectComponentsService.fetchProjectComponentCategorizations()
                .then(function(response) {
                    $scope.setCategorizations(response.data);
                })
                .catch(function(errorResponse) {})
                .finally(function(notify) {});
        }

        function fetchContinousIntegrationSoftwares() {
            SoftwaresService.fetchContinousIntegrationSoftwares()
                .then(function(response) {
                    $scope.setCategorizations(response.data);
                })
                .catch(function(errorResponse) {})
                .finally(function(notify) {});
        }

        function holdDraggedProjectComponent(component) {
            $scope.setDraggedProjectComponent(component);
        }

        function unholdDraggedProjectComponent() {
            $scope.setDraggedProjectComponent(null);
        }

        function toggleShowSoftwareListFlag() {
            console.log("toggleShowSoftwareListFlag is called");
            $scope.setShowSoftwareListFlag(!$scope.getShowSoftwareListFlag());
        }

        function openSoftwareListModal() {
            var softwareListModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-curate-projectsoftware-list-modal-title",
                ariaDescribedBy: "dtep-curate-projectsoftware-list-modal-body",
                templateUrl: "/app/curate/software-list-modal.view.html",
                controller: "SoftwareListModalController",
                backdrop: "static",
                scope: $scope,
                keyboard: true,
                appendTo: angular.element($document[0].querySelector("body"))
            });

            softwareListModal.result
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
                });
        }
    }
})(window.angular);