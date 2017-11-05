(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("AuthenticatedHeaderController", [
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
            AuthenticatedHeaderController
        ]);

    function AuthenticatedHeaderController(
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
        $scope.isNavCollapsed = true;
        $scope.toggleNavCollapse = toggleNavCollapse;
        $scope.openNotificationsModal = openNotificationsModal;

        function toggleNavCollapse() {
            $scope.isNavCollapsed = !$scope.isNavCollapsed;
        }

        function openNotificationsModal() {
            var notificationsModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-notifications-modal-title",
                ariaDescribedBy: "dtep-notifications-modal-body",
                templateUrl: "/app/main/layout/header/notifications-dialog.view.html",
                controller: "NotificationsModalController",
                // controllerAs: '$ctrl2',
                // size: size,
                // resolve: {
                //     items: function() {
                //         return $ctrl.items;
                //     }
                // }
                // keyboard: false,
                appendTo: angular.element($document[0].querySelector("body"))
            });

            notificationsModal
                .result
                .then(function(response) {
                    $log.info(response);
                    $log.info('Modal closed at: ' + new Date());
                })
                .catch(function(error) {
                    $log.info(error);
                    $log.info('Modal dismissed at: ' + new Date());
                })
                .finally(function() {
                    $log.info('finally at: ' + new Date());
                });
            console.log($scope);
        }
    }
})(window.angular);