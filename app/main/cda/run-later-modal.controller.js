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
        $scope.closeRunLaterModal = closeRunLaterModal;
        $scope.dismissRunLaterModal = dismissRunLaterModal;

        function toggleNavCollapse() {
            $scope.isNavCollapsed = !$scope.isNavCollapsed;
        }

        function closeRunLaterModal() {
            $uibModalInstance.close("closed modal");
        }

        function dismissRunLaterModal() {
            $uibModalInstance.dismiss("dismissed modal");
        }
    }
})(window.angular);