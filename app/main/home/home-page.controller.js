(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("HomePageController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            HomePageController
        ]);

    function HomePageController(
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