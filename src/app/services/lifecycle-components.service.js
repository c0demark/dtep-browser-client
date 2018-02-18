(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        .factory("LifecycleComponentsService", [
            "$log",
            "$http",
            "$resource",
            "$httpParamSerializer",
            "$httpParamSerializerJQLike",
            LifecycleComponentsService
        ]);

    function LifecycleComponentsService(
        $log,
        $http,
        $resource,
        $httpParamSerializer,
        $httpParamSerializerJQLike
    ) {
        var services = {
            fetchLifecycleComponentCategorizations: fetchLifecycleComponentCategorizations
        };

        return services;

        function fetchLifecycleComponentCategorizations() {
            return $http({
                url: "_backendDataMock/lifecycle-component-categorizations.json",
                method: "GET"
            });
        }
    }
})(window.angular);