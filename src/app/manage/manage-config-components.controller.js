(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("ManageConfigComponentsController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            ManageConfigComponentsController
        ]);

    function ManageConfigComponentsController(
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