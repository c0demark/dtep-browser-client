(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("SoftwareListModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
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