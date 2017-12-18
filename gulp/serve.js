"use strict";

const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep.config");

const browserSync = require("browser-sync");
const browserSyncSpa = require("browser-sync-spa");

const util = require("util");

const proxyMiddleware = require("http-proxy-middleware");

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? "default" : browser;
    let routes = null;
    if (
        baseDir === path.join(conf.paths.src) ||
        (util.isArray(baseDir) && baseDir.indexOf(path.join(conf.paths.src)) !== -1)
    ) {
        routes = {
            "/bower_components": "bower_components"
        };
    }
    let server = {
        baseDir: baseDir,
        routes: routes
    };

    /*
     * You can add a proxy to your backend by uncommenting the line bellow.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
     */
    // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

    browserSync.instance = browserSync.init({
        startPath: "/",
        server: server,
        browser: browser
    });
}

browserSync.use(
    browserSyncSpa({
        selector: "[data-ng-app]" // Only needed for angular apps
    })
);

gulp.task("serve", ["watch"], () => {
    browserSyncInit([
        path.join(conf.paths.tmp, conf.globs.tmp.serve),
        path.join(conf.paths.src)
    ]);
});

gulp.task("serve:dist", ["build"], function() {
    browserSyncInit([path.join(conf.paths.dist, conf.globs.dist.outputFolder)]);
});