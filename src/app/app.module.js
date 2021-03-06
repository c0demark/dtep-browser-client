(function(angular, AmCharts) {
    "use strict";
    AmCharts.baseHref = true;
    angular.module("dtepApp", [
        "ngAnimate",
        "ngTouch",
        "ngSanitize",
        "ngCookies",
        "ngRoute",
        "ngResource",
        "ngMessages",
        "ngAria",
        "ngSanitize",
        "ui.router",
        "ui.bootstrap",
        // "ct.ui.router.extras",
        "angular-storage",
        "ngStorage"
    ]);
})(window.angular, window.AmCharts);