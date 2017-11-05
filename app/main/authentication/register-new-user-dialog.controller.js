(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("RegisterNewUserModalController", [
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
            RegisterNewUserModalController
        ]);

    function RegisterNewUserModalController(
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
        $scope.closeRegisterNewUserModal = function() {
            $uibModalInstance.close("closed modal");
        };

        $scope.dismissRegisterNewUserModal = function() {
            $uibModalInstance.dismiss("dismissed modal");
        };
    }
})(window.angular);