(function(angular) {
    "use strict";
    angular.module('dtepApp')
        // angular.module('dtepApp')
        .factory('ProjectComponentsService', [
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
            getProjectComponentCategorizations: getProjectComponentCategorizations
        };

        return services;

        function getProjectComponentCategorizations() {
            return $http({
                url: "/app/main/backendDataMock/categorizations.json",
                method: "GET"
            });
        }
    }
})(window.angular);