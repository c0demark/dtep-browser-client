(function(angular) {
	"use strict";
	angular
		.module("dtepApp")
		.controller("SoftwareConnectFormModalController", [
			"$log",
			"$scope",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$uibModalInstance",
			"$state",
			"$http",
			SoftwareConnectFormModalController
		]);

	function SoftwareConnectFormModalController(
		$log,
		$scope,
		$rootScope,
		$window,
		$document,
		$location,
		$uibModalInstance,
		$state,
		$http
	) {
		$scope.closeModal = closeModal;
		$scope.dismissModal = dismissModal;
		$scope.sendConnectRequest = sendConnectRequest;
		$scope.reset = reset;

		function closeModal() {
			$uibModalInstance.close("closed modal");
		}

		function dismissModal() {
			$uibModalInstance.dismiss("dismissed modal");
		}

		function reset(connectForm) {
			if (connectForm) {
				connectForm.$setPristine();
				connectForm.$setUntouched();
			}
			$scope.user = null;
		}

		function sendConnectRequest(user) {
			if (user && user.url && user.email && user.userName && user.password) {
				console.log("Url: " + user.url);
				console.log("Email: " + user.email);
				console.log("UserName: " + user.userName);
				console.log("Password: " + user.password);
				$http({
					method: "GET",
					url: "http://localhost:3000/#/authenticatedAccess/home",
					user: user
				}).then(function(response) {
					$scope.closeModal();
					$scope.$parent.closeModal();
					//     $scope.createIconForSelection();
				});
			}
		}
	}
})(window.angular);
