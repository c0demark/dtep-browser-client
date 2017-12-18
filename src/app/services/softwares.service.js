(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        // angular.module('dtepApp')
        .factory("SoftwaresService", [
            "$log",
            "$http",
            "$resource",
            "$httpParamSerializer",
            "$httpParamSerializerJQLike",
            SoftwaresService
        ]);

    function SoftwaresService(
        $log,
        $http,
        $resource,
        $httpParamSerializer,
        $httpParamSerializerJQLike
    ) {
        var services = {
            fetchContinousIntegrationSoftwares: fetchContinousIntegrationSoftwares
        };

        return services;

        function fetchContinousIntegrationSoftwares() {
            return $http({
                url: "_backendDataMock/softwares/continuos-integration-softwares.json",
                method: "GET"
            });
        }
    }
})(window.angular);