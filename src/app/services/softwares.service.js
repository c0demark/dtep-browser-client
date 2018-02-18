(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
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
			fetchAllSoftwaresByComponentCode: fetchAllSoftwaresByComponentCode
		};

		return services;

		function fetchAllSoftwaresByComponentCode(componentCode) {
			var serviceUrl = "";

			if (componentCode === "WBS") {
				serviceUrl = "_backendDataMock/softwares/web-server-softwares.json";
			} else if (componentCode === "DBS") {
				serviceUrl =
					"_backendDataMock/softwares/database-server-softwares.json";
			} else if (componentCode === "CMPcf26d25b852d400aa2efc7456b71c3d6") {
				serviceUrl = "_backendDataMock/softwares/runtime-softwares.json";
			} else if (componentCode === "APS") {
				serviceUrl =
					"_backendDataMock/softwares/application-server-softwares.json";
			} else if (componentCode === "CMT") {
				serviceUrl =
					"_backendDataMock/softwares/configuration-management-softwares.json";
			} else if (componentCode === "IUT") {
				serviceUrl =
					"_backendDataMock/softwares/infrastructure-utility-softwares.json";
			} else if (componentCode === "ORC") {
				serviceUrl =
					"_backendDataMock/softwares/container-management-softwares.json";
			} else if (componentCode === "AMT") {
				serviceUrl =
					"_backendDataMock/softwares/application-monitoring-softwares.json";
			} else if (componentCode === "JSC") {
				serviceUrl =
					"_backendDataMock/softwares/automation-service-softwares.json";
			} else if (componentCode === "MLN") {
				serviceUrl =
					"_backendDataMock/softwares/machine-learning-softwares.json";
			} else if (componentCode === "RPA") {
				serviceUrl =
					"_backendDataMock/softwares/robotic-process-softwares.json";
			} else if (componentCode === "ANP") {
				serviceUrl = "_backendDataMock/softwares/data-analytics-softwares.json";
			} else if (componentCode === "VSC") {
				serviceUrl =
					"_backendDataMock/softwares/version-control-softwares.json";
			} else if (componentCode === "CIG") {
				serviceUrl =
					"_backendDataMock/softwares/continuous-integration-softwares.json";
			} else if (componentCode === "BDT") {
				serviceUrl = "_backendDataMock/softwares/build-tool-softwares.json";
			} else if (componentCode === "CQL") {
				serviceUrl = "_backendDataMock/softwares/code-quality-softwares.json";
			} else if (componentCode === "ARR") {
				serviceUrl =
					"_backendDataMock/softwares/repository-manager-softwares.json";
			} else if (componentCode === "NMG") {
				serviceUrl =
					"_backendDataMock/softwares/notification-manager-softwares.json";
			} else if (componentCode === "ARA") {
				serviceUrl =
					"_backendDataMock/softwares/release-manager-softwares.json";
			} else if (componentCode === "WST") {
				serviceUrl =
					"_backendDataMock/softwares/service-testing-softwares.json";
			} else if (componentCode === "WAT") {
				serviceUrl =
					"_backendDataMock/softwares/application-testing-softwares.json";
			} else if (componentCode === "MAT") {
				serviceUrl =
					"_backendDataMock/softwares/mobile-app-testing-softwares.json";
			} else if (componentCode === "PTT") {
				serviceUrl =
					"_backendDataMock/softwares/performance-test-softwares.json";
			} else if (componentCode === "SST") {
				serviceUrl =
					"_backendDataMock/softwares/security-testing-softwares.json";
			} else if (componentCode === "TKS") {
				serviceUrl =
					"_backendDataMock/softwares/it-service-management-softwares.json";
			} else if (componentCode === "ALM") {
				serviceUrl =
					"_backendDataMock/softwares/requirements-management-softwares.json";
			} else if (componentCode === "CMPed3413e311d84bb69d7f3998eb9c92a5") {
				serviceUrl =
					"_backendDataMock/softwares/data-visualizor-softwares.json";
			}
			return $http({
				url: serviceUrl,
				method: "GET"
			});
		}
	}
})(window.angular);
