"use strict";

const path = require("path");
const gutil = require("gulp-util");

exports.paths = {
	gulp: "./gulp",
	src: "./src",
	tmp: "./.tmp",
	dist: "./dist",
	e2e: "./e2e"
};

exports.angularTemplateCache = {
	filename: "templateCacheHtml.js",
	options: {
		module: "dtepApp",
		root: "app",
		templateHeader:
			'(function(angular) {\n\t"use strict";\n\tangular.module("<%= module %>"<%= standalone %>).run(["$templateCache", runFn]);\n\n\tfunction runFn($templateCache) {\n',
		templateBody: "\t\t$templateCache.put('<%= url %>','<%= contents %>');",
		templateFooter: "\n\t}\n})(window.angular);"
	}
};

exports.globs = {
	app: {
		html: {
			index: "/index.html",
			view: "/app/**/*.view.html"
		},
		css: {
			index: "/assets/css/index.css",
			all: "/assets/css/**/*.css"
		},
		js: {
			module: "/app/**/*.module.js",
			value: "/app/**/*.values.js",
			constant: "/app/**/*.constants.js",
			service: "/app/**/*.service.js",
			controller: "/app/**/*.controller.js",
			directive: "/app/**/*.directive.js",
			config: "/app/**/*.config.js",
			run: "/app/**/*.run.js",
			all: "/app/**/*.js"
		},
		images: [
			path.join(exports.paths.src, "/assets/**"),
			"!" + path.join(exports.paths.src, "/assets/css/**")
		]
	},
	tmp: {
		html: {
			index: "/index.html"
		},
		serve: "/serve",
		partials: "/partials",
		templateCacheFile: path.join("/", exports.angularTemplateCache.filename)
	},
	dist: {
		outputFolder: "/dtep-ui",
		assets: "/assets",
		fonts: "/fonts",
		amcharts: "/amcharts",
		backendDataMock: "/_backendDataMock/**/*.json"
	},
	jshint: {
		configFile: "/.jshintrc"
	}
};

exports.inject = {
	options: {
		vendor: {
			common: {
				relative: true,
				// addRootSlash: false,
				selfClosingTag: true,
				removeTags: true
			},
			amcharts3: {
				css: {
					starttag: "<!-- Loading Amcharts Specific css files -->",
					endtag: "<!-- Loaded Amcharts Specific css files -->"
				},
				js: {
					starttag: "<!-- Loading Amcharts Specific js files -->",
					endtag: "<!-- Loaded Amcharts Specific js files -->"
				}
			},
			allExceptAmcharts3: {
				css: {
					starttag: "<!-- Loading Vendor Specific css files -->",
					endtag: "<!-- Loaded Vendor Specific css files -->"
				},
				js: {
					starttag: "<!-- Loading Vendor Specific js files -->",
					endtag: "<!-- Loaded Vendor Specific js files -->"
				}
			}
		},
		app: {
			common: {
				ignorePath: [
					path.join(exports.paths.src)
					// path.join(exports.paths.tmp, exports.globs.tmp.serve)
				],
				addRootSlash: false,
				selfClosingTag: true,
				removeTags: true
			},
			css: {
				index: {
					starttag: "<!-- Loading Application Specific index css -->",
					endtag: "<!-- Loaded Application Specific index css -->"
				}
			},
			js: {
				module: {
					starttag: "<!-- Loading Application Specific Angular Modules -->",
					endtag: "<!-- Loaded Application Specific Angular Modules -->"
				},
				value: {
					starttag: "<!-- Loading Application Specific Angular Constants -->",
					endtag: "<!-- Loaded Application Specific Angular Constants -->"
				},
				constant: {
					starttag: "<!-- Loading Application Specific Angular Constants -->",
					endtag: "<!-- Loaded Application Specific Angular Constants -->"
				},
				service: {
					starttag: "<!-- Loading Application Specific Angular Services -->",
					endtag: "<!-- Loaded Application Specific Angular Services -->"
				},
				controller: {
					starttag: "<!-- Loading Application Specific Angular Controllers -->",
					endtag: "<!-- Loaded Application Specific Angular Controllers -->"
				},
				directive: {
					starttag: "<!-- Loading Application Specific Angular Directives -->",
					endtag: "<!-- Loaded Application Specific Angular Directives -->"
				},
				config: {
					starttag: "<!-- Loading Application Specific Angular Configs -->",
					endtag: "<!-- Loaded Application Specific Angular Configs -->"
				},
				run: {
					starttag: "<!-- Loading Application Specific Angular Run -->",
					endtag: "<!-- Loaded Application Specific Angular Run -->"
				}
			}
		},
		tmp: {
			common: {
				ignorePath: [path.join(exports.paths.tmp, exports.globs.tmp.partials)],
				addRootSlash: false,
				selfClosingTag: true,
				removeTags: true
			},
			partials: {
				starttag:
					"<!-- Loading Application Specific Partial Views Template Cache -->",
				endtag:
					"<!-- Loaded Application Specific Partial Views Template Cache -->"
			}
		}
	}
};

exports.mainBowerFiles = {
	options: {
		common: {
			overrides: {
				amcharts3: {
					main: [
						"amcharts/images/**",
						"amcharts/patterns/**",
						"amcharts/plugins/export/shapes/**",
						"amcharts/plugins/export/export.css",
						"amcharts/amcharts.js",
						"amcharts/funnel.js",
						"amcharts/gantt.js",
						"amcharts/gauge.js",
						"amcharts/pie.js",
						"amcharts/radar.js",
						"amcharts/serial.js",
						"amcharts/xy.js",
						"amcharts/themes/black.js",
						"amcharts/themes/chalk.js",
						"amcharts/themes/dark.js",
						"amcharts/themes/light.js",
						"amcharts/themes/patterns.js",
						"amcharts/plugins/export/libs/blob.js/blob.js",
						"amcharts/plugins/export/libs/classList.js/classList.min.js",
						"amcharts/plugins/export/libs/fabric.js/fabric.min.js",
						"amcharts/plugins/export/libs/FileSaver.js/FileSaver.min.js",
						"amcharts/plugins/export/libs/jszip/jszip.min.js",
						"amcharts/plugins/export/libs/pdfmake/pdfmake.min.js",
						"amcharts/plugins/export/libs/pdfmake/vfs_fonts.js",
						"amcharts/plugins/export/libs/xlsx/xlsx.min.js",
						"amcharts/plugins/export/export.js",
						"amcharts/plugins/animate/animate.js",
						"amcharts/plugins/dataloader/dataloader.js",
						"amcharts/plugins/responsive/responsive.js"
					]
				},
				angular: {
					main: ["angular-csp.css", "angular.js"]
				},
				"angular-bootstrap": {
					main: ["ui-bootstrap-csp.css", "ui-bootstrap-tpls.js"]
				},
				"angular-material": {
					ignore: true
				},
				bootstrap: {
					main: ["dist/fonts/**", "dist/css/bootstrap.css"],
					dependencies: null
				},
				"font-awesome": {
					main: ["fonts/**", "css/font-awesome.css"]
				}
			}
		},
		amcharts3: {
			css: {
				filter: ["**/amcharts/**/*.css"]
			},
			js: {
				filter: ["**/amcharts/**/*.js"]
			},
			images: {
				filter: [
					"**/amcharts/**/*.jpg",
					"**/amcharts/**/*.jpeg",
					"**/amcharts/**/*.png",
					"**/amcharts/**/*.gif",
					"**/amcharts/**/*.tiff",
					"**/amcharts/**/*.bmp",
					"**/amcharts/**/*.svg",
					"**/amcharts/**/*.ico",
					"**/amcharts/**/*.webp"
				]
			},
			srcBase: "bower_components/amcharts3/amcharts"
		},
		allExceptAmcharts3: {
			css: {
				filter: ["**/*.css", "!**/amcharts/**/*.css"]
			},
			js: {
				filter: ["**/*.js", "!**/amcharts/**/*.js"]
			},
			images: {
				filter: [
					"**/*.jpg",
					"**/*.jpeg",
					"**/*.png",
					"**/*.gif",
					"**/*.tiff",
					"**/*.bmp",
					"**/*.svg",
					"**/*.ico",
					"**/*.webp",
					"!**/amcharts/**/*.jpg",
					"!**/amcharts/**/*.jpeg",
					"!**/amcharts/**/*.png",
					"!**/amcharts/**/*.gif",
					"!**/amcharts/**/*.tiff",
					"!**/amcharts/**/*.bmp",
					"!**/amcharts/**/*.svg",
					"!**/amcharts/**/*.ico",
					"!**/amcharts/**/*.webp"
				]
			},
			fonts: {
				filter: [
					"**/*.eot",
					"**/*.svg",
					"**/*.ttf",
					"**/*.woff",
					"**/*.woff2",
					"!**/amcharts/**/*.eot",
					"!**/amcharts/**/*.svg",
					"!**/amcharts/**/*.ttf",
					"!**/amcharts/**/*.woff",
					"!**/amcharts/**/*.woff2"
				]
			}
		}
	}
};

exports.replace = {
	options: {
		app: {
			html: {
				index: {
					infoComments: {
						regex: /(([\s|\t]*)<!--\s*info\s*comments(\S*)\s*-->)(\n|\r|.)*?(<!--\s*end\s*info\s*comments\s*-->)/gi,
						replacement: ""
					}
				}
			}
		},
		tmp: {
			html: {
				index: {
					amcharts3BowerComponents: {
						string: "../bower_components/amcharts3/",
						replacement: ""
					}
				}
			}
		},
		dist: {
			html: {
				index: {
					linkTags: {
						regex: /(<link [^>]*[^\/])(?!\/)>/gi,
						replacement: "$1 />"
					}
				}
			}
		}
	}
};

exports.htmlmin = {
	options: {
		app: {
			html: {
				view: {
					removeComments: true,
					collapseWhitespace: true,
					keepClosingSlash: true,
					minifyCSS: true
				}
			}
		},
		dist: {
			html: {
				index: {
					removeComments: true,
					collapseWhitespace: true,
					keepClosingSlash: true,
					minifyCSS: true
				}
			}
		}
	}
};

exports.errorHandler = function(title) {
	return function(err) {
		gutil.log(gutil.colors.red("[" + title + "]"), err.toString());
		this.emit("end");
	};
};

exports.wiredep = {
	options: {
		// need to rectify regex to exclude files other than amcharts3, angular, angular-ui, ui-bootstrap, lodash and d3 and plugins
		// exclude: [/!^amcharts3\/.*/g, /!^angular\/.*/g, /!^lodash\/.*/g, /!^d3\/.*/g],
		overrides: {
			amcharts3: {
				main: [
					// "amcharts/images/**/*.jpg",
					// "amcharts/images/**/*.png",
					// "amcharts/images/**/*.gif",
					// "amcharts/images/**/*.svg",
					// "amcharts/patterns/**/*.jpg",
					// "amcharts/patterns/**/*.png",
					// "amcharts/patterns/**/*.gif",
					// "amcharts/patterns/**/*.svg",
					"amcharts/images/**",
					"amcharts/patterns/**",
					"amcharts/plugins/export/export.css",
					"amcharts/amcharts.js",
					"amcharts/funnel.js",
					"amcharts/gantt.js",
					"amcharts/gauge.js",
					"amcharts/pie.js",
					"amcharts/radar.js",
					"amcharts/serial.js",
					"amcharts/xy.js",
					"amcharts/themes/black.js",
					"amcharts/themes/chalk.js",
					"amcharts/themes/dark.js",
					"amcharts/themes/light.js",
					"amcharts/themes/patterns.js",
					"amcharts/plugins/export/export.js",
					"amcharts/plugins/animate/animate.js",
					"amcharts/plugins/dataloader/dataloader.js",
					"amcharts/plugins/responsive/responsive.js"
				]
			},
			bootstrap: {
				main: ["dist/css/bootstrap.css"],
				dependencies: null
			}
		}
	}
};
