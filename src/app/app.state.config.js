(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        .config([
            "$stateProvider",
            "$urlRouterProvider",
            "TEMPLATE_URL_PATH_AUTHENTICATION_MODULE",
            configFn
        ]);

    function configFn(
        $stateProvider,
        $urlRouterProvider,
        TEMPLATE_URL_PATH_AUTHENTICATION_MODULE
    ) {
        // console.log($urlRouterProvider);
        // console.log($urlRouterProvider._router.locationConfig.hashPrefix(""));
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("root", {
                // url: "",
                templateUrl: "/app/layout/shell/app-layout-root.shell.view.html",
                abstract: true
            })
            .state("root.shell", {
                // url: "",
                views: {
                    "common-footer-content@root": {
                        templateUrl: "/app/layout/footer/common-footer-content.view.html"
                    }
                },
                abstract: true
            })
            .state("root.shell.authentication", {
                url: "/",
                views: {
                    "main-content@root": {
                        templateUrl: "/app/authentication/login-page.view.html",
                        controller: "LoginPageController"
                    }
                },
                data: {
                    pageInfo: {
                        title: "Login | DTEP"
                    }
                }
            })
            .state("root.shell.authenticatedAccess", {
                url: "/authenticatedAccess",
                views: {
                    "authenticated-header-content@root": {
                        templateUrl: "/app/layout/header/authenticated-header.view.html",
                        controller: "AuthenticatedHeaderController"
                    }
                },
                abstract: true
            })
            .state("root.shell.authenticatedAccess.home", {
                url: "/home",
                views: {
                    "main-content@root": {
                        templateUrl: "/app/home/home-page.view.html",
                        controller: "HomePageController"
                    }
                },
                data: {
                    pageInfo: {
                        title: "Home | DTEP"
                    }
                }
            })
            .state("root.shell.authenticatedAccess.curate", {
                url: "/curate",
                views: {
                    "main-content@root": {
                        templateUrl: "/app/curate/curate-project.view.html",
                        controller: "CurateProjectController"
                    }
                },
                data: {
                    pageInfo: {
                        title: "Curate Project | DTEP"
                    }
                }
            })
            .state("root.shell.authenticatedAccess.manage", {
                url: "/manage",
                views: {
                    "main-content@root": {
                        templateUrl: "/app/manage/manage-sidebar.view.html",
                        controller: "ManageSidebarController"
                    }
                },
                data: {
                    pageInfo: {
                        title: "Manage | DTEP"
                    }
                },
                // abstract: true,
                redirectTo: function(transition) {
                    // console.log(transition.injector());
                    return "root.shell.authenticatedAccess.manage.configComponents";
                }
            })
            .state("root.shell.authenticatedAccess.manage.configComponents", {
                url: "/configComponents",
                views: {
                    "manage-main-content@root.shell.authenticatedAccess.manage": {
                        templateUrl: "/app/manage/manage-config-components.view.html",
                        controller: "ManageConfigComponentsController"
                    }
                },
                data: {
                    pageInfo: {
                        title: "Manage Config Components | DTEP"
                    }
                }
            })
            .state("root.shell.authenticatedAccess.infrastructure", {
                url: "/infrastructure",
                views: {
                    "main-content@root": {
                        templateUrl: "/app/infrastructure/infrastructure-provisioning-tabs.view.html",
                        controller: "InfrastructureProvisioningTabsController"
                    }
                },
                data: {
                    pageInfo: {
                        title: "Infrastructure Provisioning | DTEP"
                    }
                },
                redirectTo: function(transition) {
                    // console.log(transition.injector());
                    return "root.shell.authenticatedAccess.infrastructure.cloud";
                }
            })
            .state("root.shell.authenticatedAccess.infrastructure.cloud", {
                url: "/cloud",
                data: {
                    pageInfo: {
                        title: "Infrastructure Provisioning | cloud | DTEP"
                    }
                },
                // abstract: true,
                redirectTo: function(transition) {
                    // console.log(transition.injector());
                    return "root.shell.authenticatedAccess.infrastructure.cloud.vmDetails";
                }
            })
            .state("root.shell.authenticatedAccess.infrastructure.cloud.vmDetails", {
                url: "/details",
                views: {
                    "infrastructure-content@root.shell.authenticatedAccess.infrastructure": {
                        templateUrl: "/app/infrastructure/vm-details.view.html",
                        controller: "VmDetailsController"
                    }
                }
            })
            .state(
                "root.shell.authenticatedAccess.infrastructure.cloud.vmConfigSetup", {
                    url: "/configSetup",
                    views: {
                        "infrastructure-content@root.shell.authenticatedAccess.infrastructure": {
                            templateUrl: "/app/infrastructure/vm-config-setup.view.html",
                            controller: "VmConfigSetupController"
                        }
                    }
                }
            )
            .state("root.shell.authenticatedAccess.infrastructure.onPremise", {
                url: "/onPremise",
                data: {
                    pageInfo: {
                        title: "Infrastructure Provisioning | On Premise | DTEP"
                    }
                },
                views: {
                    "infrastructure-content@root.shell.authenticatedAccess.infrastructure": {
                        template: "this is on premise content"
                    }
                }
            })
            .state("root.shell.authenticatedAccess.cda", {
                url: "/cda",
                views: {
                    "main-content@root": {
                        templateUrl: "/app/cda/cda-page.view.html",
                        controller: "CdaPageController"
                    }
                },
                data: {
                    pageInfo: {
                        title: "CDA | DTEP"
                    }
                }
            })
            .state("root.shell.authenticatedAccess.dashboards", {
                url: "/dashboards",
                views: {
                    "main-content@root": {
                        templateUrl: "/app/dashboards/dashboard-nav.view.html",
                        controller: "DashboardNavController"
                    }
                },
                data: {
                    pageInfo: {
                        title: "Dashboards | DTEP"
                    }
                },
                redirectTo: function(transition) {
                        // console.log(transition.injector());
                        return "root.shell.authenticatedAccess.dashboards.pmoDashboard";
                    }
                    // code from ui-router-extras for sticky states
                    // sticky: true,
                    //ui-router-extras deepStateRedirect option
                    // dsr: {
                    //     default: "root.shell.authenticatedAccess.dashboards.pmoDashboard"
                    // }
            })
            .state("root.shell.authenticatedAccess.dashboards.pmoDashboard", {
                url: "/pmoDashboard",
                views: {
                    "dashboard-content@root.shell.authenticatedAccess.dashboards": {
                        templateUrl: "/app/dashboards/pmo-dashboard.view.html",
                        controller: "PmoDashboardController"
                    }
                }
            })
            .state("root.shell.authenticatedAccess.dashboards.itDashboard", {
                url: "/itDashboard",
                views: {
                    "dashboard-content@root.shell.authenticatedAccess.dashboards": {
                        templateUrl: "/app/dashboards/it-dashboard.view.html",
                        controller: "ItDashboardController"
                    }
                }
            });
        // .state("root.login", {
        //     url: "/login",
        //     views: {
        //         "login-page-content": {
        //             templateUrl: TEMPLATE_URL_PATH_AUTHENTICATION_MODULE + "/login.view.html",
        //         }
        //     },
        // });
    }
})(window.angular);