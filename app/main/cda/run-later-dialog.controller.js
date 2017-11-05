(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("RunLaterModalController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModalInstance",
            "$state",
            "AuthService",
            "NavigationService",
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
        $state,
        AuthService,
        NavigationService
    ) {
        $scope.isNavCollapsed = true;
        $scope.toggleNavCollapse = toggleNavCollapse;

        function toggleNavCollapse() {
            $scope.isNavCollapsed = !$scope.isNavCollapsed;
        }

        $scope.closeRunLaterModal = function() {
            $uibModalInstance.close("closed modal");
        };

        $scope.dismissRunLaterModal = function() {
            $uibModalInstance.dismiss("dismissed modal");
        };
    }
})(window.angular);