(function(angular) {
    "use strict";
    angular.module('dtepApp')
        // angular.module('dtepApp')
        .factory('SoftwaresService', [
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
            fetchCICDSoftwares: fetchCICDSoftwares
        };

        return services;

        function fetchCICDSoftwares() {
            return $http({
                url: "/app/main/backendDataMock/cicd-softwares.json",
                method: "GET"
            });
        }
    }
})(window.angular);