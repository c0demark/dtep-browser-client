(function(angular) {
    "use strict";
    angular.module("dtepApp.controllers")
        .controller("LoginController", [
            "$scope",
            "$rootScope",
            "$window",
            "LoginService",
            "NavigationService",
            "$state",
            function($scope, $rootScope, $window, LoginService, NavigationService, $state) {
                $scope.rememberMe = false;
                // $scope.isProcessing = false;
                $scope.isLoginProcessing = false;

                $scope.toggleIsLoginProcessingFlag = toggleIsLoginProcessingFlag;

                function toggleIsLoginProcessingFlag() {
                    $scope.isLoginProcessing = !$scope.isLoginProcessing;
                }

                $scope.getDashboardData = function() {
                    NavigationService.getDashboardData($rootScope.tenantId, $rootScope.userId).then(function(response) {
                        if (response.data.length > 0) {
                            var defaultProjectData = response.data[0];
                            $rootScope.dashboardProject = defaultProjectData;
                            $rootScope.projectData = response.data;
                        }
                    });
                };

                $scope.login = function(loginForm) {
                    console.log(loginForm);
                    if (loginForm.$dirty && !loginForm.$pristine && !loginForm.$pending && loginForm.$valid && !loginForm.$invalid) {
                        $scope.toggleIsLoginProcessingFlag();
                        LoginService.authenticate($.param({ username: $scope.username, password: $scope.password }), function(authenticationResult) {
                            var authToken = authenticationResult.token;
                            $rootScope.username = authenticationResult.userName;
                            LoginService.getUser(function(user) {
                                $rootScope.user = user;
                            });
                            console.log("admin" + authToken + ",UserName " + $rootScope.username);
                            $rootScope.authToken = authToken;
                            $rootScope.userId = authenticationResult.userId;
                            $rootScope.tenantId = authenticationResult.tenantId;
                            console.log("tenant ID " + $rootScope.tenantId);
                            $rootScope.userRoles = authenticationResult.userRoles;
                            console.log("User Roles ::   " + $rootScope.userRoles);
                            angular.forEach($rootScope.userRoles, function(value, key) {
                                $rootScope.userRole = value;
                            });

                            console.log("username " + $rootScope.username);
                            $rootScope.redirectPage = authenticationResult.redirectPage;
                            if ($rootScope.redirectPage == "error") {
                                $rootScope.errorMessage = authenticationResult.errorMessage;
                                console.log("errorMessage" + $rootScope.errorMessage);
                                window.open("#/" + $rootScope.redirectPage, "_self");
                            } else {
                                $rootScope.MindtreeIP = authenticationResult.errorMessage;
                                console.log("MindtreeIP" + $rootScope.MindtreeIP);
                                $rootScope.viewby = 5;
                                $rootScope.currentPage = 4;
                                $rootScope.itemsPerPage = $rootScope.viewby;
                                $rootScope.maxSize = 5;
                                $scope.getDashboardData();
                                window.open("#/dtepDashboard", "_self");
                            }
                        });
                    }
                    // console.log(loginForm.username.$validators.required);
                    // delete $rootScope.errorMessage;
                };

                $scope.registerUser = function() {
                    delete $rootScope.userRegisteredSuccessfully;
                    if (($scope.tenantName !== null) && ($scope.userName !== null) &&
                        ($scope.firstName !== null) && ($scope.lastName !== null) &&
                        ($scope.emailId !== null) && ($scope.mobileNumber !== null)) {
                        LoginService
                            .registerUser(
                                $.param({
                                    tenantName: $scope.tenantName,
                                    userName: $scope.userName,
                                    firstName: $scope.firstName,
                                    lastName: $scope.lastName,
                                    emailId: $scope.emailId,
                                    mobileNumber: $scope.mobileNumber
                                }),
                                function(response) {
                                    if (response.result == "true") {
                                        $('#register_notification').css('display',
                                            'block');
                                        $rootScope.userRegisteredSuccessfully = "Registered Successfully";
                                        $scope.clearUserRecords();
                                    } else {
                                        $('#register_notification').css('display',
                                            'block');
                                        $rootScope.userRegisteredSuccessfully = "Registration failed";
                                    }
                                });
                    } else {
                        $('#register_notification').css('display', 'block');
                        $rootScope.userRegisteredSuccessfully = "Please enter all fields";
                    }
                };

                $scope.forgotPassword = function() {
                    delete $rootScope.resetLink;
                    if (($scope.resetEmail !== null)) {
                        LoginService
                            .forgotPassword(
                                $.param({
                                    resetEmail: $scope.resetEmail
                                }),
                                function(response) {
                                    if (response.result == "true") {
                                        $("#forgot_notification").css('display',
                                            'block');
                                        $rootScope.resetLink = "A Reset Link has been sent to your mail";
                                        $scope.clearUserRecord();
                                    } else {
                                        /* $("#forgot_notification").css('display','none'); */
                                        $("#forgot_notification").css('display',
                                            'block');
                                        $rootScope.resetLink = "Mail ID not found";
                                    }
                                });
                    } else {
                        $("#forgot_notification").css('display', 'block');
                        $rootScope.resetLink = "Please enter email address";
                    }
                }

                //validations
                $scope.validateTenantname = function() {
                    $('span.error-keyup-1').remove();
                    var inputVal = $('#tenant_name').val();
                    var numericReg = /^[A-Za-z '._-]+$/;
                    if (!numericReg.test(inputVal)) {
                        $("#tenantname").after('&nbsp;&nbsp;<span class="error error-keyup-1" style="color:Red;">Enter Valid First Name</span>');
                    }
                };

                $scope.validateFirstname = function() {
                    $('span.error-keyup-1').remove();
                    var inputVal = $('#first_name').val();
                    var numericReg = /^[A-Za-z '._-]+$/;
                    if (!numericReg.test(inputVal)) {
                        $("#firstname").after('&nbsp;&nbsp;<span class="error error-keyup-1" style="color:red;">Enter Valid First Name</span>');
                    }
                };
                $scope.validateLastname = function() {
                    $('span.error-keyup-1').remove();
                    var inputVal = $('#last_name').val();
                    var numericReg = /^[A-Za-z '._-]+$/;
                    if (!numericReg.test(inputVal)) {
                        $("#lastname").after('&nbsp;&nbsp;<span class="error error-keyup-1" style="color:red;">Enter Valid Last Name</span>');
                    }
                };
                $scope.validateUsername = function() {
                    $('span.error-keyup-1').remove();
                    var inputVal = $('#user_name').val();
                    var numericReg = /^[A-Za-z '._-]+$/;
                    if (!numericReg.test(inputVal)) {
                        $("#username").after('&nbsp;&nbsp;<span class="error error-keyup-1" style="color:red;">Enter Valid User Name</span>');
                    }
                };
                $scope.validateMailid = function() {
                    $('span.error-keyup-8').remove();
                    var inputVal = $('#email_id').val();
                    var emailFreeReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    if (!emailFreeReg.test(inputVal)) {
                        $("#emailid").after('&nbsp;&nbsp;<span class="error error-keyup-8" style="color:red;">Enter Valid Email Address</span>');
                    }
                };
                $scope.validateMobilenumber = function() {
                    $('span.error-keyup-1').remove();
                    var inputVal = $('#mobile_no').val();
                    var numericReg = /^[0-9]{1,10}$/;
                    if (!numericReg.test(inputVal)) {
                        $("#mobileno").after('&nbsp;&nbsp;<span class="error error-keyup-1" style="color:red;">Enter Valid Mobile Number</span>');
                    }
                };
                //clearUserRecords()
                $scope.clearUserRecords = function() {
                    $scope.tenantName = null;
                    $scope.firstName = null;
                    $scope.lastName = null;
                    $scope.userName = null;
                    $scope.emailId = null;
                    $scope.mobileNumber = null;
                };
                //clearUserRecord()
                $scope.clearUserRecord = function() {
                    $scope.resetEmail = null;
                };
                $scope.validateResetMailid = function() {
                    $('span.error-keyup-8').remove();
                    var inputVal = $('#reset_email').val();
                    var emailFreeReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    if (!emailFreeReg.test(inputVal)) {
                        $("#resetemail").after('&nbsp;&nbsp;<span class="error error-keyup-8" style="color:red;">Enter Valid Email Address</span>');
                    }
                };
            }
        ]);
})(window.angular);