"use strict";

const gulp = require("gulp");
const fsExtra = require("fs-extra");
const klawSync = require("klaw-sync");
const path = require("path");
const conf = require("./dtep.config");

if (fsExtra.existsSync(path.join(conf.paths.gulp))) {
    klawSync(path.join(conf.paths.gulp), {
        filter: file => {
            return path.extname(file.path) === ".js";
        }
    }).map(file => {
        require(file.path);
    });

    gulp.task("default", ["clean"], () => {
        gulp.start("build");
    });
} else {
    console.error(
        "not able to find gulp config folder in project root directory"
    );
}