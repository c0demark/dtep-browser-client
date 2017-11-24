(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        .controller("PasswordRecoveryModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            PasswordRecoveryModalController
        ]);

    function PasswordRecoveryModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state
    ) {
        $scope.closePasswordRecoveryModal = closePasswordRecoveryModal;
        $scope.dismissPasswordRecoveryModal = dismissPasswordRecoveryModal;

        function closePasswordRecoveryModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissPasswordRecoveryModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);