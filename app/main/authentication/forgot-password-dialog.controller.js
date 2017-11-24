(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("ForgotPasswordModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            ForgotPasswordModalController
        ]);

    function ForgotPasswordModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state
    ) {
        $scope.closeForgotPasswordModal = closeForgotPasswordModal;
        $scope.dismissForgotPasswordModal = dismissForgotPasswordModal;

        function closeForgotPasswordModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissForgotPasswordModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);