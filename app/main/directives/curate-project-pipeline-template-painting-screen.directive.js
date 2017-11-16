(function(angular, d3) {
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
            // scope: true,
            link: link
        };

        function link(scope, element, attrs) {
            console.log("dtepCurateProjectPipelineTemplatePaintingScreenDirective link function", scope);
            if (!attrs.id) {
                $log.error("the container div having directive 'data-dtep-curate-project-pipeline-template-painting-screen' must have an id.");
                $log.error("Otherwise the drop feature will not work.");
                return;
            }
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
            var templatePaintingContainerDiv, svgContainer, curateMesh;

            drawMeshAppearance(attrs.id);

            angular.element($window).on("resize", resize);

            element.on("dragover", dragover);

            element.on("drop", drop);

            scope.$on("$destroy", function(event) {
                angular.element($window).off("resize", resize);
                element.off("dragover", dragover);
                element.off("drop", drop);
            });

            function resize(event) {
                console.log(event);
                var curateMeshWidth = templatePaintingContainerDiv && templatePaintingContainerDiv.clientWidth;
                var curateMeshHeight = templatePaintingContainerDiv && templatePaintingContainerDiv.clientHeight;
                // setCurateMeshDimesnsions(curateDivWidth, curateDivHeight);
            }

            function dragover(event) {
                event.preventDefault();
            }

            function drop(event) {
                // console.log(event);
                console.log(scope.getDraggedProjectComponent());
                var componentNodeGroup, componentNode, componentNodeBackgroundPatch;
                var draggedProjectComponent = scope.getDraggedProjectComponent();
                if (Object.keys(draggedProjectComponent).length) {
                    svgContainer = d3
                        .select("#" + attrs.id)
                        .select("svg");

                    curateMesh = svgContainer
                        .select("g")
                        .select("g");

                    componentNodeGroup = curateMesh
                        .select("g.dtep-curate-project-component-node-group")

                    componentNode = componentNodeGroup
                        .append("g")
                        .classed("dtep-curate-project-component-node", true);
                    // .styles({
                    //     "width": "120px",
                    //     "height": "120px"
                    // });

                    componentNodeBackgroundPatch = componentNode
                        .append("g")
                        .classed("dtep-curate-project-component-node-background-patch", true);

                    componentNodeBackgroundPatch
                        .append("g")
                        .classed("dtep-curate-project-component-node-connection-point-container", true)
                        .styles({
                            // "opacity": "0",
                            // "transform": "translate(-10,-10)"
                        })
                        .attrs({
                            "transform": "translate(-10,-10)"
                        })
                        .append("rect")
                        .classed("dtep-curate-project-component-node-connection-point", true)
                        .styles({
                            "x": event.offsetX,
                            "y": event.offsetY,
                            "width": "120px",
                            "height": "120px",
                            "fill": "transparent",
                            "stroke": "black",
                            "stroke-dasharray": "4,4"
                        });

                    componentNodeBackgroundPatch
                        .append("rect")
                        .classed("dtep-curate-project-component-node-box-shadow", true)
                        .styles({
                            "x": event.offsetX,
                            "y": event.offsetY,
                            "width": "100px",
                            "height": "100px",
                            "filter": "url(#node-box-shadow-filter)",
                            "fill": "white"
                        });

                    componentNode
                        .append("g")
                        .classed("dtep-curate-project-component-node-image", true)
                        .attrs({
                            "transform": "translate(30, 25)"
                        })
                        .append("image")
                        .attrs({
                            "x": event.offsetX,
                            "y": event.offsetY,
                            "href": draggedProjectComponent.iconURL
                        })
                        .attrs({
                            "width": "40px",
                            "height": "40px"
                        });

                    componentNode
                        .append("g")
                        .attrs({
                            "transform": "translate(0, 0)"
                        })
                        .append("text")
                        .classed("dtep-curate-project-component-node-component-name", true)
                        .styles({
                            "fill": "black",
                            "text-anchor": "middle"
                        })
                        .text(function(value) {
                            console.log(value);
                            return value;
                        });

                    componentNode
                        .append("g")
                        .classed("dtep-curate-project-component-node-software-status", true)
                        .attrs({
                            "transform": "translate(0, 75)"
                        })
                        .append("rect")
                        .styles({
                            "x": event.offsetX,
                            "y": event.offsetY,
                            "fill": "#ffd454",
                            "width": "100px",
                            "height": "25px"
                        });

                    componentNode
                        .select("g.dtep-curate-project-component-node-software-status")
                        .append("g")
                        .append("text")
                        .classed("dtep-curate-project-component-node-software-name", true)
                        .attrs({
                            "x": event.offsetX,
                            "y": event.offsetY,
                            "transform": "translate(50, 18.5)"
                        })
                        .styles({
                            "fill": "black",
                            "text-anchor": "middle"
                        })
                        .text(function(value) {
                            console.log(value);
                            return draggedProjectComponent.componentName;
                        });

                    componentNode.call(
                        d3.drag().on("drag", function(event) {
                            console.log("component is getting dragged");
                            console.log(d3.mouse(this));
                            var xCoordinate = d3.mouse(this)[0],
                                yCoordinate = d3.mouse(this)[1];
                            d3.select(this)
                                .attrs({
                                    "transform": "translate(" + xCoordinate + "," + yCoordinate + ")"
                                });
                        })
                    );

                    scope.unholdDraggedProjectComponent();
                }
            }

            function drawMeshAppearance(id) {
                templatePaintingContainerDiv = angular.element($document[0].querySelector("#" + id))[0];
                var curateMeshWidth = templatePaintingContainerDiv && templatePaintingContainerDiv.clientWidth;
                var curateMeshHeight = templatePaintingContainerDiv && templatePaintingContainerDiv.clientHeight;
                var curateMeshGap = 50;
                var maxDimension = curateMeshGap * Math.ceil((curateMeshWidth + curateMeshHeight) / curateMeshGap);
                var nodeBoxShadowFilter;
                svgContainer = d3
                    .select("#" + id)
                    .append("svg")
                    .attrs({
                        "xmlns": "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink"
                    })
                    .styles({
                        // "width": curateDivWidth,
                        // "height": curateDivHeight
                    });

                nodeBoxShadowFilter =
                    svgContainer
                    .append("g")
                    .append("defs")
                    .append("filter")
                    .attrs({
                        "id": "node-box-shadow-filter"
                    })
                    .styles({
                        "height": "120%"
                    });

                nodeBoxShadowFilter
                    .append("feGaussianBlur")
                    .attrs({
                        "in": "SourceAlpha",
                        "stdDeviation": "3"
                    });

                nodeBoxShadowFilter
                    .append("feOffset")
                    .attrs({
                        "dx": "2",
                        "dy": "2",
                        "result": "offsetblur"
                    });

                nodeBoxShadowFilter
                    .append("feComponentTransfer")
                    .append("feFuncA")
                    .attrs({
                        "type": "linear",
                        "slope": "0.7"
                    });

                nodeBoxShadowFilter
                    .append("feMerge")
                    .append("feMergeNode");

                nodeBoxShadowFilter
                    .select("feMerge")
                    .append("feMergeNode")
                    .attrs({
                        "in": "SourceGraphic"
                    });

                curateMesh =
                    svgContainer
                    .select("g")
                    .append("g");

                curateMesh
                    .append("rect")
                    .classed("dtep-curate-project-mesh", true)
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

                curateMesh
                    .append("g")
                    .classed("dtep-curate-project-component-node-group", true);

            }

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
})(window.angular, window.d3);