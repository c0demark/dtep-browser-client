(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        .controller("NewUserRegistrationModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            NewUserRegistrationModalController
        ]);

    function NewUserRegistrationModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state
    ) {
        $scope.closeNewUserRegistrationModal = closeNewUserRegistrationModal;
        $scope.dismissNewUserRegistrationModal = dismissNewUserRegistrationModal;

        function closeNewUserRegistrationModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissNewUserRegistrationModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);