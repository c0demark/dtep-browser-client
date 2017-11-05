(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        // .module("dtepApp")
        .config([
            "$locationProvider",
            "TEMPLATE_URL_PATH_AUTHENTICATION_MODULE",
            configFn
        ]);

    function configFn(
        $locationProvider,
        TEMPLATE_URL_PATH_AUTHENTICATION_MODULE
    ) {
        // console.log($locationProvider);
        $locationProvider.hashPrefix("");
        // $locationProvider.html5Mode(true);
    }
})(window.angular);