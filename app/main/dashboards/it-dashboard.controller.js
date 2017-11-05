(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("ItDashboardController", [
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
            ItDashboardController
        ]);

    function ItDashboardController(
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
        console.log("IT Dashboard controller");
        $scope.name = "IT Dashboard";
    }
})(window.angular);