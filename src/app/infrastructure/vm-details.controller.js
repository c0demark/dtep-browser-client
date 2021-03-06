(function(angular, Math) {
    "use strict";
    angular.module("dtepApp")
        // angular.module("dtepApp")
        .controller("VmDetailsController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            VmDetailsController
        ]);

    function VmDetailsController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModal,
        $state
    ) {
        $scope.tenantAllocatedVMs = [{
            "tenantId": "1",
            "vmName": "SoutheastasiaVM",
            "vmSeries": "A-series",
            "vmSize": 0,
            "fromDate": "05-23-2016",
            "toDate": "12-30-2017",
            "vmUserName": null,
            "vmPassword": null,
            "osName": null,
            "vmId": 3,
            "status": "Running",
            "dnsName": "localhost",
            "jenkinsPort": 0,
            "vmLocation": null,
            "resourceGroup": null,
            "softwares": null,
            "auto": null
        }, {
            "tenantId": "1",
            "vmName": "VMDemottest",
            "vmSeries": null,
            "vmSize": 0,
            "fromDate": "05-30-2017",
            "toDate": "06-14-2017",
            "vmUserName": null,
            "vmPassword": null,
            "osName": null,
            "vmId": 6,
            "status": "inProgress",
            "dnsName": "vmdemottestmindtree",
            "jenkinsPort": 0,
            "vmLocation": null,
            "resourceGroup": null,
            "softwares": null,
            "auto": null
        }, {
            "tenantId": "1",
            "vmName": "VM123456",
            "vmSeries": null,
            "vmSize": 0,
            "fromDate": "05-29-2017",
            "toDate": "06-03-2017",
            "vmUserName": null,
            "vmPassword": null,
            "osName": null,
            "vmId": 4,
            "status": "inProgress",
            "dnsName": "vm123456mindtree",
            "jenkinsPort": 0,
            "vmLocation": null,
            "resourceGroup": null,
            "softwares": null,
            "auto": null
        }, {
            "tenantId": "1",
            "vmName": "CheckingVM",
            "vmSeries": null,
            "vmSize": 0,
            "fromDate": "06-10-2017",
            "toDate": "11-30-2017",
            "vmUserName": null,
            "vmPassword": null,
            "osName": null,
            "vmId": 7,
            "status": "Deleted",
            "dnsName": "checkingvmmindtree",
            "jenkinsPort": 0,
            "vmLocation": null,
            "resourceGroup": null,
            "softwares": null,
            "auto": null
        }, {
            "tenantId": "11",
            "vmName": "CheckingVM",
            "vmSeries": null,
            "vmSize": 0,
            "fromDate": "06-10-2017",
            "toDate": "11-30-2017",
            "vmUserName": null,
            "vmPassword": null,
            "osName": null,
            "vmId": 7,
            "status": "Deleted",
            "dnsName": "checkingvmmindtree",
            "jenkinsPort": 0,
            "vmLocation": null,
            "resourceGroup": null,
            "softwares": null,
            "auto": null
        }, {
            "tenantId": "1",
            "vmName": "DTEPPoc",
            "vmSeries": null,
            "vmSize": 0,
            "fromDate": "06-21-2017",
            "toDate": "08-31-2017",
            "vmUserName": null,
            "vmPassword": null,
            "osName": null,
            "vmId": 9,
            "status": "inProgress",
            "dnsName": "dteppocmindtree",
            "jenkinsPort": 0,
            "vmLocation": null,
            "resourceGroup": null,
            "softwares": null,
            "auto": null
        }];
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 3;
        $scope.numPages = Math.ceil($scope.tenantAllocatedVMs.length / $scope.itemsPerPage);
    }
})(window.angular, window.Math);