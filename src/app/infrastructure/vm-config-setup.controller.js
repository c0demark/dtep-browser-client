(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("VmConfigSetupController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            VmDetailsController
        ]);

    function VmDetailsController(
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