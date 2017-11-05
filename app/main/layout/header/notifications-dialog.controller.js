(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("NotificationsModalController", [
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
            NotificationsModalController
        ]);

    function NotificationsModalController(
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
        console.log($scope);
        $scope.closeNotificationsModal = function() {
            $uibModalInstance.close("closed modal");
        };

        $scope.dismissNotificationsModal = function() {
            $uibModalInstance.dismiss("dismissed modal");
        };
    }
})(window.angular);