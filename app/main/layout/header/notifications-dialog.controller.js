(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("NotificationsModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            NotificationsModalController
        ]);

    function NotificationsModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state
    ) {

        $scope.closeNotificationsModal = closeNotificationsModal;
        $scope.dismissNotificationsModal = dismissNotificationsModal;

        function closeNotificationsModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissNotificationsModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);