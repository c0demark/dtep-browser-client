"use strict";

const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep.config");

const browserSync = require("browser-sync");

const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*"]
});

gulp.task("scripts", () => {
    return gulp
        .src(path.join(conf.paths.src, conf.globs.app.js.all))
        .pipe($.jshint())
        .pipe($.jshint.reporter("jshint-stylish"))
        .pipe($.filesize())
        .pipe($.size())
        .pipe(
            browserSync.reload({
                stream: true
            })
        );
});