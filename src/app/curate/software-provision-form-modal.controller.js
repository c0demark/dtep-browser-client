(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("SoftwareProvisionFormModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            "$http",
            SoftwareProvisionFormModalController
        ]);

    function SoftwareProvisionFormModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state,
        $http
    ) {
        $scope.closeModal = closeModal;
        $scope.dismissModal = dismissModal;
        $scope.sendProvisionRequest = sendProvisionRequest;
        $scope.reset = reset;

        function closeModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }

        function reset(connectForm) {
            if (connectForm) {
                connectForm.$setPristine();
                connectForm.$setUntouched();
            }
            $scope.user = null;
        }

        function sendProvisionRequest(user) {

        }
    }
})(window.angular);