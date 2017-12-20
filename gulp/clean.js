"use strict";

const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep.config");

const $ = require("gulp-load-plugins")({
    pattern: ["del"]
});

gulp.task("clean:tmp", () => {
    return $.del.sync([path.join(conf.paths.tmp, "/")]);
});

gulp.task("clean:dist", () => {
    return $.del.sync([path.join(conf.paths.dist, "/")]);
});

gulp.task("clean", ["clean:tmp", "clean:dist"]);