(function(angular) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("LoginPageController", [
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
            LoginPageController
        ]);

    function LoginPageController(
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
        $scope.isLoginProcessing = false;
        $scope.doToggleIsLoginProcessingFlag = doToggleIsLoginProcessingFlag;
        $scope.doLogin = doLogin;
        $scope.openForgotPasswordModal = openForgotPasswordModal;
        $scope.openRegisterNewUserModal = openRegisterNewUserModal;

        function doToggleIsLoginProcessingFlag() {
            $scope.isLoginProcessing = !$scope.isLoginProcessing;
        }

        console.log(loginForm);

        function doLogin(userCredential) {
            console.log(loginForm);
            console.log($scope.loginForm.username);
            console.log($scope.loginForm);
            var loginForm = $scope.loginForm;
            if (loginForm.$dirty && !loginForm.$pristine && !loginForm.$pending && loginForm.$valid && !loginForm.$invalid && loginForm.$submitted) {
                AuthService.authenticate(userCredential)
                    .then(function(response) {
                        console.log(response);
                        $scope.doToggleIsLoginProcessingFlag();
                    }).catch(function(error) {
                        console.log(error);
                        $scope.doToggleIsLoginProcessingFlag();
                    }).finally(function(reason) {
                        console.log(reason);
                        $scope.doToggleIsLoginProcessingFlag();
                    });
            }
        }

        function openForgotPasswordModal() {

            var forgorPasswordModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-forgot-password-modal-title",
                ariaDescribedBy: "dtep-forgot-password-modal-body",
                templateUrl: "/app/main/authentication/forgot-password-dialog.view.html",
                controller: "ForgotPasswordModalController",
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

            forgorPasswordModal
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

        function openRegisterNewUserModal() {
            var registerNewUserModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-register-new-user-modal-title",
                ariaDescribedBy: "dtep-register-new-user-modal-body",
                templateUrl: "/app/main/authentication/register-new-user-dialog.view.html",
                controller: "RegisterNewUserModalController",
                // controllerAs: '$ctrl2',
                size: "lg",
                // resolve: {
                //     items: function() {
                //         return $ctrl.items;
                //     }
                // }
                // keyboard: false,
                appendTo: angular.element($document[0].querySelector("body"))
            });

            registerNewUserModal
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