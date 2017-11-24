(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("ItDashboardController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
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
        $state
    ) {
        console.log("IT Dashboard controller");
        $scope.name = "IT Dashboard";
    }
})(window.angular);