"use strict";

const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep.config");

const browserSync = require("browser-sync");

function isOnlyChange(event) {
    return event.type === "changed";
}

gulp.task("watch", ["inject"], () => {
    gulp.watch(
        [path.join(conf.paths.src, conf.globs.app.html.index), "bower.json"], ["inject"]
    );

    gulp.watch([path.join(conf.paths.src, conf.globs.app.css.all)], event => {
        if (isOnlyChange(event)) {
            gulp.start("scripts");
        } else {
            gulp.start("inject");
        }
    });

    gulp.watch([path.join(conf.paths.src, conf.globs.app.js.all)], event => {
        if (isOnlyChange(event)) {
            gulp.start("scripts");
        } else {
            gulp.start("inject");
        }
    });

    gulp.watch([path.join(conf.paths.src, conf.globs.app.html.view)], event => {
        browserSync.reload(event.path);
    });
});