(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("ManageSidebarController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            "AuthService",
            "NavigationService",
            ManageSidebarController
        ]);

    function ManageSidebarController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModal,
        $state,
        AuthService,
        NavigationService
    ) {
        $scope.isNavCollapsed = true;
        $scope.toggleNavCollapse = toggleNavCollapse;

        function toggleNavCollapse() {
            $scope.isNavCollapsed = !$scope.isNavCollapsed;
        }
    }

})(window.angular);