(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("InfrastructureProvisioningTabsController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            InfrastructureProvisioningTabsController
        ]);

    function InfrastructureProvisioningTabsController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModal,
        $state
    ) {
        // console.log("ConsolidatedDashboardsController");
        // console.log($scope);
        // $state.go(".pmoDashboard");

        // $scope.callOnTabSelect = callOnTabSelect;

        // function callOnTabSelect(event) {
        //     console.log("tab selected");
        //     console.log(event);
        // }
    }
})(window.angular);