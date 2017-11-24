(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("CdaController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            CdaController
        ]);

    function CdaController(
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

        function openRunLaterModal() {
            var runLaterModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-run-later-modal-title",
                ariaDescribedBy: "dtep-run-later-modal-body",
                templateUrl: "/app/main/cda/run-later-dialog.view.html",
                controller: "RunLaterModalController",
                size: "lg",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            runLaterModal
                .result
                .then(function(response) {
                    $log.info(response);
                    $log.info('Modal closed at: ' + new Date());
                })
                .catch(function(errorResponse) {
                    $log.info(errorResponse);
                    $log.info('Modal dismissed at: ' + new Date());
                })
                .finally(function(notify) {
                    $log.info('finally at: ' + new Date());
                });
        }
    }
})(window.angular);