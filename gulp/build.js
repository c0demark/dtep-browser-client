"use strict";

const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep.config");

const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "main-bower-files"]
});

const _ = require("lodash");

gulp.task("copy:backend-data-mock", () => {
    let mockDataJsonFilter = $.filter(
        [path.join(conf.paths.src, conf.globs.dist.backendDataMock)], {
            restore: true
        }
    );
    return gulp
        .src([path.join(conf.paths.src, conf.globs.dist.backendDataMock)], {
            base: path.join(conf.paths.src)
        })
        .pipe(mockDataJsonFilter)
        .pipe($.jsonMinify())
        .pipe(mockDataJsonFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, conf.globs.dist.outputFolder)));
});

gulp.task("copy:tmp-jshintrc", () => {
    return gulp
        .src([path.join(conf.paths.src, conf.globs.jshint.configFile)])
        .pipe(gulp.dest(path.join(conf.paths.tmp, conf.globs.tmp.partials)));
});

gulp.task("copy:dist-jshintrc", () => {
    return gulp
        .src([path.join(conf.paths.src, conf.globs.jshint.configFile)])
        .pipe(gulp.dest(path.join(conf.paths.dist)));
});

gulp.task("partials", ["copy:tmp-jshintrc"], () => {
    let partialViewHtmlFilter = $.filter(
        [path.join(conf.paths.src, conf.globs.app.html.view)], {
            restore: true,
            dot: true
        }
    );

    return gulp
        .src([path.join(conf.paths.src, conf.globs.app.html.view)])
        .pipe(partialViewHtmlFilter)
        .pipe($.htmlmin(_.extend({}, conf.htmlmin.options.app.html.view)))
        .pipe(partialViewHtmlFilter.restore)
        .pipe(
            $.angularTemplatecache(
                conf.angularTemplateCache.filename,
                _.extend({}, conf.angularTemplateCache.options)
            )
        )
        .pipe(gulp.dest(path.join(conf.paths.tmp, conf.globs.tmp.partials)));
});

gulp.task("copy:fonts-vendor", () => {
    return gulp
        .src(
            $.mainBowerFiles(
                _.extend({},
                    conf.mainBowerFiles.options.allExceptAmcharts3.fonts,
                    conf.mainBowerFiles.options.common
                )
            )
        )
        .pipe($.filesize())
        .pipe($.size())
        .pipe($.flatten())
        .pipe(
            gulp.dest(
                path.join(
                    conf.paths.dist,
                    conf.globs.dist.outputFolder,
                    conf.globs.dist.fonts
                )
            )
        );
});

gulp.task("copy:amcharts3-css", () => {
    return gulp
        .src(
            $.mainBowerFiles(
                _.extend({},
                    conf.mainBowerFiles.options.amcharts3.css,
                    conf.mainBowerFiles.options.common
                )
            ), {
                base: conf.mainBowerFiles.options.amcharts3.srcBase
            }
        )
        .pipe($.filesize())
        .pipe($.size())
        .pipe(
            gulp.dest(
                path.join(
                    conf.paths.dist,
                    conf.globs.dist.outputFolder,
                    conf.globs.dist.amcharts
                )
            )
        );
});

gulp.task("copy:amcharts3-js", () => {
    return gulp
        .src(
            $.mainBowerFiles(
                _.extend({},
                    conf.mainBowerFiles.options.amcharts3.js,
                    conf.mainBowerFiles.options.common
                )
            ), {
                base: conf.mainBowerFiles.options.amcharts3.srcBase
            }
        )
        .pipe($.filesize())
        .pipe($.size())
        .pipe(
            gulp.dest(
                path.join(
                    conf.paths.dist,
                    conf.globs.dist.outputFolder,
                    conf.globs.dist.amcharts
                )
            )
        );
});

gulp.task("copy:amcharts3-images", () => {
    return gulp
        .src(
            $.mainBowerFiles(
                _.extend({},
                    conf.mainBowerFiles.options.amcharts3.images,
                    conf.mainBowerFiles.options.common
                )
            ), {
                base: conf.mainBowerFiles.options.amcharts3.srcBase
            }
        )
        .pipe($.filesize())
        .pipe($.size())
        .pipe(
            gulp.dest(
                path.join(
                    conf.paths.dist,
                    conf.globs.dist.outputFolder,
                    conf.globs.dist.amcharts
                )
            )
        );
});

gulp.task("copy:images-app", () => {
    let fileFilter = $.filter(file => {
        return file.stat.isFile();
    });
    return gulp
        .src(conf.globs.app.images)
        .pipe(fileFilter)
        .pipe(
            gulp.dest(
                path.join(
                    conf.paths.dist,
                    conf.globs.dist.outputFolder,
                    conf.globs.dist.assets
                )
            )
        );
});

gulp.task(
    "html", [
        "copy:dist-jshintrc",
        "copy:amcharts3-images",
        "copy:amcharts3-css",
        "copy:amcharts3-js",
        "inject",
        "partials"
    ],
    () => {
        let templateCacheHtmljs = gulp.src(
            [
                path.join(
                    conf.paths.tmp,
                    conf.globs.tmp.partials,
                    conf.globs.tmp.templateCacheFile
                )
            ], { read: false }
        );

        let servedIndexHtmlFilter = $.filter(
            [
                path.join(
                    conf.paths.tmp,
                    conf.globs.tmp.serve,
                    conf.globs.tmp.html.index
                )
            ], {
                restore: true,
                dot: true
            }
        );

        return gulp
            .src([
                path.join(
                    conf.paths.tmp,
                    conf.globs.tmp.serve,
                    conf.globs.tmp.html.index
                )
            ])
            .pipe(
                $.replace(
                    conf.replace.options.tmp.html.index.amcharts3BowerComponents.string,
                    conf.replace.options.tmp.html.index.amcharts3BowerComponents
                    .replacement
                )
            )
            .pipe(
                $.inject(
                    templateCacheHtmljs,
                    _.extend({},
                        conf.inject.options.tmp.partials,
                        conf.inject.options.tmp.common
                    )
                )
            )
            .pipe($.useref())
            .pipe(
                $.replace(
                    conf.replace.options.dist.html.index.linkTags.regex,
                    conf.replace.options.dist.html.index.linkTags.replacement
                )
            )
            .pipe(servedIndexHtmlFilter)
            .pipe($.htmlmin(_.extend({}, conf.htmlmin.options.dist.html.index)))
            .pipe(servedIndexHtmlFilter.restore)
            .pipe(
                gulp.dest(path.join(conf.paths.dist, conf.globs.dist.outputFolder))
            );
    }
);

gulp.task("build", [
    "clean",
    "html",
    "copy:fonts-vendor",
    "copy:images-app",
    "copy:backend-data-mock"
]);