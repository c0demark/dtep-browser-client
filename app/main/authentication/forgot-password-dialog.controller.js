(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("ForgotPasswordModalController", [
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
            ForgotPasswordModalController
        ]);

    function ForgotPasswordModalController(
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
        $scope.closeForgotPasswordModal = function() {
            $uibModalInstance.close("closed modal");
        };

        $scope.dismissForgotPasswordModal = function() {
            $uibModalInstance.dismiss("dismissed modal");
        };
    }
})(window.angular);