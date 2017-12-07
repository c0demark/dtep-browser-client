(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
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
        $scope.openPasswordRecoveryModal = openPasswordRecoveryModal;
        $scope.openNewUserRegistrationModal = openNewUserRegistrationModal;

        function toggleIsLoginProcessingFlag() {
            $scope.isLoginProcessing = !$scope.isLoginProcessing;
        }

        console.log(loginForm); //jshint ignore:line

        function doLogin(userCredential) {
            console.log($scope.loginForm.username);
            console.log($scope.loginForm);
            var loginForm = $scope.loginForm;
            console.log(loginForm);
            if (
                loginForm.$dirty &&
                !loginForm.$pristine &&
                !loginForm.$pending &&
                loginForm.$valid &&
                !loginForm.$invalid &&
                loginForm.$submitted
            ) {}
        }

        function openPasswordRecoveryModal() {
            var passwordRecoveryModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-password-recovery-modal-title",
                ariaDescribedBy: "dtep-password-recovery-modal-body",
                templateUrl: "/app/authentication/password-recovery-modal.view.html",
                controller: "PasswordRecoveryModalController",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            passwordRecoveryModal.result
                .then(function(response) {
                    $log.info(response);
                    $log.info("Modal closed at: " + new Date());
                })
                .catch(function(errorResponse) {
                    $log.info(errorResponse);
                    $log.info("Modal dismissed at: " + new Date());
                })
                .finally(function(notify) {
                    $log.info("finally at: " + new Date());
                });
        }

        function openNewUserRegistrationModal() {
            var newUserRegistrationModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: "dtep-new-user-registration-modal-title",
                ariaDescribedBy: "dtep-new-user-registration-modal-body",
                templateUrl: "/app/authentication/new-user-registration-modal.view.html",
                controller: "NewUserRegistrationModalController",
                size: "lg",
                appendTo: angular.element($document[0].querySelector("body"))
            });

            newUserRegistrationModal.result
                .then(function(response) {
                    $log.info(response);
                    $log.info("Modal closed at: " + new Date());
                })
                .catch(function(errorResponse) {
                    $log.info(errorResponse);
                    $log.info("Modal dismissed at: " + new Date());
                })
                .finally(function(notify) {
                    $log.info("finally at: " + new Date());
                });
        }
    }
})(window.angular);