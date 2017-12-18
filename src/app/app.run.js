(function(angular) {
    "use strict";
    angular.module("dtepApp").run(["$log", "$rootScope", "$state", runFn]);

    function runFn($log, $rootScope, $state) {
        $rootScope.$on("$viewContentLoaded", function(event, viewConfig) {
            // "use strict";
            // console.log(arguments);
            // console.log($state.$current);
            $rootScope.pageInfo = {};
            if ($state.$current.data && $state.$current.data.pageInfo) {
                // console.log($state.$current.data);
                $rootScope.pageInfo.title =
                    $state.$current.data.pageInfo.title || "DTEP";
            } else {
                $rootScope.pageInfo.title = "DTEP";
            }
        });
    }
})(window.angular);