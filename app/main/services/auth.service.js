(function(angular) {
    "use strict";
    angular.module('dtepApp')
        // angular.module('dtepApp')
        .factory('AuthService', [
            "$log",
            "$http",
            "$resource",
            "$httpParamSerializer",
            "$httpParamSerializerJQLike",
            "API_URL_AUTH",
            "ServerDataExchangeService",
            AuthService
        ]);

    function AuthService(
        $log,
        $http,
        $resource,
        $httpParamSerializer,
        $httpParamSerializerJQLike,
        API_URL_AUTH,
        ServerDataExchangeService
    ) {
        var authServices = {
            authenticate: authenticate
        };

        console.log($http.defaults);
        return authServices;

        function authenticate(userCredential) {
            console.log($http.defaults);
            return $http({
                method: "POST",
                url: "auth/authenticate",
                headers: {
                    //					"Content-Type": "application/x-www-form-urlencoded"
                    "Content-Type": "application/json"
                },
                //				data: $httpParamSerializer(userCredential)
                data: userCredential
            });
            // return ServerDataExchangeService.get(API_URL_AUTH + "/authenticate.json", user);
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