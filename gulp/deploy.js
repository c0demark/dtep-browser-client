"use strict";

require("dotenv").config();
const gulp = require("gulp");
const path = require("path");
const conf = require("../dtep-gulp.config");

const $ = require("gulp-load-plugins")({
	pattern: ["gulp-*"]
});

const _ = require("lodash");

const ftp = require("vinyl-ftp");
const gutil = require("gulp-util");

gulp.task("deploy", ["build"], () => {
	let connection = ftp.create({
		host: process.env.DTEP_UI_DEPLOY_FTP_HOST,
		user: process.env.DTEP_UI_DEPLOY_FTP_HOST_USER,
		password: process.env.DTEP_UI_DEPLOY_FTP_HOST_PASSWORD,
		// parallel: 10,
		// idleTimeout: 30000,
		log: gutil.log
	});

	return gulp
		.src([path.join(conf.paths.dist, conf.globs.dist.outputFolder, "/**")], {
			base: path.join(conf.paths.dist, conf.globs.dist.outputFolder),
			buffer: false
		})
		.pipe(connection.newer("dtep-ui-run"))
		.pipe(connection.dest("dtep-ui-run"));
});
