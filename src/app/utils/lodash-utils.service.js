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
        var services = {};

        return services;

    }
})(window.angular, window._);