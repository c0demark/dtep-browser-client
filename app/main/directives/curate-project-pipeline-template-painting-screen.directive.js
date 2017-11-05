(function(angular, d3, AmCharts) {
    "use strict";
    angular.module("dtepApp")
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
            // templateUrl: "/app/main/curate/curate.svg",
            link: link
        };

        function link(scope, element, attrs) {
            console.log("dtepCurateProjectPipelineTemplatePaintingScreenDirective link function", scope);
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
            var curateDivWidth = angular.element($document[0].querySelector("#" + attrs.id))[0] && angular.element($document[0].querySelector("#" + attrs.id))[0].clientWidth;
            var curateDivHeight = angular.element($document[0].querySelector("#" + attrs.id))[0] && angular.element($document[0].querySelector("#" + attrs.id))[0].clientHeight;
            var curateMeshGap = 50;
            var maxDimension = curateMeshGap * Math.ceil((curateDivWidth + curateDivHeight) / curateMeshGap);
            // var numberOfVerticalLines = 17;
            // var numberOfHorizontalLines = 13;
            // var verticalMeshGap = curateDivWidth / numberOfVerticalLines;
            // var horizontalMeshGap = curateDivHeight / numberOfHorizontalLines;
            // var maxDimension = verticalMeshGap * Math.ceil((curateDivWidth) / verticalMeshGap) +
            //     horizontalMeshGap * Math.ceil((curateDivHeight) / horizontalMeshGap);
            var svgContainer, curateMesh;
            svgContainer = d3
                .select("#" + attrs.id)
                .append("svg")
                .attrs({
                    "xmlns": "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink"
                })
                .styles({
                    // "width": curateDivWidth,
                    // "height": curateDivHeight
                });

            curateMesh = svgContainer
                .append("g");

            curateMesh
                .append("rect")
                .styles({
                    // "fill": "#345e80",
                    // "width": curateDivWidth,
                    // "height": curateDivHeight
                });
            // setCurateMeshDimesnsions(curateDivWidth, curateDivHeight);

            curateMesh
                .append("g")
                // .attrs({
                //     "class": "dtep-curate-project-area-vertical-lines"
                // })
                .classed("dtep-curate-project-area-vertical-lines", true)
                .selectAll("line")
                .data(d3.range(0, maxDimension, curateMeshGap))
                .enter()
                .append("line")
                .attrs({
                    "x1": function(xCoordinate, i) {
                        return xCoordinate;
                    },
                    "y1": 0,
                    "x2": function(xCoordinate, i) {
                        return xCoordinate;
                    },
                    "y2": maxDimension,
                })
                .attrs({
                    // "stroke": "#92b1cab3",
                    // "fill": "none",
                    "shape-rendering": "crispEdge",
                    "vector-effect": "non-scaling-stroke"
                });
            curateMesh
                .append("g")
                // .attrs({
                //     "class": "dtep-curate-project-area-horizontal-lines"
                // })
                .classed("dtep-curate-project-area-horizontal-lines", true)
                .selectAll("line")
                .data(d3.range(0, maxDimension, curateMeshGap))
                .enter()
                .append("line")
                .attrs({
                    "y1": function(yCoordinate, i) {
                        return yCoordinate;
                    },
                    "x1": 0,
                    "y2": function(yCoordinate, i) {
                        return yCoordinate;
                    },
                    "x2": maxDimension,
                })
                .attrs({
                    // "stroke": "white",
                    // "fill": "none",
                    "shape-rendering": "crispEdge",
                    "vector-effect": "non-scaling-stroke"
                });

            curateMesh
                .append("g")
                // .attrs({
                //     "class": "dtep-curate-project-area-left-diagnol-lines"
                // })
                .classed("dtep-curate-project-area-right-diagonal-lines", true)
                .selectAll("line")
                .data(d3.range(0, maxDimension, curateMeshGap))
                .enter()
                .append("line")
                .attrs({
                    "x1": function(xCoordinate, i) {
                        return xCoordinate;
                    },
                    "y1": 0,
                    "y2": function(yCoordinate, i) {
                        return yCoordinate;
                    },
                    "x2": 0,
                })
                .attrs({
                    // "stroke": "white",
                    // "fill": "none",
                    "shape-rendering": "crispEdge",
                    "vector-effect": "non-scaling-stroke"
                });

            curateMesh
                .append("g")
                // .attrs({
                //     "class": "dtep-curate-project-area-left-diagnol-lines"
                // })
                .classed("dtep-curate-project-area-left-diagonal-lines", true)
                .selectAll("line")
                .data(d3.range(0, 2 * maxDimension, curateMeshGap))
                .enter()
                .append("line")
                .attrs({
                    "x1": function(xCoordinate, i) {
                        if (i <= maxDimension / curateMeshGap) {
                            return 0;
                        } else {
                            return xCoordinate - maxDimension;
                        }
                    },
                    "y1": function(yCoordinate, i) {
                        if (i <= maxDimension / curateMeshGap) {
                            return maxDimension - yCoordinate;
                        } else {
                            return 0;
                        }
                    },
                    "x2": function(xCoordinate, i) {
                        if (i <= maxDimension / curateMeshGap) {
                            return xCoordinate;
                        } else {
                            return maxDimension;
                        }
                    },
                    "y2": function(yCoordinate, i) {
                        if (i <= maxDimension / curateMeshGap) {
                            return maxDimension;
                        } else {
                            return 2 * maxDimension - yCoordinate;
                        }
                    }
                })
                .attrs({
                    // "stroke": "white",
                    // "fill": "none",
                    "shape-rendering": "crispEdge",
                    "vector-effect": "non-scaling-stroke"
                });
            angular.element($window).on("resize", function(event) {
                console.log(event);
                curateDivWidth = angular.element($document[0].querySelector("#" + attrs.id))[0] && angular.element($document[0].querySelector("#" + attrs.id))[0].clientWidth;
                curateDivHeight = angular.element($document[0].querySelector("#" + attrs.id))[0] && angular.element($document[0].querySelector("#" + attrs.id))[0].clientHeight;
                // setCurateMeshDimesnsions(curateDivWidth, curateDivHeight);
            });

            function setCurateMeshDimesnsions(curateDivWidth, curateDivHeight) {
                svgContainer
                    .styles({
                        "width": curateDivWidth,
                        "height": curateDivHeight
                    });

                curateMesh
                    .select("rect")
                    .styles({
                        "width": curateDivWidth,
                        "height": curateDivHeight
                    });
            }
        }
    }
})(window.angular, window.d3, window.AmCharts);