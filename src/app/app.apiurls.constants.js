(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
		.constant(
			"DTEP_DATA_VISUALIZATION_SERVICE_API_HOST_URL",
			"http://localhost:1116" // this is for dev environment only.
		)
		.constant("BACKEND_DATA_MOCK_PATH", "_backendDataMock");
})(window.angular);
