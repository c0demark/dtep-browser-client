(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        .controller("CdaPageController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            CdaPageController
        ]);

    function CdaPageController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModal,
        $state
    ) {
        $scope.openRunLaterModal = openRunLaterModal;
        $scope.openCreateNewReleaseModal = openCreateNewReleaseModal;
        $scope.openCreateNewBuildModal = openCreateNewBuildModal;

        function openRunLaterModal() {
            var runLaterModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-run-later-modal-title",
                ariaDescribedBy: "dtep-run-later-modal-body",
                templateUrl: "app/cda/run-later-modal.view.html",
                controller: "RunLaterModalController",
                size: "lg",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            runLaterModal.result
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

        function openCreateNewReleaseModal() {
            var createNewReleaseModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-create-new-release-modal-title",
                ariaDescribedBy: "dtep-create-new-release-modal-body",
                templateUrl: "app/cda/create-new-release-modal.view.html",
                controller: "CreateNewReleaseModalController",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            createNewReleaseModal.result
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

        function openCreateNewBuildModal() {
            var createNewBuildModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-create-new-build-modal-title",
                ariaDescribedBy: "dtep-create-new-build-modal-body",
                templateUrl: "app/cda/create-new-build-modal.view.html",
                controller: "CreateNewBuildModalController",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            createNewBuildModal.result
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