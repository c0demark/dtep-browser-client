(function(angular, d3) {
    "use strict";
    angular
        .module("dtepApp")
        .controller("PaintingScreenController", [
            "$log",
            "$scope",
            "$rootScope",
            "$window",
            "$document",
            "$location",
            "$uibModal",
            "$state",
            PaintingScreenController
        ]);

    function PaintingScreenController(
        $log,
        $scope,
        $rootScope,
        $window,
        $document,
        $location,
        $uibModal,
        $state
    ) {
        // declaring and initializing scope properties
        $scope.templatePaintingContainerDiv = null;
        $scope.paintingDivContainerScreenResolution = null;
        $scope.svgContainer = null;
        $scope.curateMesh = null;
        $scope.curateMeshGap = null;
        $scope.maxDimension = null;
        $scope.nodeGroup = null;

        // scope properties getters and setters
        $scope.setTemplatePaintingContainerDiv = setTemplatePaintingContainerDiv;
        $scope.getTemplatePaintingContainerDiv = getTemplatePaintingContainerDiv;
        $scope.setPaintingDivContainerScreenResolution = setPaintingDivContainerScreenResolution;
        $scope.getPaintingDivContainerScreenResolution = getPaintingDivContainerScreenResolution;
        $scope.setSvgContainer = setSvgContainer;
        $scope.getSvgContainer = getSvgContainer;
        $scope.setCurateMesh = setCurateMesh;
        $scope.getCurateMesh = getCurateMesh;
        $scope.setCurateMeshGap = setCurateMeshGap;
        $scope.getCurateMeshGap = getCurateMeshGap;
        $scope.setMaxDimension = setMaxDimension;
        $scope.getMaxDimension = getMaxDimension;
        $scope.setNodeGroup = setNodeGroup;
        $scope.getNodeGroup = getNodeGroup;

        // painting mmethods
        $scope.createAndSetTemplatePaintingContainerDiv = createAndSetTemplatePaintingContainerDiv;
        $scope.createAndSetSvgContainer = createAndSetSvgContainer;
        $scope.calculateAndSetScreenResolution = calculateAndSetScreenResolution;
        $scope.calculateAndSetMaxDimension = calculateAndSetMaxDimension;
        $scope.appendAnReturnSvgContainerGtag = appendAnReturnSvgContainerGtag;
        $scope.appendSvgContainerDefs = appendSvgContainerDefs;
        $scope.createBoxShadowFilterDef = createBoxShadowFilterDef;
        $scope.createStartArrowMarkerDef = createStartArrowMarkerDef;
        $scope.createEndArrowMarkerDef = createEndArrowMarkerDef;
        $scope.createPlugPatternMarkerDef = createPlugPatternMarkerDef;
        $scope.createSocketPatternMarkerDef = createSocketPatternMarkerDef;
        $scope.createAndSetCurateMesh = createAndSetCurateMesh;
        $scope.createCurateMeshBackgroundRect = createCurateMeshBackgroundRect;
        $scope.createCurateMeshLines = createCurateMeshLines;
        $scope.createCurateMeshVerticalLines = createCurateMeshVerticalLines;
        $scope.createCurateMeshHorizontalLines = createCurateMeshHorizontalLines;
        $scope.createCurateMeshRightDiagonalLines = createCurateMeshRightDiagonalLines;
        $scope.createCurateMeshLeftDiagonalLines = createCurateMeshLeftDiagonalLines;
        $scope.createAndSetNodeGroup = createAndSetNodeGroup;
        $scope.drawMeshAppearance = drawMeshAppearance;

        // event handler methods
        $scope.dragoverEventHandler = dragoverEventHandler;
        $scope.dropEventHandler = dropEventHandler;

        function setTemplatePaintingContainerDiv(paintingContainerDiv) {
            $scope.templatePaintingContainerDiv = paintingContainerDiv;
        }

        function getTemplatePaintingContainerDiv() {
            return $scope.templatePaintingContainerDiv;
        }

        function setPaintingDivContainerScreenResolution(screeResolution) {
            $scope.paintingDivContainerScreenResolution = screeResolution;
        }

        function getPaintingDivContainerScreenResolution() {
            return $scope.paintingDivContainerScreenResolution;
        }

        function setSvgContainer(svgContainer) {
            $scope.svgContainer = svgContainer;
        }

        function getSvgContainer() {
            return $scope.svgContainer;
        }

        function setCurateMesh(curateMesh) {
            $scope.curateMesh = curateMesh;
        }

        function getCurateMesh() {
            return $scope.curateMesh;
        }

        function setCurateMeshGap(gap) {
            $scope.curateMeshGap = gap;
        }

        function getCurateMeshGap() {
            return $scope.curateMeshGap;
        }

        function setMaxDimension(maxDimension) {
            $scope.maxDimension = maxDimension;
        }

        function getMaxDimension() {
            return $scope.maxDimension;
        }

        function setNodeGroup(nodeGroup) {
            $scope.nodeGroup = nodeGroup;
        }

        function getNodeGroup() {
            return $scope.nodeGroup;
        }

        function drawMeshAppearance(id) {
            // This sequencing is very important and should not be changed arbitarily.
            // Thorough understanding is a must before doing any modifications.
            $scope.createAndSetTemplatePaintingContainerDiv(id);
            var templatePaintingContainerDiv = $scope.getTemplatePaintingContainerDiv();
            $scope.calculateAndSetScreenResolution(templatePaintingContainerDiv);
            var screenResolution = $scope.getPaintingDivContainerScreenResolution();
            $scope.setCurateMeshGap(50);
            var curateMeshGap = $scope.getCurateMeshGap();
            $scope.calculateAndSetMaxDimension(screenResolution, curateMeshGap);
            $scope.createAndSetSvgContainer(id);
            var svgContainer = $scope.getSvgContainer();
            var svgContainerGtag = $scope.appendAnReturnSvgContainerGtag(
                svgContainer
            );
            $scope.appendSvgContainerDefs(svgContainerGtag);
            $scope.createAndSetCurateMesh(svgContainerGtag);
            var curateMesh = $scope.getCurateMesh();
            $scope.createCurateMeshBackgroundRect(curateMesh);
            var maxDimension = $scope.getMaxDimension();
            $scope.createCurateMeshLines(curateMesh, maxDimension, curateMeshGap);
            $scope.createAndSetNodeGroup(curateMesh);
        }

        function createAndSetTemplatePaintingContainerDiv(id) {
            var templatePaintingContainerDiv = angular.element(
                $document[0].querySelector("#" + id)
            )[0];
            $scope.setTemplatePaintingContainerDiv(templatePaintingContainerDiv);
        }

        function calculateAndSetScreenResolution(templatePaintingContainerDiv) {
            var screenResolution = {};
            screenResolution.width = templatePaintingContainerDiv.clientWidth;
            screenResolution.height = templatePaintingContainerDiv.clientHeight;
            $scope.setPaintingDivContainerScreenResolution(screenResolution);
        }

        function calculateAndSetMaxDimension(screenResolution, curateMeshGap) {
            var maxDimension =
                curateMeshGap *
                Math.ceil(
                    (screenResolution.width + screenResolution.height) / curateMeshGap
                );
            $scope.setMaxDimension(maxDimension);
        }

        function createAndSetSvgContainer(id) {
            var svgContainer = d3
                .select("#" + id)
                .selectAll("svg")
                .data(["svg"])
                .enter()
                .append("svg")
                .attrs({
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink"
                })
                .styles({
                    width: "calc(100%)",
                    height: "calc(100%)",
                    "max-width": "calc(100%)",
                    "max-height": "calc(100%)"
                });
            $scope.setSvgContainer(svgContainer);
        }

        function appendAnReturnSvgContainerGtag(svgContainer) {
            var svgContainerGtag = svgContainer
                .selectAll("g.dtep-curate-project-svg-container-content")
                .data(["g.dtep-curate-project-svg-container-content"])
                .enter()
                .append("g")
                .classed("dtep-curate-project-svg-container-content", true);
            return svgContainerGtag;
        }

        function appendSvgContainerDefs(svgContainerGtag) {
            $scope.createBoxShadowFilterDef(svgContainerGtag);
            $scope.createStartArrowMarkerDef(svgContainerGtag);
            $scope.createEndArrowMarkerDef(svgContainerGtag);
            $scope.createPlugPatternMarkerDef(svgContainerGtag);
            $scope.createSocketPatternMarkerDef(svgContainerGtag);
        }

        function createBoxShadowFilterDef(svgContainerGtag) {
            var nodeBoxShadowFilter = svgContainerGtag
                .append("defs")
                .append("filter")
                .attrs({
                    id: "box-shadow"
                })
                .styles({
                    height: "120%"
                });
            nodeBoxShadowFilter.append("feGaussianBlur").attrs({ in: "SourceAlpha",
                stdDeviation: "3",
                result: "blur"
            });
            nodeBoxShadowFilter.append("feOffset").attrs({ in: "blur",
                dx: "2",
                dy: "2",
                result: "offsetBlur"
            });
            nodeBoxShadowFilter
                .append("feComponentTransfer")
                .append("feFuncA")
                .attrs({
                    type: "linear",
                    slope: "0.7"
                });
            nodeBoxShadowFilter
                .append("feMerge")
                .append("feMergeNode")
                .attrs({ in: "offsetBlur" });
            nodeBoxShadowFilter
                .select("feMerge")
                .append("feMergeNode")
                .attrs({ in: "SourceGraphic"
                });
        }

        function createStartArrowMarkerDef(svgContainerGtag) {
            svgContainerGtag
                .append("defs")
                .append("marker")
                .attrs({
                    id: "start-arrow",
                    viewBox: "0 -5 10 10",
                    refX: 4,
                    markerWidth: 6,
                    markerHeight: 6,
                    orient: "auto"
                })
                .append("path")
                .attrs({
                    d: "M10,-5L0,0L10,5",
                    fill: "black"
                });
        }

        function createEndArrowMarkerDef(svgContainerGtag) {
            svgContainerGtag
                .append("defs")
                .append("marker")
                .attrs({
                    id: "end-arrow",
                    viewBox: "0 -5 10 10",
                    refX: 3,
                    markerWidth: 6,
                    markerHeight: 6,
                    orient: "auto"
                })
                .append("path")
                .attrs({
                    d: "M0,-5L10,0L0,5",
                    fill: "black"
                });
        }

        function createPlugPatternMarkerDef(svgContainerGtag) {
            svgContainerGtag
                .append("defs")
                .append("pattern")
                .attrs({
                    id: "plug",
                    width: 20,
                    height: 20
                })
                .append("image")
                .attrs({
                    "xlink:href": "/assets/images/plug.svg",
                    width: 20,
                    height: 20,
                    x: 0,
                    y: 0
                });
        }

        function createSocketPatternMarkerDef(svgContainerGtag) {
            svgContainerGtag
                .append("defs")
                .append("pattern")
                .attrs({
                    id: "socket",
                    width: 20,
                    height: 20
                })
                .append("image")
                .attrs({
                    "xlink:href": "/assets/images/socket.svg",
                    width: 20,
                    height: 20,
                    x: 0,
                    y: 0
                });
        }

        function createAndSetCurateMesh(svgContainerGtag) {
            var curateMesh = svgContainerGtag
                .selectAll("g.dtep-curate-project-svg-container-visualization")
                .data(["g.dtep-curate-project-svg-container-visualization"])
                .enter()
                .append("g")
                .classed("dtep-curate-project-svg-container-visualization", true);
            $scope.setCurateMesh(curateMesh);
        }

        function createCurateMeshBackgroundRect(curateMesh) {
            curateMesh
                .append("rect")
                .classed("dtep-curate-project-mesh", true)
                .styles({
                    fill: "#345e80",
                    "pointer-events": "all",
                    width: "calc(100%)",
                    height: "calc(100%)",
                    "max-width": "calc(100%)",
                    "max-height": "calc(100%)"
                });
        }

        function createCurateMeshLines(curateMesh, maxDimension, curateMeshGap) {
            $scope.createCurateMeshVerticalLines(
                curateMesh,
                maxDimension,
                curateMeshGap
            );
            $scope.createCurateMeshHorizontalLines(
                curateMesh,
                maxDimension,
                curateMeshGap
            );
            $scope.createCurateMeshRightDiagonalLines(
                curateMesh,
                maxDimension,
                curateMeshGap
            );
            $scope.createCurateMeshLeftDiagonalLines(
                curateMesh,
                maxDimension,
                curateMeshGap
            );
        }

        function createCurateMeshVerticalLines(
            curateMesh,
            maxDimension,
            curateMeshGap
        ) {
            curateMesh
                .append("g")
                .classed("dtep-curate-project-area-vertical-lines", true)
                .selectAll("line")
                .data(d3.range(0, maxDimension, curateMeshGap))
                .enter()
                .append("line")
                .attrs({
                    x1: function(xCoordinate, i) {
                        return xCoordinate;
                    },
                    y1: 0,
                    x2: function(xCoordinate, i) {
                        return xCoordinate;
                    },
                    y2: maxDimension
                })
                .styles({
                    stroke: "rgba(146, 177, 202, 0.7019607843137254)",
                    fill: "none",
                    "shape-rendering": "crispEdges",
                    "vector-effect": "non-scaling-stroke"
                });
        }

        function createCurateMeshHorizontalLines(
            curateMesh,
            maxDimension,
            curateMeshGap
        ) {
            curateMesh
                .append("g")
                .classed("dtep-curate-project-area-horizontal-lines", true)
                .selectAll("line")
                .data(d3.range(0, maxDimension, curateMeshGap))
                .enter()
                .append("line")
                .attrs({
                    y1: function(yCoordinate, i) {
                        return yCoordinate;
                    },
                    x1: 0,
                    y2: function(yCoordinate, i) {
                        return yCoordinate;
                    },
                    x2: maxDimension
                })
                .styles({
                    stroke: "rgba(146, 177, 202, 0.7019607843137254)",
                    fill: "none",
                    "shape-rendering": "crispEdges",
                    "vector-effect": "non-scaling-stroke"
                });
        }

        function createCurateMeshRightDiagonalLines(
            curateMesh,
            maxDimension,
            curateMeshGap
        ) {
            curateMesh
                .append("g")
                .classed("dtep-curate-project-area-right-diagonal-lines", true)
                .selectAll("line")
                .data(d3.range(0, maxDimension, curateMeshGap))
                .enter()
                .append("line")
                .attrs({
                    x1: function(xCoordinate, i) {
                        return xCoordinate;
                    },
                    y1: 0,
                    y2: function(yCoordinate, i) {
                        return yCoordinate;
                    },
                    x2: 0
                })
                .styles({
                    stroke: "rgba(146, 177, 202, 0.7019607843137254)",
                    fill: "none",
                    "shape-rendering": "crispEdges",
                    "vector-effect": "non-scaling-stroke"
                });
        }

        function createCurateMeshLeftDiagonalLines(
            curateMesh,
            maxDimension,
            curateMeshGap
        ) {
            curateMesh
                .append("g")
                .classed("dtep-curate-project-area-left-diagonal-lines", true)
                .selectAll("line")
                .data(d3.range(0, 2 * maxDimension, curateMeshGap))
                .enter()
                .append("line")
                .attrs({
                    x1: function(xCoordinate, i) {
                        if (i <= maxDimension / curateMeshGap) {
                            return 0;
                        } else {
                            return xCoordinate - maxDimension;
                        }
                    },
                    y1: function(yCoordinate, i) {
                        if (i <= maxDimension / curateMeshGap) {
                            return maxDimension - yCoordinate;
                        } else {
                            return 0;
                        }
                    },
                    x2: function(xCoordinate, i) {
                        if (i <= maxDimension / curateMeshGap) {
                            return xCoordinate;
                        } else {
                            return maxDimension;
                        }
                    },
                    y2: function(yCoordinate, i) {
                        if (i <= maxDimension / curateMeshGap) {
                            return maxDimension;
                        } else {
                            return 2 * maxDimension - yCoordinate;
                        }
                    }
                })
                .styles({
                    stroke: "rgba(146, 177, 202, 0.7019607843137254)",
                    fill: "none",
                    "shape-rendering": "crispEdges",
                    "vector-effect": "non-scaling-stroke"
                });
        }

        function createAndSetNodeGroup(curateMesh) {
            var nodeGroup = curateMesh
                .selectAll("g.dtep-curate-project-component-node-group")
                .data(["g.dtep-curate-project-component-node-group"])
                .enter()
                .append("g")
                .classed("dtep-curate-project-component-node-group", true);
            $scope.setNodeGroup(nodeGroup);
        }

        function dragoverEventHandler(event) {
            var draggedProjectComponent = $scope.$parent.getDraggedProjectComponent();
            if (draggedProjectComponent) {
                event.preventDefault();
            }
        }

        function dropEventHandler(event) {
            // console.log(event);
            // console.log(scope.getDraggedProjectComponent())
            // scope.toggleShowSoftwareListFlag();
            var draggedProjectComponent = $scope.$parent.getDraggedProjectComponent();
            if (draggedProjectComponent) {
                $scope.$parent.openSoftwareListModal();
                var nodeGroup = $scope.getNodeGroup();
                var node = nodeGroup
                    .append("g")
                    .classed("dtep-curate-project-component-node", true)
                    .attrs({
                        transform: "translate(" + [event.offsetX, event.offsetY] + ")"
                    });

                var nodeBackgroundPatch = node
                    .append("g")
                    .classed("dtep-curate-project-component-node-background-patch", true);

                nodeBackgroundPatch
                    .append("g")
                    .classed(
                        "dtep-curate-project-component-node-connection-point-container",
                        true
                    )
                    .styles({
                        opacity: 0
                    })
                    .attrs({
                        transform: "translate(-10,-10)"
                    })
                    .append("rect")
                    .classed("dtep-curate-project-component-node-connection-point", true)
                    .styles({
                        // x: event.offsetX,
                        // y: event.offsetY,
                        width: "120px",
                        height: "120px",
                        fill: "transparent",
                        stroke: "black",
                        "stroke-dasharray": "4,4"
                    });

                nodeBackgroundPatch
                    .select(
                        "g.dtep-curate-project-component-node-connection-point-container"
                    )
                    .append("g")
                    .attrs({
                        transform: "translate(60,0)"
                    })
                    .append("line")
                    .classed("dtep-curate-project-component-node-connection-line", true)
                    .attrs({
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 0
                    })
                    .styles({ stroke: "black" });

                nodeBackgroundPatch
                    .select(
                        "g.dtep-curate-project-component-node-connection-point-container"
                    )
                    .select("g")
                    .append("circle")
                    .classed(
                        "dtep-curate-project-component-node-connection-point-circle",
                        true
                    )
                    .attrs({
                        cx: 0,
                        cy: 0,
                        r: 10
                    })
                    .styles({
                        fill: "url(#plug)",
                        stroke: "black",
                        "stroke-width": "1px",
                        cursor: "pointer"
                    });

                nodeBackgroundPatch
                    .append("rect")
                    .classed("dtep-curate-project-component-node-box-with-shadow", true)
                    .styles({
                        // x: event.offsetX,
                        // y: event.offsetY,
                        width: "100px",
                        height: "100px",
                        filter: "url(#box-shadow)",
                        fill: "white"
                    });

                node
                    .append("g")
                    .classed("dtep-curate-project-component-node-image", true)
                    .attrs({
                        transform: "translate(30, 25)"
                    })
                    .append("image")
                    .attrs({
                        // x: event.offsetX,
                        // y: event.offsetY,
                        "xlink:href": draggedProjectComponent.iconURL
                    })
                    .styles({
                        width: "40px",
                        height: "40px",
                        cursor: "pointer"
                    });

                var softwareInfoGtag = node
                    .append("g")
                    .classed(
                        "dtep-curate-project-component-node-component-software",
                        true
                    )
                    .attrs({
                        transform: "translate(0, 0)"
                    });

                softwareInfoGtag
                    .append("image")
                    .attrs({
                        // x: event.offsetX,
                        // y: event.offsetY,
                        "xlink:href": "/assets/images/copy.svg",
                        transform: "translate(2, 5)"
                    })
                    .styles({
                        width: "13px",
                        height: "13px",
                        cursor: "pointer"
                    });

                softwareInfoGtag
                    .append("text")
                    .classed(
                        "dtep-curate-project-component-node-component-software-name",
                        true
                    )
                    .styles({
                        fill: "black",
                        "text-anchor": "middle"
                    })
                    .text(function(data) {
                        return "software";
                    })
                    .attrs({
                        // x: event.offsetX,
                        // y: event.offsetY,
                        transform: "translate(50, 18.5)"
                    })
                    .styles({
                        cursor: "pointer",
                        "text-align": "center"
                    })
                    .append("title")
                    .text(function(data) {
                        return draggedProjectComponent.componentName;
                    });

                var softwareStatusGtag = node
                    .append("g")
                    .classed("dtep-curate-project-component-node-software-status", true)
                    .attrs({
                        transform: "translate(0, 75)"
                    });

                softwareStatusGtag.append("rect").styles({
                    // x: event.offsetX,
                    // y: event.offsetY,
                    fill: "#ffd454",
                    width: "100px",
                    height: "25px"
                });

                softwareStatusGtag
                    .append("g")
                    .append("text")
                    .classed("dtep-curate-project-component-node-software-name", true)
                    .attrs({
                        // x: event.offsetX,
                        // y: event.offsetY,
                        transform: "translate(50, 18.5)"
                    })
                    .styles({
                        fill: "black",
                        "text-anchor": "middle"
                    })
                    .text(function(data) {
                        return draggedProjectComponent.componentName;
                    })
                    .styles({
                        cursor: "pointer",
                        "text-align": "center"
                    })
                    .append("title")
                    .text(function(data) {
                        return draggedProjectComponent.componentName;
                    });

                softwareStatusGtag
                    .append("g")
                    .append("image")
                    .attrs({
                        // x: event.offsetX,
                        // y: event.offsetY,
                        "xlink:href": "/assets/images/edit.svg",
                        transform: "translate(84, 5)"
                    })
                    .styles({
                        width: "13px",
                        height: "13px",
                        cursor: "pointer"
                    });

                node
                    .append("g")
                    .classed(
                        "dtep-curate-project-component-node-component-delete-container",
                        true
                    )
                    .attrs({
                        transform: "translate(92.5, -7.5)"
                    })
                    .styles({
                        display: "none"
                    })
                    .append("image")
                    .attrs({
                        // x: event.offsetX,
                        // y: event.offsetY,
                        "xlink:href": "/assets/images/cross.svg"
                    })
                    .styles({
                        width: "15px",
                        height: "15px",
                        cursor: "pointer"
                    });

                node
                    .on("mouseover", function(data) {
                        var connectionPointContainer = d3
                            .select(this)
                            .select(
                                "g.dtep-curate-project-component-node-connection-point-container"
                            )
                            .transition()
                            .duration(1)
                            .styles({
                                opacity: 0.9
                            });
                        connectionPointContainer
                            .select("line.dtep-curate-project-component-node-connection-line")
                            .transition()
                            .duration(300)
                            .attrs({
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: -10
                            });
                        connectionPointContainer
                            .select(
                                "circle.dtep-curate-project-component-node-connection-point-circle"
                            )
                            .transition()
                            .duration(300)
                            .attrs({
                                cx: 0,
                                cy: -15
                            });
                        d3
                            .select(this)
                            .select(
                                "g.dtep-curate-project-component-node-component-delete-container"
                            )
                            // .transition()
                            // .duration(1)
                            .styles({
                                display: "block"
                            });
                    })
                    .on("mouseout", function(data) {
                        var connectionPointContainer = d3
                            .select(this)
                            .select(
                                "g.dtep-curate-project-component-node-connection-point-container"
                            );
                        connectionPointContainer
                            .transition()
                            .duration(1e3)
                            .styles({
                                opacity: 0
                            });
                        connectionPointContainer
                            .select(
                                "circle.dtep-curate-project-component-node-connection-point-circle"
                            )
                            .transition()
                            .duration(1e3)
                            .attrs({
                                cx: 0,
                                cy: 0
                            });
                        connectionPointContainer
                            .select("line.dtep-curate-project-component-node-connection-line")
                            .transition()
                            .duration(1e3)
                            .attrs({
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 0
                            });
                        d3
                            .select(this)
                            .select(
                                "g.dtep-curate-project-component-node-component-delete-container"
                            )
                            // .transition()
                            // .duration(1)
                            .styles({
                                display: "none"
                            });
                    });

                node.call(
                    d3
                    .drag()
                    // .subject(function(data) {
                    //     d3.select(this);
                    //     return {};
                    // })
                    .on("start", function() {
                        d3.event.sourceEvent.stopPropagation();
                        // console.log(d3.select(this));
                        // console.log(d3);
                        // console.log(d3.event);
                    })
                    .on("drag", function() {
                        d3
                            .select(this)
                            .styles({
                                cursor: "move"
                            })
                            // .transition()
                            // .duration(100)
                            .attrs({
                                transform: "translate(" + [d3.event.x, d3.event.y] + ")"
                            });
                    })
                );
                $scope.$parent.unholdDraggedProjectComponent();
            }
        }
    }
})(window.angular, window.d3);