(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        .controller("AuthenticatedHeaderController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            AuthenticatedHeaderController
        ]);

    function AuthenticatedHeaderController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModal,
        $state
    ) {
        $scope.isNavCollapsed = true;
        $scope.toggleNavCollapse = toggleNavCollapse;
        $scope.openNotificationsModal = openNotificationsModal;

        function toggleNavCollapse() {
            $scope.isNavCollapsed = !$scope.isNavCollapsed;
        }

        function openNotificationsModal() {
            var notificationsModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-notifications-modal-title",
                ariaDescribedBy: "dtep-notifications-modal-body",
                templateUrl: "/app/main/layout/header/notifications-modal.view.html",
                controller: "NotificationsModalController",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            notificationsModal.result
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