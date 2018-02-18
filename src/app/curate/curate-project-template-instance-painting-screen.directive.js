(function(angular, d3) {
	"use strict";
	angular
		.module("dtepApp")
		.directive("dtepCurateProjectTemplateInstancePaintingScreen", [
			"$log",
			"$rootScope",
			"$window",
			"$document",
			"$location",
			"$timeout",
			"$interval",
			"$parse",
			"$state",
			dtepCurateProjectTemplateInstancePaintingScreenDirective
		]);
	function dtepCurateProjectTemplateInstancePaintingScreenDirective(
		$log,
		$rootScope,
		$window,
		$document,
		$location,
		$timeout,
		$interval,
		$parse,
		$state
	) {
		return {
			restrict: "EA",
			scope: true,
			link: link,
			controller: "PaintingScreenController"
		};
		function link(scope, element, attrs) {
			if (!attrs.id) {
				$log.error(
					"the container div having directive 'data-dtep-curate-project-template-instance-painting-screen' must have an id."
				);
				$log.error("Otherwise the drop feature will not work.");
				return;
			}
			var id = attrs.id;
			// console.log(d3);
			// console.log(angular.element(window));
			// console.log(angular.element($window));
			// console.log($window);
			// console.log(angular.element(document));
			// console.log("document.querySelector(\"#\" + attrs.id)\n", document.querySelector("#" + attrs.id));
			// console.log("$document[0].querySelector(\"#\" + attrs.id)\n", $document[0].querySelector("#" + attrs.id));
			// console.log("angular.element(document.querySelector(\"#\" + attrs.id))\n", angular.element(document.querySelector("#" + attrs.id)));
			// console.log("angular.element($document[0].querySelector(\"#\" + attrs.id))\n", angular.element($document[0].querySelector("#" + attrs.id)));
			// console.log("d3.select(\"#\" + attrs.id)\n", d3.select("#" + attrs.id));
			scope.drawMeshAppearance(id);
			// drawMeshAppearance(id);
			element.on("dragover", scope.dragoverEventHandler);
			element.on("drop", scope.dropEventHandler);
			scope.$on("$destroy", function(event) {
				element.off("dragover", scope.dragoverEventHandler);
				element.off("drop", scope.dropEventHandler);
			});
			// function drawMeshAppearance(id) {
			// 	// This sequencing is very important and should not be changed arbitarily.
			// 	// Thorough understanding is a must before doing any modifications.
			// 	scope.createAndSetTemplatePaintingContainerDiv(id);
			// 	var templatePaintingContainerDiv = scope.getTemplatePaintingContainerDiv();
			// 	scope.calculateAndSetScreenResolution(templatePaintingContainerDiv);
			// 	var screenResolution = scope.getPaintingDivContainerScreenResolution();
			// 	scope.setCurateMeshGap(50);
			// 	var curateMeshGap = scope.getCurateMeshGap();
			// 	scope.calculateAndSetMaxDimension(screenResolution, curateMeshGap);
			// 	scope.createAndSetSvgContainer(id);
			// 	var svgContainer = scope.getSvgContainer();
			// 	var svgContainerGtag = scope.appendAnReturnSvgContainerGtag(
			// 		svgContainer
			// 	);
			// 	scope.appendSvgContainerDefs(svgContainerGtag);
			// 	scope.createAndSetCurateMesh(svgContainerGtag);
			// 	var curateMesh = scope.getCurateMesh();
			// 	scope.createCurateMeshBackgroundRect(curateMesh);
			// 	var maxDimension = scope.getMaxDimension();
			// 	scope.createCurateMeshLines(curateMesh, maxDimension, curateMeshGap);
			// 	scope.createAndSetNodeGroup(curateMesh);
			// }
		}
	}
})(window.angular, window.d3);
