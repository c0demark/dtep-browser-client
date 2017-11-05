(function(angular, lodash) {
    "use strict";
    angular.module('dtepApp')
        .factory('LodashUtilsService', [
            "$log",
            "$http",
            "$resource",
            "$httpParamSerializer",
            "$httpParamSerializerJQLike",
            LodashUtilsService
        ]);

    function LodashUtilsService(
        $log,
        $http,
        $resource,
        $httpParamSerializer,
        $httpParamSerializerJQLike
    ) {
        var services = {
            getProjectComponents: getProjectComponents
        };

        return services;

        function getProjectComponents() {
            return $http({
                url: "/app/main/backendDataMock/component-categories.json",
                method: "GET"
            });
        }
    }
})(window.angular, window._);