(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("RunLaterModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            RunLaterModalController
        ]);

    function RunLaterModalController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModalInstance,
        $state
    ) {
        $scope.isNavCollapsed = true;
        $scope.toggleNavCollapse = toggleNavCollapse;
        $scope.closeModal = closeModal;
        $scope.dismissModal = dismissModal;

        function toggleNavCollapse() {
            $scope.isNavCollapsed = !$scope.isNavCollapsed;
        }

        function closeModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);