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
        $scope.getProjectComponentCategorizations = getProjectComponentCategorizations;
        $scope.onProjectComponentHTMLElementDragStart = onProjectComponentHTMLElementDragStart;
        $scope.allowDrop = allowDrop;
        $scope.onProjectComponentHTMLElementDrop = onProjectComponentHTMLElementDrop;
        $scope.init = init;

        $scope.init();

        function init() {
            $scope.getProjectComponentCategorizations();
            console.log(d3);
        }

        function getProjectComponentCategorizations() {
            ProjectComponentsService
                .getProjectComponentCategorizations()
                .then(function(response) {
                    console.log(response);
                    $scope.categorizations = response.data;
                })
                .catch(function(errorResponse) {
                    console.log(errorResponse);
                })
                .finally(function(notify) {
                    console.log(notify);
                });
        }

        function onProjectComponentHTMLElementDragStart(event) {
            console.log(event);
        }

        function allowDrop(event) {
            console.log(event);
            event.preventDefault();
        }

        function onProjectComponentHTMLElementDrop(event) {
            console.log(event);
        }
    }
})(window.angular);