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
        $scope.closeCreateNewBuildModal = closeCreateNewBuildModal;
        $scope.dismissCreateNewBuildModal = dismissCreateNewBuildModal;

        function closeCreateNewBuildModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissCreateNewBuildModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);