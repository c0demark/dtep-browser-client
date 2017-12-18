(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        // angular.module('dtepApp')
        .factory("ProjectComponentsService", [
            "$log",
            "$http",
            "$resource",
            "$httpParamSerializer",
            "$httpParamSerializerJQLike",
            ProjectComponentsService
        ]);

    function ProjectComponentsService(
        $log,
        $http,
        $resource,
        $httpParamSerializer,
        $httpParamSerializerJQLike
    ) {
        var services = {
            fetchProjectComponentCategorizations: fetchProjectComponentCategorizations
        };

        return services;

        function fetchProjectComponentCategorizations() {
            return $http({
                url: "_backendDataMock/categorizations.json",
                method: "GET"
            });
        }
    }
})(window.angular);