(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        .controller("CreateNewBuildModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            CreateNewBuildModalController
        ]);

    function CreateNewBuildModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state
    ) {
        $scope.closeModal = closeModal;
        $scope.dismissModal = dismissModal;

        function closeModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);