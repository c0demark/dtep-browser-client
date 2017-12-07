(function(angular, d3) {
    "use strict";
    angular
        .module("dtepApp")
        .directive("dtepCurateProjectPipelineTemplatePaintingScreen", [
            "$log",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$timeout",
            "$interval",
            "$parse",
            "$state",
            dtepCurateProjectPipelineTemplatePaintingScreenDirective
        ]);

    function dtepCurateProjectPipelineTemplatePaintingScreenDirective(
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
                    "the container div having directive 'data-dtep-curate-project-pipeline-template-painting-screen' must have an id."
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
            element.on("dragover", scope.dragoverEventHandler);
            element.on("drop", scope.dropEventHandler);
            scope.$on("$destroy", function(event) {
                element.off("dragover", scope.dragoverEventHandler);
                element.off("drop", scope.dropEventHandler);
            });
        }
    }
})(window.angular, window.d3);