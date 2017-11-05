(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("CdaController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            "AuthService",
            "NavigationService",
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
        $state,
        AuthService,
        NavigationService
    ) {
        $scope.openRunLaterModal = openRunLaterModal;

        function openRunLaterModal() {
            var runLaterModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-run-later-modal-title",
                ariaDescribedBy: "dtep-run-later-modal-body",
                templateUrl: "/app/main/cda/run-later-dialog.view.html",
                controller: "RunLaterModalController",
                // controllerAs: '$ctrl2',
                size: "lg",
                // resolve: {
                //     items: function() {
                //         return $ctrl.items;
                //     }
                // }
                // keyboard: false,
                appendTo: angular.element($document[0].querySelector("body"))
            });

            runLaterModal
                .result
                .then(function(response) {
                    $log.info(response);
                    $log.info('Modal closed at: ' + new Date());
                })
                .catch(function(error) {
                    $log.info(error);
                    $log.info('Modal dismissed at: ' + new Date());
                })
                .finally(function() {
                    $log.info('finally at: ' + new Date());
                });
            // console.log($scope);
        }
    }
})(window.angular);