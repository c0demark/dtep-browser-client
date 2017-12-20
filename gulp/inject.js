"use strict";

const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep.config");

const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "main-bower-files"]
});

// const wiredep = require("wiredep").stream;
const _ = require("lodash");

gulp.task("inject", ["scripts"], () => {
    let amcharts3css = gulp
        .src(
            $.mainBowerFiles(
                _.extend({},
                    conf.mainBowerFiles.options.amcharts3.css,
                    conf.mainBowerFiles.options.common
                )
            ), {
                read: false
            }
        )
        .pipe($.filesize())
        .pipe($.size());

    let amcharts3js = gulp
        .src(
            $.mainBowerFiles(
                _.extend({},
                    conf.mainBowerFiles.options.amcharts3.js,
                    conf.mainBowerFiles.options.common
                )
            ), {
                read: false
            }
        )
        .pipe($.filesize())
        .pipe($.size());

    let vendorcss = gulp
        .src(
            $.mainBowerFiles(
                _.extend({},
                    conf.mainBowerFiles.options.allExceptAmcharts3.css,
                    conf.mainBowerFiles.options.common
                )
            ), {
                read: false
            }
        )
        .pipe($.filesize())
        .pipe($.size());

    let vendorjs = gulp
        .src(
            $.mainBowerFiles(
                _.extend({},
                    conf.mainBowerFiles.options.allExceptAmcharts3.js,
                    conf.mainBowerFiles.options.common
                )
            ), {
                read: false
            }
        )
        .pipe($.filesize())
        .pipe($.size());

    let appjsModules = gulp
        .src([path.join(conf.paths.src, conf.globs.app.js.module)], { read: false })
        .pipe($.sort())
        .pipe($.filesize())
        .pipe($.size());

    let appjsConstants = gulp
        .src([path.join(conf.paths.src, conf.globs.app.js.constant)], {
            read: false
        })
        .pipe($.sort())
        .pipe($.filesize())
        .pipe($.size());

    let appjsServices = gulp
        .src([path.join(conf.paths.src, conf.globs.app.js.service)], {
            read: false
        })
        .pipe($.sort())
        .pipe($.filesize())
        .pipe($.size());

    let appjsControllers = gulp
        .src([path.join(conf.paths.src, conf.globs.app.js.controller)], {
            read: false
        })
        .pipe($.sort())
        .pipe($.filesize())
        .pipe($.size());

    let appjsDirectives = gulp
        .src([path.join(conf.paths.src, conf.globs.app.js.directive)], {
            read: false
        })
        .pipe($.sort())
        .pipe($.filesize())
        .pipe($.size());

    let appjsConfigs = gulp
        .src([path.join(conf.paths.src, conf.globs.app.js.config)], { read: false })
        .pipe($.sort())
        .pipe($.filesize())
        .pipe($.size());

    let appjsRun = gulp
        .src([path.join(conf.paths.src, conf.globs.app.js.run)], { read: false })
        .pipe($.sort())
        .pipe($.filesize())
        .pipe($.size());

    let appcssIndex = gulp
        .src([path.join(conf.paths.src, conf.globs.app.css.index)], { read: false })
        .pipe($.sort())
        .pipe($.filesize())
        .pipe($.size());

    return (
        gulp
        .src([path.join(conf.paths.src, conf.globs.app.html.index)])
        .pipe(
            $.replace(
                conf.replace.options.app.html.index.infoComments.regex,
                conf.replace.options.app.html.index.infoComments.replacement
            )
        )
        .pipe(
            $.inject(
                amcharts3css,
                _.extend({},
                    conf.inject.options.vendor.amcharts3.css,
                    conf.inject.options.vendor.common
                )
            )
        )
        .pipe(
            $.inject(
                vendorcss,
                _.extend({},
                    conf.inject.options.vendor.allExceptAmcharts3.css,
                    conf.inject.options.vendor.common
                )
            )
        )
        .pipe(
            $.inject(
                amcharts3js,
                _.extend({},
                    conf.inject.options.vendor.amcharts3.js,
                    conf.inject.options.vendor.common
                )
            )
        )
        .pipe(
            $.inject(
                vendorjs,
                _.extend({},
                    conf.inject.options.vendor.allExceptAmcharts3.js,
                    conf.inject.options.vendor.common
                )
            )
        )
        .pipe(
            $.inject(
                appcssIndex,
                _.extend({},
                    conf.inject.options.app.css.index,
                    conf.inject.options.app.common
                )
            )
        )
        .pipe(
            $.inject(
                appjsModules,
                _.extend({},
                    conf.inject.options.app.js.module,
                    conf.inject.options.app.common
                )
            )
        )
        .pipe(
            $.inject(
                appjsConstants,
                _.extend({},
                    conf.inject.options.app.js.constant,
                    conf.inject.options.app.common
                )
            )
        )
        .pipe(
            $.inject(
                appjsServices,
                _.extend({},
                    conf.inject.options.app.js.service,
                    conf.inject.options.app.common
                )
            )
        )
        .pipe(
            $.inject(
                appjsControllers,
                _.extend({},
                    conf.inject.options.app.js.controller,
                    conf.inject.options.app.common
                )
            )
        )
        .pipe(
            $.inject(
                appjsDirectives,
                _.extend({},
                    conf.inject.options.app.js.directive,
                    conf.inject.options.app.common
                )
            )
        )
        .pipe(
            $.inject(
                appjsConfigs,
                _.extend({},
                    conf.inject.options.app.js.config,
                    conf.inject.options.app.common
                )
            )
        )
        .pipe(
            $.inject(
                appjsRun,
                _.extend({},
                    conf.inject.options.app.js.run,
                    conf.inject.options.app.common
                )
            )
        )
        // .pipe(wiredep(_.extend({}, conf.wiredep.options)))
        .pipe(gulp.dest(path.join(conf.paths.tmp, conf.globs.tmp.serve)))
    );
});