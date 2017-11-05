(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        // .module("dtepApp")
        .config([
            "$routeProvider",
            "TEMPLATE_URL_PATH_AUTHENTICATION_MODULE",
            configFn
        ]);

    function configFn(
        $routeProvider,
        TEMPLATE_URL_PATH_AUTHENTICATION_MODULE
    ) {

    }
})(window.angular);