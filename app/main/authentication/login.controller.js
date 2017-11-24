(function(angular) {
    "use strict";
    angular.module("dtepApp")
        .controller("LoginPageController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
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
        $state
    ) {
        $scope.isLoginProcessing = false;
        $scope.toggleIsLoginProcessingFlag = toggleIsLoginProcessingFlag;
        $scope.doLogin = doLogin;
        $scope.openForgotPasswordModal = openForgotPasswordModal;
        $scope.openRegisterNewUserModal = openRegisterNewUserModal;

        function toggleIsLoginProcessingFlag() {
            $scope.isLoginProcessing = !$scope.isLoginProcessing;
        }

        console.log(loginForm);

        function doLogin(userCredential) {
            console.log(loginForm);
            console.log($scope.loginForm.username);
            console.log($scope.loginForm);
            var loginForm = $scope.loginForm;
            if (loginForm.$dirty && !loginForm.$pristine && !loginForm.$pending && loginForm.$valid && !loginForm.$invalid && loginForm.$submitted) {}
        }

        function openForgotPasswordModal() {

            var forgorPasswordModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-forgot-password-modal-title",
                ariaDescribedBy: "dtep-forgot-password-modal-body",
                templateUrl: "/app/main/authentication/forgot-password-dialog.view.html",
                controller: "ForgotPasswordModalController",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            forgorPasswordModal
                .result
                .then(function(response) {
                    $log.info(response);
                    $log.info('Modal closed at: ' + new Date());
                })
                .catch(function(errorResponse) {
                    $log.info(errorResponse);
                    $log.info('Modal dismissed at: ' + new Date());
                })
                .finally(function(notify) {
                    $log.info('finally at: ' + new Date());
                });
        }

        function openRegisterNewUserModal() {
            var registerNewUserModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-register-new-user-modal-title",
                ariaDescribedBy: "dtep-register-new-user-modal-body",
                templateUrl: "/app/main/authentication/register-new-user-dialog.view.html",
                controller: "RegisterNewUserModalController",
                size: "lg",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            registerNewUserModal
                .result
                .then(function(response) {
                    $log.info(response);
                    $log.info('Modal closed at: ' + new Date());
                })
                .catch(function(errorResponse) {
                    $log.info(errorResponse);
                    $log.info('Modal dismissed at: ' + new Date());
                })
                .finally(function(notify) {
                    $log.info('finally at: ' + new Date());
                });
        }
    }
})(window.angular);