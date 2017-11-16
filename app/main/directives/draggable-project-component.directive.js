(function(angular, d3, AmCharts) {
    "use strict";
    angular.module("dtepApp")
        .directive("dtepDraggableProjectComponent", [
            "$log",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$timeout",
            "$interval",
            "$parse",
            "$state",
            dtepDraggableProjectComponentDirective
        ]);

    function dtepDraggableProjectComponentDirective(
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
            scope: {
                onDraggingComponent: "&"
            },
            link: link
        };

        function link(scope, element, attrs) {
            element.attr({
                "draggable": true
            });
            element.on("dragstart", dragstart);

            scope.$on("$destroy", function(event) {
                console.log("$destroy event handler called for isolated directive scope");
                element.off("dragstart", dragstart);
            });

            function dragstart(event) {
                console.log("dragstart event handler called");
                scope.onDraggingComponent();
            }
        }
    }
})(window.angular, window.d3, window.AmCharts);