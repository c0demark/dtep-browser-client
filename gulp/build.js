"use strict";

const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep.config");

const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "main-bower-files"]
});

const _ = require("lodash");

gulp.task("copy:backend-data-mock", () => {
    let mockDataJsonFilter = $.filter(["**/*.json"], {
        restore: true
    });
    return (
        gulp
        .src([path.join(conf.paths.src, conf.globs.dist.backendDataMock)], {
            base: path.join(conf.paths.src)
        })
        .pipe(mockDataJsonFilter)
        // .pipe(mockDataJsonFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, conf.globs.dist.outputFolder)))
    );
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
    return gulp
        .src([path.join(conf.paths.src, conf.globs.app.html.view)])
        .pipe(
            $.htmlmin({
                removeComments: true,
                collapseWhitespace: true
            })
        )
        .pipe(
            $.angularTemplatecache(
                conf.angularTemplateCache.filename,
                _.extend({}, conf.angularTemplateCache.options)
            )
        )
        .pipe(gulp.dest(path.join(conf.paths.tmp, conf.globs.tmp.partials)));
});

gulp.task("fonts:vendor", () => {
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

gulp.task("images:amcharts3", () => {
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

gulp.task("images:app", () => {
    return gulp
        .src(conf.globs.app.images)
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
    "html", ["copy:dist-jshintrc", "images:amcharts3", "inject", "partials"],
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

        let htmlFilter = $.filter(["**/*.html"], {
            restore: true
        });

        return gulp
            .src([
                path.join(
                    conf.paths.tmp,
                    conf.globs.tmp.serve,
                    conf.globs.app.html.index
                )
            ])
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
            .pipe(htmlFilter)
            .pipe(
                $.htmlmin({
                    removeComments: true,
                    collapseWhitespace: true
                })
            )
            .pipe(htmlFilter.restore)
            .pipe(
                gulp.dest(path.join(conf.paths.dist, conf.globs.dist.outputFolder))
            );
    }
);

gulp.task("build", [
    "html",
    "fonts:vendor",
    "images:app",
    "copy:backend-data-mock"
]);