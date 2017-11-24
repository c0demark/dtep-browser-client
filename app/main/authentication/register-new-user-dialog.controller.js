(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("RegisterNewUserModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            RegisterNewUserModalController
        ]);

    function RegisterNewUserModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state
    ) {
        $scope.closeRegisterNewUserModal = closeRegisterNewUserModal;
        $scope.dismissRegisterNewUserModal = dismissRegisterNewUserModal;

        function closeRegisterNewUserModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissRegisterNewUserModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);