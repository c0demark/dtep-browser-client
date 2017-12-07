"use strict";

const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep.config");

const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*"]
});

gulp.task("build:html", [], () => {});

gulp.task("build", ["build:html"], () => {});