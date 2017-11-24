(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("ProjectDashboardController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            ProjectDashboardController
        ]);

    function ProjectDashboardController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModal,
        $state
    ) {}
})(window.angular);