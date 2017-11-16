(function(angular) {
    "use strict";
    angular.module("dtepApp")
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
        ProjectComponentsService
    ) {
        $scope.categorizations = [];
        $scope.categoryAccordionGroup = {};
        $scope.draggedProjectComponent = {};
        $scope.getCategorizations = getCategorizations;
        $scope.setCategorizations = setCategorizations;
        $scope.getCategoryAccordionGroup = getCategoryAccordionGroup;
        $scope.setCategoryAccordionGroup = setCategoryAccordionGroup;
        $scope.getDraggedProjectComponent = getDraggedProjectComponent;
        $scope.setDraggedProjectComponent = setDraggedProjectComponent;
        $scope.holdDraggedProjectComponent = holdDraggedProjectComponent;
        $scope.unholdDraggedProjectComponent = unholdDraggedProjectComponent;
        $scope.getProjectComponentCategorizations = getProjectComponentCategorizations;
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

        function init() {
            $scope.getProjectComponentCategorizations();
            console.log(d3);
        }

        function getProjectComponentCategorizations() {
            ProjectComponentsService
                .getProjectComponentCategorizations()
                .then(function(response) {
                    console.log(response.data);
                    $scope.setCategorizations(response.data);
                })
                .catch(function(errorResponse) {
                    console.log(errorResponse);
                })
                .finally(function(notify) {
                    console.log(notify);
                });
        }

        function holdDraggedProjectComponent(component) {
            // console.log(component);
            $scope.setDraggedProjectComponent(component);
        }

        function unholdDraggedProjectComponent() {
            $scope.setDraggedProjectComponent({});
        }

    }
})(window.angular);