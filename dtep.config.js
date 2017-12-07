"use strict";

const path = require("path");
const gutil = require("gulp-util");

exports.paths = {
    gulp: "./gulp",
    src: "./src",
    tmp: "./.tmp",
    dist: "./dist",
    e2e: "./e2e"
};

exports.globs = {
    app: {
        html: {
            index: "/index.html",
            view: "/app/**/*.view.html"
        },
        css: {
            index: "/assets/css/index.css",
            all: "/assets/css/**/*.css"
        },
        js: {
            module: "/app/**/*.module.js",
            constant: "/app/**/*.constants.js",
            service: "/app/**/*.service.js",
            controller: "/app/**/*.controller.js",
            directive: "/app/**/*.directive.js",
            config: "/app/**/*.config.js",
            run: "/app/**/*.run.js",
            all: "/app/**/*.js"
        }
    },
    tmp: {
        serve: "/serve/"
    }
};

exports.inject = {
    options: {
        vendor: {
            common: {
                relative: true,
                // addRootSlash: false,
                selfClosingTag: true
            },
            css: {
                starttag: "<!-- Loading Vendor Specific css files -->",
                endtag: "<!-- Loaded Vendor Specific css files -->"
            },
            js: {
                starttag: "<!-- Loading Vendor Specific js files -->",
                endtag: "<!-- Loaded Vendor Specific js files -->"
            }
        },
        app: {
            common: {
                ignorePath: [
                    path.join(exports.paths.src, "/"),
                    path.join(exports.paths.tmp, exports.globs.tmp.serve)
                ],
                addRootSlash: false,
                selfClosingTag: true
            },
            css: {
                index: {
                    starttag: "<!-- Loading Application Specific index css -->",
                    endtag: "<!-- Loaded Application Specific index css -->"
                }
            },
            js: {
                module: {
                    starttag: "<!-- Loading Application Specific Angular Modules -->",
                    endtag: "<!-- Loaded Application Specific Angular Modules -->"
                },
                constant: {
                    starttag: "<!-- Loading Application Specific Angular Constants -->",
                    endtag: "<!-- Loaded Application Specific Angular Constants -->"
                },
                service: {
                    starttag: "<!-- Loading Application Specific Angular Services -->",
                    endtag: "<!-- Loaded Application Specific Angular Services -->"
                },
                controller: {
                    starttag: "<!-- Loading Application Specific Angular Controllers -->",
                    endtag: "<!-- Loaded Application Specific Angular Controllers -->"
                },
                directive: {
                    starttag: "<!-- Loading Application Specific Angular Directives -->",
                    endtag: "<!-- Loaded Application Specific Angular Directives -->"
                },
                config: {
                    starttag: "<!-- Loading Application Specific Angular Configs -->",
                    endtag: "<!-- Loaded Application Specific Angular Configs -->"
                },
                run: {
                    starttag: "<!-- Loading Application Specific Angular Run -->",
                    endtag: "<!-- Loaded Application Specific Angular Run -->"
                }
            }
        }
    }
};

exports.wiredep = {
    options: {
        // need to rectify regex to exclude files other than amcharts3, angular, angular-ui, ui-bootstrap, lodash and d3 and plugins
        // exclude: [/!^amcharts3\/.*/g, /!^angular\/.*/g, /!^lodash\/.*/g, /!^d3\/.*/g],
        overrides: {
            amcharts3: {
                main: [
                    "amcharts/plugins/export/export.css",
                    "amcharts/amcharts.js",
                    "amcharts/funnel.js",
                    "amcharts/gantt.js",
                    "amcharts/gauge.js",
                    "amcharts/pie.js",
                    "amcharts/radar.js",
                    "amcharts/serial.js",
                    "amcharts/xy.js",
                    "amcharts/plugins/export/export.js",
                    "amcharts/plugins/animate/animate.js",
                    "amcharts/plugins/dataloader/dataloader.js",
                    "amcharts/plugins/responsive/responsive.js",
                    "amcharts/themes/black.js",
                    "amcharts/themes/chalk.js",
                    "amcharts/themes/dark.js",
                    "amcharts/themes/light.js",
                    "amcharts/themes/patterns.js"
                ]
            },
            bootstrap: {
                main: ["dist/css/bootstrap.css"],
                dependencies: null
            }
        }
    }
};

exports.mainBowerFiles = {
    options: {
        common: {
            overrides: {
                amcharts3: {
                    main: [
                        "amcharts/plugins/export/export.css",
                        "amcharts/amcharts.js",
                        "amcharts/funnel.js",
                        "amcharts/gantt.js",
                        "amcharts/gauge.js",
                        "amcharts/pie.js",
                        "amcharts/radar.js",
                        "amcharts/serial.js",
                        "amcharts/xy.js",
                        "amcharts/plugins/export/export.js",
                        "amcharts/plugins/animate/animate.js",
                        "amcharts/plugins/dataloader/dataloader.js",
                        "amcharts/plugins/responsive/responsive.js",
                        "amcharts/themes/black.js",
                        "amcharts/themes/chalk.js",
                        "amcharts/themes/dark.js",
                        "amcharts/themes/light.js",
                        "amcharts/themes/patterns.js"
                    ]
                },
                angular: {
                    main: ["angular-csp.css", "angular.js"]
                },
                "angular-bootstrap": {
                    main: ["ui-bootstrap-csp.css", "ui-bootstrap-tpls.js"]
                },
                "angular-material": {
                    ignore: true
                },
                bootstrap: {
                    main: ["dist/css/bootstrap.css"],
                    dependencies: null
                },
                "font-awesome": {
                    main: ["css/font-awesome.css"]
                }
            }
        },
        css: {
            filter: ["**/*.css"]
        },
        js: {
            filter: ["**/*.js"]
        }
    }
};

exports.errorHandler = function(title) {
    return function(err) {
        gutil.log(gutil.colors.red("[" + title + "]"), err.toString());
        this.emit("end");
    };
};