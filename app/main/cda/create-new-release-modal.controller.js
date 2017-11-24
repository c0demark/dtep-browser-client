(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        .controller("CreateNewReleaseModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            CreateNewReleaseModalController
        ]);

    function CreateNewReleaseModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state
    ) {
        $scope.closeCreateNewReleaseModal = closeCreateNewReleaseModal;
        $scope.dismissCreateNewReleaseModal = dismissCreateNewReleaseModal;

        function closeCreateNewReleaseModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissCreateNewReleaseModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);