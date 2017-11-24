(function(angular) {
    "use strict";
    angular
        .module("dtepApp")
        // angular.module('dtepApp')
        .factory("DataVisualizationsService", [
            "$log",
            "$http",
            "$resource",
            "$httpParamSerializer",
            "$httpParamSerializerJQLike",
            DataVisualizationsService
        ]);

    function DataVisualizationsService(
        $log,
        $http,
        $resource,
        $httpParamSerializer,
        $httpParamSerializerJQLike
    ) {
        var dataVisualizationServices = {
            sampleData: [{
                    country: "USA",
                    year2004: 3.5,
                    year2005: 4.2
                },
                {
                    country: "UK",
                    year2004: 1.7,
                    year2005: 3.1
                },
                {
                    country: "Canada",
                    year2004: 2.8,
                    year2005: 2.9
                },
                {
                    country: "Japan",
                    year2004: 2.6,
                    year2005: 2.3
                },
                {
                    country: "France",
                    year2004: 1.4,
                    year2005: 2.1
                },
                {
                    country: "Brazil",
                    year2004: 2.6,
                    year2005: 4.9
                },
                {
                    country: "Russia",
                    year2004: 6.4,
                    year2005: 7.2
                },
                {
                    country: "India",
                    year2004: 8,
                    year2005: 7.1
                },
                {
                    country: "China",
                    year2004: 9.9,
                    year2005: 10.1
                }
            ]
        };

        return dataVisualizationServices;

        function pmoDashboardData() {}
    }
})(window.angular);