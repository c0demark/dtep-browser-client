(function(angular) {
    "use strict";
    angular.module('dtepApp')
        // angular.module('dtepApp')
        .factory('ServerDataExchangeService', [
            "$log",
            "$http",
            "$resource",
            "$httpParamSerializer",
            "$httpParamSerializerJQLike",
            ServerDataExchangeService
        ]);

    function ServerDataExchangeService(
        $log,
        $http,
        $resource,
        $httpParamSerializer,
        $httpParamSerializerJQLike
    ) {
        var dataExchangeServices = {
            get: get
        };

        return dataExchangeServices;

        function get(url, params, headers) {
            return $http({
                url: url,
                method: "GET",
                params: params,
                headers: headers
            });
        }
        // return $resource(':action', {}, {
        //     authenticate: {
        //         method: 'POST',
        //         params: { 'action': 'authenticate' },
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        //     },
        //     getUser: {
        //         method: 'GET',
        //         params: { 'action': 'getUser' },
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        //     },
        //     registerUser: {
        //         method: 'POST',
        //         params: { 'action': 'registerUser' },
        //         headers: { 'content-Type': 'application/x-www-form-urlencoded' }
        //     },
        //     forgotPassword: {
        //         method: 'POST',
        //         params: { 'action': 'forgotPassword' },
        //         headers: { 'content-Type': 'application/x-www-form-urlencoded' }
        //     }
        // });
    }
})(window.angular);