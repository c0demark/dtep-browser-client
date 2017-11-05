! function() {
    "use strict";
    angular.module("cape-webapp", ["ngAnimate", "ngCookies", "ngTouch", "ngSanitize", "ngMessages", "ngAria", "ngResource", "ui.router", "ui.bootstrap", "ngStorage", "base64", "oauth", "D3js", "oitozero.ngSweetAlert", "schemaForm", "angular.filter", "ngTagsInput", "ng.jsoneditor", "ngImgCrop", "toastr", "angular-ladda", "frapontillo.bootstrap-switch", "angular-loading-bar", "gridster", "tableSort", "mdo-angular-cryptography", "ngclipboard", "cgNotify", "angular-click-outside", "mgcrea.ngStrap", "mgcrea.ngStrap.modal", "pascalprecht.translate", "ui.select", "mgcrea.ngStrap.select"])
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r = this;
        r.isAdded = !1;
        var i = 0;
        r.appURL = o,
            r.selectedMetrics = a.existingMetrics ? a.existingMetrics : [],
            r.canvasCode = a.canvasCode,
            r.projectCode = a.projectCode,
            r.groupCode = a.groupCode,
            r.groupName = a.groupName,
            r.selection = {},
            r.init = function() {
                r.allMetrics = a.allMetrics,
                    r.groupMetrices = _.groupBy(r.allMetrics, "softwareName")
            },
            r.onCancel = function() {
                e.close(!1)
            },
            r.saveMetrics = function() {
                r.isAdded = !0;
                for (var o in r.selection)
                    if (r.selection.hasOwnProperty(o))
                        for (i = 0; i < r.allMetrics.length; i++)
                            r.selection[o] && r.allMetrics[i].metricCode === o && r.selectedMetrics.push(r.allMetrics[i]);
                var s = {
                    groupCode: r.groupCode,
                    groupName: r.groupName,
                    metrics: r.selectedMetrics
                };
                n.saveGroup(r.groupCode, r.canvasCode, r.projectCode, s).then(function(a) {
                    r.errorMessage = "",
                        200 === a.status ? (r.isAdded = !1,
                            e.close(!0)) : t.error(a.data.message, "Error")
                }, function(e) {
                    r.isAdded = !1,
                        r.selectedMetrics = a.existingMetrics ? a.existingMetrics : [],
                        r.selection = {},
                        e.data && e.data.message && e.data.message.length ? r.errorMessage = e.data.message : r.errorMessage = "Error occurred while processing request!"
                })
            },
            r.init()
    }
    e.$inject = ["$uibModalInstance", "toastr", "metricData", "viewsService", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").controller("GetMetricsController", e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = this;
        t.$onInit = function() {
            t.templateData = {
                bindto: "#chart",
                metricCode: t.data.metricCode,
                filterModel: t.data.filter,
                methodName: t.data.methodName,
                pageDATA: e.trustAsResourceUrl(t.data.data.value.replace(/\\/g, "")),
                type: "HTML"
            }
        }
    }
    e.$inject = ["$sce"],
        angular.module("cape-webapp").controller("HtmlDataController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("htmlData", {
        templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/components/htmlData/htmlData.html",
        bindings: {
            data: "<",
            defaultView: "<",
            remove: "&"
        },
        controller: "HtmlDataController as HtmlDataCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n) {
        var o = this;
        o.$onInit = function() {
                o.appURL = e,
                    o.data.dynamic ? o.fetchTableData(o.data) : o.constructTableData()
            },
            o.fetchTableData = function(e) {
                a.getFilteredResponse(e.filter, o.canvasCode, e).then(function(e) {
                    angular.copy(e.data.data, o.templateData.data),
                        o.constructTableData()
                }, function(e) {
                    $log.log("error", e)
                })
            },
            o.constructTableData = function() {
                for (var e = 0; e < o.data.data.tableData.length; e++)
                    if ("Date" === o.data.data.tableData[e])
                        for (var a = 2; a < o.data.data.tableData.length; a++)
                            o.data.data.tableData[a][e] = t("date")(new Date(parseInt(o.data.data.tableData[a][e])), "yyyy-MM-dd hh:mm:ss");
                o.templateData = {
                    metricCode: o.data.metricCode,
                    filterModel: o.data.filter,
                    form: o.data.form,
                    iconUrl: o.data.iconURL,
                    tableData: o.data.data ? o.data.data.tableData : null,
                    title: o.data.title,
                    metricDescription: o.data.metricDescription,
                    topHeading: o.data.topHeading,
                    methodName: o.data.methodName,
                    bothHead: o.data.bothHead,
                    lastUpdatedAgo: o.data.lastUpdatedOn
                }
            },
            o.$onChanges = function() {
                o.templateData || (o.templateData = {}),
                    o.templateData.tableData = o.data.data ? o.data.data.tableData : null,
                    o.templateData.filterModel = o.data.filter
            },
            o.openFilter = function(e, t) {
                e.stopPropagation(),
                    o.filterOpen = !o.filterOpen;
                var a = n.calculateFilterPosition(e);
                o.selectedElement = t,
                    o.selectedGraphFilterData = {
                        x: a.clientX,
                        y: a.clientY,
                        data: o.selectedElement.form,
                        formModel: o.selectedElement.form.formModel
                    }
            },
            o.applyFilter = function(e) {
                o.filterOpen = !o.filterOpen,
                    o.templateData.filter = e,
                    o.templateData.form.formModel = e,
                    o.fetchTableData(o.templateData)
            }
    }
    e.$inject = ["SERVICE_BASE_URL", "$filter", "viewsService", "analyzeTabFactory"],
        angular.module("cape-webapp").controller("AnalyzeTableController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("analyzeTable", {
        templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/components/analyzeTable/analyzeTable.html",
        bindings: {
            data: "<",
            defaultView: "<",
            remove: "&",
            filterOpen: "=",
            canvasCode: "<"
        },
        controller: "AnalyzeTableController as AnalyzeTableCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n) {
        var o = this;
        o.$onInit = function() {
                o.templateData = o.data,
                    o.appURL = e,
                    o.data.data ? o.constructStatData() : o.fetchStatData(o.data)
            },
            o.constructStatData = function() {
                o.templateData = {
                    statData: o.data && o.data.data ? o.data.data.value : "NA",
                    metricCode: o.data.metricCode,
                    isDynamic: o.data.dynamic,
                    filterModel: o.data.filter,
                    filterForm: o.data.form,
                    metricDescription: o.data.metricDescription,
                    methodName: o.data.methodName,
                    iconUrl: o.data.iconURL,
                    title: o.data.title,
                    lastUpdatedAgo: o.data.lastUpdatedOn
                }
            },
            o.fetchStatData = function(e) {
                var n = o.canvasCode;
                t.getFilteredResponse(e.filter, n, e).then(function(e) {
                    o.data = e.data,
                        o.constructStatData()
                }, function(e) {
                    a.log("error", e)
                })
            },
            o.openFilter = function(e, t) {
                e.stopPropagation(),
                    o.filterOpen = !o.filterOpen;
                var a = n.calculateFilterPosition(e);
                o.selectedElement = t,
                    o.selectedGraphFilterData = {
                        x: a.clientX,
                        y: a.clientY,
                        data: o.selectedElement.filterForm,
                        formModel: o.selectedElement.filterModel
                    }
            },
            o.applyFilter = function(e) {
                o.filterOpen = !o.filterOpen,
                    o.templateData.filter = e,
                    o.fetchStatData(o.templateData)
            }
    }
    e.$inject = ["SERVICE_BASE_URL", "viewsService", "$log", "analyzeTabFactory"],
        angular.module("cape-webapp").controller("AnalyzeStatsController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("analyzeStats", {
        templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/components/analyzeStats/analyzeStats.html",
        bindings: {
            data: "<",
            defaultView: "<",
            filterOpen: "=",
            remove: "&",
            canvasCode: "<"
        },
        controller: "AnalyzeStatsController as AnalyzeStatsCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r) {
        var i = this;
        i.appURL = e,
            i.$postLink = function() {
                i.data && i.generateData()
            },
            i.generateData = function() {
                if (i.data.data || (i.data.data = {},
                        i.data.data.columns = []),
                    i.data.donut && (i.data.donut.label.format = function(e) {
                        return e
                    }),
                    i.data.pie && (i.data.pie.label.format = function(e) {
                        return e
                    }),
                    i.graphData = i.data,
                    i.graphData.zoom = {
                        enabled: !0
                    },
                    i.graphData.bindto = "#chart" + i.graphData.metricCode,
                    i.graphData.size = void 0,
                    i.graphData.form && (i.graphData.form.formModel = i.graphData.filter),
                    i.graphData.oninit = function() {
                        i.graphData && !i.graphData.data.columns.length && i.graphData.dynamic && i.fetchMetricData(i.graphData)
                    },
                    i.graphData.axis) {
                    if (i.graphData.axis.x && i.graphData.data.x) {
                        var e = _.find(i.graphData.data.columns, function(e) {
                            return !!_.includes(e, "x")
                        });
                        i.checkAxesForTimeSeries(i.graphData.axis.x, e)
                    }
                    if (i.graphData.axis.y && i.graphData.data.y) {
                        var t = _.find(i.graphData.data.columns, function(e) {
                            return !!_.includes(e, "y")
                        });
                        i.checkAxesForTimeSeries(i.graphData.axis.y, t)
                    }
                }
                a(function() {
                    i.graph = c3.generate(i.graphData)
                }, 1e3)
            },
            i.checkAxesForTimeSeries = function(e, a) {
                "timeseries" === e.type && _.forEach(a, function(e, n) {
                    isNaN(e) || (a[n] = t("date")(new Date(parseInt(e)), "yyyy-M-d"))
                })
            },
            i.fetchMetricData = function(e) {
                o.getFilteredResponse(e.filter, i.canvasCode, e).then(function(e) {
                    angular.copy(e.data.data, i.graphData.data),
                        a(function() {
                            i.graph.load(i.graphData.data)
                        }, 1e3)
                }, function(e) {
                    n.log("error", e)
                })
            },
            i.openFilter = function(e, t) {
                e.stopPropagation(),
                    i.filterOpen = !i.filterOpen;
                var a = r.calculateFilterPosition(e);
                i.selectedElement = t,
                    i.selectedGraphFilterData = {
                        x: a.clientX,
                        y: a.clientY,
                        data: i.selectedElement.form,
                        formModel: i.selectedElement.form.formModel
                    }
            },
            i.applyFilter = function(e) {
                i.filterOpen = !i.filterOpen,
                    i.graphData.filter = e,
                    i.graphData.form.formModel = e,
                    i.fetchMetricData(i.graphData)
            }
    }
    e.$inject = ["SERVICE_BASE_URL", "$filter", "$timeout", "$log", "viewsService", "analyzeTabFactory"],
        angular.module("cape-webapp").controller("AnalyzeGraphController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("analyzeGraph", {
        templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/components/analyzeGraph/analyzeGraph.html",
        bindings: {
            data: "<",
            defaultView: "<",
            remove: "&",
            filterOpen: "=",
            canvasCode: "<"
        },
        controller: "AnalyzeGraphController as AnalyzeGraphCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n) {
        var o = {};
        return o.createUser = function(o, r, i, s, l, c) {
                s = "" === s ? null : t.encode(s);
                var u = n.createUserData(r, i, s, l, c);
                return e({
                    method: "POST",
                    url: a + "studio/v1/orgs/" + o + "/users",
                    data: u
                })
            },
            o.updateUser = function(o, r, i, s, l, c, u) {
                s = "" === s ? null : t.encode(s);
                var d = n.updateUserData(o, r, i, s, l, c, u);
                return e({
                    method: "PATCH",
                    url: a + "studio/v1/orgs/" + o + "/users/" + r,
                    data: d
                })
            },
            o
    }
    e.$inject = ["$http", "$base64", "SERVICE_BASE_URL", "updateUserFactory"],
        angular.module("cape-webapp").service("updateUserService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("updateUserFactory", function() {
        return {
            createUserData: function(e, t, a, n, o) {
                return {
                    username: e,
                    name: t,
                    password: a,
                    orgCode: "SUB",
                    acls: n,
                    email: o
                }
            },
            updateUserData: function(e, t, a, n, o, r, i) {
                return {
                    username: t,
                    name: a,
                    password: n,
                    orgCode: e,
                    status: o ? "Active" : "Inactive",
                    acls: r,
                    email: i
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l) {
        var c = this;
        c.action = a,
            c.userData = n,
            c.orgName = c.userData.orgName,
            c.currentStatus = !1,
            c.isFormDetailsValid = !1,
            c.userRoles = s.getAccessList(),
            c.username = "",
            c.password = "",
            c.name = "",
            c.selectAllRoles = !1,
            c.isCheckboxSelected = !0,
            null !== o.getFormValidationPattern() ? c.formValidationPattern = o.getFormValidationPattern() : o.callInitFunction().then(function(e) {
                o.setFormValidationPattern(e.data.validationPattern),
                    c.formValidationPattern = o.getFormValidationPattern()
            }, function(e) {}),
            c.userData.userData && (c.isActive = "Active" === c.userData.userData.status,
                c.currentStatus = angular.copy(c.isActive),
                c.name = c.userData.userData.name,
                c.username = c.userData.userData.username,
                c.email = c.userData.userData.email,
                c.emailBeforeUpdate = angular.copy(c.email)),
            c.init = function() {
                c.isUserNameTest = !0;
                var e, t, n;
                if ("update" == a)
                    for (e = 0; e < c.userRoles.length; e++) {
                        for (n = 0,
                            t = 0; t < c.userRoles[e].actions.length; t++)
                            _.includes(c.userData.userData.acls, c.userRoles[e].actions[t].code) && n++;
                        n == c.userRoles[e].actions.length ? c.userRoles[e].selected = !0 : c.userRoles[e].selected = !1
                    }
                else
                    for (e = 0; e < c.userRoles.length; e++)
                        c.userRoles[e].selected = !1;
                c.checkIfAllUserRolesAreSelected()
            },
            c.checkIfAllUserRolesAreSelected = function() {
                c.count = 0;
                for (var e = 0; e < c.userRoles.length; e++)
                    !0 === c.userRoles[e].selected && c.count++;
                c.count === c.userRoles.length ? c.selectAllRoles = !0 : c.selectAllRoles = !1
            },
            c.initialUserRoles = angular.copy(c.userRoles),
            c.selectGroup = function(e) {
                c.checkIfAllUserRolesAreSelected()
            },
            c.selectAllUserRoles = function() {
                for (var e = 0; e < c.userRoles.length; e++)
                    c.userRoles[e].selected = c.selectAllRoles
            },
            c.checkFormDetails = function() {
                var e = 0;
                _.each(c.userData.userList, function(a) {
                        if (a.name.toUpperCase() !== c.name.toUpperCase() || c.password !== t.decode(c.userData.userData.password))
                            return e++, !1
                    }),
                    c.isFormDetailsValid = !!e
            },
            c.isUsernameValid = !0,
            c.validateUserName = function() {
                var e = 0;
                _.each(c.userData.userList, function(t) {
                        if (t.username === c.username)
                            return e++, !1
                    }),
                    e ? (c.isUserNameTest = !1,
                        c.isUsernameValid = !1) : (c.isUserNameTest = !0,
                        c.isUsernameValid = !0)
            },
            c.validateCreateAdminForm = function(e) {
                0 !== _.filter(c.userRoles, {
                    selected: !0
                }).length ? (c.isCheckboxSelected = !0,
                    c.isUsernameValid && !c.passwordMisMatch && e && c.createUser()) : c.isCheckboxSelected = !1
            },
            c.validateUpdateAdminForm = function(e) {
                0 !== _.filter(c.userRoles, {
                    selected: !0
                }).length ? (c.isCheckboxSelected = !0,
                    c.isFormDetailsValid && e && ("" === c.password || c.password.length >= 8) || c.isStatusChanged || !angular.equals(c.initialUserRoles, c.userRoles) || c.email !== c.emailBeforeUpdate ? !c.password && !c.confirmPassword || angular.equals(c.password, c.confirmPassword) ? c.updateUser() : i.error("Password does not match", "Error") : i.error("There is nothing to update")) : c.isCheckboxSelected = !1
            },
            c.matchPassword = function() {
                angular.equals(c.password, c.confirmPassword) ? c.passwordMisMatch = !1 : c.passwordMisMatch = !0
            },
            c.changeStatus = function() {
                c.isActive !== c.currentStatus ? c.isStatusChanged = !0 : c.isStatusChanged = !1
            },
            c.findSelectedRoles = function() {
                c.selectedRoles = [];
                var e, t;
                for (e = 0; e < c.userRoles.length; e++)
                    if (c.userRoles[e].selected)
                        for (t = 0; t < c.userRoles[e].actions.length; t++)
                            c.selectedRoles.push(c.userRoles[e].actions[t].code);
                c.selectedRoles = _.uniq(c.selectedRoles)
            },
            c.onCancel = function() {
                e.close(!1)
            },
            c.createUser = function() {
                c.findSelectedRoles(),
                    c.clickedCreateButton = !0,
                    r.createUser(c.userData.orgId, c.username, c.name, c.password, c.selectedRoles, c.email).then(function() {
                        e.close(!0)
                    }, function(e) {
                        e && e.data && e.data.message && e.data.message.length ? c.createAdminErrorMessage = e.data.message : c.createAdminErrorMessage = "Error occurred while processing request!",
                            c.clickedCreateButton = !1
                    })
            },
            c.updateUser = function() {
                c.findSelectedRoles(),
                    c.clickedUpdateButton = !0,
                    r.updateUser(c.userData.orgId, c.userData.userData.username, c.name, c.password, c.currentStatus, c.selectedRoles, c.email).then(function() {
                        e.close(!0)
                    }, function(e) {
                        e && e.data && e.data.message && e.data.message.length ? c.updateAdminErrorMessage = e.data.message : c.updateAdminErrorMessage = "Error occurred while processing request!",
                            c.clickedUpdateButton = !1
                    })
            },
            c.init()
    }
    e.$inject = ["$uibModalInstance", "$base64", "action", "userData", "UtilFactory", "updateUserService", "toastr", "granularAccessControlData", "$log"],
        angular.module("cape-webapp").controller("updateUserController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.createOrg = function(n, o, r, i) {
                var s = a.createOrgData(n, o, r, i);
                return e({
                    method: "POST",
                    url: t + "studio/v1/orgs",
                    data: s
                })
            },
            n.updateOrg = function(n, o, r, i, s) {
                var l = a.updateOrgData(o, r, i, s);
                return e({
                    method: "PATCH",
                    url: t + "studio/v1/orgs/" + n,
                    data: l
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "updateOrgFactory"],
        angular.module("cape-webapp").service("updateOrgService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("updateOrgFactory", function() {
        return {
            createOrgData: function(e, t, a, n) {
                return {
                    orgName: t,
                    createdBy: e,
                    description: a,
                    maxUserLimit: n
                }
            },
            updateOrgData: function(e, t, a, n) {
                return {
                    orgName: e,
                    status: t ? "Active" : "Inactive",
                    description: a,
                    maxUserLimit: n
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l) {
        var c = this;
        c.userInfo = t.getLoggedInUserDetails(),
            c.isOrgNameValid = !0,
            c.isOrgNameChanged = !1,
            c.action = a,
            c.currentStatus = !1,
            null !== n.getFormValidationPattern() ? c.formValidationPattern = n.getFormValidationPattern() : n.callInitFunction().then(function(e) {
                n.setFormValidationPattern(e.data.validationPattern),
                    c.formValidationPattern = n.getFormValidationPattern()
            }, function(e) {}),
            c.init = function() {
                o && (c.orgName = angular.copy(o.orgName),
                        c.orgCode = o.orgCode,
                        c.searchKey = c.orgName,
                        c.maxUserLimit = o.maxUserLimit ? o.maxUserLimit : null,
                        c.tenantDescription = o.description,
                        c.isActive = "Active" === o.status),
                    c.currentStatus = c.isActive
            },
            c.validateCreateOrganisationCanvas = function(e) {
                c.isOrgNameValid && e && c.createOrg()
            },
            c.validateUpdateOrganisationForm = function(e, t, a) {
                c.isOrgNameValid && e && (c.isOrgNameChanged || c.isStatusChanged || t || a) ? c.updateOrg() : s.error("There is nothing to update")
            },
            c.changeStatus = function() {
                c.isActive !== c.currentStatus ? c.isStatusChanged = !0 : c.isStatusChanged = !1
            },
            c.validateOrgName = function() {
                var e = 0;
                c.searchKey ? (_.each(r, function(t) {
                        if (t.orgName.toUpperCase() === c.searchKey.toUpperCase())
                            return e++, !1
                    }),
                    e ? (c.isOrgNameValid = !1,
                        c.isOrgNameChanged = !1) : (c.isOrgNameValid = !0,
                        c.isOrgNameChanged = !0)) : c.isOrgNameValid = !0
            },
            c.onCancel = function() {
                e.close({
                    closed: !1,
                    value: o
                })
            },
            c.createOrg = function() {
                c.maxUserLimit = parseInt(c.maxUserLimit),
                    c.clickedCreateButton = !0,
                    i.createOrg(c.userInfo.username, c.searchKey, c.tenantDescription, c.maxUserLimit).then(function(t) {
                        e.close({
                            closed: !0,
                            value: t.data
                        })
                    }, function(e) {
                        e && e.data && e.data.message && e.data.message.length ? c.createOrgErrorMessage = e.data.message : c.createOrgErrorMessage = "Error occurred while processing request!",
                            c.clickedCreateButton = !1
                    })
            },
            c.updateOrg = function() {
                c.clickedUpdateButton = !0,
                    o.status = c.currentStatus ? "Active" : "Inactive",
                    i.updateOrg(o.orgCode, c.searchKey, c.currentStatus, c.tenantDescription, c.maxUserLimit).then(function() {
                        e.close({
                            closed: !0,
                            value: o
                        })
                    }, function(e) {
                        e && e.message && e.message.length ? c.updateOrgErrorMessage = e.message : c.updateOrgErrorMessage = "Error occurred while processing request!",
                            c.clickedUpdateButton = !1
                    })
            },
            c.init()
    }
    e.$inject = ["$uibModalInstance", "userDetails", "action", "UtilFactory", "orgData", "orgList", "updateOrgService", "toastr", "$log"],
        angular.module("cape-webapp").controller("updateOrgController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.assignUsers = function(a, n, o) {
                return e({
                    method: "POST",
                    url: t + "studio/v1/orgs/" + n + "/projects/" + o + "/users",
                    data: a
                })
            },
            a.searchOrgUser = function(a, n) {
                return e({
                    method: "GET",
                    url: t + "studio/v1/orgs/" + a + "/users/" + n + "/searchUser"
                })
            },
            a.getAllUsers = function(a) {
                return e.get(t + "studio/v1/orgs/" + a + "/activeUsers")
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("assignUserService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c) {
        var u = this;
        u.projectName = r,
            u.loggedInUserDetails = a.getLoggedInUserDetails(),
            u.assignedUsers = [],
            u.deleteAssignedUser = function(e, t) {
                _.each(e, function(e) {
                    for (var a = 0; a < t.length; a++)
                        e.username === t[a].username && (t.splice(a, 1),
                            a--)
                })
            },
            u.init = function() {
                c("#assign-input")
            },
            u.validateAssignUserForm = function() {
                u.assignedUsers.length && u.assignUsers()
            },
            u.filterUser = function(e) {
                var a = t.defer();
                return s.searchOrgUser(u.loggedInUserDetails.orgCode, e).then(function(e) {
                        u.userList = e.data,
                            u.deleteAssignedUser(i, u.userList),
                            angular.forEach(u.userList, function(e) {
                                e.text = e.username
                            }),
                            a.resolve(u.userList)
                    }, function(e) {
                        e.data && e.data.message && e.data.message.length ? l.error(e.data.message, "Error") : l.error("Something went wrong", "Error")
                    }),
                    a.promise
            },
            u.checkTagValue = function(e) {
                var t = !0;
                u.wrongInputMessage = "";
                return _.find(u.userList, {
                        username: e.username
                    }) || (u.wrongInputMessage = "User dosen't exist",
                        t = !1),
                    t
            },
            u.onCancel = function() {
                e.close(!0)
            },
            u.assignUsers = function() {
                u.clickedCreateButton = !0,
                    s.assignUsers(u.assignedUsers, n, o).then(function() {
                        e.close(!0)
                    }, function(e) {
                        e.data && e.data.message && e.data.message.length ? u.assignUsersErrorMessage = e.data.message : u.assignUsersErrorMessage = "Error occurred while processing request!",
                            u.clickedCreateButton = !1
                    })
            },
            u.init()
    }
    e.$inject = ["$uibModalInstance", "$q", "userDetails", "orgId", "projectCode", "projectName", "userList", "assignUserService", "toastr", "focus"],
        angular.module("cape-webapp").controller("assignUserController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.createProject = function(n, o, r, i) {
                var s = a.createProjectData(n, o, r, i);
                return e({
                    method: "POST",
                    url: t + "studio/v1/orgs/" + n + "/projects",
                    data: s
                })
            },
            n.updateProject = function(n, o, r, i, s) {
                var l = a.updateProjectData(n, r, i, s);
                return e({
                    method: "PATCH",
                    url: t + "studio/v1/orgs/" + n + "/projects/" + o,
                    data: l
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "createProjectFactory"],
        angular.module("cape-webapp").service("createProjectService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("createProjectFactory", function() {
        return {
            createProjectData: function(e, t, a, n) {
                return {
                    orgCode: e,
                    projectCode: t,
                    projectName: a,
                    description: n,
                    users: []
                }
            },
            updateProjectData: function(e, t, a, n) {
                return {
                    orgCode: e,
                    projectName: t,
                    status: a ? "Active" : "Inactive",
                    description: n
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s) {
        var l = this;
        l.currentStatus = !0,
            l.userInfo = r.getLoggedInUserDetails(),
            l.orgName = l.userInfo.orgName,
            l.projInfo = a,
            l.isStatusChanged = !0,
            l.isFormDetailsValid = !0,
            l.updateCheck = !1,
            null !== n.getFormValidationPattern() ? l.formValidationPattern = n.getFormValidationPattern() : n.callInitFunction().then(function(e) {
                n.setFormValidationPattern(e.data.validationPattern),
                    l.formValidationPattern = n.getFormValidationPattern()
            }, function(e) {}),
            l.init = function() {
                l.isProjectCodeValid = !1,
                    l.isProjectCodeTest = !0,
                    l.projInfo && (l.isActive = "Active" === a.status,
                        l.currentStatus = l.isActive,
                        l.projectName = l.projInfo.projectName,
                        l.projectDescription = l.projInfo.description,
                        l.projectCode = a.projectCode)
            },
            l.validateCreateProjectForm = function(e) {
                l.isFormDetailsValid && e && l.createProject()
            },
            l.validateUpdateProjectForm = function(e, t) {
                e && (l.isStatusChanged || t || l.updateCheck) ? l.updateProject() : i.error("There is nothing to update")
            },
            l.validateProjectName = function() {
                l.isFormDetailsValid = !0,
                    l.updateCheck = !0,
                    _.each(t, function(e) {
                        if (e.projectName.toUpperCase() === l.projectName.toUpperCase())
                            return l.isFormDetailsValid = !1,
                                void(l.updateCheck = !1)
                    })
            },
            l.changeStatus = function() {
                l.isActive !== l.currentStatus ? l.isStatusChanged = !0 : l.isStatusChanged = !1
            },
            l.validateProjectCode = function() {
                var e = 0;
                _.each(t, function(t) {
                        if (t.projectCode === l.projectCode)
                            return e++, !1
                    }),
                    e ? (l.isProjectCodeTest = !1,
                        l.isProjectCodeValid = !1) : (l.isProjectCodeTest = !0,
                        l.isProjectCodeValid = !0)
            },
            l.onCancel = function() {
                e.close(l.projInfo)
            },
            l.createProject = function() {
                l.clickedCreateButton = !0,
                    o.createProject(l.userInfo.orgCode, l.projectCode, l.projectName, l.projectDescription).then(function(t) {
                        e.close(t.data)
                    }, function(e) {
                        e && (e.data && e.data.message && e.data.message.length ? l.createProjectErrorMessage = e.data.message : l.createProjectErrorMessage = "Error occurred while processing request!"),
                            l.clickedCreateButton = !1
                    })
            },
            l.updateProject = function() {
                l.clickedUpdateButton = !0,
                    o.updateProject(l.userInfo.orgCode, l.projectCode, l.projectName, l.currentStatus, l.projectDescription).then(function(t) {
                        e.close(t.data)
                    }, function(e) {
                        e.data && e.data.message && e.data.message.length ? l.updateProjectErrorMessage = e.data.message : l.updateProjectErrorMessage = "Error occurred while processing request!",
                            l.clickedUpdateButton = !1
                    })
            },
            l.init()
    }
    e.$inject = ["$uibModalInstance", "projectList", "projInfo", "UtilFactory", "createProjectService", "userDetails", "toastr", "$log"],
        angular.module("cape-webapp").controller("createProjectController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("renderVirtualMachine", function() {
        return {
            restrict: "EA",
            templateUrl: "app/modules/canvas/drawCanvas/provisionTab/virtualMachine/renderVirtualMachineDirective.html",
            scope: {
                lastAddedNodeId: "=",
                renderVirtualMachineController: "="
            }
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("InfraViewTabsController", ["$stateParams", "$scope", "drawCanvasServices", "drawCanvasCommonFactory", "SERVICE_BASE_URL", "cacheFactory", "UtilFactory", function(e, t, a, n, o, r, i) {
        var s = this;
        s.cleanCache = i.checkCache(t.$resolve.$$state.self.name),
            s.appURL = o;
        var l, c, u, d, p, f, g, m = d3.layout.tree().nodeSize([150, 150]),
            h = e.id;
        s.drawerId = "infraViewdrawer",
            s.init = function() {
                s.retrieveCanvasDetails(function(t) {
                    s.filterData(t),
                        s.parentNode && (p = m.nodes(s.parentNode),
                            f = m.links(p),
                            g = s.createContainer(),
                            c = g.append("svg:g").selectAll("g"),
                            l = g.append("svg:g").selectAll("g"),
                            s.iconURL = s.parentNode.iconURL,
                            s.restart()),
                        t.infraComponents && !e.navigatingToChildState && n.getAssignViewOptionOnFirstLoadCallback()(t.infraComponents)
                })
            },
            s.filterData = function(e) {
                s.parentNode = _.find(e.infraComponents, {
                    id: h
                })
            },
            s.retrieveCanvasDetails = function(t) {
                a.retrieveCanvasDetails(e.projectCode, e.canvasCode, s.cleanCache).then(function(e) {
                    r.deleteUriInProgress(e.config.url),
                        t && t(e.data)
                }, function(e) {
                    e.data && e.data.message && e.data.message.length ? toastr.error(e.data.message, "Error") : toastr.error("Error occurred while fetching menu!", "Error")
                })
            },
            s.restart = function() {
                p.forEach(function(e) {
                    e.y = 250 * e.depth
                });
                var e = (c = c.data(p, function(e, t) {
                    return ++t
                })).enter().append("svg:g").attr("class", "node").attr("transform", function(e) {
                    return "translate(" + (e.x + u / 4) + "," + (e.y + 100) + ")"
                });
                e.append("rect").attr("x", 0).attr("y", 0).attr("width", 102).attr("height", 102).attr("class", "shadow"),
                    e.append("rect").attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 100).attr("class", "software-node").attr("fill", "white"),
                    e.append("svg:g").attr("transform", "translate(30,25)").append("image").attr("xlink:href", function() {
                        return s.appURL + s.iconURL
                    }).attr("height", "40px").attr("width", "40px").attr("class", "software-icon");
                var t = e.append("svg:g").attr("transform", "translate(0,0)");
                d3.selectAll(".node-name").text(function(e) {
                        return e.componentName
                    }).append("svg:title").text(function(e) {
                        return e.componentName
                    }),
                    t.append("text").attr("class", "node-name").attr("transform", "translate(50,15)").attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                        return e.master ? e.instanceName + "-master" : e.parent.instanceName + "-client"
                    }).append("svg:title").text(function(e) {
                        return e.master ? e.instanceName + "-master" : e.parent.instanceName + "-client"
                    });
                var a = e.append("svg:g").attr("transform", "translate(0,75)");
                d3.selectAll(".node-footer").attr("fill", "#ffd454"),
                    d3.selectAll(".software-name").attr("text-anchor", "middle").text(function(e) {
                        return e.master ? e.master.componentName : e.componentName
                    }).append("svg:title").text(function(e) {
                        return e.master ? e.master.componentName : e.componentName
                    }),
                    a.append("rect").attr("x", 0).attr("y", 0).attr("class", "node-footer").attr("width", 100).attr("height", 25).attr("fill", "#ffd454"),
                    a.append("svg:g").append("text").attr("class", "software-name").attr("x", 0).attr("y", 16).attr("transform", "translate(50)").attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                        return e.master ? e.master.componentName : e.componentName
                    }).append("svg:title").text(function(e) {
                        return e.master ? e.master.componentName : e.componentName
                    }),
                    c.exit().remove(),
                    l = l.data(f, function(e, t) {
                        return ++t
                    }).enter().append("line").style("marker-end", "url(#end-arrow)").attr("class", "link").attr("x1", function(e) {
                        return e.source.x + u / 4 + 50
                    }).attr("y1", function(e) {
                        return e.source.y + 200
                    }).attr("x2", function(e) {
                        return e.target.x + 50 + u / 4
                    }).attr("y2", function(e) {
                        return e.target.y + 100
                    })
            },
            s.createContainer = function() {
                s.canvasScreen = d3.select("#infraViewdrawer")[0][0],
                    s.screenResolution = {},
                    s.screenResolution.screenWidth = s.canvasScreen.clientWidth,
                    s.screenResolution.screenHeight = s.canvasScreen.clientHeight;
                var e = d3.behavior.zoom().scaleExtent([.5, 5]).on("zoom", function() {
                    if (null !== d3.event.sourceEvent && d3.event.sourceEvent.type) {
                        var t = d3.event,
                            a = Math.min(0, Math.max(t.translate[0], s.canvasScreen.clientWidth - 2 * s.screenResolution.screenWidth * t.scale)),
                            o = Math.min(0, Math.max(t.translate[1], s.canvasScreen.clientHeight - 2 * s.screenResolution.screenHeight * t.scale));
                        e.translate([a, o]),
                            n.containerZoom(g, a, o, t.scale)
                    }
                });
                return u = 2 * (parseInt(s.screenResolution.screenWidth) + 15),
                    d = 2 * (parseInt(s.screenResolution.screenHeight) + 15),
                    n.createContainer(s.drawerId, u, d, e)
            },
            s.init()
    }])
}(),
function() {
    "use strict";
    angular.module("cape-webapp").service("infraViewTabsService", function() {})
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u, d, p, f, g, m, h, v) {
        var C = this;
        C.cleanCache = r.checkCache(n.$resolve.$$state.self.name),
            C.versionNum = p.getCanvasData() ? p.getCanvasData().version : null,
            C.loggedInUserInfo = h.getLoggedInUserDetails();
        var w = [],
            S = 0,
            A = [];
        r.clearAllInterval();
        var y = n;
        C.actiondata = [],
            C.boilerplateParams = t,
            C.isBoilerplate = "false" === C.boilerplateParams.isCanvas,
            C.appURL = m,
            C.softwareStatus = g.SOFTWARE_STATUS,
            C.allCanvasStatus = g.CANVAS_STATUS,
            C.tabName = g.CANVAS_TAB_NAME.PROVISION,
            C.virtualMachineAutoScrollDown = {},
            C.canvasName = t.canvasName,
            C.canvasCode = t.canvasCode,
            y.oneAtATime = !0,
            C.isUpdateFetched = !0,
            C.isGetFetched = !0,
            C.nodesForPhysicalView = [],
            C.uninstalledNodeForPhysicalView = [],
            C.pathsForPhysicalView = [],
            C.allAssignedClients = [],
            C.infraViewArray = [],
            C.allAssignedSoftwareNode = [],
            C.sidePalette = !1,
            C.tooltip = d3.select(".tooltip"),
            C.isSoftareInsideVirtualMachine = !1,
            C.installing = !1,
            C.isExecuteResponseFeteched = !1,
            C.installationFlag = !1,
            C.provisionLogFlag = !1,
            C.provisionDirective = !1,
            C.isBoilerplate && (C.boilerplateType = t.type),
            C.isAuthorizedForDrag = function() {
                return f.isAuthorised(g.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1)
            },
            C.toogleLogForProvisionView = function() {
                C.provisionViewLog ? C.hideProvisionViewLog() : C.provisionViewLog = !0
            },
            C.navigateToBoilerplateList = function() {
                "Global" === C.boilerplateType ? a.go("main.boilerplate.global", {
                    type: "Global"
                }) : a.go("main.boilerplate.local", {
                    type: "Local"
                })
            },
            C.connectionPointData = [{
                id: "top",
                x: 50,
                y: 0
            }, {
                id: "right",
                x: 100,
                y: 50
            }, {
                id: "bottom",
                x: 50,
                y: 100
            }, {
                id: "left",
                x: 0,
                y: 50
            }, {
                id: "top-left",
                x: 0,
                y: 0
            }],
            C.tick = function(e) {
                if (e.source.id === e.target.id)
                    return d3.svg.arc().innerRadius(20).outerRadius(20).startAngle(7.4351068301929).endAngle(3.4033964622995)();
                var t = d3.svg.line().x(function(e) {
                        return e.x
                    }).y(function(e) {
                        return e.y
                    }).interpolate("linear").tension(0),
                    a = e.target.x + e.target.dx,
                    n = e.target.y + e.target.dy;
                return t([{
                    x: e.source.x + e.source.dx,
                    y: e.source.y + e.source.dy
                }, {
                    x: a,
                    y: n
                }])
            },
            C.logHistoryOpen = !1,
            C.logHistoryOpenAfterSomeTime = !1,
            C.toggleLogHistory = function() {
                C.logHistoryOpen = !C.logHistoryOpen,
                    C.fadeFlag = !0,
                    C.logHistoryOpenAfterSomeTime ? e(function() {
                        C.logHistoryOpenAfterSomeTime = !C.logHistoryOpenAfterSomeTime
                    }, 500) : C.logHistoryOpenAfterSomeTime = !C.logHistoryOpenAfterSomeTime
            },
            C.logHistoryData = {
                canvasCode: C.canvasCode,
                projectCode: C.projectCode
            },
            C.closeLogHistoryView = function() {
                C.fadeFlag = !1,
                    e(function() {
                        C.closePopup = !1,
                            C.logHistoryOpen = !1,
                            C.logHistoryOpenAfterSomeTime = !1
                    }, 400)
            },
            C.containerZoom = function(e, t, a, n) {
                e.attr("transform", ["translate(" + [t, a] + ")", "scale(" + n + ")"].join(" "))
            },
            C.toggle = function() {
                C.sidePalette = !C.sidePalette
            },
            C.init = function() {
                C.isBoilerplate ? C.retrieveBoilerplateDetails(C.setCanvasDetails) : C.retrieveCanvasDetails(C.versionNum, C.setCanvasDetails)
            },
            C.retrieveBoilerplateDetails = function(e) {
                c.getBoilerplate(C.boilerplateParams.projectCode, C.boilerplateParams.type, C.boilerplateParams.canvasCode, C.cleanCache).then(function(t) {
                    200 === t.status && (v.deleteUriInProgress(t.config.url),
                        t.data.canvasName = t.data.boilerplateName,
                        t.data.projectCode = t.data.orgCode,
                        t.data.projectName = t.data.orgCode,
                        C.filterResponseForNodeTypeAndPath(t.data, e))
                })
            },
            C.retrieveCanvasDetails = function(e, a) {
                C.isGetFetched && C.isUpdateFetched && (C.isGetFetched = !1,
                    p.setCanvasFetchFlag(!0),
                    u.setMessage("Canvas is loading"),
                    c.retrieveCanvasDetails(t.projectCode, t.canvasCode, e, C.cleanCache).then(function(e) {
                        v.deleteUriInProgress(e.config.url),
                            C.isGetFetched = !0,
                            C.getResponseFetched = !0,
                            p.setCanvasFetchFlag(!1),
                            u.setMessage("Canvas up to date"),
                            200 === e.status && (e.data ? p.setCanvasData(e.data) : e.data = p.getCanvasData(),
                                p.setCanvasStatus(e.data.status),
                                C.versionNum = e.data.version,
                                e.data.infraComponents && p.getAssignViewOptionOnFirstLoadCallback()(e.data.infraComponents),
                                C.filterResponseForNodeTypeAndPath(e.data, a))
                    }, function(e) {
                        u.setMessage("Canvas loading failed"),
                            C.isGetFetched = !0,
                            C.getResponseFetched = !0,
                            p.setCanvasFetchFlag(!1),
                            e.data && e.data.message && e.data.message.length ? d.error(e.data.message, "Error") : d.error("Error occurred while fetching menu!", "Error")
                    }))
            },
            C.updateProvisionViewData = function(e, t) {
                for (var a = 0; a <= t.length - 1; a++) {
                    var n = _.find(e, {
                        id: t[a].id
                    });
                    n ? angular.copy(n, t[a]) : (t.splice(a, 1),
                        a--)
                }
                if (e.length > t.length) {
                    var o = _.differenceBy(e, t, "id");
                    angular.forEach(o, function(e) {
                        t.push(e)
                    })
                }
            },
            C.filterResponseForNodeTypeAndPath = function(e, t) {
                var a = !1;
                if (e.nodes) {
                    var n = _.filter(e.nodes, function(e) {
                            if (e.id > S && (S = e.id),
                                e.type === g.NODE_TYPE.SOFTWARE_NODE)
                                return e
                        }),
                        o = _.filter(e.nodes, function(e) {
                            return e.id > S && (S = e.id),
                                e.type === g.NODE_TYPE.VM_NODE && e.status !== g.SOFTWARE_STATUS.UNINSTALLED
                        });
                    C.allAssignedSoftwareNode = _.filter(e.nodes, function(e) {
                            if (!0 === e.software.isProvision) {
                                for (var t = 0; t < o.length; t++)
                                    for (var n = 0; n < o[t].softwares.length; n++)
                                        parseInt(e.id) === parseInt(o[t].softwares[n].id) && e.software.hasClients === o[t].softwares[n].hasClients && (a = !0);
                                if (!a)
                                    return e.status === g.SOFTWARE_STATUS.DRAFT || (e.status = g.SOFTWARE_STATUS.NEW),
                                        e.software.status === g.SOFTWARE_STATUS.DRAFT || (e.software.status = g.SOFTWARE_STATUS.NEW),
                                        e
                            }
                            a = !1
                        }),
                        C.copyOfAllAssignedSoftwareNode = _.filter(e.nodes, function(e) {
                            if (!0 === e.software.isProvision)
                                return e
                        }),
                        o.length && (C.allAssignedClients.length = 0,
                            C.checkIfMasterIsPresentInAnyVm(o))
                }
                if (e.paths)
                    var r = _.filter(e.paths, function(e) {
                            return e.id > S && (S = e.id),
                                e.source.type === g.NODE_TYPE.SOFTWARE_NODE || e.target.type === g.NODE_TYPE.SOFTWARE_NODE
                        }),
                        i = _.filter(e.paths, function(e) {
                            return e.source.type === g.NODE_TYPE.VM_NODE || e.target.type === g.NODE_TYPE.VM_NODE
                        });
                t && t(e, {
                    nodesForComposeAndExecuteView: n,
                    pathsForPhysicalView: i,
                    pathsForComposeAndExecuteView: r,
                    nodesForPhysicalView: o
                })
            },
            C.checkIfMasterIsPresentInAnyVm = function(e) {
                for (var t = 0; t < e.length; t++)
                    for (var a = 0; a < e[t].softwares.length; a++)
                        e[t].softwares[a].hasClients && C.setAllAssignedClientNodes(e[t].softwares[a])
            },
            C.setAllAssignedClientNodes = function(e) {
                C.allAssignedClients.push(e)
            },
            C.setCanvasDetails = function(e, t) {
                e.status === g.CANVAS_STATUS.INSTALLING ? C.installing = !0 : C.installing = !1,
                    C.canvasDetails = e,
                    C.canvasStatus = e.status,
                    C.canvasName = e.canvasName,
                    C.projectCode = e.projectCode,
                    C.projectName = e.projectName,
                    C.screenResolution = e.screenResolution,
                    C.canvasDetails.infraComponents && _.filter(C.canvasDetails.infraComponents, function(e) {
                        C.infraViewArray.push(e.id)
                    }),
                    A = t.nodesForComposeAndExecuteView ? t.nodesForComposeAndExecuteView : A,
                    w = t.pathsForComposeAndExecuteView ? t.pathsForComposeAndExecuteView : w,
                    C.nodesForPhysicalView = t.nodesForPhysicalView ? t.nodesForPhysicalView : C.nodesForPhysicalView,
                    C.pathsForPhysicalView = t.pathsForPhysicalView ? t.pathsForPhysicalView : C.pathsForPhysicalView,
                    C.provisionDirective || (C.provisionDirective = !0),
                    C.checkVirtualMachineInsideCanvas(C.nodesForPhysicalView),
                    r.safeApply(n)
            },
            C.updateDots = function(e) {
                angular.equals(A, e) || angular.copy(e, A)
            },
            C.checkVirtualMachineInsideCanvas = function(e) {
                e.length ? C.isSoftareInsideVirtualMachine = !0 : C.isSoftareInsideVirtualMachine = !1
            },
            C.openProcessList = function(e, t) {
                e.stopPropagation(),
                    C.isProcessContainerOpened || (C.showAllprocessForSelectedVm = !C.showAllprocessForSelectedVm,
                        C.selectedVmProcessData = {
                            processes: t,
                            x: e.clientX,
                            y: e.clientY
                        })
            },
            C.provisionVirtualMachine = function() {
                if (f.isAuthorised(g.ACCESS_CONTROL_LIST.CANVAS_PROVISION, !1)) {
                    var e = !1;
                    _.filter(C.nodesForPhysicalView, function(t) {
                            t.status !== g.SOFTWARE_STATUS.NEW && t.status !== g.SOFTWARE_STATUS.REMOVED && t.status !== g.SOFTWARE_STATUS.FAILED_INSTALL && t.status !== g.SOFTWARE_STATUS.FAILED_UNINSTALL && t.status !== g.SOFTWARE_STATUS.INSTALLING && t.status !== g.SOFTWARE_STATUS.UNINSTALLING ? _.filter(t.softwares, function(t) {
                                t.status !== g.SOFTWARE_STATUS.NEW && t.status !== g.SOFTWARE_STATUS.REMOVED && t.status !== g.SOFTWARE_STATUS.FAILED_INSTALL && t.status !== g.SOFTWARE_STATUS.FAILED_UNINSTALL && t.status !== g.SOFTWARE_STATUS.INSTALLING && t.status !== g.SOFTWARE_STATUS.UNINSTALLING && t.status !== g.SOFTWARE_STATUS.REMOVED_FAILED_UNINSTALL || (e = !0)
                            }) : e = !0
                        }),
                        e ? C.installVirtualMachine() : (d.info("No changes to provison!", "Information"),
                            C.installing = !1)
                }
            },
            C.installVirtualMachine = function() {
                i.swal({
                    title: "Apply Changes",
                    text: "Are you sure you want to proceed?",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: !0,
                    closeOnCancel: !0
                }, function(t) {
                    t && (C.isUpdateFetched ? (C.installing = !0,
                        p.setLogClosedByUserFlag(!1),
                        C.updateCanvasForPhysicalView(function(t) {
                            t.error ? (C.installing = !1,
                                d.info("Something went wrong please try later!", "Information")) : (C.installSoftwareAndVm(C.versionNum),
                                e(function() {
                                    C.applyChangesInPhysicalView()
                                }, 500))
                        })) : (d.info("Canvas is updating. Please wait!", "Information"),
                        C.installing = !1))
                })
            },
            C.installSoftwareAndVm = function(e) {
                C.runFailed = !1,
                    c.installSoftwareAndVm(t.canvasCode, e).then(function() {}, function(e) {
                        C.runFailed = !0,
                            e && (C.lastTabName === C.currentTabName && e.data.code === g.ERROR_CODE.CANVAS_OUT_OF_SYNC ? d.error(e.data.message + "<br> Canvas is updating!", "Error") : d.error(e.data.message, "Error"),
                                C.installing = !1)
                    })
            },
            C.deleteAssignedSoftwareNode = function(e) {
                var t = 0;
                if (e) {
                    for (t = 0; t < C.allAssignedSoftwareNode.length; t++)
                        if (C.allAssignedSoftwareNode[t].id === e) {
                            C.allAssignedSoftwareNode.splice(t, 1);
                            break
                        }
                } else if (C.allAssignedSoftwareNode)
                    for (t = 0; t < C.allAssignedSoftwareNode.length; t++)
                        _.filter(C.nodesForPhysicalView, function(e) {
                            return _.some(e.softwares, function(e) {
                                return e.id.toString() === C.allAssignedSoftwareNode[t].id.toString()
                            })
                        }).length && C.allAssignedSoftwareNode.splice(t--, 1)
            },
            y.getDraggedElementData = function(e, t, a) {
                e.preventDefault();
                var n = angular.fromJson(e.dataTransfer.getData("text/plain"));
                a && (C.lastDroppedPhysicalNode = C[a]),
                    t && C[t](n, e),
                    C.safeApply()
            },
            y.allowDrop = function(e) {
                e.preventDefault()
            },
            C.restoreAssignedSoftwareNode = function(e, t) {
                if (e) {
                    var a = _.filter(C.copyOfAllAssignedSoftwareNode, function(a) {
                        if (parseInt(a.id) === parseInt(e) && a.software.hasClients === t)
                            return a.status === g.SOFTWARE_STATUS.DRAFT || (a.status = g.SOFTWARE_STATUS.NEW),
                                a.software.status === g.SOFTWARE_STATUS.DRAFT || (a.software.status = g.SOFTWARE_STATUS.NEW),
                                a
                    });
                    a.length && C.allAssignedSoftwareNode.push(a[0])
                } else
                    C.copyOfAllAssignedSoftwareNode = _.each(C.copyOfAllAssignedSoftwareNode, function(e) {
                        return e.status === g.SOFTWARE_STATUS.DRAFT || (e.status = g.SOFTWARE_STATUS.NEW),
                            e.software.status === g.SOFTWARE_STATUS.DRAFT || (e.software.status = g.SOFTWARE_STATUS.NEW),
                            e
                    }),
                    C.allAssignedSoftwareNode = angular.copy(C.copyOfAllAssignedSoftwareNode)
            },
            C.zoomOnButtonClick = function(e) {
                C.showAllprocessForSelectedVm = !1;
                var t, a, n, o = C.getZoomAttributeWithHeightWidthAndContainer();
                "reset" === e ? (t = {
                            x: -100,
                            y: -100,
                            k: 1
                        },
                        o.width = 2 * (parseInt(C.screenResolution.screenWidth) + 15),
                        o.height = 2 * (parseInt(C.screenResolution.screenHeight) + 15)) : t = s.zoomClick(e, o.zoom, o.width, o.height),
                    s.interpolateZoom(o.container, o.zoom, [t.x, t.y], t.k),
                    "reset" !== e && C.canvasScreen && C.screenResolution ? (a = Math.min(0, Math.max(t.x, C.canvasScreen.clientWidth - 2 * C.screenResolution.screenWidth * t.k)),
                        n = Math.min(0, Math.max(t.y, C.canvasScreen.clientHeight - 2 * C.screenResolution.screenHeight * t.k))) : (a = -100,
                        n = -100),
                    C.containerZoom(o.container, a, n, t.k)
            },
            C.setScreenResolution = function(e, t) {
                (null === C.screenResolution || C.screenResolution.screenWidth < e || C.screenResolution.screenHeight < t) && (C.screenResolution = {},
                    C.screenResolution.screenWidth = e,
                    C.screenResolution.screenHeight = t)
            },
            C.updateVmSoftwares = function(e) {
                var t, a, n, o = e;
                if (o.software)
                    for (t = 0; t <= C.nodesForPhysicalView.length - 1; t++)
                        for (n = C.nodesForPhysicalView[t].softwares,
                            a = 0; a <= n.length - 1; a++)
                            parseInt(n[a].id) === parseInt(o.id) && (n.splice(a, 1),
                                a--)
            },
            C.updateCanvas = function(e, a, n) {
                C.currentTabName = angular.copy(C.lastTabName),
                    C.isUpdateFetched && (p.setCanvasUpdateFlag(!0),
                        C.isUpdateFetched = !1,
                        c.updateCanvasDetails(a, e, t.canvasCode, t.canvasName, t.projectCode, C.recentAction, ++C.versionNum, C.screenResolution, C.canvasDetails).then(function(e) {
                            p.setCanvasData(C.canvasDetails),
                                p.setCanvasStatus(e.data.status),
                                u.setMessage("Canvas up to date"),
                                C.isUpdateFetched = !0,
                                p.setCanvasUpdateFlag(!1),
                                n && n(e)
                        }, function(e) {
                            C.isUpdateFetched = !0,
                                p.setCanvasUpdateFlag(!1),
                                C.lastTabName === C.currentTabName && e && e.data.code && e.data.code === g.ERROR_CODE.CANVAS_OUT_OF_SYNC ? (u.setMessage("Failed to update canvas!"),
                                    d.error(e.data.message, "Error"),
                                    C.cleanCache = !0,
                                    C.retrieveCanvasDetails(null, function(e, t) {
                                        C.updateProvisionViewData(t.nodesForPhysicalView, C.nodesForPhysicalView),
                                            C.updateProvisionViewData(t.pathsForPhysicalView, C.pathsForPhysicalView),
                                            C.restartProvisionView(),
                                            C.compileAllAddedVm()
                                    }, !0)) : e && e.data.message && d.error(e.data.message, "Error"),
                                n && n({
                                    error: !0
                                })
                        })),
                    C.recentAction = null
            },
            C.updateAutoSaveMessage = function(e) {
                u.setMessage(e)
            },
            C.updateCanvasForPhysicalView = function(e) {
                var t = C.concatNodesAndPath();
                C.isBoilerplate || C.updateCanvas(t.allNodes, t.allPaths, e)
            },
            C.concatNodesAndPath = function() {
                var e = [],
                    t = [];
                return e = _.concat(A, C.nodesForPhysicalView),
                    t = _.concat(w, C.pathsForPhysicalView), {
                        allNodes: e,
                        allPaths: t
                    }
            },
            C.componentClicked = function(e, t) {
                C.clickedNodeOffSetX = e.offsetX,
                    C.draggedData = t
            },
            C.getDroppedData = function(e, t) {
                t.stopPropagation(),
                    C.clickedNodeOffSetX !== t.offsetX && (e.x = t.offsetX,
                        e.y = t.offsetY,
                        e.id = ++S,
                        e.type = g.NODE_TYPE.SOFTWARE_NODE,
                        C.selectedSoftware = e,
                        C.configurationForSoftware = !0)
            },
            C.makeConfigurationFormInReadOnlyMode = function(e) {
                var t = angular.fromJson(e);
                return t = r.changeFormSchemaAsReadOnly(t)
            },
            C.reconfigureVirtualMachine = function(e, t) {
                if (e.stopPropagation(),
                    r.isLeftClick(e)) {
                    if (t.status === C.softwareStatus.INSTALLED || C.isBoilerplate) {
                        C.copyOfVirtualMachine = angular.copy(t),
                            C.configurationReadOnly = !0;
                        var a = C.makeConfigurationFormInReadOnlyMode(angular.fromJson(C.copyOfVirtualMachine.software.softwareProperty.form));
                        C.copyOfVirtualMachine.software.softwareProperty.form = angular.toJson(a)
                    }
                    (t.status === C.softwareStatus.INSTALLED || f.isAuthorised(g.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1)) && (C.selectedVirtualMachine = C.copyOfVirtualMachine ? C.copyOfVirtualMachine : t,
                        C.configurationForVirtualMachine = !0,
                        C.virtualMachineOnPremise = !!t.onPremise,
                        C.editConfigurationForSeletedVirtualMachine = !0,
                        C.copyOfVirtualMachine = null)
                }
            },
            C.getSoftware = function(e) {
                var t = !1;
                if ("software" === e.type && C.dragStarted)
                    if (e.supportedPlatforms && (t = C.checkVMSupport(C.lastDroppedPhysicalNode, e.supportedPlatforms)),
                        t) {
                        if (e.softwareProperty && !e.hasClients) {
                            if (!C.lastDroppedPhysicalNode || C.lastDroppedPhysicalNode.status === g.SOFTWARE_STATUS.REMOVED)
                                return void C.blockEvent();
                            C.selectedSoftware = {},
                                C.selectedSoftware = e,
                                C.configurationForSeletedSoftware = !0,
                                C.displayDefaultValueForSoftware = !0,
                                C.configureSoftwareInsideVm = !0,
                                C.safeApply(),
                                C.dragStarted = !1
                        } else if (!e.softwareProperty || e.hasClients) {
                            if (!C.lastDroppedPhysicalNode || C.lastDroppedPhysicalNode.status === g.SOFTWARE_STATUS.REMOVED)
                                return void C.blockEvent();
                            for (var a = [], n = 0; n < C.lastDroppedPhysicalNode.softwares.length; n++)
                                (parseInt(C.lastDroppedPhysicalNode.softwares[n].id) === parseInt(e.id) && C.lastDroppedPhysicalNode.softwares[n].hasClients === e.hasClients || parseInt(C.lastDroppedPhysicalNode.softwares[n].id) !== parseInt(e.id) && C.lastDroppedPhysicalNode.softwares[n].hasClients === e.hasClients && C.lastDroppedPhysicalNode.softwares[n].softwareCode === e.softwareCode) && a.push(e);
                            0 === a.length ? (e.hasClients && C.setAllAssignedClientNodes(e),
                                e.vmId = C.lastDroppedPhysicalNode.vmId,
                                C.lastDroppedPhysicalNode.status !== g.SOFTWARE_STATUS.REMOVED && (C.lastDroppedPhysicalNode.softwares.push(e),
                                    _.includes(C.infraViewArray, e.id) || C.createNewTabForInfraComponent(e)),
                                C.updateComposeViewNode(e, e.vmId),
                                C.deleteAssignedSoftwareNode(e.id),
                                C.virtualMachineAutoScrollDown.scrollDown(),
                                C.updateCanvasForPhysicalView(),
                                C.checkVirtualMachineInsideCanvas(C.nodesForPhysicalView),
                                C.safeApply()) : d.error("This component already exists", "Error")
                        }
                    } else
                        d.error(e.softwareName + " is not supported on " + C.lastDroppedPhysicalNode.software.softwareName, "Error");
                else if ("software" !== e.type) {
                    var o = C.lastDroppedPhysicalNode.x + 50,
                        r = C.lastDroppedPhysicalNode.y + 50;
                    C.lastDroppedPhysicalNodeElementData.x = o,
                        C.lastDroppedPhysicalNodeElementData.y = r,
                        d3.select(C.lastDroppedPhysicalNodeElement).attr("transform", "translate(" + o + "," + r + ")")
                }
            },
            C.checkVMSupport = function(e, t) {
                return !!_.includes(t, e.software.softwareName)
            },
            C.createNewTabForInfraComponent = function(e) {
                e.hasClients && p.getSetViewOptionsCallbackForProvisionTab()(e.id, e.softwareCode),
                    C.infraViewArray.push(e.id),
                    C.safeApply()
            },
            y.setDraggedElementData = function(e, t) {
                e.dataTransfer.setData("text/plain", angular.toJson(C.draggedData)),
                    t && C[t]()
            },
            C.onDragStart = function() {
                C.dragStarted = !0
            },
            C.splicePath = function(e, t) {
                for (var a = 0; a <= e.length - 1; a++)
                    if (e[a].id === t.id) {
                        e.splice(a, 1);
                        break
                    }
            },
            C.blockEvent = function() {
                d.error("Virtual Machine is marked for deletion", "Error")
            },
            C.addSoftwareInsideVm = function(e) {
                var t, a = [];
                _.forIn(e.properties, function(e, t) {
                    -1 != t.indexOf("hostPort") && a.push(e)
                });
                var n = a.join("");
                if (new RegExp("^\\d+$").test(n))
                    if (_.uniq(a).length !== a.length && (t = !0),
                        t || (t = _.find(C.lastDroppedPhysicalNode.softwares, function(t) {
                            return t.properties && _.includes(a, t.properties.hostPort) && t.id !== e.id
                        })),
                        C.lastDroppedPhysicalNode.processes && C.lastDroppedPhysicalNode.processes.length && !t && (t = _.find(C.lastDroppedPhysicalNode.processes, function(e) {
                            return _.includes(a, e.port.trim())
                        })),
                        t || C.lastEditedSoftwareInsideVM || (e.vmId = C.lastDroppedPhysicalNode.vmId,
                            C.lastDroppedPhysicalNode.softwares.push(e),
                            C.updateComposeViewNode(e, e.vmId)),
                        C.dragStarted = !1,
                        t)
                        d.error("This Port is in use. Please change the port number!", "Error"),
                        C.propertiesValidated(!1, !0);
                    else {
                        C.lastEditedSoftwareInsideVM && (angular.equals(C.lastEditedSoftwareInsideVM, e) || C.updateComposeViewNode(e, e.vmId),
                            C.lastEditedSoftwareInsideVM.properties = e.properties,
                            C.lastEditedSoftwareInsideVM.status = e.status);
                        var o = C.lastEditedSoftwareInsideVM ? "edit virtual machine software" : "Provision software",
                            r = C.loggedInUserInfo.username + " " + (C.lastEditedSoftwareInsideVM ? "edited" : "added") + " " + e.softwareName + " to " + C.lastDroppedPhysicalNode.software.properties.componentName + " virtual machine",
                            i = e.iconURL;
                        C.generateLog(o, r, i),
                            C.configurationForSoftware = !1,
                            C.configurationForSeletedSoftware = !1,
                            C.configureSoftwareInsideVm = !1,
                            C.configurationReadOnly = !1,
                            C.displayDefaultValueForSoftware = !1,
                            C.lastEditedSoftwareInsideVM = null,
                            C.deleteAssignedSoftwareNode(e.id),
                            C.virtualMachineAutoScrollDown.scrollDown(),
                            C.updateCanvasForPhysicalView(),
                            C.checkVirtualMachineInsideCanvas(C.nodesForPhysicalView)
                    }
                else
                    d.error("invalid port number!", "Error"),
                    C.propertiesValidated(!1, !0)
            },
            C.updateComposeViewNode = function(e, t) {
                for (var a = 0; a <= A.length - 1; a++)
                    if (A[a].id === parseInt(e.id)) {
                        if (A[a].software.properties)
                            for (var n in e.properties)
                                A[a].software.properties[n] = e.properties[n];
                        else
                            A[a].software.properties = e.properties;
                        A[a].status = e.status,
                            A[a].vmId = t;
                        break
                    }
            },
            C.displayTooltipForPath = function(t, a, n) {
                C.tooltip.transition().duration(200).style("opacity", .9),
                    C.tooltip.style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 38 + "px"),
                    d3.select(".delete-icon-for-path").on("click", function() {
                        if (f.isAuthorised(g.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1)) {
                            C.tooltip.transition().duration(200).style("opacity", 0),
                                C.splicePath(a, t);
                            var e = "Path deleted between " + t.integration.properties.source + " and " + t.integration.properties.destination,
                                o = t.integration.iconURL;
                            C.generateLog("delete integration", e, o),
                                n()
                        }
                    }),
                    d3.select(".edit-icon-for-path").on("click", function() {
                        f.isAuthorised(g.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && (C.tooltip.transition().duration(200).style("opacity", 0),
                            C.pathConfiuration = !0,
                            C.pathData = t,
                            C.safeApply(),
                            C.pathConfigurationError = function() {
                                C.pathConfiuration = !1
                            },
                            C.pathConfigurationSuccess = function(e, t) {
                                e.status = t ? g.SOFTWARE_STATUS.DRAFT : g.SOFTWARE_STATUS.INSTALLED;
                                var n = "Path added between " + e.integration.properties.source + " and " + e.integration.properties.destination,
                                    o = e.integration ? e.integration.iconURL : null;
                                C.generateLog("add integration", n, o),
                                    delete e.source.software,
                                    delete e.target.software,
                                    _.find(a, {
                                        id: e.id
                                    }) || a.push(e),
                                    C.restart(),
                                    C.pathConfiuration = !1,
                                    C.pathData = null
                            }
                        )
                    }),
                    e(function() {
                        C.tooltip.transition().duration(500).style("opacity", 0)
                    }, 3e3)
            },
            C.deleteSoftware = function(e, t, a, n) {
                if (e.stopPropagation(),
                    f.isAuthorised(g.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && r.isLeftClick(e)) {
                    u.setMessage("Canvas up to date");
                    var o = {
                        title: "Delete software",
                        text: "Do you want to remove " + t.softwares[a].softwareName + " from " + n + "?",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No"
                    };
                    t.softwares[a].status === g.SOFTWARE_STATUS.REMOVED && (o = {
                            title: "Undo changes",
                            text: " ",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No"
                        }),
                        t.softwares[a].status === g.SOFTWARE_STATUS.INSTALLED && (o = {
                            title: "Delete Software",
                            text: "Do you want to uninstall " + t.softwares[a].softwareName + " from " + n + "?",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No"
                        }),
                        t.softwares[a].status !== g.SOFTWARE_STATUS.FAILED_UNINSTALL && t.softwares[a].status !== g.SOFTWARE_STATUS.REMOVED_FAILED_UNINSTALL || (o = {
                            title: "Delete Software",
                            text: "Uninstallion failed for " + t.softwares[a].softwareName + " on " + n + ". Manual uninstallation may be required. Do you want to remove it?",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No"
                        }),
                        t.softwares[a].status === g.SOFTWARE_STATUS.FAILED_INSTALL && (o = {
                            title: "Delete Software",
                            text: "Installion failed for " + t.softwares[a].softwareName + " on " + n + ". Check the logs. Do you want to remove?",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No"
                        });
                    var i = {
                        currentVm: t,
                        softwareIndex: a
                    };
                    l.complexView(o, i, function(e) {
                        if (e) {
                            var n = t.softwares[a],
                                o = angular.copy(n),
                                r = "",
                                i = "",
                                s = "";
                            n.status === g.SOFTWARE_STATUS.REMOVED ? (n.status = g.SOFTWARE_STATUS.INSTALLED,
                                    o.status = n.status,
                                    r = "undo Remove virtual machine software",
                                    i = C.loggedInUserInfo.username + " undeleted " + n.softwareName + " software from " + t.software.properties.componentName + " virtual machine",
                                    s = n.iconURL) : n.status === g.SOFTWARE_STATUS.NEW || n.status === g.SOFTWARE_STATUS.DRAFT || n.status === g.SOFTWARE_STATUS.FAILED_INSTALL || n.status === g.SOFTWARE_STATUS.FAILED_UNINSTALL ? (r = "Remove virtual machine software",
                                    i = C.loggedInUserInfo.username + " removed " + n.softwareName + " software from " + t.software.properties.componentName + " virtual machine",
                                    s = n.iconURL,
                                    o.status = g.SOFTWARE_STATUS.NEW,
                                    o.vmId = null,
                                    t.softwares.splice(a, 1),
                                    n.hasClients && C.deleteViewOptions(n),
                                    n.hasClients && (C.deleteAllClientsFromVMs(n.id, !1),
                                        C.restoreAssignedClientsNode(n.id)),
                                    C.restoreAssignedSoftwareNode(n.id, n.hasClients),
                                    C.safeApply()) : (n.status = g.SOFTWARE_STATUS.REMOVED,
                                    n.hasClients && C.deleteAllClientsFromVMs(n.id, !0),
                                    o.status = n.status,
                                    r = "Remove virtual machine software",
                                    i = C.loggedInUserInfo.username + " marked " + n.softwareName + " software for deletion from " + t.software.properties.componentName + " virtual machine",
                                    s = n.iconURL),
                                C.updateComposeViewNode(o, o.vmId),
                                C.generateLog(r, i, s),
                                C.updateCanvasForPhysicalView(),
                                C.checkVirtualMachineInsideCanvas(C.nodesForPhysicalView)
                        }
                    })
                }
            },
            C.deleteViewOptions = function(e) {
                _.pull(C.infraViewArray, e.id),
                    e.hasClients && p.getDeleteViewOptionsCallbackForProvisionTab()({
                        softwareId: e.id,
                        softwareName: e.softwareCode
                    }),
                    C.safeApply()
            },
            C.deleteAllClientsFromVMs = function(e, t) {
                for (var a = 0; a < C.nodesForPhysicalView.length; a++)
                    for (var n = 0; n < C.nodesForPhysicalView[a].softwares.length; n++)
                        parseInt(C.nodesForPhysicalView[a].softwares[n].id) === parseInt(e) && (t ? C.nodesForPhysicalView[a].softwares[n].status = g.SOFTWARE_STATUS.REMOVED : C.nodesForPhysicalView[a].softwares.splice(n, 1))
            },
            C.restoreAssignedClientsNode = function(e) {
                for (var t = 0; t < C.allAssignedClients.length; t++)
                    if (parseInt(C.allAssignedClients[t].id) === parseInt(e)) {
                        C.allAssignedClients.splice(t, 1);
                        break
                    }
            },
            C.getDroppedDataForPhysicalView = function(e, t) {
                C.clickedNodeOffSetX !== t.offsetX && "vm" === e.type && (e.type = g.NODE_TYPE.VM_NODE,
                    e.x = t.offsetX - 100,
                    e.y = t.offsetY - 100,
                    e.onPremise = "OPM" === e.componentCode,
                    e.id = ++S,
                    e.softwares = [],
                    C.selectedVirtualMachine = e,
                    C.configurationForVirtualMachine = !0,
                    C.virtualMachineOnPremise = !!e.onPremise)
            },
            C.spliceLinksForNode = function(e, t) {
                t.filter(function(t) {
                    return t.source.id === e.id || t.target.id === e.id
                }).map(function(e) {
                    t.splice(t.indexOf(e), 1)
                })
            },
            C.spliceNode = function(e, t) {
                for (var a = 0; a <= t.length - 1; a++)
                    if (t[a].id === e.id) {
                        t.splice(a, 1);
                        break
                    }
            },
            C.safeApply = function() {
                var e;
                "$apply" !== (e = y.$root ? y.$root.$$phase : y.$$phase) && "$digest" !== e && y.$apply()
            },
            C.captureNodeCordinate = function(e, t, a, n, o, r, i) {
                d3.event.stopPropagation();
                var s = angular.copy(e);
                s.dx = t,
                    s.dy = a,
                    C.addPath(s, n, o, r, i)
            },
            C.validateIntegrationConfiguration = function(e) {
                return !!e.integration.integrationProperty
            },
            C.addPath = function(e, t, a, n, o) {
                if (C.mousedown_node) {
                    if (C.mouseup_node = e,
                        C.mousedown_node && C.mouseup_node) {
                        if (C.mousedown_node.id === C.mouseup_node.id)
                            return t.classed("hidden", !0),
                                void C.resetMouseVar();
                        var r, i;
                        r = C.mousedown_node,
                            i = C.mouseup_node;
                        var s;
                        if (s = a.filter(function(e) {
                                return e.source.id === r.id && e.target.id === i.id
                            })[0])
                            return;
                        s = {
                            source: r,
                            target: i,
                            left: !1,
                            right: !1,
                            id: ++S
                        };
                        var l = {
                            iconURL: r.iconURL,
                            integrationProperty: {
                                form: JSON.stringify(["source", "destination", "label", {
                                    type: "submit",
                                    style: "btn-info",
                                    title: "Save"
                                }]),
                                schema: JSON.stringify({
                                    type: "object",
                                    properties: {
                                        source: {
                                            title: "Source",
                                            type: "string",
                                            readonly: !0,
                                            default: r.software.properties.componentName
                                        },
                                        destination: {
                                            title: "Destination",
                                            type: "string",
                                            readonly: !0,
                                            default: i.software.properties.componentName
                                        },
                                        label: {
                                            title: "Label",
                                            type: "string",
                                            default: "write the connection name"
                                        }
                                    },
                                    required: ["source", "destination", "label"]
                                })
                            }
                        };
                        s.integration = l,
                            C.pathConfiuration = !0,
                            C.pathData = s,
                            C.safeApply(),
                            C.pathConfigurationError = function() {
                                C.resetMouseVar(),
                                    t.classed("hidden", !0),
                                    C.pathConfiuration = !1,
                                    C.pathConfigurationSuccess = null,
                                    C.pathConfigurationError = null,
                                    C.pathData = null
                            },
                            C.pathConfigurationSuccess = function(n, r) {
                                C.resetMouseVar(),
                                    n.status = r ? g.SOFTWARE_STATUS.DRAFT : g.SOFTWARE_STATUS.INSTALLED,
                                    t.classed("hidden", !0);
                                var i = "Path added between " + n.integration.properties.source + " and " + n.integration.properties.destination,
                                    s = e.software.iconURL;
                                C.generateLog("add integration", i, s),
                                    delete n.source.software,
                                    delete n.target.software,
                                    a.push(n),
                                    o(),
                                    C.pathConfiuration = !1,
                                    C.pathConfigurationSuccess = null,
                                    C.pathConfigurationError = null,
                                    C.pathData = null
                            }
                    } else
                        t.classed("hidden", !0),
                        C.resetMouseVar();
                    n.selectAll(".connection-point ,.self-integration").classed("hidden", !0)
                } else
                    C.mousedown_node = e,
                    C.currentCordinate = {
                        x: e.x + e.dx,
                        y: e.y + e.dy
                    },
                    t.classed("hidden", !1).attr("d", "M" + C.currentCordinate.x + "," + C.currentCordinate.y + "L" + C.currentCordinate.x + "," + C.currentCordinate.y),
                    n.selectAll(".connection-point").classed("hidden", function() {
                        if (C.compose) {
                            var e = d3.select(this.parentElement.parentElement).datum(),
                                t = C.mousedown_node.software.integrations;
                            return !t || !_.filter(t, function(t) {
                                return t.softwareCode === e.software.softwareCode
                            }).length
                        }
                        return !1
                    })
            },
            C.resetMouseVar = function() {
                C.mousedown_node = null,
                    C.mouseup_node = null,
                    C.currentCordinate = null
            },
            C.init(),
            C.editSoftwareConfigurationInsideVm = function(e, t, a) {
                if (e.stopPropagation(),
                    r.isLeftClick(e)) {
                    if (C.lastDroppedPhysicalNode = a,
                        t.status === C.softwareStatus.INSTALLED || C.isBoilerplate) {
                        C.configurationReadOnly = !0;
                        var n = C.makeConfigurationFormInReadOnlyMode(angular.fromJson(t.softwareProperty.form));
                        t.softwareProperty.form = angular.toJson(n)
                    }
                    (t.status === C.softwareStatus.INSTALLED || f.isAuthorised(g.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1)) && (C.lastEditedSoftwareInsideVM = t,
                        C.selectedSoftware = angular.copy(t),
                        C.configurationForSeletedSoftware = !0,
                        C.configureSoftwareInsideVm = !0)
                }
            },
            C.compileElement = function(e, t) {
                o(angular.element(e))(t)
            },
            C.configurationFailedForSoftware = function() {
                C.configurationForSoftware = !1,
                    C.configurationForSeletedSoftware = !1,
                    C.configureSoftwareInsideVm = !1,
                    C.configurationReadOnly = !1,
                    C.displayDefaultValueForSoftware = !1,
                    C.lastEditedSoftwareInsideVM = null
            },
            C.changeSoftwareStatusInsideVm = function(e, t) {
                C.lastDroppedPhysicalNode && (t = C.lastDroppedPhysicalNode.status === g.SOFTWARE_STATUS.DRAFT || t),
                    C.lastDroppedPhysicalNode.status === g.SOFTWARE_STATUS.DRAFT && d.error("Install Virtual machine to apply changes", "Error"),
                    e.status = t ? g.SOFTWARE_STATUS.DRAFT : e.isConnect ? g.SOFTWARE_STATUS.INSTALLED : g.SOFTWARE_STATUS.NEW
            },
            C.configurationSuccessForSoftware = function(e, t) {
                e.status !== g.SOFTWARE_STATUS.INSTALLED && C.changeSoftwareStatusInsideVm(e, t),
                    C.configureSoftwareInsideVm && C.addSoftwareInsideVm(e)
            },
            C.checkDuplicateInstanceName = function(e) {
                return _.find(A, function(t) {
                    if (t.software.id === e.id && t.software.properties && t.software.properties.instanceName && t.software.properties.instanceName === e.properties.instanceName && t.software.id !== C.selectedSoftware.id)
                        return t
                })
            },
            C.generateLog = function(e, t, a) {
                C.recentAction = {
                    name: e,
                    message: t,
                    iconUrl: a
                }
            },
            C.saveSoftwaresInsideVmAsDraft = function(e, t) {
                _.each(C.selectedVirtualMachine.softwares, function(e) {
                    e.status !== g.SOFTWARE_STATUS.DRAFT && (e.status = g.SOFTWARE_STATUS.DRAFT,
                        C.updateComposeViewNode(e, t))
                })
            },
            C.configurationFailedForVm = function() {
                C.configurationForVirtualMachine = !1,
                    C.editConfigurationForSeletedVirtualMachine = !1,
                    C.configurationReadOnly = !1,
                    C.virtualMachineOnPremise = !1
            },
            C.configurationSuccessForVm = function(e, t, a) {
                var n, o, r;
                a && C.saveSoftwaresInsideVmAsDraft(a, C.selectedVirtualMachine.vmId),
                    C.selectedVirtualMachine.software = e,
                    C.editConfigurationForSeletedVirtualMachine ? (t && (C.selectedVirtualMachine.processes = t),
                        n = "update virtual machine",
                        o = C.loggedInUserInfo.username + " updated " + (e.properties ? e.properties.componentName : e.provisionProperties.componentName) + " virtual machine",
                        r = e.iconURL,
                        C.restartProvisionView()) : (C.selectedVirtualMachine.processes = t,
                        C.nodesForPhysicalView.push(C.selectedVirtualMachine),
                        C.compileLastAddedVM(),
                        n = "Provision virtual machine",
                        o = C.loggedInUserInfo.username + " added " + (e.properties ? e.properties.componentName : e.provisionProperties.componentName) + " virtual machine",
                        r = e.iconURL),
                    C.selectedVirtualMachine.onPremise ? C.selectedVirtualMachine.status = a ? g.SOFTWARE_STATUS.DRAFT : g.SOFTWARE_STATUS.INSTALLED : C.selectedVirtualMachine.status = a ? g.SOFTWARE_STATUS.DRAFT : g.SOFTWARE_STATUS.NEW,
                    C.generateLog(n, o, r),
                    C.updateCanvasForPhysicalView(),
                    C.editConfigurationForSeletedVirtualMachine = !1,
                    C.configurationForVirtualMachine = !1,
                    C.virtualMachineOnPremise = !1,
                    C.configurationReadOnly = !1,
                    C.checkVirtualMachineInsideCanvas(C.nodesForPhysicalView)
            },
            C.validateVmName = function(e) {
                var t = !1;
                _.find(C.nodesForPhysicalView, function(a) {
                        a.software.properties && a.software.properties.componentName === e.componentName ? t = !0 : a.software.provisionProperties && a.software.provisionProperties.componentName === e.componentName && (t = !0)
                    }),
                    t ? (C.duplicateVmName(!0, e),
                        d.error("Vm name has been taken", "Error"),
                        t = !1) : C.duplicateVmName(!1, e)
            },
            C.changePathCordinates = function(e, t) {
                angular.forEach(e, function(e) {
                    e.source.id !== t.id && e.target.id !== t.id || (e.source.id === t.id ? (e.source.x = t.x,
                        e.source.y = t.y) : (e.target.x = t.x,
                        e.target.y = t.y))
                })
            },
            C.closeProcessContainer = function() {
                C.showAllprocessForSelectedVm && (C.showAllprocessForSelectedVm = !1,
                    C.safeApply())
            },
            p.setProvisionLogCallback(C.toogleLogForProvisionView)
    }
    e.$inject = ["$timeout", "$stateParams", "$state", "$scope", "$compile", "UtilFactory", "SweetAlert", "zoomFactory", "SweetAlerts", "drawCanvasServices", "mainFactory", "toastr", "drawCanvasCommonFactory", "granularAccessControl", "PAYLOAD_ENUM", "SERVICE_BASE_URL", "userDetails", "cacheFactory"],
        angular.module("cape-webapp").controller("defaultProvisionViewController", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l) {
        return {
            restrict: "A",
            scope: {
                parentController: "="
            },
            link: function(c, u) {
                var d, p, f, g, m, h, v, C, w, S, A, y, D = c.parentController,
                    E = 0,
                    T = [],
                    L = function(e, t, a) {
                        function o(e) {
                            "process-holder" === d3.event.sourceEvent.target.id && D.showAllprocessForSelectedVm ? D.isProcessContainerOpened = !0 : D.isProcessContainerOpened = !1,
                                D.closeProcessContainer(),
                                D.updateAutoSaveMessage("Canvas is updating..."),
                                d3.event.sourceEvent.stopPropagation(),
                                D.lastDraggedPhysicalNode = angular.copy(e),
                                d3.select(this).classed("dragging", !0)
                        }

                        function r(e) {
                            var t = d3.event;
                            t.x < 0 || t.x > w - 140 || t.y < 0 || t.y > S - 225 || (e.x = t.x,
                                e.y = t.y,
                                d3.select(this).attr("transform", "translate(" + t.x + "," + t.y + ")"),
                                D.changePathCordinates(D.pathsForPhysicalView, e),
                                D.restart())
                        }

                        function i(e) {
                            d3.select(this).classed("dragging", !1),
                                D.lastDraggedPhysicalNode.x === e.x && D.lastDraggedPhysicalNode.y === e.y || D.updateCanvasForPhysicalView()
                        }
                        return A = d3.behavior.zoom().scaleExtent([.5, 5]).on("zoom", function() {
                                if (D.closeProcessContainer(),
                                    null !== d3.event.sourceEvent && d3.event.sourceEvent.type) {
                                    var e = d3.event.sourceEvent.type;
                                    if ("wheel" === e || "mousemove" === e) {
                                        var t = d3.event,
                                            a = Math.min(0, Math.max(t.translate[0], p - 2 * D.screenResolution.screenWidth * t.scale)),
                                            n = Math.min(0, Math.max(t.translate[1], f - 2 * D.screenResolution.screenHeight * t.scale));
                                        A.translate([a, n]),
                                            D.containerZoom(d, a, n, t.scale)
                                    }
                                }
                            }),
                            g = d3.behavior.drag().origin(function(e) {
                                return e
                            }).on("dragstart", D.isBoilerplate ? function() {} :
                                function(e) {
                                    d3.event.sourceEvent.stopPropagation(),
                                        l.isAuthorised(n.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && o(e)
                                }
                            ).on("drag", D.isBoilerplate ? function() {} :
                                function(e) {
                                    l.isAuthorised(n.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && r(e)
                                }
                            ).on("dragend", D.isBoilerplate ? function() {} :
                                function(e) {
                                    l.isAuthorised(n.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && i(e)
                                }
                            ),
                            w = 2 * (parseInt(D.screenResolution.screenWidth) + 15),
                            S = 2 * (parseInt(D.screenResolution.screenHeight) + 15),
                            s.createContainer(e, w, S, A)
                    };
                D.restart = function() {
                    (m = m.data(D.pathsForPhysicalView, function(e) {
                        return e.id
                    })).attr("d", D.tick).attr("fill", "none").classed("dashed-line", function(e) {
                            return e.status === n.SOFTWARE_STATUS.DRAFT
                        }),
                        m.enter().append("path").style("marker-end", "url(#end-arrow)").attr("class", "link").attr("d", D.tick).attr("fill", "none").classed("dashed-line", function(e) {
                            return e.status === n.SOFTWARE_STATUS.DRAFT
                        }).on("click", function(e) {
                            D.displayTooltipForPath(e, D.pathsForPhysicalView, b)
                        }).attr("id", function(e) {
                            return e.id
                        }),
                        m.exit().remove(),
                        (C = C.data(D.pathsForPhysicalView, function(e) {
                            return e.id
                        })).selectAll(".path_label").attr("transform", function(e) {
                            return "translate(" + (e.source.x + e.source.dx + (e.target.x + e.target.dx)) / 2 + "," + ((e.source.y + e.source.dy + (e.target.y + e.target.dy)) / 2 - 5) + ")"
                        }).text(function(e) {
                            return e.label ? e.label : "no-configuration"
                        }),
                        C.enter().append("svg:g").append("svg:text").attr("class", "path_label").attr("transform", function(e) {
                            return "translate(" + (e.source.x + e.source.dx + (e.target.x + e.target.dx)) / 2 + "," + ((e.source.y + e.source.dy + (e.target.y + e.target.dy)) / 2 - 5) + ")"
                        }).attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                            return e.label ? e.label : "no-configuration"
                        }).on("click", function(e) {
                            D.displayTooltipForPath(e, D.pathsForPhysicalView, b)
                        }),
                        C.exit().remove(),
                        v = v.data(D.nodesForPhysicalView, function(e) {
                            return e.id
                        }),
                        d3.selectAll(".node").attr("transform", function(e) {
                            return "translate(" + e.x + "," + e.y + ")"
                        }),
                        v.selectAll(".delete-container-icon").attr("xlink:href", function(e) {
                            return e.status === n.SOFTWARE_STATUS.REMOVED ? "assets/images/undo.svg" : "assets/images/cross.svg"
                        });
                    var e = v.enter().append("svg:g");
                    e.attr("class", "node").attr("id", function(e) {
                            return D.lastDroppedPhysicalNodeElement = this,
                                D.lastDroppedPhysicalNodeElementData = e,
                                e.id
                        }).attr("transform", function(e) {
                            return "translate(" + e.x + "," + e.y + ")"
                        }).on("mouseup", function(e) {
                            D.lastDroppedPhysicalNode = e
                        }).on("mouseover", D.isBoilerplate ? function() {} :
                            function() {
                                var e = d3.select(this);
                                e.selectAll(".connection-point").classed("hidden", !1),
                                    e.selectAll(".delete-container").classed("hidden", !1)
                            }
                        ).on("mouseout", function(e) {
                            var t = d3.select(this);
                            t.selectAll(".connection-point").classed("hidden", !0),
                                t.selectAll(".delete-container").classed("hidden", !0)
                        }).on("wheel.zoom", function() {
                            d3.event.stopPropagation()
                        }).call(g),
                        e.append("foreignObject").attr("x", 0).attr("y", 0).attr("width", 165).attr("height", 240).style("position", "absolute").style("z-index", "0").append("xhtml:div").classed("vm", !0).attr("id", function(e, t) {
                            return h = "vm" + ++E,
                                e.vmId = h,
                                D[h] = e,
                                this.innerHTML = '<render-virtual-machine render-virtual-machine-controller = " parentController " last-added-node-id = " parentController.' + h + '"></render-virtual-machine>',
                                T.push(h),
                                h
                        });
                    var a = e.append("svg:g").attr("transform", "translate(150.5,9)").attr("class", "delete-container").classed("hidden", !0);
                    a.append("image").attr("xlink:href", function(e) {
                            return e.status === n.SOFTWARE_STATUS.REMOVED ? "assets/images/undo.svg" : "assets/images/cross.svg"
                        }).attr("height", "15px").attr("width", "15px").attr("class", "delete-container-icon"),
                        a.on("click", function(e) {
                            if (l.isAuthorised(n.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1)) {
                                if (D.updateAutoSaveMessage("Canvas up to date"),
                                    e.status === n.SOFTWARE_STATUS.DRAFT)
                                    D.markVMforRemove = !1;
                                else if (e.softwares.length)
                                    for (var a = 0; a < e.softwares.length; a++) {
                                        if (e.softwares[a].status !== n.SOFTWARE_STATUS.NEW && e.softwares[a].status !== n.SOFTWARE_STATUS.FAILED_INSTALL) {
                                            D.markVMforRemove = !0;
                                            break
                                        }
                                        D.markVMforRemove = !1
                                    }
                                else
                                    e.softwares.length || (D.markVMforRemove = !1);
                                var o = D.markVMforRemove ? "will be marked for deprovision" : " will be removed from canvas";
                                e.status !== n.SOFTWARE_STATUS.REMOVED && e.status !== n.SOFTWARE_STATUS.FAILED_UNINSTALL ? t.swal({
                                    title: "Delete virtual machine",
                                    text: (e.software.properties && e.software.properties.componentName ? e.software.properties.componentName : e.software.provisionProperties.componentName) + o,
                                    type: "warning",
                                    showCancelButton: !0,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Yes",
                                    cancelButtonText: "No",
                                    closeOnConfirm: !0,
                                    closeOnCancel: !0
                                }, function(a) {
                                    if (a) {
                                        var o = "",
                                            r = e.software.iconURL;
                                        if (t.swal("Deleted", (e.software.properties && e.software.properties.componentName ? e.software.properties.componentName : e.software.provisionProperties.componentName) + " has been deleted", "success"),
                                            D.spliceLinksForNode(e, D.pathsForPhysicalView),
                                            e.status !== n.SOFTWARE_STATUS.NEW && e.status !== n.SOFTWARE_STATUS.FAILED_INSTALL && e.status !== n.SOFTWARE_STATUS.DRAFT && D.markVMforRemove) {
                                            o = "User marked " + (e.software.properties.componentName ? e.software.properties.componentName : e.software.provisionProperties.componentName) + " virtual machine for uninstall",
                                                e.status = n.SOFTWARE_STATUS.REMOVED;
                                            for (s = 0; s <= e.softwares.length - 1; s++) {
                                                var i = angular.copy(e.softwares[s]);
                                                e.softwares[s].status === n.SOFTWARE_STATUS.FAILED_INSTALL ? (i.vmId = null,
                                                        e.softwares.splice(s, 1),
                                                        s--) : e.softwares[s].status === n.SOFTWARE_STATUS.NEW ? e.softwares[s].status = n.SOFTWARE_STATUS.REMOVED_NEW : (e.softwares[s].status === n.SOFTWARE_STATUS.FAILED_UNINSTALL || e.softwares[s].status === n.SOFTWARE_STATUS.REMOVED_FAILED_UNINSTALL ? e.softwares[s].status = n.SOFTWARE_STATUS.REMOVED_FAILED_UNINSTALL : e.softwares[s].status = n.SOFTWARE_STATUS.REMOVED,
                                                        e.softwares[s].hasClients && D.deleteAllClientsFromVMs(e.softwares[s].id, !0),
                                                        i.status = e.softwares[s].status),
                                                    D.updateComposeViewNode(i, i.vmId)
                                            }
                                        } else {
                                            o = "User removed " + (e.software.properties && e.software.properties.componentName ? e.software.properties.componentName : e.software.provisionProperties.componentName) + " virtual machine";
                                            for (var s = 0; s <= e.softwares.length - 1; s++)
                                                e.softwares[s].status = n.SOFTWARE_STATUS.NEW,
                                                D.updateComposeViewNode(e.softwares[s], null),
                                                e.softwares[s].hasClients && D.deleteViewOptions(e.softwares[s]);
                                            D.spliceNode(e, D.nodesForPhysicalView)
                                        }
                                        D.markVMforRemove = !0,
                                            D.generateLog("Remove virtual machine", o, r),
                                            D.restoreAssignedSoftwareNode(),
                                            D.deleteAssignedSoftwareNode(),
                                            D.restart(),
                                            D.updateCanvasForPhysicalView(),
                                            D.checkVirtualMachineInsideCanvas(D.nodesForPhysicalView),
                                            D.safeApply()
                                    } else
                                        t.swal("Cancelled", "Deletion of " + e.vmId + " is cancelled", "error")
                                }) : t.swal({
                                    title: "Undo changes",
                                    text: " ",
                                    type: "warning",
                                    showCancelButton: !0,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Yes",
                                    cancelButtonText: "No",
                                    closeOnConfirm: !0,
                                    closeOnCancel: !0
                                }, function(a) {
                                    if (a) {
                                        if (e.status === n.SOFTWARE_STATUS.REMOVED) {
                                            var o = "User undeleted " + (e.software.properties.componentName ? e.software.properties.componentName : e.software.provisionProperties.componentName) + " virtual machine",
                                                r = e.software.iconURL;
                                            D.generateLog("undo Remove virtual machine", o, r),
                                                e.status = n.SOFTWARE_STATUS.INSTALLED;
                                            for (var i = 0; i <= e.softwares.length - 1; i++) {
                                                var s = angular.copy(e.softwares[i]);
                                                e.softwares[i].status === n.SOFTWARE_STATUS.REMOVED ? (e.softwares[i].status = n.SOFTWARE_STATUS.INSTALLED,
                                                    s.status = e.softwares[i].status,
                                                    D.updateComposeViewNode(s, s.vmId)) : e.softwares[i].status === n.SOFTWARE_STATUS.REMOVED_NEW ? (console.log("status", e.softwares[i].status),
                                                    e.softwares[i].status = n.SOFTWARE_STATUS.NEW,
                                                    console.log("after status", e.softwares[i].status),
                                                    s.status = e.softwares[i].status,
                                                    D.updateComposeViewNode(s, s.vmId)) : e.softwares[i].status === n.SOFTWARE_STATUS.REMOVED_FAILED_UNINSTALL && (e.softwares[i].status = n.SOFTWARE_STATUS.FAILED_UNINSTALL,
                                                    s.status = e.softwares[i].status,
                                                    D.updateComposeViewNode(s, s.vmId))
                                            }
                                        }
                                        D.restart(),
                                            D.updateCanvasForPhysicalView(),
                                            D.checkVirtualMachineInsideCanvas(D.nodesForPhysicalView),
                                            D.safeApply()
                                    } else
                                        t.swal("Cancelled", "error")
                                })
                            }
                        }),
                        v.exit().remove()
                };
                var b = function() {
                    D.updateCanvasForPhysicalView(),
                        D.restart()
                };
                D.compileLastAddedVM = function() {
                        D.restart(),
                            D.compileElement("#" + h, c)
                    },
                    D.compileAllAddedVm = function() {
                        D.compileAllVm(T)
                    },
                    D.compileAllVm = function(e) {
                        angular.forEach(e, function(e) {
                                D.compileElement("#" + e, c)
                            }),
                            e.length = 0
                    },
                    D.cancelIntervalCallback = function() {
                        i.destroyInterval(D.intervalPromise)
                    },
                    D.restartProvisionView = function() {
                        D.restart()
                    },
                    D.applyChangesInPhysicalView = function() {
                        s.setCanvasInstallFlag(!0),
                            e(function() {
                                D.isBoilerplate || (D.cleanCache = !0,
                                        D.retrieveCanvasDetails(null, function(e) {
                                            e.status === n.CANVAS_STATUS.INSTALLING && (D.provisionViewLog = !0,
                                                D.provisionViewLogData = {
                                                    requestId: e.requestId,
                                                    url: o + "studio/v1/software/executionLog",
                                                    header: "Virtual Machine - Log"
                                                })
                                        }, !0)),
                                    D.intervalPromise = i.registerInterval(function() {
                                        !D.isBoilerplate && D.getResponseFetched && (D.getResponseFetched = !1,
                                            D.cleanCache = !0,
                                            D.retrieveCanvasDetails(null, N, !0))
                                    }, 4e3)
                            }, 5e3)
                    },
                    D.renderPhysicalView = function() {
                        p = u.prop("clientWidth"),
                            f = u.prop("clientHeight"),
                            D.canvasScreen = {},
                            D.canvasScreen.clientWidth = p,
                            D.canvasScreen.clientHeight = f,
                            0 === p || 0 === f ? e(function() {
                                D.renderPhysicalView()
                            }) : (D.setScreenResolution(p, f),
                                d = L("physicalViewdrawer"),
                                v = d.append("svg:g").selectAll("g"),
                                m = d.append("svg:g").selectAll("path"),
                                C = d.append("svg:g").selectAll("g"),
                                d.on("mousemove", function() {
                                    D.currentCordinate && y.style("marker-end", "url(#end-arrow)").attr("d", "M" + D.currentCordinate.x + "," + D.currentCordinate.y + "L" + d3.mouse(this)[0] + "," + d3.mouse(this)[1])
                                }).on("click", function() {
                                    D.closeProcessContainer(),
                                        y.classed("hidden", !0),
                                        D.currentCordinate = null,
                                        D.mouseup_node = null,
                                        D.mousedown_node = null
                                }),
                                y = d.append("svg:path").attr("class", "link dragline hidden").attr("d", "M0,0L0,0"),
                                D.restart(),
                                D.compileAllVm(T),
                                D.canvasStatus !== n.CANVAS_STATUS.INSTALLING && D.canvasStatus !== n.CANVAS_STATUS.UNINSTALLING || e(function() {
                                    D.applyChangesInPhysicalView()
                                }, 10))
                    },
                    D.getZoomAttributeWithHeightWidthAndContainer = function() {
                        return {
                            width: w,
                            height: S,
                            zoom: A,
                            container: d
                        }
                    };
                var N = function(e, t) {
                        D.updateDots(t.nodesForComposeAndExecuteView),
                            e.status === n.CANVAS_STATUS.INSTALLING ? D.installing = !0 : D.installing = !1,
                            angular.equals(D.nodesForPhysicalView, t.nodesForPhysicalView) || (D.updateProvisionViewData(t.nodesForPhysicalView, D.nodesForPhysicalView),
                                D.restoreAssignedSoftwareNode(),
                                D.deleteAssignedSoftwareNode()),
                            D.checkVirtualMachineInsideCanvas(D.nodesForPhysicalView),
                            I(),
                            D.safeApply(),
                            D.restart(),
                            D.installing || D.isBoilerplate ? (D.installationFlag || (D.installationFlag = !0,
                                    s.setProvisionLogFlag(D.installationFlag)),
                                D.provisionViewLog || s.getLogClosedByUserFlag() || (D.provisionViewLog = !0,
                                    D.provisionViewLogData = {
                                        requestId: e.requestId,
                                        url: o + "studio/v1/software/executionLog",
                                        header: "Virtual Machine - Log"
                                    }),
                                D.safeApply()) : (s.setCanvasInstallFlag(!1),
                                D.cancelIntervalCallback(),
                                D.destroyProvisionViewInterval && D.getProvisionLastLog && (D.destroyProvisionViewInterval(),
                                    D.getProvisionLastLog()),
                                D.runFailed || r.info("Canvas - " + D.canvasName + "<br>Provisioning done. Please see the log for details.", "Information"),
                                D.installationFlag = !1,
                                s.setProvisionLogFlag(D.installationFlag),
                                D.provisionViewLog = !1,
                                D.safeApply())
                    },
                    I = function() {
                        c.$root ? c.$root.$$phase : c.$$phase
                    };
                a.getPalette().then(function(e) {
                        200 === e.status && (D.physicalViewPalleteData = i.buildJsonStructureForComponentPalette(e.data, "Virtual Machines", !0).groupedComponent)
                    }),
                    D.renderPhysicalView(),
                    D.restart()
            }
        }
    }
    e.$inject = ["$timeout", "SweetAlert", "drawCanvasServices", "PAYLOAD_ENUM", "SERVICE_BASE_URL", "toastr", "UtilFactory", "drawCanvasCommonFactory", "granularAccessControl"],
        angular.module("cape-webapp").directive("drawPhysicalView", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").service("defaultExecuteTabService", function() {})
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("DefaultViewController", ["drawCanvasServices", "$stateParams", "SweetAlerts", "$scope", "SERVICE_BASE_URL", "$window", "$state", "toastr", "PAYLOAD_ENUM", "UtilFactory", "zoomFactory", "drawCanvasCommonFactory", "granularAccessControl", "cacheFactory", function(e, t, a, n, o, r, i, s, l, c, u, d, p, f) {
        var g = this;
        g.cleanCache = c.checkCache(n.$resolve.$$state.self.name),
            g.versionNum = d.getCanvasData() ? d.getCanvasData().version : null;
        var m, h, v, C, w, S, A, y, D = n,
            E = [],
            T = [];
        g.drawerId = "excutionViewdrawer",
            g.appURL = o,
            g.canvasCode = t.canvasCode,
            g.projectCode = t.projectCode,
            g.showSubMenuDynamicForm = !1,
            g.showIntegrationLabel = d.getIntegrationLabelFLag(),
            g.callFailureForSubMenu = function() {
                g.showSubMenuDynamicForm = !1,
                    g.hidePopup()
            },
            g.init = function() {
                g.timeStamp = (new Date).getTime(),
                    d.setIntergartionLabelCallback(g.toggleIntergartionLabelStatus),
                    g.retrieveCanvasDetails(g.versionNum, function(e, t) {
                        S = g.createContainer(),
                            A = S.append("svg:g").selectAll("g"),
                            y = S.append("svg:g").selectAll("g"),
                            m = S.append("svg:g").selectAll("g"),
                            S.on("mousemove", function() {
                                g.currentCordinate && h.style("marker-end", "url(#end-arrow)").attr("d", "M" + g.currentCordinate.x + "," + g.currentCordinate.y + "L" + d3.mouse(this)[0] + "," + d3.mouse(this)[1])
                            }).on("click", function() {
                                h.classed("hidden", !0),
                                    m.selectAll(".connection-point").classed("hidden", !0),
                                    g.hidePopup()
                            }),
                            h = S.append("svg:path").attr("class", "link dragline hidden").attr("d", "M0,0L0,0"),
                            g.restart(),
                            t.isSoftwareExecuting && g.checkExecuteViewAction(),
                            g.nodesForPhysicalView = t.nodesForPhysicalView,
                            g.pathsForPhysicalView = t.pathsForPhysicalView
                    })
            },
            g.retrieveCanvasDetails = function(t, a) {
                e.retrieveCanvasDetails(g.projectCode, g.canvasCode, t, g.cleanCache).then(function(e) {
                    e.data ? d.setCanvasData(e.data) : e.data = d.getCanvasData(),
                        f.deleteUriInProgress(e.config.url),
                        g.isResponse = !0,
                        g.errorMessage = "",
                        g.setScreenResolution(e.data),
                        d.setCanvasStatus(e.status),
                        g.versionNum = e.data.version,
                        g.setCanvasDetails(e.data, a)
                }, function(e) {
                    e.data && e.data.message && e.data.message.length ? g.errorMessage = e.data.message : g.errorMessage = "Error occurred while processing request!",
                        g.isResponse = !1
                })
            },
            g.setScreenResolution = function(e) {
                g.canvasScreen = d3.select("#excutionViewdrawer")[0][0],
                    g.canvasScreen && (g.screenResolution = {},
                        g.screenResolution.screenWidth = e.screenResolution && e.screenResolution.screenWidth > g.canvasScreen.clientWidth ? e.screenResolution.screenWidth : g.canvasScreen.clientWidth,
                        g.screenResolution.screenHeight = e.screenResolution && e.screenResolution.screenHeight > g.canvasScreen.clientHeight ? e.screenResolution.screenHeight : g.canvasScreen.clientHeight)
            },
            g.setCanvasDetails = function(e, t) {
                g.canvasInfo = e,
                    T = _.filter(g.canvasInfo.paths, function(e) {
                        if (e.source.type === l.NODE_TYPE.SOFTWARE_NODE && e.target.type === l.NODE_TYPE.SOFTWARE_NODE)
                            return e
                    });
                var a = _.filter(g.canvasInfo.nodes, function(e) {
                    if ("softwareNode" === e.type)
                        return e
                });
                E.length ? g.updateExecuteViewData(a, E) : (E.length = 0,
                    E = a);
                var n = _.find(E, function(e) {
                        return !!e.software.isExecuting
                    }),
                    o = _.filter(e.paths, function(e) {
                        return e.source.type === l.NODE_TYPE.VM_NODE || e.target.type === l.NODE_TYPE.VM_NODE
                    }),
                    r = _.filter(e.nodes, function(e) {
                        return e.type === l.NODE_TYPE.VM_NODE && e.status !== l.SOFTWARE_STATUS.UNINSTALLED
                    });
                t && t(e, {
                    nodesForComposeAndExecuteView: E,
                    pathsForPhysicalView: o,
                    pathsForComposeAndExecuteView: T,
                    nodesForPhysicalView: r,
                    isSoftwareExecuting: n
                })
            },
            g.tick = function(e) {
                var t = e.target.x + e.target.dx,
                    a = e.target.y + e.target.dy,
                    n = e.source.x + e.source.dx,
                    o = e.source.y + e.source.dy;
                return "M" + n + "," + o + "L" + ((t - n) / 2 + n) + "," + ((a - o) / 2 + o) + "L" + t + "," + a
            },
            g.createContainer = function() {
                return v = d3.behavior.zoom().scaleExtent([.5, 5]).on("zoom", function() {
                        if (null !== d3.event.sourceEvent && d3.event.sourceEvent.type) {
                            var e = d3.event;
                            if (g.canvasScreen && g.screenResolution)
                                var t = Math.min(0, Math.max(e.translate[0], g.canvasScreen.clientWidth - 2 * g.screenResolution.screenWidth * e.scale)),
                                    a = Math.min(0, Math.max(e.translate[1], g.canvasScreen.clientHeight - 2 * g.screenResolution.screenHeight * e.scale));
                            v.translate([t, a]),
                                g.containerZoom(S, t, a, e.scale)
                        }
                    }),
                    C = 2 * (parseInt(g.screenResolution.screenWidth) + 15),
                    w = 2 * (parseInt(g.screenResolution.screenHeight) + 15),
                    d.createContainer(g.drawerId, C, w, v)
            },
            g.restart = function() {
                (A = A.data(T, function(e) {
                    return e.id
                })).enter().append("svg:g").append("svg:path").attr("marker-mid", "url(#end-arrow)").attr("class", "link").attr("d", g.tick).attr("fill", "none").attr("id", function(e) {
                        return e.id
                    }).classed("dashed-line", function(e) {
                        return e.status === l.SOFTWARE_STATUS.DRAFT
                    }),
                    A.exit().remove(),
                    y = y.data(T, function(e) {
                        return e.id
                    }),
                    d3.selectAll(".path_label").attr("transform", function(e) {
                        var t = e.source.x + e.source.dx,
                            a = e.target.x + e.target.dx,
                            n = e.source.y + e.source.dy,
                            o = e.target.y + e.target.dy;
                        return e.source.id,
                            e.target.id,
                            "translate(" + (t + a) / 2 + "," + (n + o) / 2 + ")"
                    }),
                    d3.selectAll(".integration_description").classed("hidden", function() {
                        return g.showIntegrationLabel
                    });
                var t = y.enter().append("svg:g").attr("class", "path_label").attr("transform", function(e) {
                    var t = e.source.x + e.source.dx,
                        a = e.target.x + e.target.dx,
                        n = e.source.y + e.source.dy,
                        o = e.target.y + e.target.dy;
                    return e.source.id,
                        e.target.id,
                        "translate(" + (t + a) / 2 + "," + (n + o) / 2 + ")"
                });
                t.append("svg:image").attr({
                        width: 15,
                        height: 15,
                        y: -7.5,
                        x: -7.5,
                        "xlink:href": "assets/images/connector.svg"
                    }).on("click", g.execute || g.isBoilerplate ? function() {} :
                        function(e) {
                            g.displayTooltipForPath(e, T, g.combineAllDataAndUpdateCanvas)
                        }
                    ),
                    t.append("svg:g").append("svg:text").attr("class", "integration_description").attr("transform", function(e) {
                        return "translate(0,-10)"
                    }).attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                        var t = e.label;
                        return t && t.length > 31 && (t = t.substring(0, 30) + "..."),
                            t || "no-configuration"
                    }).classed("hidden", function() {
                        return g.showIntegrationLabel
                    }).append("svg:title").text(function(e) {
                        return e.label ? e.label : "no-configuration"
                    }),
                    y.exit().remove(),
                    (m = m.data(E, function(e) {
                        return e.id
                    })).selectAll(".edit-icon").classed("hidden", function(e) {
                        return !(!e.software.isProvision && e.software.properties || e.status === l.SOFTWARE_STATUS.INSTALLED && !e.software.isConnect && e.software.connectionProperties || e.status === l.SOFTWARE_STATUS.DRAFT && e.software.connectionProperties)
                    }),
                    m.selectAll(".software-icon").append("svg:title").text(function(e) {
                        return e.software.applicationURL ? e.software.applicationURL : e.software.properties && e.software.properties.url ? e.software.properties.url : ""
                    });
                var n = m.enter().append("svg:g");
                n.attr("class", "node").attr("id", function(e) {
                    return g.execute && (g["ex" + e.id] = e),
                        e.id
                }).attr("transform", function(e) {
                    return "translate(" + e.x + "," + e.y + ")"
                });
                var i = n.append("svg:g");
                i.append("rect").attr("x", 0).attr("y", 0).attr("width", 102).attr("height", 102).attr("class", "shadow"),
                    i.append("rect").attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 100).attr("class", "software-node").attr("fill", "white"),
                    n.append("svg:g").attr("transform", "translate(30,25)").append("image").attr("xlink:href", function(e) {
                        return g.appURL + e.software.iconURL + "?" + g.timeStamp
                    }).attr("height", "40px").attr("width", "40px").attr("class", "software-icon").on("click", function(e) {
                        e.software.applicationURL ? r.open(e.software.applicationURL) : e.software.properties && e.software.properties.url ? r.open(e.software.properties.url) : (e.software.connectionProperties || e.software.properties) && s.info(e.software.softwareName + " is not running!", "Information")
                    }).append("svg:title").text(function(e) {
                        return e.software.applicationURL ? e.software.applicationURL : e.software.properties && e.software.properties.url ? e.software.properties.url : ""
                    });
                var c = n.append("svg:g").attr("transform", "translate(0,0)");
                c.append("text").attr("class", "node-name").attr("transform", "translate(50,15)").attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                    var t = e.componentName,
                        a = e.software.properties && e.software.properties.instanceName ? e.software.properties.instanceName : null;
                    return a && (t = a + "-" + t),
                        t.length > 11 && (t = t.substring(0, 10) + "..."),
                        t
                }).append("svg:title").text(function(e) {
                    var t = e.componentName,
                        a = e.software.properties && e.software.properties.instanceName ? e.software.properties.instanceName : null;
                    return a && (t = a + "-" + t),
                        t
                });
                var u = n.append("svg:g").attr("transform", "translate(0,75)");
                u.append("rect").attr("x", 0).attr("y", 0).attr("class", "node-footer").attr("width", 100).attr("height", 25).attr("fill", function(e) {
                        return e.status === l.SOFTWARE_STATUS.DRAFT ? "silver" : "#ffd454"
                    }),
                    u.append("svg:g").append("text").attr("class", "software-name").attr("x", 0).attr("y", 16).attr("transform", "translate(50)").attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                        var t = e.software.softwareName;
                        return t.length > 11 && (t = t.substring(0, 10) + "..."),
                            t
                    }).append("svg:title").text(function(e) {
                        return e.software.softwareName
                    }),
                    u.append("svg:g").attr("transform", "translate(83,6)").append("image").attr("xlink:href", function(e) {
                        if (e.software.hasAction)
                            return e.software.isExecuting ? "assets/images/loading.gif" : "assets/images/action-button.svg"
                    }).attr("height", 12).attr("width", 12).style("opacity", .7).style("cursor", "pointer").attr("class", function(e) {
                        return "hamburger" + e.id
                    }).on("click", function(t) {
                        var n = t.id;
                        if (p.isAuthorised(l.ACCESS_CONTROL_LIST.CANVAS_EXECUTE, !1) && t.software.hasAction)
                            if (g.contextMenuShowing)
                                g.hidePopup();
                            else if (!t.software.isExecuting) {
                            var o = d3.select(d3.event.target);
                            if (o.classed("hamburger" + t.id)) {
                                d3.event.preventDefault(),
                                    d3.event.stopPropagation(),
                                    g.contextMenuShowing = !0;
                                var r = o.datum(),
                                    i = d3.select("#excutionViewdrawer"),
                                    c = d3.mouse(i.node());
                                if (r.status !== l.SOFTWARE_STATUS.INSTALLED)
                                    return void s.info(r.software.softwareName + " not running!", "Information");
                                d3.selectAll(".hamburger" + r.id).attr("xlink:href", function(e) {
                                    return "assets/images/loading.gif"
                                });
                                var u = function(t) {
                                        g.showSubMenuDynamicForm = !1;
                                        var n = {
                                                action: t.action,
                                                swId: r.id,
                                                menu: t.menu,
                                                inputs: angular.toJson(t.inputs),
                                                executeDynamicInputs: JSON.stringify(t.model)
                                            },
                                            o = {
                                                title: "Are you sure you want to proceed?",
                                                text: " ",
                                                confirmButtonText: "Yes",
                                                cancelButtonText: "No"
                                            };
                                        a.complexView(o, n, function(t, a) {
                                            t && (r.software.isExecuting = !0,
                                                d3.selectAll(".hamburger" + r.id).attr("xlink:href", function(e) {
                                                    return "assets/images/loading.gif"
                                                }).attr("height", 12).attr("width", 12),
                                                g.contextMenuShowing && g.hidePopup(),
                                                e.executeSoftwareAction(g.canvasCode, a).then(function(e) {
                                                        g.isExecuteResponseFeteched = !0
                                                    }
                                                    .bind(this),
                                                    function(e) {
                                                        d3.select(".parent-level-menu").attr("disabled", "false"),
                                                            g.isExecuteResponseFeteched = !0,
                                                            s.error(r.software.softwareName + " Execution failed!", "Error")
                                                    }),
                                                g.checkExecuteViewAction())
                                        })
                                    },
                                    d = function(e, t) {
                                        t.formSchema = JSON.parse(t.formSchema),
                                            g.showSubMenuDynamicForm = !0,
                                            g.subMenuActionData = {
                                                id: e,
                                                d: t
                                            },
                                            g.callSuccessForSubMenu = u,
                                            g.safeApply()
                                    };
                                e.getSoftwareActions(g.canvasCode, r.id).then(function(e) {
                                        d3.selectAll(".hamburger" + r.id).attr("xlink:href", function(e) {
                                            return "assets/images/action-button.svg"
                                        });
                                        var t = e.data;
                                        g.popupContainer = i.append("div").attr("class", "popup right").style("left", c[0] + "px").style("top", c[1] - 48 - 12.5 * t.length + "px"),
                                            g.popupContainer.selectAll("div").data(t).enter().append("div").attr("class", "clearfix").append("a").attr("class", function(e) {
                                                return d3.select(this).style("cursor", function(e) {
                                                        return e.disabled ? "not-allowed" : "pointer"
                                                    }).append("span").text(function(e) {
                                                        return e.menu
                                                    }),
                                                    e.subMenu && d3.select(this).style("cursor", function(e) {
                                                        return e.disabled ? "not-allowed" : "default"
                                                    }).append("ul").selectAll(".sub-menu-list").data(e.subMenu).enter().append("li").attr("class", "sub-menu-list").append("a").text(function(e) {
                                                        return e.menu
                                                    }).style("cursor", function(e) {
                                                        return e.disabled ? "not-allowed" : "pointer"
                                                    }).on("click", function(e) {
                                                        e.disabled || (e.formSchema ? d(n, angular.copy(e)) : u(e),
                                                            d3.event.stopPropagation())
                                                    }),
                                                    "btn btn-primary btn-md btn-popup parent-level-menu"
                                            }).on("click", function(e) {
                                                e.disabled || (e.subMenu || e.formSchema ? e.formSchema && d(n, angular.copy(e)) : u(e))
                                            });
                                        var a = [i.node().offsetWidth, i.node().offsetHeight],
                                            o = [g.popupContainer.node().offsetWidth, g.popupContainer.node().offsetHeight];
                                        o[0] + c[0] > a[0] && (g.popupContainer.style("left", "auto"),
                                                g.popupContainer.style("right", 0)),
                                            o[1] + c[1] > a[1] && (g.popupContainer.style("top", "auto"),
                                                g.popupContainer.style("bottom", 0))
                                    }
                                    .bind(this),
                                    function(e) {
                                        d3.selectAll(".hamburger" + r.id).attr("xlink:href", function(e) {
                                                return "assets/images/action-button.svg"
                                            }),
                                            d3.select(".parent-level-menu").attr("disabled", "false"),
                                            g.isExecuteResponseFeteched = !0,
                                            s.error("Unable to connect", "Error")
                                    })
                            }
                        }
                    }),
                    u.append("svg:g").attr("transform", "translate(5,7)").append("image").attr("xlink:href", function(e) {
                        return "assets/images/checked.svg"
                    }).attr("width", "10px").attr("height", "10px").attr("class", "software-status").classed("hidden", function(e) {
                        return e.status !== l.SOFTWARE_STATUS.INSTALLED || !e.software.softwareProperty && !e.software.connectionProperty
                    }),
                    d3.selectAll(".node-info").classed("hidden", function(e) {
                        return e.software.isExecuting || d3.select(".hamburger" + e.id).attr("xlink:href", "assets/images/action-button.svg"), !1 === e.software.isExecuting && (e.software.isExecuting = null,
                            g.updateCanvas(E, T, g.nodesForPhysicalView, g.pathsForPhysicalView),
                            s.info(e.software.softwareName + " execution done. Please see the log for details.", "Information"),
                            g.destroyExecuteViewInterval && g.getExecutionLastLog && (g.destroyExecuteViewInterval(),
                                g.getExecutionLastLog())), !e.software.isExecuting
                    }),
                    c.append("image").attr("class", "node-info").attr("transform", "translate(80,3)").attr("xlink:href", function(e) {
                        return "assets/images/log-file.svg"
                    }).attr("width", "20px").attr("height", "20px").classed("hidden", function(e) {
                        return !e.software.isExecuting
                    }).on("click", function(e) {
                        g.executeViewLog = !0,
                            g.executeViewLogData = {
                                requestId: e.software.requestId,
                                url: o + "studio/v1/software/executionLog",
                                header: e.software.softwareName + " - Build"
                            },
                            g.safeApply()
                    }),
                    m.exit().remove()
            },
            g.displayTooltipForPath = function(e, t, a) {
                g.showPathInfo = !0,
                    g.pathInfoData = {
                        cordinates: {
                            x: d3.event.pageX,
                            y: d3.event.pageY
                        },
                        pathData: e,
                        isEditable: !1,
                        isDeleteable: !1,
                        showPathFlag: g.showPathInfo
                    },
                    c.safeApply(D)
            },
            g.checkExecuteViewAction = function() {
                var e = c.registerInterval(function() {
                    var t = _.find(E, function(e) {
                        return !!e.software.isExecuting
                    });
                    "main.drawCanvas.execute.defaultView" !== i.current.name && c.destroyInterval(e),
                        t || c.destroyInterval(e),
                        A && t && (g.cleanCache = !0,
                            g.retrieveCanvasDetails(null, g.restart))
                }, 5e3);
                g.executeIntervalPromise = angular.copy(e)
            },
            g.containerZoom = function(e, t, a, n) {
                e.attr("transform", ["translate(" + [t, a] + ")", "scale(" + n + ")"].join(" "))
            },
            g.updateCanvas = function(a, n, o, r) {
                var i = _.concat(a, o),
                    c = _.concat(n, r);
                e.updateCanvasDetails(c, i, t.canvasCode, t.canvasName, t.projectCode, null, ++g.versionNum, g.screenResolution, g.canvasInfo).then(function(e) {
                    d.setCanvasData(g.canvasInfo),
                        d.setCanvasStatus(e.status)
                }, function(e) {
                    e.data.code === l.ERROR_CODE.CANVAS_OUT_OF_SYNC && (mainFactory.setMessage("Failed to update canvas!"),
                        s.error(e.data.message + "<br> Canvas is updating!", "Error"),
                        g.cleanCache = !0,
                        g.retrieveCanvasDetails(null, g.restart))
                })
            },
            g.hidePopup = function() {
                d3.event && d3.event.preventDefault(),
                    d3.select(".popup").remove(),
                    g.contextMenuShowing = !1
            },
            g.updateExecuteViewData = function(e, t) {
                for (var a = 0; a <= t.length - 1; a++) {
                    var n = _.find(e, {
                        id: t[a].id
                    });
                    n ? angular.copy(n, t[a]) : e.length !== t.length && (t.splice(a, 1),
                        a--)
                }
            },
            g.displayTooltipForPath = function(e, t, a) {
                g.showPathInfo = !0,
                    g.pathInfoData = {
                        cordinates: {
                            x: d3.event.pageX,
                            y: d3.event.pageY
                        },
                        pathData: e,
                        isEditable: !1,
                        isDeleteable: !1,
                        showPathFlag: g.showPathInfo
                    },
                    c.safeApply(D)
            },
            g.containerZoom = function(e, t, a, n) {
                e.attr("transform", ["translate(" + [t, a] + ")", "scale(" + n + ")"].join(" "))
            },
            g.updateCanvas = function(a, n, o, r) {
                var i = _.concat(a, o),
                    s = _.concat(n, r);
                e.updateCanvasDetails(s, i, t.canvasCode, t.canvasName, t.projectCode, null, ++g.versionNum, g.screenResolution, g.canvasInfo).then(function(e) {
                    d.setCanvasStatus(e.status)
                }, function(e) {})
            },
            g.hidePopup = function() {
                d3.event && d3.event.preventDefault(),
                    d3.select(".popup").remove(),
                    g.contextMenuShowing = !1
            },
            g.updateExecuteViewData = function(e, t) {
                for (var a = 0; a <= t.length - 1; a++) {
                    var n = _.find(e, {
                        id: t[a].id
                    });
                    n && angular.copy(n, t[a])
                }
                if (e.length !== t.length) {
                    var o = _.xorBy(e, t, "id");
                    e.length > t.length ? t.push.apply(t, o) : _.remove(t, function(e) {
                        return !!_.find(o, {
                            id: e.id
                        })
                    })
                }
            },
            g.zoomOnButtonClick = function(e) {
                var t, a;
                if (C = 2 * (parseInt(g.screenResolution.screenWidth) + 15),
                    w = 2 * (parseInt(g.screenResolution.screenHeight) + 15),
                    "reset" === e)
                    var n = {
                        x: -100,
                        y: -100,
                        k: 1
                    };
                else
                    n = u.zoomClick(e, v, C, w);
                u.interpolateZoom(S, v, [n.x, n.y], n.k),
                    "reset" !== e && g.canvasScreen && g.screenResolution ? (t = Math.min(0, Math.max(n.x, g.canvasScreen.clientWidth - 2 * g.screenResolution.screenWidth * n.k)),
                        a = Math.min(0, Math.max(n.y, g.canvasScreen.clientHeight - 2 * g.screenResolution.screenHeight * n.k))) : (t = -100,
                        a = -100),
                    g.containerZoom(S, t, a, n.k)
            },
            g.safeApply = function() {
                var e;
                "$apply" !== (e = D.$root ? D.$root.$$phase : D.$$phase) && "$digest" !== e && D.$apply()
            },
            g.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t, a, n) {
        var o = {};
        return o.getGraphForCanvas = function(n, o, r, i) {
                var s = t + "studio/v1/projects/" + n + "/canvas/" + o + "/analyzeView/" + r;
                return a.registerCallback(s, function() {
                    return a.insertUriInProgress(s, !0),
                        e({
                            method: "GET",
                            url: s,
                            ignoreLoadingBar: !0
                        })
                }, !angular.isDefined(i) || i)
            },
            o.getFilteredResponse = function(a, o, r) {
                var i = t + "studio/v1/filteredMetric",
                    s = n.filteredMetricData(a, o, r);
                return e({
                    method: "POST",
                    url: i,
                    data: s
                })
            },
            o.saveGroup = function(a, n, o, r) {
                return e({
                    method: "PATCH",
                    url: t + "studio/v1/projects/" + o + "/canvas/" + n + "/analyzeView/" + a,
                    data: r
                })
            },
            o
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "cacheFactory", "filteredMetricFactory"],
        angular.module("cape-webapp").service("viewsService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("filteredMetricFactory", function() {
        return {
            filteredMetricData: function(e, t, a) {
                return {
                    canvasCode: t,
                    methodName: a.methodName,
                    filter: e || {},
                    metricCode: a.metricCode
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c) {
        try {
            var u = this;
            u.groupCode = t.params.groupCode,
                u.showAllFilterForSelectedGraph = !1,
                u.defaultView = !0,
                u.customView = !!t.params.customView && t.params.customView,
                u.canvasCode = t.params.canvasCode,
                u.projectCode = t.params.projectCode,
                u.isResponse = !0,
                u.toggleOtions = !1,
                u.cleanCache = r.checkCache(c.$resolve.$$state.self.name);
            var d = 0,
                p = 0;
            u.metrics = [],
                u.setGridsterOption = function() {
                    var e = 0,
                        t = 0,
                        a = 0,
                        n = 0;
                    u.gridsterOpts = {
                        columns: 10,
                        pushing: !0,
                        floating: !0,
                        swapping: !1,
                        width: "auto",
                        colWidth: "auto",
                        rowHeight: "match",
                        margins: [13, 13],
                        outerMargin: !0,
                        sparse: !1,
                        isMobile: !1,
                        mobileBreakPoint: 600,
                        mobileModeEnabled: !0,
                        resizable: {
                            enabled: !1
                        },
                        draggable: {
                            enabled: !(u.defaultView || !i.isAuthorised(s.ACCESS_CONTROL_LIST.ANALYZE_CANVAS, !1)),
                            start: function(a) {
                                e = a.pageX,
                                    t = a.pageY
                            },
                            stop: function(o) {
                                a = o.pageX,
                                    n = o.pageY,
                                    e === a && t === n || u.saveMetricsAfterDrag()
                            }
                        }
                    }
                },
                u.saveMetricsAfterDrag = function() {
                    var e = {
                        groupCode: u.groupCode,
                        groupName: u.groupName,
                        metrics: u.metrics
                    };
                    n.saveGroup(u.groupCode, u.canvasCode, u.projectCode, e).then(function() {}, function(e) {
                        e.data && e.data.message && e.data.message.length ? a.error(e.data.message, "Error") : a.error("Something went wrong", "Error")
                    })
                },
                u.remove = function(e) {
                    var t;
                    if (i.isAuthorised(s.ACCESS_CONTROL_LIST.ANALYZE_CANVAS, !1)) {
                        for (d = 0; d < u.metrics.length; d++)
                            if (u.metrics[d].metricCode === e) {
                                u.metrics.splice(d, 1),
                                    t = {
                                        groupCode: u.groupCode,
                                        groupName: u.groupName,
                                        metrics: u.metrics
                                    };
                                break
                            }
                        n.saveGroup(u.groupCode, u.canvasCode, u.projectCode, t).then(function() {
                            for (d = 0; d < u.metrics.length; d++)
                                if (u.metrics[d].metricCode === e) {
                                    u.metrics.splice(d, 1);
                                    break
                                }
                            a.success("Metric has been removed from your view", "Success")
                        }, function(e) {
                            a.error(e.data.message, "Error")
                        })
                    }
                },
                u.removeExistingMetrics = function() {
                    if (u.defaultViewMetricsCopy = angular.copy(u.defaultViewMetrics),
                        u.metrics && u.metrics.length)
                        for (d = 0; d < u.metrics.length; d++)
                            for (p = 0; p < u.defaultViewMetricsCopy.length; p++)
                                if (u.metrics[d].metricCode === u.defaultViewMetricsCopy[p].metricCode) {
                                    u.defaultViewMetricsCopy.splice(p, 1);
                                    break
                                }
                },
                u.openPopUp = function() {
                    u.getDefaultView(function() {
                        i.isAuthorised(s.ACCESS_CONTROL_LIST.ANALYZE_CANVAS, !1) && (u.removeExistingMetrics(),
                            e.open({
                                templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/views/getMetrics/getMetrics.html",
                                controller: "GetMetricsController",
                                controllerAs: "GetMetricsCtrl",
                                windowClass: "view-modal",
                                resolve: {
                                    metricData: function() {
                                        return {
                                            allMetrics: u.defaultViewMetricsCopy,
                                            existingMetrics: u.metrics,
                                            canvasCode: u.canvasCode,
                                            projectCode: u.projectCode,
                                            groupCode: u.view.groupCode,
                                            groupName: u.view.groupName
                                        }
                                    }
                                }
                            }).result.then(function(e) {
                                e && u.getMetricsData()
                            }, function() {}))
                    })
                },
                u.init = function() {
                    u.getMetricsData()
                },
                u.getDefaultView = function(e) {
                    n.getGraphForCanvas(t.params.projectCode, t.params.canvasCode, "default").then(function(t) {
                        200 === t.status && (u.defaultViewMetrics = t.data.defaultView ? t.data.defaultView.metrics : [],
                            e && e())
                    })
                },
                u.getMetricsData = function() {
                    n.getGraphForCanvas(t.params.projectCode, t.params.canvasCode, t.params.groupCode, u.cleanCache).then(function(e) {
                        u.errorMessage = "",
                            200 === e.status && (o.deleteUriInProgress(e.config.url),
                                u.isResponse = !1,
                                u.defaultView = t.params.groupCode === s.VIEW_TYPE.DEFAULT,
                                u.view = e.data ? e.data.defaultView ? e.data.defaultView : e.data : null,
                                u.groupName = e.data.groupName,
                                u.view && null !== u.view.metrics && (u.metrics = u.view.metrics,
                                    u.setGridsterOption()))
                    }, function(e) {
                        e.data && e.data.message && e.data.message.length ? a.error(e.data.message, "Error") : u.errorMessage = "Error occurred while processing request!"
                    })
                },
                u.init()
        } catch (e) {}
    }
    e.$inject = ["$uibModal", "$state", "toastr", "viewsService", "cacheFactory", "UtilFactory", "granularAccessControl", "PAYLOAD_ENUM", "$log", "$scope"],
        angular.module("cape-webapp").controller("ViewsController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.createGroup = function(a, n, o) {
                return e({
                    method: "POST",
                    url: t + "studio/v1/projects/" + a + "/canvas/" + n + "/analyzeView",
                    data: {
                        groupName: o
                    }
                })
            },
            a.editGroup = function(a, n, o, r) {
                return e({
                    method: "PATCH",
                    url: t + "studio/v1/projects/" + a + "/canvas/" + n + "/analyzeView/" + o + "/rename",
                    data: {
                        groupName: r
                    }
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("createCustomViewService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r = this;
        r.isCreated = !1,
            r.groupName = t.groupName,
            r.isEdit = t.isEdit,
            r.init = function() {
                r.isGroupNameTest = !0,
                    n("customViewName")
            },
            r.isGroupNameValid = !1,
            r.validateGroupName = function() {
                var e = 0;
                if (null !== t.groupNameList && null != r.groupName)
                    for (var a = 0; a < t.groupNameList.length; a++)
                        if (t.groupNameList[a].groupName.toUpperCase() === r.groupName.toUpperCase()) {
                            e++;
                            break
                        }
                e ? (r.isGroupNameTest = !1,
                    r.isGroupNameValid = !1) : (r.isGroupNameTest = !0,
                    r.isGroupNameValid = !0)
            },
            r.validateCreateViewForm = function(e) {
                r.isGroupNameValid && e && r.createGroup()
            },
            r.validateUpdateViewForm = function(e) {
                r.isGroupNameValid && e && r.editGroup()
            },
            r.onCancel = function() {
                e.close(!1)
            },
            r.createGroup = function() {
                r.isCreated = !0,
                    o.createGroup(t.projectCode, t.canvasCode, r.groupName).then(function(t) {
                        if (r.createCustomViewErrorMessage = "",
                            200 !== t.status)
                            return r.isCreated = !1,
                                void(r.createCustomViewErrorMessage = "Something went wrong. Please try again!");
                        a.success("Group Created Successfully.", "Success"),
                            e.close(t.data)
                    }, function(e) {
                        r.isCreated = !1,
                            e.data && e.data.message && e.data.message.length ? a.error(e.data.message, "Error") : r.createCustomViewErrorMessage = "Error occurred while processing request!"
                    })
            },
            r.editGroup = function() {
                r.isCreated = !0,
                    o.editGroup(t.projectCode, t.canvasCode, t.groupCode, r.groupName).then(function(t) {
                        if (r.editCustomViewErrorMessage = "",
                            200 !== t.status)
                            return r.isCreated = !1,
                                void(r.editCustomViewErrorMessage = "Something went wrong. Please try again!");
                        a.success("View name changed.", "Success"),
                            e.close(t.data)
                    }, function(e) {
                        r.isCreated = !1,
                            e.data && e.data.message && e.data.message.length ? a.error(e.data.message, "Error") : r.editCustomViewErrorMessage = "Error occurred while processing request!"
                    })
            }
    }
    e.$inject = ["$uibModalInstance", "modalData", "toastr", "focus", "createCustomViewService"],
        angular.module("cape-webapp").controller("CreateCustomViewController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.createApplication = function(n, o, r, i) {
                var s = a.createApplicationData(n, o, r, i);
                return e({
                    method: "POST",
                    url: t + "studio/v1/app",
                    data: s
                })
            },
            n.updateApplication = function(n, o, r, i, s) {
                var l = a.updateApplicationData(n, o, r, i);
                return e({
                    method: "PATCH",
                    url: t + "studio/v1/app/" + s,
                    data: l
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "updateApplicationFactory"],
        angular.module("cape-webapp").service("updateApplicationService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("updateApplicationFactory", function() {
        return {
            createApplicationData: function(e, t, a, n) {
                return {
                    applicationName: e,
                    validUpto: t,
                    status: a,
                    acls: n
                }
            },
            updateApplicationData: function(e, t, a, n) {
                return {
                    applicationName: e,
                    validUpto: t,
                    status: a,
                    acls: n
                }
            }
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("updateApplicationController", ["$uibModalInstance", "action", "applicationData", "updateApplicationService", "granularAccessControlData", "UtilFactory", "toastr", "$log", function(e, t, a, n, o, r, i, s) {
        var l = this;
        l.action = t,
            l.applicationData = a,
            l.currentStatus = !0,
            l.isUsernameValid = !0,
            l.applicationDate = new Date,
            l.userRoles = o.getAccessList(),
            l.isFormDetailsValid = !1,
            l.selectAllRoles = !1,
            l.isCheckboxSelected = !0,
            l.applicationData.applicationData && (l.isActive = "Active" === l.applicationData.applicationData.status,
                l.currentStatus = angular.copy(l.isActive),
                l.name = l.applicationData.applicationData.applicationName,
                l.applicationDate = l.applicationData.applicationData.validUpto,
                l.applicationDate = new Date(l.applicationDate)),
            null !== r.getFormValidationPattern() ? l.formValidationPattern = r.getFormValidationPattern() : r.callInitFunction().then(function(e) {
                r.setFormValidationPattern(e.data.validationPattern),
                    l.formValidationPattern = r.getFormValidationPattern()
            }, function(e) {}),
            l.popup = {
                opened: !1
            },
            l.dateOptions = {
                minDate: new Date
            },
            l.open = function() {
                l.popup.opened = !0
            },
            l.format = "dd/MM/yyyy",
            l.changeStatus = function() {
                l.isActive !== l.currentStatus ? l.isStatusChanged = !0 : l.isStatusChanged = !1
            },
            l.validateApplicationName = function() {
                var e = 0;
                _.each(l.applicationData.applicationList, function(t) {
                        if (t.applicationName === l.name)
                            return e++, !1
                    }),
                    l.isUsernameValid = !e
            },
            l.init = function() {
                l.isUserNameTest = !0;
                var e, a, n;
                if ("update" == t)
                    for (e = 0; e < l.userRoles.length; e++) {
                        for (n = 0,
                            a = 0; a < l.userRoles[e].actions.length; a++)
                            _.includes(l.applicationData.applicationData.acls, l.userRoles[e].actions[a].code) && n++;
                        n == l.userRoles[e].actions.length ? l.userRoles[e].selected = !0 : l.userRoles[e].selected = !1
                    }
                else
                    for (e = 0; e < l.userRoles.length; e++)
                        l.userRoles[e].selected = !1;
                l.checkIfAllUserRolesAreSelected()
            },
            l.checkIfAllUserRolesAreSelected = function() {
                l.count = 0;
                for (var e = 0; e < l.userRoles.length; e++)
                    !0 === l.userRoles[e].selected && l.count++;
                l.count === l.userRoles.length ? l.selectAllRoles = !0 : l.selectAllRoles = !1
            },
            l.initialUserRoles = angular.copy(l.userRoles),
            l.selectGroup = function(e) {
                l.checkIfAllUserRolesAreSelected()
            },
            l.selectAllUserRoles = function() {
                for (var e = 0; e < l.userRoles.length; e++)
                    l.userRoles[e].selected = l.selectAllRoles
            },
            l.findSelectedRoles = function() {
                l.selectedRoles = [];
                var e, t;
                for (e = 0; e < l.userRoles.length; e++)
                    if (l.userRoles[e].selected)
                        for (t = 0; t < l.userRoles[e].actions.length; t++)
                            l.selectedRoles.push(l.userRoles[e].actions[t].code);
                l.selectedRoles = _.uniq(l.selectedRoles)
            },
            l.validateCreateApplicationForm = function(e, t) {
                0 !== _.filter(l.userRoles, {
                    selected: !0
                }).length ? e && t && l.createApplication() : i.error("Please select some privileges", "Error")
            },
            l.validateUpdateApplicationForm = function(e) {
                0 !== _.filter(l.userRoles, {
                    selected: !0
                }).length ? e || l.isStatusChanged ? l.updateApplication() : i.error("There is nothing to edit") : i.error("Please select some privileges", "Error")
            },
            l.onCancel = function() {
                e.close(!1)
            },
            l.createApplication = function() {
                l.findSelectedRoles(),
                    l.clickedCreateButton = !0,
                    l.status = l.currentStatus ? "Active" : "Inactive",
                    l.applicationDate = new Date(l.applicationDate),
                    n.createApplication(l.name, l.applicationDate, l.status, l.selectedRoles).then(function() {
                        e.close(!0)
                    }, function(e) {
                        e && e.data && e.data.message && e.data.message.length ? l.updateApplicationErrorMessage = e.data.message : l.updateApplicationErrorMessage = "Error occurred while processing request!",
                            l.clickedCreateButton = !1
                    })
            },
            l.updateApplication = function() {
                l.findSelectedRoles(),
                    l.clickedUpdateButton = !0,
                    l.status = l.currentStatus ? "Active" : "Inactive",
                    n.updateApplication(l.name, l.applicationDate, l.status, l.selectedRoles, l.applicationData.applicationData.applicationCode).then(function() {
                        e.close(!0)
                    }, function(e) {
                        e && e.data && e.data.message && e.data.message.length ? l.updateApplicationErrorMessage = e.data.message : l.updateApplicationErrorMessage = "Error occurred while processing request!",
                            l.clickedUpdateButton = !1
                    })
            },
            l.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.createAdmin = function(n, o, r, i, s) {
                var l = a.createAdminData(n, o, r, i, s);
                return e({
                    method: "POST",
                    url: t + "studio/v1/admins",
                    data: l
                })
            },
            n.updateAdmin = function(n, o, r, i, s) {
                var l = a.updateAdminData(n, o, r, i, s);
                return e({
                    method: "PATCH",
                    url: t + "studio/v1/admins/" + o,
                    data: l
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "updateAdminsFactory"],
        angular.module("cape-webapp").service("updateAdminsService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("updateAdminsFactory", function() {
        return {
            createAdminData: function(e, t, a, n, o) {
                return {
                    name: e,
                    username: t,
                    password: a,
                    status: n,
                    email: o
                }
            },
            updateAdminData: function(e, t, a, n, o) {
                return {
                    name: e,
                    username: t,
                    password: a,
                    status: n,
                    email: o
                }
            }
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("updateAdminsController", ["$uibModalInstance", "$base64", "action", "UtilFactory", "adminData", "updateAdminsService", "toastr", "$log", function(e, t, a, n, o, r, i, s) {
        var l = this;
        l.action = a,
            l.adminData = o,
            l.currentStatus = !0,
            l.isAdminNAmeChanged = !1,
            l.isUsernameValid = !0,
            l.isFormDetailsValid = !1,
            null !== n.getFormValidationPattern() ? l.formValidationPattern = n.getFormValidationPattern() : n.callInitFunction().then(function(e) {
                n.setFormValidationPattern(e.data.validationPattern),
                    l.formValidationPattern = n.getFormValidationPattern()
            }, function(e) {}),
            l.adminData.adminData && (l.isActive = "Active" === l.adminData.adminData.status,
                l.currentStatus = angular.copy(l.isActive),
                l.name = l.adminData.adminData.name,
                l.username = l.adminData.adminData.username,
                l.email = l.adminData.adminData.email,
                l.emailBeforeUpdate = angular.copy(l.email)),
            l.init = function() {},
            l.matchPassword = function() {
                angular.equals(l.password, l.confirmPassword) ? l.passwordMisMatch = !1 : l.passwordMisMatch = !0
            },
            l.changeStatus = function() {
                l.isActive !== l.currentStatus ? l.isStatusChanged = !0 : l.isStatusChanged = !1
            },
            l.validateAdminName = function() {
                var e = 0;
                _.each(l.adminData.adminList, function(t) {
                        if (t.username === l.username)
                            return e++, !1
                    }),
                    l.isUsernameValid = !e
            },
            l.changeAdminName = function() {
                l.isAdminNAmeChanged = !0
            },
            l.validatecreateAdminsForm = function(e) {
                l.matchPassword(),
                    e && l.isUsernameValid && !l.passwordMisMatch ? l.createAdmins() : i.error("Password does not match")
            },
            l.validateupdateAdminsForm = function(e) {
                l.matchPassword(),
                    e && l.isUsernameValid && (l.isAdminNAmeChanged || l.isActive !== l.currentStatus || l.password || l.email !== l.emailBeforeUpdate) ? l.passwordMisMatch ? i.error("Password does not match") : l.updateAdmin() : i.error("There is nothing to update")
            },
            l.createAdmins = function() {
                l.clickedCreateButton = !0,
                    l.status = l.currentStatus ? "Active" : "Inactive",
                    r.createAdmin(l.name, l.username, l.password ? t.encode(l.password) : null, l.status, l.email).then(function() {
                        e.close(!0)
                    }, function(e) {
                        e && e.data && e.data.message && e.data.message.length ? l.createAdminsErrorMessage = e.data.message : l.createAdminsErrorMessage = "Error occurred while processing request!",
                            l.clickedCreateButton = !1
                    })
            },
            l.onCancel = function() {
                e.close(!1)
            },
            l.updateAdmin = function() {
                l.clickedUpdateButton = !0,
                    l.status = l.currentStatus ? "Active" : "Inactive",
                    r.updateAdmin(l.name, l.username, l.password ? t.encode(l.password) : null, l.status, l.email).then(function() {
                        e.close(!0)
                    }, function(e) {
                        e && e.data && e.data.message && e.data.message.length ? l.updateAdminsErrorMessage = e.data.message : l.updateAdminsErrorMessage = "Error occurred while processing request!",
                            l.clickedUpdateButton = !1
                    })
            },
            l.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.deleteUser = function(a, n) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/orgs/" + n + "/users/" + a
                })
            },
            a.getAllAUsers = function(a) {
                return e.get(t + "studio/v1/orgs/" + a + "/users")
            },
            a.getUserAccessGroups = function() {
                return e.get(t + "studio/v1/accessGroups")
            },
            a.userSearchFilter = function(a, n) {
                return e.get(t + "studio/v1/orgs/" + a + "/users/" + n + "/searchUser")
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("userListService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("UserListController", ["$stateParams", "$uibModal", "userListService", "toastr", "SweetAlert", "granularAccessControlData", "userDetails", "$log", "SERVICE_BASE_URL", "UtilFactory", "lazyloadingFactory", function(e, t, a, n, o, r, i, s, l, c, u) {
        var d = this;
        d.stateParams = e,
            d.loggedInUserDetails = i.getLoggedInUserDetails(),
            d.userList = [],
            d.loadUsers = function(e, t) {
                d.errorMessage = "",
                    200 === t && (d.responseReceived = !0,
                        e && e.length && (d.userList = _.concat(d.userList, e),
                            a.getUserAccessGroups().then(function(e) {
                                r.setAccessList(e.data)
                            }, function(e) {
                                e && e.data && e.data.message && e.data.message.length ? n.error(e.data.message, "Error") : n.error("Something went wrong", "Error")
                            })))
            },
            d.clearSearch = function() {
                d.userSearch = "",
                    d.init()
            },
            d.init = function() {
                if (d.lazyLoading.resetScrollValue = !0,
                    d.userList = [],
                    d.stateParams.orgId && !d.lazyLoading.fetchingData) {
                    var e = l + "studio/v1/orgs/" + d.stateParams.orgId + "/users";
                    d.lazyLoading.url = e,
                        d.lazyLoading.pageNumber = 0,
                        d.lazyLoading.pageSize = 25,
                        d.lazyLoading.params = {
                            searchKey: d.userSearch
                        },
                        d.lazyLoading.isEmpty = !1,
                        d.lazyLoading.nextPage()
                }
            },
            d.deleteUser = function(e, t) {
                o.swal({
                    title: "Delete User",
                    text: "User " + e + " will be deleted permanently.",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: !1,
                    closeOnCancel: !1
                }, function(r) {
                    r ? (a.deleteUser(e, t).then(function(e) {
                            n.success("User record has been deleted successfully", "Success"),
                                d.init(),
                                d.lazyLoading.resetScrollValue = !0
                        }, function(e) {
                            e.data && n.error(e.data, "Error")
                        }),
                        o.swal("Saved!", "User record has been deleted.", "success")) : o.swal("Cancelled", "User record has not been deleted", "error")
                })
            },
            d.updateUser = function(e, a) {
                r.getAccessList() ? t.open({
                    templateUrl: "app/modules/manage/tenant/userlist/updateUser/updateUser.html",
                    controller: "updateUserController",
                    controllerAs: "updateUserCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        action: function() {
                            return e
                        },
                        userData: function() {
                            return {
                                orgId: d.stateParams.orgId,
                                userData: a,
                                orgName: d.stateParams.orgName,
                                userList: d.userList
                            }
                        }
                    }
                }).result.then(function(e) {
                    e && (d.init(),
                        d.lazyLoading.resetScrollValue = !0)
                }, function() {}) : n.error("Something went wrong", "Error")
            },
            d.failedLoading = function(e) {
                d.errorMessage = "Error occurred while processing request!"
            };
        var p = new u.LazyLoading;
        p.resAttr = "users",
            p.callback = d.loadUsers,
            p.errorCallback = d.failedLoading,
            d.lazyLoading = p,
            d.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.getAllOrgs = function() {
                return e.get(t + "studio/v1/orgs")
            },
            a.deleteOrg = function(a) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/orgs/" + a
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("TenantManagementService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("tenantManagementController", ["userDetails", "$state", "$uibModal", "TenantManagementService", "toastr", "granularAccessControl", "PAYLOAD_ENUM", "SweetAlerts", "SERVICE_BASE_URL", "UtilFactory", "lazyloadingFactory", function(e, t, a, n, o, r, i, s, l, c, u) {
        var d = this;
        d.firstActiveIndex = 0,
            d.allTenantsAreInactive = !1,
            d.userInfo = e.getLoggedInUserDetails(),
            d.orgssInfo = [],
            d.isCreateAuthorised = function() {
                return r.isAuthorised(i.ACCESS_CONTROL_LIST.ADMIN_PLATFORM, !0)
            },
            d.changeActiveClass = function(e) {
                d.lastSelectedTab && (d.lastSelectedTab.active = !1),
                    d.lastSelectedTab = e,
                    e && (e.active = !0)
            },
            d.loadAdminList = function(e) {
                "Active" === e.status && (d.changeActiveClass(e),
                    t.go("main.tenantManager.userList", {
                        orgId: e.orgCode,
                        orgName: e.orgName
                    }))
            },
            d.getFirstActiveTenant = function() {
                var e = 0;
                _.each(d.orgssInfo, function(t, a) {
                        if ("Active" === t.status)
                            return d.firstActiveIndex = a, !1;
                        e++
                    }),
                    e === d.orgssInfo.length && (d.allTenantsAreInactive = !0,
                        d.lastSelectedTab.active = !1)
            },
            d.loadOrgs = function(e, a) {
                if (d.errorMessage = "",
                    200 === a && e && e.length && (d.orgssInfo = _.concat(d.orgssInfo, e), !d.lazyLoading.pageNumber && d.orgssInfo.length)) {
                    d.getFirstActiveTenant();
                    var n = {};
                    n.orgId = t.params.orgId ? t.params.orgId : d.orgssInfo[d.firstActiveIndex].orgCode,
                        n.orgName = t.params.orgName ? t.params.orgName : d.orgssInfo[d.firstActiveIndex].orgName;
                    var o = _.find(d.orgssInfo, {
                        orgCode: n.orgId
                    });
                    d.changeActiveClass(o),
                        t.go("main.tenantManager.userList", n)
                }
            },
            d.init = function() {
                d.orgssInfo = [];
                var e = l + "studio/v1/orgs",
                    t = new u.LazyLoading;
                t.resAttr = "orgs",
                    t.callback = d.loadOrgs,
                    t.errorCallback = d.failedLoading,
                    d.lazyLoading = t,
                    d.lazyLoading.url = e,
                    d.lazyLoading.pageSize = 25,
                    d.lazyLoading.isEmpty = !1,
                    d.lazyLoading.nextPage()
            },
            d.failedLoading = function(e) {
                d.errorMessage = "Error occurred while processing request!"
            },
            d.deleteOrg = function(e, a) {
                e.stopPropagation();
                var r = {
                        title: "Delete tenant: " + a.orgName,
                        text: "Projects and Users in the tenant will be deleted",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No"
                    },
                    i = {
                        orgCode: a.orgCode,
                        orgName: a.orgName
                    };
                s.complexView(r, i, function(e, r) {
                    e && n.deleteOrg(a.orgCode).then(function(e) {
                        if (200 === e.status) {
                            _.remove(d.orgssInfo, a),
                                o.info("Tenant deleted succesfully", "Info"),
                                d.getFirstActiveTenant();
                            var n = {};
                            n.value = d.orgssInfo[d.firstActiveIndex],
                                d.changeActiveClass(n.value),
                                t.go("main.tenantManager.userList", {
                                    orgId: n.value.orgCode,
                                    orgName: n.value.orgName
                                }, {
                                    reload: !0
                                })
                        }
                    }, function(e) {
                        o.error(e.data.message, "Error")
                    })
                })
            },
            d.updateOrg = function(e, n, o, r) {
                e.stopPropagation(),
                    a.open({
                        templateUrl: "app/modules/manage/tenant/tenantManagement/updateOrg/updateOrg.html",
                        controller: "updateOrgController",
                        controllerAs: "updateOrgCtrl",
                        windowClass: "my-modal",
                        backdrop: "static",
                        keyboard: !1,
                        resolve: {
                            action: function() {
                                return n
                            },
                            orgList: function() {
                                return d.orgssInfo
                            },
                            orgData: function() {
                                return o
                            }
                        }
                    }).result.then(function(e) {
                        e.closed && ("create" === n ? (d.changeActiveClass(e.value),
                            e.value.active = !0,
                            d.orgssInfo.push(e.value),
                            t.go("main.tenantManager.userList", {
                                orgId: e.value.orgCode,
                                orgName: e.value.orgName
                            })) : "update" === n && (d.orgssInfo[r] = e.value,
                            "Active" !== e.value.status && (d.getFirstActiveTenant(),
                                e.value = d.orgssInfo[d.firstActiveIndex]),
                            d.changeActiveClass(e.value),
                            t.go("main.tenantManager.userList", {
                                orgId: e.value.orgCode,
                                orgName: e.value.orgName
                            }, {
                                reload: !0
                            })))
                    }, function() {})
            },
            d.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.deleteUser = function(a, n, o) {
                return e.delete(t + "studio/v1/orgs/" + n + "/projects/" + o + "/users/" + a)
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("ProjectUserListService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("projectUserListController", ["userDetails", "$stateParams", "$uibModal", "SweetAlert", "ProjectUserListService", "toastr", "SERVICE_BASE_URL", "UtilFactory", "lazyloadingFactory", function(e, t, a, n, o, r, i, s, l) {
        var c = this;
        c.projectCode = t.projectCode,
            c.loggedInUserDetails = e.getLoggedInUserDetails(),
            c.projectName = t.projectName,
            c.usersInfo = [],
            c.loadProjectUsers = function(e, t) {
                c.errorMessage = "",
                    200 === t && (c.responseReceived = !0,
                        e && e.length && (c.usersInfo = _.concat(c.usersInfo, e)))
            },
            c.init = function() {
                if (c.lazyLoading.resetScrollValue = !0,
                    c.usersInfo = [],
                    c.projectCode && !c.lazyLoading.fetchingData) {
                    var e = i + "studio/v1/orgs/" + c.loggedInUserDetails.orgCode + "/projects/" + c.projectCode + "/users";
                    c.lazyLoading.url = e,
                        c.lazyLoading.params = {
                            searchKey: c.userSearch
                        },
                        c.lazyLoading.pageNumber = 0,
                        c.lazyLoading.pageSize = 18,
                        c.lazyLoading.isEmpty = !1,
                        c.lazyLoading.nextPage()
                }
            },
            c.clearSearch = function() {
                c.userSearch = "",
                    c.init()
            },
            c.deleteUser = function(e) {
                n.swal({
                    title: "Delete user",
                    text: e + " will be removed from the project",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: !1,
                    closeOnCancel: !1
                }, function(t) {
                    t ? (n.swal("Unassigned", e + " has been removed from the project", "success"),
                        o.deleteUser(e, c.loggedInUserDetails.orgCode, c.projectCode).then(function() {
                            c.init(),
                                c.lazyLoading.resetScrollValue = !0
                        }, function(e) {
                            e && e.message && e.message.length ? r.error(e.message, "Error") : r.error("Something went wrong", "Error")
                        })) : n.swal("Cancelled", e + " details are safe", "error")
                })
            },
            c.createUser = function() {
                a.open({
                    templateUrl: "app/modules/manage/project/projectUserList/assignAndEditUser/assignUser.html",
                    controller: "assignUserController",
                    controllerAs: "assignUserCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        orgId: function() {
                            return c.loggedInUserDetails.orgCode
                        },
                        userList: function() {
                            return c.usersInfo
                        },
                        projectCode: function() {
                            return t.projectCode
                        },
                        projectName: function() {
                            return t.projectName
                        }
                    }
                }).result.then(function(e) {
                    e && (c.init(),
                        c.lazyLoading.resetScrollValue = !0)
                }, function() {})
            },
            c.failedLoading = function(e) {
                c.errorMessage = "Error occurred while processing request!"
            };
        var u = new l.LazyLoading;
        u.resAttr = "projectUsers",
            u.callback = c.loadProjectUsers,
            u.errorCallback = c.failedLoading,
            c.lazyLoading = u,
            c.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.getAllProj = function(a) {
                return e.get(t + "studio/v1/orgs/" + a + "/projects")
            },
            a.deleteProject = function(a, n) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/orgs/" + a + "/projects/" + n
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("ProjectManagementService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("projectManagementController", ["userDetails", "$state", "$uibModal", "ProjectManagementService", "toastr", "SweetAlerts", "SERVICE_BASE_URL", "UtilFactory", "lazyloadingFactory", function(e, t, a, n, o, r, i, s, l) {
        var c = this;
        c.firstActiveIndex = 0,
            c.isAllProjectsInactive = !1,
            c.projInfo = [],
            c.loadUserList = function(e) {
                c.lastSelectedTab && (c.lastSelectedTab.active = !1),
                    e.active = !0,
                    c.lastSelectedTab = e,
                    c.navigateToProjectUserList(e.projectCode, e.projectName)
            },
            c.userInfo = e.getLoggedInUserDetails(),
            c.selectFirstActiveProject = function() {
                var e = 0;
                _.each(c.projInfo, function(t, a) {
                        if ("Active" === t.status)
                            return c.firstActiveIndex = a, !1;
                        e++
                    }),
                    c.projInfo.length === e && (c.isAllProjectsInactive = !0,
                        c.projInfo.length && (c.projInfo[c.firstActiveIndex].active = !1,
                            c.lastSelectedTab.active = !1))
            },
            c.loadProjects = function(e, t) {
                c.errorMessage = "",
                    200 === t && e && e.length && (c.firstActiveIndex = 0,
                        c.projInfo = _.concat(c.projInfo, e),
                        c.selectFirstActiveProject(), !c.lazyLoading.pageNumber && c.projInfo.length && (c.projectCode = c.projInfo[c.firstActiveIndex].projectCode,
                            c.activeOrg = _.filter(c.projInfo, function(e) {
                                if (e.projectCode === c.projectCode)
                                    return e
                            }),
                            c.activeOrg[c.firstActiveIndex].active = !0,
                            c.lastSelectedTab = c.activeOrg[c.firstActiveIndex],
                            c.navigateToProjectUserList(c.activeOrg[c.firstActiveIndex].projectCode, c.activeOrg[c.firstActiveIndex].projectName)))
            },
            c.init = function() {
                c.projInfo = [];
                var e = i + "studio/v1/orgs/" + c.userInfo.orgCode + "/projects",
                    t = new l.LazyLoading;
                t.resAttr = "projects",
                    t.callback = c.loadProjects,
                    t.errorCallback = c.failedLoading,
                    c.lazyLoading = t,
                    c.lazyLoading.url = e,
                    c.lazyLoading.pageSize = 25,
                    c.lazyLoading.isEmpty = !1,
                    c.lazyLoading.nextPage()
            },
            c.failedLoading = function(e) {
                c.errorMessage = "Error occurred while processing request!"
            },
            c.navigateToProjectUserList = function(e, a) {
                t.go("main.projectManager.projectUserList", {
                    projectCode: e,
                    projectName: a
                })
            },
            c.deleteProject = function(e, t) {
                e.stopPropagation();
                var a = {
                        title: "Delete project: " + t.projectName,
                        text: "Users in the project will be unassigned",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No"
                    },
                    i = {
                        projectCode: t.projectCode,
                        projectName: t.projectName
                    };
                r.complexView(a, i, function(e, a) {
                    e && n.deleteProject(c.userInfo.orgCode, t.projectCode).then(function(e) {
                        200 === e.status && (_.remove(c.projInfo, t),
                            o.info("Project deleted succesfully", "Info"),
                            c.init(),
                            c.lazyLoading.resetScrollValue = !0)
                    }, function(e) {
                        o.error(e.data.message, "Error")
                    })
                })
            },
            c.createProj = function(e, n, o) {
                e.stopPropagation(),
                    a.open({
                        templateUrl: "app/modules/manage/project/projectManagement/createAndEditProject/createProject.html",
                        controller: "createProjectController",
                        controllerAs: "createProjectCtrl",
                        windowClass: "my-modal",
                        backdrop: "static",
                        keyboard: !1,
                        resolve: {
                            projectList: function() {
                                return c.projInfo
                            },
                            projInfo: function() {
                                return o || null
                            }
                        }
                    }).result.then(function(e) {
                        e && (c.lazyLoading.resetScrollValue = !0,
                            "create" === n && (e.active = !0,
                                c.lastSelectedTab && (c.lastSelectedTab.active = !1),
                                c.projInfo.push(e),
                                o = e),
                            o.projectName = e.projectName,
                            o.status = e.status,
                            o && "Active" !== o.status ? (c.selectFirstActiveProject(),
                                o = c.projInfo[c.firstActiveIndex],
                                c.loadUserList(o),
                                c.isAllProjectsInactive && (o.active = !1)) : t.go("main.projectManager.projectUserList", {
                                projectCode: o.projectCode,
                                projectName: o.projectName
                            }, {
                                reload: !0
                            }))
                    }, function() {})
            },
            c.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.$onInit = function() {
                a.templateData = a.data,
                    e.getDashboardData(a.templateData.url).then(function(e) {
                        a.dashboardData = e.data,
                            a.selectedOption(a.dashboardData.userInfoList.userInformation[0])
                    }, function(e) {})
            },
            a.selectedOption = function(e) {
                a.userData || (a.userData = {}),
                    a.adminData || (a.adminData = {}),
                    a.userData = e.tenantInfo,
                    a.adminData = e.adminInfo,
                    a.adminData.linkText = "Add admin"
            }
    }
    e.$inject = ["DashboardService", "$log"],
        angular.module("cape-webapp").controller("TenantUsersController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("tenantUsersComponent", {
        templateUrl: "app/modules/dashboard/components/tenantUsers/tenantUsers.html",
        bindings: {
            data: "<"
        },
        controller: "TenantUsersController as TenantUsersCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.$onInit = function() {
            a.templateData = a.data,
                e.getDashboardData(a.templateData.url).then(function(e) {
                    a.dashboardData = e.data,
                        a.dashboardData.information.componentName = a.templateData.componentName
                }, function(e) {})
        }
    }
    e.$inject = ["DashboardService", "$log"],
        angular.module("cape-webapp").controller("SummaryController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("summaryComponent", {
        templateUrl: "app/modules/dashboard/components/summary/summary.html",
        bindings: {
            data: "<"
        },
        controller: "SummaryController as SummaryCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("StatsWithLinkController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data
            },
            e.$onChanges = function(t) {
                e.templateData = t.data.currentValue
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("statsWithLinkComponent", {
        templateUrl: "app/modules/dashboard/components/statsWithLink/statsWithLink.html",
        bindings: {
            data: "<"
        },
        controller: "StatsWithLinkController as StatsWithLinkCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("StatsController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data
            },
            e.$onChanges = function(t) {
                t && t.data && (e.templateData = t.data.currentValue)
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("statsComponent", {
        templateUrl: "app/modules/dashboard/components/stats/stats.html",
        bindings: {
            data: "<"
        },
        controller: "StatsController as StatsCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("PerformanceController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data
            },
            e.$onChanges = function(t) {
                e.templateData = t.data.currentValue
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("performanceComponent", {
        templateUrl: "app/modules/dashboard/components/performance/performance.html",
        bindings: {
            data: "<"
        },
        controller: "PerformanceController as PerformanceCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("LabelController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data
            },
            e.$onChanges = function(t) {
                e.templateData = t.data.currentValue
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("labelComponent", {
        templateUrl: "app/modules/dashboard/components/label/label.html",
        bindings: {
            data: "<"
        },
        controller: "LabelController as LabelCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("NotificationController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data
            },
            e.$onChanges = function(t) {
                e.templateData = t.data.currentValue
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("notificationComponent", {
        templateUrl: "app/modules/dashboard/components/notifications/notification.html",
        bindings: {
            data: "<"
        },
        controller: "NotificationController as NotificationCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("InsightsController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data
            },
            e.$onChanges = function(t) {
                e.templateData = t.data.currentValue
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("insightsComponent", {
        templateUrl: "app/modules/dashboard/components/insights/insights.html",
        bindings: {
            data: "<"
        },
        controller: "InsightsController as InsightsCtrl"
    })
}(),
function() {
    "use strict";

    function e(e) {
        var t = this;
        t.$onInit = function() {
                t.templateData = t.data,
                    t.generateGraph()
            },
            t.$onChanges = function(e) {
                t.templateData = e.data.currentValue,
                    t.generateGraph(),
                    t.loadD3Legend()
            },
            t.loadD3Legend = function() {
                t.legendData = [],
                    _.each(t.templateData.columns, function(e) {
                        t.legendData.push(e[0])
                    }),
                    "ERROR_INFORMATION_OF_TYPE_500" === t.templateData.componentName && t.legendData && e(function() {
                        d3.select("#legend-custom-div").insert("div", ".chart").attr("class", "legend").selectAll("div").data(t.legendData).enter().append("div").attr("data-id", function(e) {
                            return e
                        }).html(function(e) {
                            return e
                        }).each(function(e) {
                            d3.select(this).append("span").style("background-color", t.chart.color(e))
                        }).on("mouseover", function(e) {
                            t.chart.focus(e)
                        }).on("mouseout", function(e) {
                            t.chart.revert()
                        }).on("click", function(e) {
                            $(this).toggleClass("c3-legend-item-hidden"),
                                t.chart.toggle(e)
                        })
                    }, 500)
            },
            t.generateGraph = function() {
                "pie" == t.templateData.type ? t.graphData = {
                        bindto: "#" + t.templateData.componentName,
                        legend: {
                            show: "ERROR_INFORMATION_OF_TYPE_500" !== t.templateData.componentName,
                            position: "ERROR_INFORMATION_OF_TYPE_500" === t.templateData.componentName ? "right" : "bottom"
                        },
                        data: {
                            columns: t.templateData.columns,
                            type: t.templateData.type
                        },
                        pie: {
                            label: {
                                format: function(e) {
                                    return e
                                }
                            }
                        }
                    } : t.graphData = {
                        bindto: "#" + t.templateData.componentName,
                        data: {
                            columns: [t.templateData.columns],
                            type: t.templateData.type
                        },
                        zoom: {
                            enabled: !0
                        },
                        axis: {
                            x: {
                                type: "category",
                                categories: t.templateData.categories
                            },
                            y: {
                                label: {
                                    text: t.templateData.yaxis.text,
                                    position: t.templateData.yaxis.position
                                }
                            }
                        }
                    },
                    e(function() {
                        t.chart = c3.generate(t.graphData)
                    })
            }
    }
    e.$inject = ["$timeout"],
        angular.module("cape-webapp").controller("GraphController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("graphComponent", {
        templateUrl: "app/modules/dashboard/components/graph/graph.html",
        bindings: {
            data: "<"
        },
        controller: "GraphController as GraphCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.$onInit = function() {
            a.templateData = a.data,
                e.getDashboardData(a.templateData.url).then(function(e) {
                    a.dashboardData = e.data,
                        a.dashboardData.information.componentName = a.templateData.componentName
                }, function(e) {})
        }
    }
    e.$inject = ["DashboardService", "$log"],
        angular.module("cape-webapp").controller("ErrorController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("errorComponent", {
        templateUrl: "app/modules/dashboard/components/error/error.html",
        bindings: {
            data: "<"
        },
        controller: "ErrorController as ErrorCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("DropdownController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data,
                    e.selectedOption = e.templateData[0]
            },
            e.$onChanges = function(t) {
                e.templateData = t.data.currentValue,
                    e.selectedOption = e.templateData[0]
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("dropdownComponent", {
        templateUrl: "app/modules/dashboard/components/dropdown/dropdown.html",
        bindings: {
            data: "<",
            onOptionChange: "&"
        },
        controller: "DropdownController as DropdownCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.$onInit = function() {
                a.templateData = a.data,
                    e.getDashboardData(a.templateData.url).then(function(e) {
                        a.dashboardData = e.data,
                            a.dashboardData.information.linkText = "Add software",
                            a.softwareCount = a.dashboardData.information.list.length,
                            a.activityData = {},
                            a.activityData.activities = [];
                        for (var t = 0; t < 5; t++)
                            a.activityData.activities[t] = a.dashboardData.information.list[a.softwareCount - t - 1].name
                    }, function(e) {})
            },
            a.selectedOption = function(e) {
                a.activityData || (a.activityData = {}),
                    a.activityData.activities || (a.activityData.activities = []),
                    a.activityData.activities[0].name = e.name
            }
    }
    e.$inject = ["DashboardService", "$log"],
        angular.module("cape-webapp").controller("CapeComponentsController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("capeComponents", {
        templateUrl: "app/modules/dashboard/components/capeComponents/capeComponents.html",
        bindings: {
            data: "<"
        },
        controller: "CapeComponentsController as CapeComponentsCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.$onInit = function() {
                a.templateData = a.data,
                    e.getDashboardData(a.templateData.url).then(function(e) {
                        a.dashboardData = e.data,
                            a.firstDropdown(a.dashboardData.projectList[0]),
                            a.selectedOption(a.dashboardData.projectList[0].canvasList[0])
                    }, function(e) {})
            },
            a.firstDropdown = function(e) {
                a.selectedOptionData || (a.selectedOptionData = {}),
                    a.selectedProject || (a.selectedProject = []),
                    a.selectedOptionData = e,
                    a.selectedProject = e.canvasList,
                    a.selectedOption(e.canvasList[0])
            },
            a.selectedOption = function(e) {
                a.selectedSoftwareNode || (a.selectedSoftwareNode = {}),
                    a.selectedVmNode || (a.selectedVmNode = {}),
                    e && !e.softwareNode ? (a.emptySoftwareCanvas || (a.emptySoftwareCanvas = {}),
                        a.emptySoftwareCanvas.title = "software-node",
                        a.emptySoftwareCanvas.count = 0,
                        a.selectedSoftwareNode = a.emptySoftwareCanvas) : e && e.softwareNode && (a.selectedSoftwareNode = e.softwareNode),
                    e && !e.vmNode ? (a.emptyVmCanvas || (a.emptyVmCanvas = {}),
                        a.emptyVmCanvas.title = "vm-node",
                        a.emptyVmCanvas.count = 0,
                        a.selectedVmNode = a.emptyVmCanvas) : e && e.vmNode && (a.selectedVmNode = e.vmNode)
            }
    }
    e.$inject = ["DashboardService", "$log"],
        angular.module("cape-webapp").controller("CanvasInfoController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("canvasInfoComponent", {
        templateUrl: "app/modules/dashboard/components/canvasInfo/canvasInfo.html",
        bindings: {
            data: "<"
        },
        controller: "CanvasInfoController as CanvasInfoCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("ButtonController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data
            },
            e.$onChanges = function(t) {
                e.templateData = t.data.currentValue
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("buttonComponent", {
        templateUrl: "app/modules/dashboard/components/button/button.html",
        bindings: {
            data: "<"
        },
        controller: "ButtonController as ButtonCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.$onInit = function() {
            a.templateData = a.data,
                e.getDashboardData(a.templateData.url).then(function(e) {
                    a.dashboardData = e.data,
                        a.templateData1 = {},
                        a.templateData2 = {},
                        a.templateData1.title = a.dashboardData.information.columns[0][0],
                        a.templateData1.count = a.dashboardData.information.columns[0][1],
                        a.templateData2.title = a.dashboardData.information.columns[1][0],
                        a.templateData2.count = a.dashboardData.information.columns[1][1]
                }, function(e) {})
        }
    }
    e.$inject = ["DashboardService", "$log"],
        angular.module("cape-webapp").controller("BoilerplateStatsController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("boilerplateStatsComponent", {
        templateUrl: "app/modules/dashboard/components/boilerplateStats/boilerplateStats.html",
        bindings: {
            data: "<"
        },
        controller: "BoilerplateStatsController as BoilerplateStatsCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.$onInit = function() {
            a.templateData = a.data,
                e.getDashboardData(a.templateData.url).then(function(e) {
                    a.dashboardData = e.data,
                        a.activityCount = a.dashboardData.information.list.length,
                        a.activityData = {},
                        a.activityData.activities = [];
                    for (var t = 0; t < 5; t++)
                        a.activityData.activities[t] = a.dashboardData.information.list[a.activityCount - t - 1],
                        a.activityData.activities[t].action.dateTime = new Date(a.activityData.activities[t].dateTime).toLocaleString()
                }, function(e) {})
        }
    }
    e.$inject = ["DashboardService", "$log"],
        angular.module("cape-webapp").controller("ActivityComponentController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("lastFiveActivityComponent", {
        templateUrl: "app/modules/dashboard/components/activityComponent/activityComponent.html",
        bindings: {
            data: "<"
        },
        controller: "ActivityComponentController as ActivityComponentCtrl"
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("ActivityController", function() {
        var e = this;
        e.$onInit = function() {
                e.templateData = e.data
            },
            e.$onChanges = function(t) {
                e.templateData = t.data.currentValue
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").component("activityComponent", {
        templateUrl: "app/modules/dashboard/components/activity/activity.html",
        bindings: {
            data: "<"
        },
        controller: "ActivityController as ActivityCtrl"
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i) {
        var s = this;
        s.cleanCache = r.checkCache(a.$resolve.$$state.self.name),
            s.boilerplateParams = t,
            s.versionNum = o.getCanvasData() ? o.getCanvasData().version : null,
            s.isBoilerplate = "false" === s.boilerplateParams.isCanvas,
            s.isBoilerplate && (s.boilerplateType = t.type),
            s.viewOptions = [{
                active: "main.drawCanvas.provision" === e.current.name || "main.drawCanvas.provision.defaultView" === e.current.name,
                groupName: "Default View",
                state: "main.drawCanvas.provision.defaultView"
            }],
            s.init = function() {
                s.isBoilerplate ? s.retrieveBoilerplateDetails(function() {
                    s.cleanCache = r.checkCache(a.$resolve.$$state.self.name),
                        "main.drawCanvas.provision" === e.current.name && e.go("main.drawCanvas.provision.defaultView")
                }) : s.retrieveCanvasDetails(function() {
                    s.cleanCache = r.checkCache(a.$resolve.$$state.self.name),
                        "main.drawCanvas.provision" === e.current.name && e.go("main.drawCanvas.provision.defaultView")
                })
            },
            s.retrieveBoilerplateDetails = function(e) {
                n.getBoilerplate(s.boilerplateParams.projectCode, s.boilerplateParams.type, s.boilerplateParams.canvasCode, s.cleanCache).then(function(t) {
                    i.upsertCacheData(t.config.url, t),
                        i.deleteUriInProgress(t.config.url),
                        i.callRegisteredCallBackAndRemove(t.config.url),
                        e && e(t.data)
                })
            },
            s.retrieveCanvasDetails = function(e) {
                n.retrieveCanvasDetails(t.projectCode, t.canvasCode, s.versionNum, s.cleanCache).then(function(t) {
                    t.data ? o.setCanvasData(t.data) : t.data = o.getCanvasData(),
                        i.upsertCacheData(t.config.url, t),
                        i.deleteUriInProgress(t.config.url),
                        i.callRegisteredCallBackAndRemove(t.config.url),
                        s.isResponse = !0,
                        s.errorMessage = "",
                        e && e(t.data)
                }, function(e) {
                    s.isResponse = !1,
                        s.errorMessage = "Error occurred while processing request!",
                        e.data && e.data.message && e.data.message.length ? toastr.error(e.data.message, "Error") : toastr.error("Error occurred while processing request!", "Error")
                })
            },
            s.setViewOptions = function(t, n) {
                var o = {
                    active: "main.drawCanvas.provision.infraView" === e.current.name && e.params.id === t,
                    groupName: n + " " + t,
                    stateParams: {
                        id: t,
                        navigatingToChildState: !0
                    },
                    state: "main.drawCanvas.provision.infraView"
                };
                s.viewOptions.push(o),
                    r.safeApply(a)
            },
            s.deleteViewOptions = function(e) {
                var t = {
                    groupName: e.softwareName + " " + e.softwareId
                };
                _.remove(s.viewOptions, function(e) {
                        return e.groupName === t.groupName
                    }),
                    r.safeApply(a)
            },
            s.assignViewOptionOnFirstLoad = function(e) {
                s.viewOptions.length = 1,
                    s.infraComponents = e,
                    _.each(s.infraComponents, function(e) {
                        s.setViewOptions(e.id, e.softwareName)
                    })
            },
            o.setAssignViewOptionOnFirstLoadCallback(s.assignViewOptionOnFirstLoad),
            o.setSetViewOptionsCallbackForProvisionTab(s.setViewOptions),
            o.setDeleteViewOptionsCallbackForProvisionTab(s.deleteViewOptions),
            s.navigateToChildState = function(t, a) {
                e.go(t, a)
            },
            s.init()
    }
    e.$inject = ["$state", "$stateParams", "$scope", "drawCanvasServices", "drawCanvasCommonFactory", "UtilFactory", "cacheFactory"],
        angular.module("cape-webapp").controller("provisionTabController", e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = this;
        t.viewOptions = [{
                active: "main.drawCanvas.execute" === e.current.name || "main.drawCanvas.execute.defaultView" === e.current.name,
                groupName: "Default View",
                state: "main.drawCanvas.execute.defaultView"
            }],
            t.init = function() {
                "main.drawCanvas.execute" === e.current.name && e.go("main.drawCanvas.execute.defaultView")
            },
            t.setViewOptions = function() {
                _.filter(t.infraComponents, function(a) {
                    var n = {
                        active: "main.drawCanvas.execute.infraView" === e.current.name && e.params.id === a.id,
                        groupName: a.softwareName + " " + a.id,
                        stateParams: {
                            id: a.id
                        },
                        state: "main.drawCanvas.execute.infraView"
                    };
                    t.viewOptions.push(n)
                })
            },
            t.navigateToChildState = function(t, a) {
                e.go(t, a)
            },
            t.init()
    }
    e.$inject = ["$state"],
        angular.module("cape-webapp").controller("ExecuteTabController", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u, d, p, f, g, m) {
        d3.selection.prototype.moveToFront = function() {
            return this.each(function() {
                this.parentNode.appendChild(this)
            })
        };
        var h = this;
        h.cleanCache = s.checkCache(a.$resolve.$$state.self.name),
            h.loggedInUserInfo = g.getLoggedInUserDetails();
        var v, C, w, S, A, y, D, E, T = [],
            L = [],
            b = 0;
        h.isGetFetched = !0,
            h.isUpdateFetched = !0,
            h.drawerId = "logicalViewDrawer",
            h.appURL = i,
            h.tabName = r.CANVAS_TAB_NAME.COMPOSE,
            h.nodesForPhysicalView = [],
            h.uninstalledNodeForPhysicalView = [],
            h.pathsForPhysicalView = [],
            h.instanceNameArray = [],
            h.allSoftwareArray = [],
            h.sidePalette = !1,
            h.versionNum = d.getCanvasData() ? d.getCanvasData().version : null,
            h.canvasCode = e.canvasCode,
            h.isBoilerplate = "false" === e.isCanvas,
            h.searchKey = null,
            h.searchKeyCounter = 0;
        var N = a;
        h.oneAtATime = !0,
            h.search = [],
            h.showIntegrationLabel = d.getIntegrationLabelFLag(),
            N.allowDrop = function(e) {
                e.preventDefault()
            },
            h.toggle = function() {
                h.sidePalette = !h.sidePalette
            },
            h.isAuthorizedForDrag = function() {
                return f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1)
            },
            h.searchResultFound = function(e) {
                h.softwareTab[e].isOpen = !0
            },
            h.sidePaletteSearchObject = {
                searchResultFound: h.searchResultFound,
                searchKey: h.searchKey,
                searchKeyCounter: h.searchKeyCounter
            },
            h.filterComponent = function(e) {
                t = [];
                if (!h.search.length)
                    var t = h.allSoftwareArray.filter(function(t) {
                        var a = null;
                        return null !== t && (a = t.match(RegExp(e, "i"))),
                            a
                    });
                var a = p.defer();
                return a.resolve(t),
                    a.promise
            },
            h.addComponent = function(e) {
                h.sidePalette = !1
            },
            h.removeComponent = function(e) {
                N.openSuggestionList()
            },
            N.setDraggedElementData = function(e, t) {
                e.dataTransfer.setData("text/plain", angular.toJson(h.draggedData)),
                    t && h[t]()
            },
            N.getDraggedElementData = function(e, t) {
                e.preventDefault();
                var a = angular.fromJson(e.dataTransfer.getData("text/plain"));
                t && h[t](a, e),
                    s.safeApply(N)
            },
            h.addPath = function(e, t, a, n) {
                if (h.mousedown_node) {
                    if (h.mouseup_node = e,
                        h.mousedown_node && h.mouseup_node) {
                        if (h.mousedown_node.id === h.mouseup_node.id)
                            return void h.hideDragLineAndConnectionPoint();
                        var o, r;
                        o = h.mousedown_node,
                            r = h.mouseup_node;
                        var i;
                        if (i = t.filter(function(e) {
                                return e.source.id === o.id && e.target.id === r.id
                            })[0])
                            return;
                        i = {
                            source: o,
                            target: r,
                            id: ++b
                        };
                        for (var c = h.mousedown_node.software.integrations, u = 0; u <= c.length - 1; u++)
                            if (c[u].softwareCode === h.mouseup_node.software.softwareCode) {
                                i.integration = c[u],
                                    i.integration.id = r.id;
                                break
                            }
                        if (!h.validateIntegrationConfiguration(i))
                            return h.hideDragLineAndConnectionPoint(),
                                void l.error("Path has not been configured for this link!", "Error");
                        h.pathAction = "Added",
                            h.pathConfiuration = !0,
                            h.pathData = i,
                            s.safeApply(N)
                    } else
                        h.hideDragLineAndConnectionPoint();
                    a.style("pointer-events", "auto"),
                        a.selectAll(".node-overlay").attr("display", "none")
                } else
                    h.mousedown_node = e,
                    h.currentCordinate = {
                        x: e.x + e.dx,
                        y: e.y + e.dy
                    },
                    a.style("pointer-events", function(e) {
                        return h.checkIntegrationForSelectedSoftware(h.mousedown_node, e) ? "auto" : "none"
                    }),
                    a.selectAll(".node-overlay").attr("display", function(e) {
                        return e.id === h.mousedown_node.id || !!h.checkIntegrationForSelectedSoftware(h.mousedown_node, e) ? "none" : "block"
                    })
            },
            h.checkIntegrationForSelectedSoftware = function(e, t) {
                var a = !1;
                if (e.id !== t.id) {
                    var n = e.software.integrations;
                    if (n) {
                        var o = _.find(n, {
                                softwareCode: t.software.softwareCode
                            }),
                            r = _.find(L, function(a) {
                                return a.source.id === e.id && a.target.id === t.id
                            });
                        a = !(!o || r)
                    }
                }
                return a
            },
            h.updateComposeViewData = function(e, t) {
                for (var a = 0; a <= t.length - 1; a++) {
                    var n = _.find(e, {
                        id: t[a].id
                    });
                    n ? angular.copy(n, t[a]) : (t.splice(a, 1),
                        a--)
                }
                if (e.length > t.length) {
                    var o = _.differenceBy(e, t, "id");
                    angular.forEach(o, function(e) {
                        t.push(e)
                    })
                }
            },
            h.pathConfigurationError = function() {
                h.hideDragLineAndConnectionPoint(),
                    h.pathConfiuration = !1,
                    h.pathData = null
            },
            h.pathConfigurationSuccess = function(e, t) {
                h.hideDragLineAndConnectionPoint(),
                    e.status = t ? r.SOFTWARE_STATUS.DRAFT : r.SOFTWARE_STATUS.INSTALLED;
                var a = h.pathAction + " Integration",
                    n = "Path " + h.pathAction.toLowerCase() + " between " + e.integration.properties.source + " and " + e.integration.properties.destination,
                    o = e.integration ? e.integration.iconURL : null;
                h.generateLog(a, n, o),
                    delete e.source.software,
                    delete e.target.software,
                    _.find(L, {
                        id: e.id
                    }) || L.push(e),
                    h.restart(),
                    h.showPathInfo = !1,
                    s.safeApply(N),
                    h.pathConfiuration = !1,
                    h.editPathConfigurationFlag = !1,
                    h.pathData = null,
                    h.combineAllDataAndUpdateCanvas()
            },
            h.validateIntegrationConfiguration = function(e) {
                return !!e.integration.integrationProperty
            },
            h.captureNodeCordinate = function(e, t, a, n, o, r) {
                d3.select("svg").style("cursor", "pointer");
                var i = angular.copy(e);
                i.dx = t,
                    i.dy = a,
                    h.addPath(i, n, o, r)
            },
            h.getDroppedData = function(e, t) {
                t.stopPropagation(),
                    h.clickedNodeOffSetX !== t.offsetX && (e.x = t.offsetX,
                        e.y = t.offsetY,
                        e.id = ++b,
                        e.keyToBeSearched = h.search.length && h.search[0].text.split(" << ").length > 2 ? {
                            softwareName: h.search[0].text.split(" << ")[0]
                        } : void 0,
                        e.type = r.NODE_TYPE.SOFTWARE_NODE,
                        h.selectedSoftware = e,
                        h.configurationForSoftware = !0)
            },
            h.configurationSuccessForSoftware = function(e, t) {
                var a, n, o, i = !1;
                e.properties && e.properties.instanceName && !t && ((i = h.checkDuplicateInstanceName(e, h.selectedSoftware)) || h.instanceNameArray.push({
                        instanceName: e.properties.instanceName,
                        softwareCode: e.softwareCode,
                        softwareIdCounter: h.selectedSoftware.id
                    })),
                    t && h.restoreInstanceNameArray(e, h.selectedSoftware),
                    i ? (i = null,
                        l.error("Instance Name has been taken!", "Error"),
                        h.propertiesValidated(!1, !0)) : (h.selectedSoftware.software && !h.copiedNode ? (a = "Update Software",
                            n = h.loggedInUserInfo.username + " updated " + e.softwareName,
                            o = e.iconURL,
                            h.updateVmSoftwares(h.selectedSoftware),
                            h.selectedSoftware.software.softwareName !== e.softwareName && (a = "Update Software",
                                n = h.loggedInUserInfo.username + " chnaged software from " + h.selectedSoftware.software.softwareName + " to " + e.softwareName,
                                o = e.iconURL,
                                h.spliceLinksForNode(h.selectedSoftware, L)),
                            e.properties && e.properties.vmDns && e.properties.hostPort && (e.properties.url = "http://" + e.properties.vmDns + ":" + e.properties.hostPort),
                            e.status = t ? r.SOFTWARE_STATUS.DRAFT : e.isConnect ? r.SOFTWARE_STATUS.INSTALLED : r.SOFTWARE_STATUS.NEW,
                            h.selectedSoftware.software = e,
                            h.selectedSoftware.status = e.status) : (e.properties && e.properties.vmDns && e.properties.hostPort && !e.properties.url && (e.properties.url = "http://" + e.properties.vmDns + ":" + e.properties.hostPort),
                            h.selectedSoftware.software = e,
                            e.status = t ? r.SOFTWARE_STATUS.DRAFT : e.isConnect ? r.SOFTWARE_STATUS.INSTALLED : r.SOFTWARE_STATUS.NEW,
                            h.selectedSoftware.status = e.status,
                            T.push(angular.copy(h.selectedSoftware)),
                            a = "Compose Software",
                            n = h.loggedInUserInfo.username + " added " + e.softwareName + " software",
                            o = e.iconURL),
                        h.generateLog(a, n, o),
                        h.combineAllDataAndUpdateCanvas(),
                        h.configurationForSoftware = !1,
                        h.configurationForSeletedSoftware = !1,
                        h.configureSoftwareInsideVm = !1,
                        h.configurationReadOnly = !1,
                        h.displayDefaultValueForSoftware = !1,
                        h.selectedSoftware = null,
                        h.copiedNode = null,
                        h.restart())
            },
            h.configurationFailedForSoftware = function() {
                h.copiedNode = null,
                    h.selectedSoftware = null,
                    h.configurationForSoftware = !1,
                    h.configurationForSeletedSoftware = !1,
                    h.configurationReadOnly = !1,
                    h.displayDefaultValueForSoftware = !1
            },
            h.checkDuplicateInstanceName = function(e, t) {
                return _.find(h.instanceNameArray, function(a) {
                    if (a.instanceName === e.properties.instanceName && a.softwareCode === e.softwareCode && a.softwareIdCounter !== t.id)
                        return a
                })
            },
            h.generateLog = function(e, t, a) {
                h.recentAction = {
                    name: e,
                    message: t,
                    iconUrl: a
                }
            },
            h.hidePopup = function() {
                d3.event && d3.event.preventDefault(),
                    d3.select(".popup").remove(),
                    h.contextMenuShowing = !1
            },
            h.deletePathCallback = function(e, t) {
                if (f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1)) {
                    h.showPathInfo = !1,
                        h.pathAction = "Deleted",
                        h.splicePath(L, e);
                    var a = e.integration.properties.source,
                        n = e.integration.properties.destination,
                        o = h.pathAction + " Integration",
                        i = "Path " + h.pathAction.toLowerCase() + " between " + a + " and " + n,
                        l = e.integration.iconURL;
                    h.generateLog(o, i, l),
                        t(),
                        h.restart(),
                        s.safeApply(N)
                }
            },
            h.editPathCallback = function(e) {
                f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && (h.pathConfiuration = !0,
                    h.pathAction = "Edited",
                    h.pathData = e,
                    s.safeApply(N))
            },
            h.displayTooltipForPath = function(e, t, a) {
                h.showPathInfo = !0,
                    h.pathInfoData = {
                        cordinates: {
                            x: d3.event.pageX,
                            y: d3.event.pageY
                        },
                        pathData: e,
                        isEditable: !0,
                        isDeleteable: !0,
                        editCallback: h.editPathCallback,
                        deleteCallback: function() {
                            h.deletePathCallback(e, a)
                        },
                        showPathFlag: h.showPathInfo
                    },
                    s.safeApply(N)
            },
            h.tick = function(e) {
                var t = e.target.x + e.target.dx,
                    a = e.target.y + e.target.dy,
                    n = e.source.x + e.source.dx,
                    o = e.source.y + e.source.dy;
                return "M" + n + "," + o + "L" + ((t - n) / 2 + n) + "," + ((a - o) / 2 + o) + "L" + t + "," + a
            },
            h.componentClicked = function(e, t) {
                h.clickedNodeOffSetX = e.offsetX,
                    h.draggedData = t
            },
            h.restart = function() {
                (D = D.data(L, function(e) {
                    return e.id
                })).selectAll(".link").attr("d", h.tick).attr("fill", "none").classed("dashed-line", function(e) {
                        return e.status === r.SOFTWARE_STATUS.DRAFT
                    }).on("click", function(e) {
                        h.displayTooltipForPath(e, L, h.combineAllDataAndUpdateCanvas)
                    }),
                    D.enter().append("svg:g").append("svg:path").attr({
                        fill: "none",
                        stroke: "black",
                        "stroke-width": 1.2,
                        "marker-mid": "url(#end-arrow)",
                        class: "link",
                        d: h.tick,
                        cursor: "default"
                    }).attr("id", function(e) {
                        return e.id
                    }).classed("dashed-line", function(e) {
                        return e.status === r.SOFTWARE_STATUS.DRAFT
                    }).on("click", h.execute || h.isBoilerplate ? function() {} :
                        function(e) {
                            h.displayTooltipForPath(e, L, h.combineAllDataAndUpdateCanvas)
                        }
                    ),
                    D.exit().remove(),
                    E = E.data(L, function(e) {
                        return e.id
                    }),
                    d3.selectAll(".path_label").attr("transform", function(e) {
                        return "translate(" + (e.source.x + e.source.dx + (e.target.x + e.target.dx)) / 2 + "," + (e.source.y + e.source.dy + (e.target.y + e.target.dy)) / 2 + ")"
                    });
                var e = E.enter().append("svg:g").attr("class", "path_label").attr("cursor", "pointer").attr("transform", function(e) {
                    return "translate(" + (e.source.x + e.source.dx + (e.target.x + e.target.dx)) / 2 + "," + (e.source.y + e.source.dy + (e.target.y + e.target.dy)) / 2 + ")"
                });
                e.append("svg:image").attr({
                        width: 15,
                        height: 15,
                        y: -7.5,
                        x: -7.5,
                        "xlink:href": "assets/images/connector.svg"
                    }).on("click", h.execute || h.isBoilerplate ? function() {} :
                        function(e) {
                            h.displayTooltipForPath(e, L, h.combineAllDataAndUpdateCanvas)
                        }
                    ),
                    d3.selectAll(".integration_description").classed("hidden", function() {
                        return h.showIntegrationLabel
                    }).text(function(e) {
                        d3.select(this).select("title").text(e.label ? e.label : "no-configuration");
                        var t = e.label;
                        return t && t.length > 31 && (t = t.substring(0, 30) + "..."),
                            t || "no-configuration"
                    }).append("svg:title").text(function(e) {
                        return e.label ? e.label : "no-configuration"
                    }),
                    e.append("svg:g").append("svg:text").attr("class", "integration_description").attr("transform", function() {
                        return "translate(0,-10)"
                    }).attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                        var t = e.label;
                        return t && t.length > 31 && (t = t.substring(0, 30) + "..."),
                            t || "no-configuration"
                    }).classed("hidden", function() {
                        return h.showIntegrationLabel
                    }).append("svg:title").text(function(e) {
                        return e.label ? e.label : "no-configuration"
                    }),
                    E.exit().remove(),
                    A = A.data(T, function(e) {
                        return e.id
                    }),
                    d3.selectAll(".node").attr("transform", function(e) {
                        var t = d3.select(this);
                        return t.select(".node-footer").attr("fill", function(e) {
                                return e.status === r.SOFTWARE_STATUS.DRAFT ? "silver" : "#ffd454"
                            }),
                            t.select(".software-name").attr("text-anchor", "middle").text(function(e) {
                                var t = e.software.softwareName;
                                return t.length > 11 && (t = t.substring(0, 10) + "..."),
                                    t
                            }),
                            t.select(".edit-icon").attr("display", function(e) {
                                return e.software.isConnect && !e.software.connectionProperty ? "none" : "block"
                            }),
                            t.select(".node-name").text(function(e) {
                                var t = e.componentName,
                                    a = e.software.properties && e.software.properties.instanceName ? e.software.properties.instanceName : null;
                                return a && (t = a + "-" + t),
                                    t.length > 11 && (t = t.substring(0, 10) + "..."),
                                    t
                            }).append("svg:title").text(function(e) {
                                return (e.software.properties && e.software.properties.instanceName ? e.software.properties.instanceName : "") + "-" + e.componentName
                            }),
                            "translate(" + e.x + "," + e.y + ")"
                    });
                var t = A.enter().append("svg:g");
                t.attr("class", "node").attr("id", function(e) {
                    return h["ex" + e.id] = e,
                        e.id
                }).attr("transform", function(e) {
                    return "translate(" + e.x + "," + e.y + ")"
                }).on("mouseup", function(e) {
                    h.mousedown_node && (h.mouseup_selector = document.getElementById(e.id),
                        h.mouseup_node = e)
                }).on("mouseover", function(e) {
                    if (!h.isBoilerplate) {
                        var t = d3.select(this);
                        t.select(".connection-point-container").transition().duration(1).attr({
                                opacity: .9
                            }),
                            t.select(".ladder").transition().duration(300).attr({
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: -10
                            }),
                            t.select(".connection-point-circle").transition().duration(300).attr({
                                cx: 0,
                                cy: -15,
                                fill: h.mousedown_node ? "url(#socket)" : "url(#plug)"
                            }),
                            t.selectAll(".delete-container").attr("display", "block")
                    }
                }).on("mouseout", function(e) {
                    var t = d3.select(this);
                    t.select(".delete-container").attr("display", "none"),
                        h.mousedown_node && h.mousedown_node.id === e.id || (t.select(".ladder").transition().duration(1e3).attr("y2", 0),
                            t.select(".connection-point-circle").transition().duration(1e3).attr("cy", 0),
                            t.select(".connection-point-container").transition().duration(1e3).attr("opacity", 0))
                }).call(h.isBoilerplate ? function() {} :
                    y);
                var a = t.append("svg:g"),
                    n = a.append("svg:g").attr("transform", "translate(-10,-10)").attr("class", "connection-point-container").attr("opacity", 0);
                n.append("svg:rect").attr("width", 120).attr("height", 120).attr("class", "connection-point");
                var i = n.append("svg:g").attr("transform", "translate(60,0)");
                i.append("svg:line").attr({
                    class: "ladder",
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }).style("stroke", "black");
                var u = d3.behavior.drag().origin(function(e) {
                    return e
                }).on("dragstart", function(e) {
                    d3.event.sourceEvent.stopPropagation(),
                        d3.select(this).classed("dragging", !0)
                }).on("drag", function(e) {
                    if (h.currentCordinate) {
                        var t = d3.mouse(this)[0],
                            a = d3.mouse(this)[1] - 10;
                        h.changeConnectorCordinate(h.mousedown_selector, t, a)
                    }
                }).on("dragend", function(e) {
                    d3.event.sourceEvent.stopPropagation(),
                        d3.select(this).classed("dragging", !1),
                        h.mouseup_node && h.captureNodeCordinate(h.mouseup_node, 50, 50, L, A, h.combineAllDataAndUpdateCanvas),
                        h.hideDragLineAndConnectionPoint()
                });
                i.append("svg:circle").attr({
                        cx: 0,
                        cy: 0,
                        r: 10,
                        class: "connection-point-circle"
                    }).on("mousedown", function(e) {
                        f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && (h.captureNodeCordinate(e, 50, 50, L, A, h.combineAllDataAndUpdateCanvas),
                            h.mousedown_selector = document.getElementById(e.id),
                            h.displayDragLine(h.mousedown_selector, {
                                x: 0,
                                y: 0
                            }, 0, 61))
                    }).call(h.isBoilerplate ? function() {} :
                        u),
                    a.append("rect").attr("x", 0).attr("y", 0).attr("width", 102).attr("height", 102).attr("class", "shadow"),
                    a.append("rect").attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 100).attr("class", "software-node").attr("fill", "white"),
                    t.append("svg:g").attr("transform", "translate(30,25)").append("image").attr("xlink:href", function(e) {
                        return h.appURL.substring(0, h.appURL.length - 1) + e.iconURL + "?" + h.timeStamp
                    }).attr("height", "40px").attr("width", "40px").attr("class", "software-icon").on("mouseup", function(e) {
                        if (s.isLeftClick(d3.event) && h.lastDraggedNode.x === e.x && h.lastDraggedNode.y === e.y) {
                            if (h.isBoilerplate)
                                return;
                            if (e.status === r.SOFTWARE_STATUS.INSTALLED && e.software.isProvision)
                                l.info("Software is installed, you cant change it", "Info");
                            else {
                                if (!h.lastDraggedNode || h.lastDraggedNode.x !== e.x || h.lastDraggedNode.y !== e.y)
                                    return;
                                h.selectedSoftware = e,
                                    h.configurationForSoftware = !0,
                                    s.safeApply(N)
                            }
                        }
                    });
                var d = t.append("svg:g").attr("transform", "translate(0,0)");
                d.filter(function(e) {
                        return !(!e.software.isConnect || !e.software.connectionProperty)
                    }).append("image").attr({
                        class: "node-info-copy",
                        transform: "translate(2,5)",
                        width: "15px",
                        height: "15px",
                        "xlink:href": "assets/images/copy-code-icon.svg",
                        cursor: "pointer"
                    }).on("mousedown", function(e) {
                        if (s.isLeftClick(d3.event)) {
                            h.copiedNode = angular.copy(e);
                            var t = {
                                stopPropagation: function() {
                                    d3.event.stopPropagation()
                                }
                            };
                            t.offsetX = e.x + 100,
                                t.offsetY = e.y + 100,
                                h.configurationForSeletedSoftware = !0,
                                h.getDroppedData(h.copiedNode, t),
                                s.safeApply(N)
                        }
                    }),
                    d.append("text").attr("class", "node-name").attr("transform", "translate(50,15)").attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                        var t = e.componentName,
                            a = e.software.properties && e.software.properties.instanceName ? e.software.properties.instanceName : null;
                        return a && (t = a + "-" + t),
                            t.length > 11 && (t = t.substring(0, 10) + "..."),
                            t
                    }).append("svg:title").text(function(e) {
                        var t = e.componentName,
                            a = e.software.properties && e.software.properties.instanceName ? e.software.properties.instanceName : null;
                        return a && (t = a + "-" + t),
                            t
                    });
                var p = t.append("svg:g").attr("transform", "translate(0,75)");
                p.append("rect").attr("x", 0).attr("y", 0).attr("class", "node-footer").attr("width", 100).attr("height", 25).attr("fill", function(e) {
                        return e.status === r.SOFTWARE_STATUS.DRAFT ? "silver" : "#ffd454"
                    }),
                    p.append("svg:g").append("text").attr("class", "software-name").attr("x", 0).attr("y", 16).attr("transform", "translate(50)").attr("fill", "black").attr("font-size", 10).attr("text-anchor", "middle").text(function(e) {
                        var t = e.software.softwareName;
                        return t.length > 11 && (t = t.substring(0, 10) + "..."),
                            t
                    }).append("svg:title").text(function(e) {
                        return e.software.softwareName
                    }),
                    p.append("svg:g").attr("transform", "translate(84,6)").append("image").attr("xlink:href", function(e) {
                        return e.status === r.SOFTWARE_STATUS.INSTALLED && !e.software.isConnect && e.software.connectionProperties ? "assets/images/info.svg" : "assets/images/edit.svg"
                    }).attr("width", function(e) {
                        return e.status === r.SOFTWARE_STATUS.INSTALLED && !e.software.isConnect && e.software.connectionProperties ? "15px" : "12px"
                    }).attr("height", function(e) {
                        return e.status === r.SOFTWARE_STATUS.INSTALLED && !e.software.isConnect && e.software.connectionProperties ? "15px" : "12px"
                    }).attr("class", "edit-icon").on("mousedown", function(e) {
                        if (d3.event.stopImmediatePropagation(),
                            s.isLeftClick(d3.event))
                            if (h.isBoilerplate) {
                                if (h.isBoilerplate || h.lastDraggedNode.x === e.x && h.lastDraggedNode.y === e.y) {
                                    if (h.copyOfSelectedSoftware = angular.copy(e),
                                        h.copyOfSelectedSoftware.software.softwareProperty) {
                                        var t = h.makeConfigurationFormInReadOnlyMode(angular.fromJson(h.copyOfSelectedSoftware.software.softwareProperty.form));
                                        h.copyOfSelectedSoftware.software.softwareProperty.form = angular.toJson(t)
                                    }
                                    if (h.copyOfSelectedSoftware.software.connectionProperty) {
                                        var a = h.makeConfigurationFormInReadOnlyMode(angular.fromJson(h.copyOfSelectedSoftware.software.connectionProperty.form));
                                        h.copyOfSelectedSoftware.software.connectionProperty.form = angular.toJson(a)
                                    }
                                    h.selectedSoftware = h.copyOfSelectedSoftware,
                                        h.configurationForSeletedSoftware = !0,
                                        h.configurationForSoftware = !0,
                                        h.configurationReadOnly = !0,
                                        s.safeApply(N)
                                }
                            } else if (f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1)) {
                            var n = e.status === r.SOFTWARE_STATUS.INSTALLED;
                            if (h.copyOfSelectedSoftware = e,
                                n && e.software.isProvision) {
                                var o = h.makeConfigurationFormInReadOnlyMode(angular.fromJson(h.copyOfSelectedSoftware.software.connectionProperty.form));
                                h.copyOfSelectedSoftware.software.connectionProperty.form = angular.toJson(o),
                                    h.copyOfSelectedSoftware.software.properties = e.software.connectionProperties
                            }
                            h.selectedSoftware = h.copyOfSelectedSoftware,
                                h.configurationForSeletedSoftware = !0,
                                h.configurationForSoftware = !0,
                                h.configurationReadOnly = !!e.software.isProvision && n,
                                s.safeApply(N)
                        }
                    }).attr("display", function(e) {
                        return e.software.isConnect && !e.software.connectionProperty ? "none" : "block"
                    });
                var g = t.append("svg:g").attr("transform", "translate(92.5,-7.5)").attr("class", "delete-container").attr("display", "none");
                g.append("image").attr("xlink:href", "assets/images/cross.svg").attr("height", "15px").attr("width", "15px").attr("class", "delete-container-icon"),
                    g.on("mouseup", function(e) {
                        h.lastDraggedNode.x === e.x && h.lastDraggedNode.y === e.y && s.isLeftClick(d3.event) && f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && (o.setMessage("Canvas up to date"),
                            c.swal({
                                title: "Delete component",
                                text: e.componentName + " will be deleted",
                                type: "warning",
                                showCancelButton: !0,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes",
                                cancelButtonText: "No",
                                closeOnConfirm: !0,
                                closeOnCancel: !0
                            }, function(t) {
                                if (t) {
                                    var a = h.loggedInUserInfo.username + " removed " + e.software.softwareName + " software",
                                        n = e.software.iconURL;
                                    e.status === r.SOFTWARE_STATUS.NEW || e.status === r.SOFTWARE_STATUS.DRAFT || e.software.isConnect && !0 !== e.software.isExecuting ? (a = h.loggedInUserInfo.username + " removed " + e.software.softwareName + " software",
                                            e.software.properties && e.software.properties.instanceName && h.restoreInstanceNameArray(e.software, e),
                                            h.spliceLinksForNode(e, L),
                                            h.spliceNode(e, T),
                                            h.updateVmSoftwares(e)) : e.software.isConnect && !0 === e.software.isExecuting ? l.info("Can't delete software while executing", "Information") : e.status !== r.SOFTWARE_STATUS.INSTALLED && e.status !== r.SOFTWARE_STATUS.REMOVED || !e.software.isProvision || l.info("Can't delete installed software, please uninstall first and try again!", "Information"),
                                        c.swal("Deleted", e.componentName + " has been deleted", "success"),
                                        h.generateLog("Remove Software", a, n),
                                        h.combineAllDataAndUpdateCanvas(),
                                        h.restart()
                                } else
                                    c.swal("Cancelled", "Deletion of " + e.componentName + " is cancelled", "error")
                            }))
                    }),
                    t.append("svg:g").append("svg:rect").attr({
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100,
                        fill: "#ddd",
                        "fill-opacity": .7,
                        class: "node-overlay",
                        display: "none"
                    }),
                    A.exit().remove()
            },
            h.displayDragLine = function(e, t, a, n) {
                d3.select(e).select(".ladder").attr({
                    x1: t.x + a,
                    y1: t.x + n
                })
            },
            h.hideDragLine = function(e, t) {},
            h.changeConnectorCordinate = function(e, t, a) {
                var n = d3.select(h.mousedown_selector);
                n.select(".ladder").attr({
                        x2: t,
                        y2: a
                    }),
                    n.select(".connection-point-circle").attr({
                        cx: t,
                        cy: a
                    }),
                    n.select(".connection-arrow").attr({
                        x: t - 2,
                        y: a
                    })
            },
            h.spliceLinksForNode = function(e, t) {
                t.filter(function(t) {
                    return t.source.id === e.id || t.target.id === e.id
                }).map(function(e) {
                    t.splice(t.indexOf(e), 1)
                })
            },
            h.makeConfigurationFormInReadOnlyMode = function(e) {
                var t = angular.fromJson(e);
                return t = s.changeFormSchemaAsReadOnly(t)
            },
            h.restoreInstanceNameArray = function(e, t) {
                _.remove(h.instanceNameArray, function(a) {
                    if (a.instanceName === e.properties.instanceName)
                        return {
                            instanceName: e.properties.instanceName,
                            softwareCode: e.softwareCode,
                            softwareIdCounter: t.id
                        }
                })
            },
            h.spliceNode = function(e, t) {
                for (var a = 0; a <= t.length - 1; a++)
                    if (t[a].id === e.id) {
                        t.splice(a, 1);
                        break
                    }
            },
            h.updateVmSoftwares = function(e) {
                var t, a, n, o = e;
                if (o.software)
                    for (t = 0; t <= h.nodesForPhysicalView.length - 1; t++)
                        for (n = h.nodesForPhysicalView[t].softwares,
                            a = 0; a <= n.length - 1; a++)
                            parseInt(n[a].id) === parseInt(o.id) && (n.splice(a, 1),
                                a--)
            },
            h.toggleIntergartionLabelStatus = function() {
                h.showIntegrationLabel = d.getIntegrationLabelFLag(),
                    h.restart()
            },
            h.init = function() {
                h.timeStamp = (new Date).getTime(),
                    d.setIntergartionLabelCallback(h.toggleIntergartionLabelStatus),
                    h.loadComposeViewSidePallet(),
                    "true" === e.isCanvas ? h.retrieveCanvasDetails(h.versionNum, h.renderComposeView) : h.retrieveBoilerplateDetails(h.renderComposeView)
            },
            h.setScreenResolution = function(e, t) {
                (null === h.screenResolution || h.screenResolution.screenWidth < e || h.screenResolution.screenHeight < t) && (h.screenResolution = {},
                    h.screenResolution.screenWidth = e,
                    h.screenResolution.screenHeight = t)
            },
            h.loadComposeViewSidePallet = function() {
                n.getPalette().then(function(e) {
                    200 === e.status && (h.responseWithGroupedComponent = s.buildJsonStructureForComponentPalette(e.data, "Virtual Machines", !1),
                        h.categories = h.responseWithGroupedComponent.groupedComponent,
                        h.createAllSoftwareArrayToBeSearched(h.responseWithGroupedComponent.groupedComponent),
                        h.softwareTab = {})
                }, function(e) {
                    e.data && e.data.message && e.data.message.length ? l.error(e.data.message, "Error") : l.error("Error occurred while fetching menu!", "Error")
                })
            },
            h.createAllSoftwareArrayToBeSearched = function(e) {
                for (var t in e)
                    _.each(e[t], function(e) {
                        if (h.allSoftwareArray = _.uniq(h.allSoftwareArray.concat(e.componentName + " << " + [t])),
                            e.softwares && e.softwares.length)
                            for (var a = 0; a < e.softwares.length; a++)
                                e.softwares[a] = e.softwares[a] + " << " + e.componentName + " << " + [t];
                        h.allSoftwareArray = _.uniq(h.allSoftwareArray.concat(e.softwares))
                    });
                h.allSoftwareArray.sort()
            },
            h.createContainer = function(e, t, a) {
                function n(e, t) {
                    h.showPathInfo = !1,
                        h.lastDraggedNode = angular.copy(e),
                        d3.select(t).classed("dragging", !0),
                        o.setMessage("Canvas is updating ..."),
                        s.safeApply(N)
                }

                function i(e, t) {
                    var a = d3.event;
                    a.x < 0 || a.x > C - 100 || a.y < 0 || a.y > w - 100 || (d3.select(t).attr("transform", "translate(" + a.x + "," + a.y + ")"),
                        e.x = a.x,
                        e.y = a.y,
                        h.changePathCordinates(e),
                        h.restart())
                }

                function l(e, t) {
                    h.lastDraggedNode.x === e.x && h.lastDraggedNode.y === e.y || (h.combineAllDataAndUpdateCanvas(),
                            o.setMessage("Canvas is updating ...")),
                        d3.select(t).classed("dragging", function() {
                            return !1
                        }),
                        d3.event.sourceEvent.stopImmediatePropagation()
                }
                return S = d3.behavior.zoom().scaleExtent([.5, 5]).on("zoom", function() {
                        if (h.showPathInfo = !1,
                            s.safeApply(N),
                            null !== d3.event.sourceEvent && d3.event.sourceEvent.type) {
                            d3.event.sourceEvent.type;
                            var e = d3.event;
                            if (h.canvasScreen && h.screenResolution)
                                var t = Math.min(0, Math.max(e.translate[0], h.canvasScreen.clientWidth - 2 * h.screenResolution.screenWidth * e.scale)),
                                    a = Math.min(0, Math.max(e.translate[1], h.canvasScreen.clientHeight - 2 * h.screenResolution.screenHeight * e.scale));
                            S.translate([t, a]),
                                d.containerZoom(v, t, a, e.scale)
                        }
                    }),
                    y = d3.behavior.drag().origin(function(e) {
                        return e
                    }).on("dragstart", function(e) {
                        d3.event.sourceEvent.stopPropagation(),
                            f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && (d3.select(this).moveToFront(),
                                n(e, this))
                    }).on("drag", function(e) {
                        f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && i(e, this)
                    }).on("dragend", function(e) {
                        f.isAuthorised(r.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && l(e, this)
                    }),
                    C = 2 * (parseInt(h.screenResolution.screenWidth) + 15),
                    w = 2 * (parseInt(h.screenResolution.screenHeight) + 15),
                    d.createContainer(h.drawerId, C, w, S)
            },
            h.combineAllDataAndUpdateCanvas = function(e) {
                var t = h.concatNodesAndPath();
                h.isBoilerplate || h.updateCanvas(t.allNodes, t.allPaths, e)
            },
            h.resetMouseVar = function() {
                d3.select("svg").style("cursor", "crosshair"),
                    h.mousedown_node = null,
                    h.mouseup_node = null,
                    h.currentCordinate = null,
                    h.mouseup_selector = null,
                    h.mousedown_selector = null
            },
            h.changePathCordinates = function(e) {
                angular.forEach(L, function(t) {
                    t.source.id !== e.id && t.target.id !== e.id || (t.source.id === t.target.id ? (t.source.x = e.x,
                        t.source.y = e.y,
                        t.target.x = e.x,
                        t.target.y = e.y) : t.source.id === e.id ? (t.source.x = e.x,
                        t.source.y = e.y) : (t.target.x = e.x,
                        t.target.y = e.y))
                })
            },
            h.updateCanvas = function(t, a, i) {
                h.currentTabName = angular.copy(h.lastTabName),
                    h.isUpdateFetched && (h.isUpdateFetched = !1,
                        d.setCanvasUpdateFlag(!0),
                        n.updateCanvasDetails(a, t, e.canvasCode, e.canvasName, e.projectCode, h.recentAction, ++h.versionNum, h.screenResolution, h.canvasDetails).then(function(e) {
                            d.setCanvasData(h.canvasDetails),
                                d.setCanvasStatus(e.data.status),
                                o.setMessage("Canvas up to date"),
                                h.isUpdateFetched = !0,
                                d.setCanvasUpdateFlag(!1),
                                i && i(e.data)
                        }, function(e) {
                            h.isUpdateFetched = !0,
                                d.setCanvasUpdateFlag(!1),
                                h.lastTabName === h.currentTabName && e.data.code === r.ERROR_CODE.CANVAS_OUT_OF_SYNC ? (o.setMessage("Failed to update canvas!"),
                                    l.error(e.data.message + "<br> Canvas is updating!", "Error"),
                                    h.cleanCache = !0,
                                    h.retrieveCanvasDetails(null, h.restart)) : l.error(e.data.message, "Error"),
                                i && i({
                                    error: !0
                                })
                        })),
                    h.recentAction = null
            },
            h.concatNodesAndPath = function() {
                var e = [],
                    t = [];
                return e = _.concat(T, h.nodesForPhysicalView),
                    t = _.concat(L, h.pathsForPhysicalView), {
                        allNodes: e,
                        allPaths: t
                    }
            },
            h.renderComposeView = function() {
                h.canvasScreen = d3.select("#" + h.drawerId)[0][0],
                    h.containerWidth = h.canvasScreen ? h.canvasScreen.clientWidth : 0,
                    h.containerHeight = h.canvasScreen ? h.canvasScreen.clientHeight : 0,
                    0 === h.containerWidth || 0 === h.containerHeight ? t(function() {
                        h.renderComposeView()
                    }) : (h.setScreenResolution(h.containerWidth, h.containerHeight),
                        v = h.createContainer(),
                        D = v.append("svg:g").selectAll("g"),
                        E = v.append("svg:g").selectAll("g"),
                        A = v.append("svg:g").selectAll("g"),
                        h.restart())
            },
            h.hideMouseDownConnectionPoint = function() {
                var e = d3.select(h.mousedown_selector);
                e.select(".ladder").attr({
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 0
                    }),
                    e.select(".connection-point-circle").attr({
                        cx: 0,
                        cy: 0
                    }),
                    e.select(".connection-point-container").attr("opacity", 0)
            },
            h.hideMouseUpConnectionPoint = function() {
                var e = d3.select(h.mouseup_selector);
                e.select(".ladder").transition().duration(1e3).attr({
                        y2: 0
                    }),
                    e.select(".connection-point-circle").transition().duration(1e3).attr({
                        cy: 0
                    }),
                    e.select(".connection-point-container").transition().duration(1e3).attr("opacity", 0)
            },
            h.hideDragLineAndConnectionPoint = function() {
                h.mousedown_node && h.hideMouseDownConnectionPoint(),
                    h.mouseup_node && h.hideMouseUpConnectionPoint(),
                    A.selectAll(".node-overlay").attr("display", "none"),
                    A.style("pointer-events", "auto"),
                    h.resetMouseVar()
            },
            h.zoomOnButtonClick = function(e) {
                if ("reset" === e) {
                    var t = {
                        x: -100,
                        y: -100,
                        k: 1
                    };
                    C = 2 * (parseInt(h.screenResolution.screenWidth) + 15),
                        w = 2 * (parseInt(h.screenResolution.screenHeight) + 15)
                } else
                    t = u.zoomClick(e, S, C, w);
                if (u.interpolateZoom(v, S, [t.x, t.y], t.k),
                    "reset" !== e)
                    var a = Math.min(0, Math.max(t.x, h.canvasScreen.clientWidth - 2 * h.screenResolution.screenWidth * t.k)),
                        n = Math.min(0, Math.max(t.y, h.canvasScreen.clientHeight - 2 * h.screenResolution.screenHeight * t.k));
                else
                    var a = -100,
                        n = -100;
                d.containerZoom(v, a, n, t.k)
            },
            h.retrieveCanvasDetails = function(t, a) {
                h.isGetFetched && h.isUpdateFetched && (h.isGetFetched = !1,
                    o.setMessage("Canvas is loading"),
                    d.setCanvasFetchFlag(!0),
                    n.retrieveCanvasDetails(e.projectCode, e.canvasCode, t, h.cleanCache).then(function(e) {
                        m.deleteUriInProgress(e.config.url),
                            h.errorMessage = "",
                            d.setCanvasFetchFlag(!1),
                            h.isGetFetched = !0,
                            h.getResponseFetched = !0,
                            o.setMessage("Canvas up to date"),
                            200 === e.status && (e.data ? d.setCanvasData(e.data) : e.data = d.getCanvasData(),
                                d.setCanvasStatus(e.data.status),
                                h.versionNum = e.data.version,
                                e.status !== r.CANVAS_STATUS.INSTALLING || h.isBoilerplate || (h.provisioning = !0),
                                h.setCanvasDetails(e.data, a))
                    }, function(e) {
                        h.errorMessage = "Error occurred while processing request!",
                            d.setCanvasFetchFlag(!1),
                            o.setMessage("Canvas loading failed"),
                            h.isGetFetched = !0,
                            h.getResponseFetched = !0,
                            e.data && e.data.message && e.data.message.length ? l.error(e.data.message, "Error") : l.error("Error occurred while fetching the rquest!", "Error")
                    }))
            },
            h.retrieveBoilerplateDetails = function(t) {
                n.getBoilerplate(e.projectCode, e.type, e.canvasCode, h.cleanCache).then(function(e) {
                    200 === e.status && h.setCanvasDetails(e.data, t)
                }, function(e) {
                    e.data && e.data.message && e.data.message.length ? l.error(e.data.message, "Error") : l.error("Error occurred while processing request!", "Error")
                })
            },
            h.splicePath = function(e, t) {
                for (var a = 0; a <= e.length - 1; a++)
                    if (e[a].id === t.id) {
                        e.splice(a, 1);
                        break
                    }
            },
            h.setCanvasDetails = function(e, t) {
                h.canvasDetails = e;
                var a = [],
                    n = [];
                h.canvasStatus = e.status,
                    h.canvasName = e.canvasName,
                    h.projectCode = e.projectCode,
                    h.projectName = e.projectName,
                    h.screenResolution = e.screenResolution ? e.screenResolution : null,
                    e.status === r.CANVAS_STATUS.INSTALLING ? h.installing = !0 : h.installing = !1,
                    e.nodes && (h.nodesForPhysicalView = _.filter(e.nodes, function(e) {
                            return e.id > b && (b = e.id),
                                e.type === r.NODE_TYPE.VM_NODE && e.status !== r.SOFTWARE_STATUS.UNINSTALLED
                        }),
                        a = _.filter(e.nodes, function(e) {
                            return e.id > b && (b = e.id),
                                e.type === r.NODE_TYPE.SOFTWARE_NODE
                        }),
                        _.filter(e.nodes, function(e) {
                            e.type === r.NODE_TYPE.SOFTWARE_NODE && e.software.properties && e.software.properties.instanceName && h.instanceNameArray.push({
                                instanceName: e.software.properties.instanceName,
                                softwareCode: e.software.softwareCode,
                                softwareIdCounter: e.id
                            })
                        }),
                        h.uninstalledNodeForPhysicalView = _.filter(e.nodes, function(e) {
                            return e.id > b && (b = e.id),
                                e.type === r.NODE_TYPE.VM_NODE && e.status === r.SOFTWARE_STATUS.UNINSTALLED
                        }),
                        T.length ? h.updateComposeViewData(a, T) : angular.copy(a, T)),
                    e.paths && (n = _.filter(e.paths, function(e) {
                            return e.id > b && (b = e.id),
                                e.source.type === r.NODE_TYPE.SOFTWARE_NODE || e.target.type === r.NODE_TYPE.SOFTWARE_NODE
                        }),
                        h.pathsForPhysicalView = _.filter(e.paths, function(e) {
                            return e.source.type === r.NODE_TYPE.VM_NODE || e.target.type === r.NODE_TYPE.VM_NODE
                        }),
                        L.length ? h.updateComposeViewData(n, L) : angular.copy(n, L)),
                    t && t(h.nodesForPhysicalView, h.pathsForPhysicalView, h.uninstalledNodeForPhysicalView, T, L, e)
            },
            h.init()
    }
    e.$inject = ["$stateParams", "$timeout", "$scope", "drawCanvasServices", "mainFactory", "PAYLOAD_ENUM", "SERVICE_BASE_URL", "UtilFactory", "toastr", "SweetAlert", "zoomFactory", "drawCanvasCommonFactory", "$q", "granularAccessControl", "userDetails", "cacheFactory"],
        angular.module("cape-webapp").controller("ComposeTabController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.deleteView = function(a, n, o) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/projects/" + a + "/canvas/" + n + "/analyzeView/" + o
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("analyzeTabService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("analyzeTabFactory", function() {
        var e = {};
        return e.calculateFilterPosition = function(e) {
                var t = e.clientX,
                    a = e.clientY,
                    n = e.view.innerWidth - t,
                    o = e.view.innerHeight - a;
                return n < 260 && (t = e.clientX - 280),
                    o < 400 && (a = e.clientY - o), {
                        clientX: t,
                        clientY: a
                    }
            },
            e
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u, d, p, f) {
        try {
            var g = this;
            g.scrollValue = 0,
                g.viewOptions = [],
                g.latestUpdatedView = [],
                g.canvasCode = r.canvasCode,
                g.projectCode = r.projectCode,
                g.cleanCache = c.checkCache(e.$resolve.$$state.self.name),
                g.userInfo = o.getUserDetails(),
                g.constructViews = function(e) {
                    g.viewOptions.push({
                            active: !e || !e.length,
                            groupName: "Default View",
                            stateParams: {
                                groupCode: "default"
                            },
                            groupCode: "default",
                            defaultTab: !0,
                            state: "main.drawCanvas.analyze.views"
                        }),
                        g.defaultTab = g.viewOptions[0]
                },
                g.createNewView = function() {
                    p.isAuthorised(f.ACCESS_CONTROL_LIST.ANALYZE_CANVAS, !1) && (g.defaultViewMetrics.length ? t.open({
                        templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/createCustomView/createCustomView.html",
                        controller: "CreateCustomViewController",
                        controllerAs: "CreateCustomViewCtrl",
                        windowClass: "my-modal",
                        backdrop: "static",
                        keyboard: !1,
                        resolve: {
                            modalData: function() {
                                return {
                                    isEdit: !1,
                                    groupName: null,
                                    groupCode: null,
                                    groupNameList: g.viewOptions,
                                    projectCode: g.projectCode,
                                    canvasCode: g.canvasCode
                                }
                            }
                        }
                    }).result.then(function(e) {
                        e && (delete e.status,
                            g.addAttributesForView(e, !0),
                            g.viewOptions.push(e),
                            a.go("main.drawCanvas.analyze.views", {
                                groupCode: e.groupCode,
                                customView: !0
                            }),
                            g.scrollRight())
                    }, function() {}) : s.info("No metrics available to create custom view!", "Information"))
                },
                g.addAttributesForView = function(e, t) {
                    var a = {
                        groupCode: e.groupCode,
                        canvasCode: g.canvasCode
                    };
                    return e.active = t,
                        e.defaultTab = !1,
                        e.state = "main.drawCanvas.analyze.views",
                        e.stateParams = a,
                        e
                },
                g.editView = function(e, a) {
                    p.isAuthorised(f.ACCESS_CONTROL_LIST.ANALYZE_CANVAS, !1) && (e.preventDefault(),
                        e.stopPropagation(),
                        t.open({
                            templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/createCustomView/createCustomView.html",
                            controller: "CreateCustomViewController",
                            controllerAs: "CreateCustomViewCtrl",
                            windowClass: "my-modal",
                            backdrop: "static",
                            keyboard: !1,
                            resolve: {
                                modalData: function() {
                                    return {
                                        isEdit: !0,
                                        groupName: a.groupName,
                                        groupCode: a.groupCode,
                                        groupNameList: g.viewOptions,
                                        projectCode: g.projectCode,
                                        canvasCode: g.canvasCode
                                    }
                                }
                            }
                        }).result.then(function(e) {
                            e && (a.groupName = e.groupName)
                        }, function() {}))
                },
                g.deleteView = function(e, t, n) {
                    if (p.isAuthorised(f.ACCESS_CONTROL_LIST.ANALYZE_CANVAS, !1)) {
                        e.preventDefault(),
                            e.stopPropagation();
                        var o = {
                                title: "Delete view",
                                text: n + " will be deleted",
                                confirmButtonText: "Yes",
                                cancelButtonText: "No"
                            },
                            r = {
                                projectCode: g.projectCode,
                                canvasCode: g.canvasCode,
                                groupCode: t
                            };
                        i.complexView(o, r, function(e, t) {
                            e && u.deleteView(t.projectCode, t.canvasCode, t.groupCode).then(function() {
                                for (var e = 0; e < g.viewOptions.length; e++)
                                    if (g.viewOptions[e].groupCode === t.groupCode) {
                                        g.viewOptions.splice(e, 1);
                                        var n = _.orderBy(g.viewOptions, [function(e) {
                                                return e.updatedOn || ""
                                            }], ["desc"]),
                                            o = _.find(g.viewOptions, {
                                                groupCode: n[0].groupCode
                                            });
                                        a.go("main.drawCanvas.analyze.views", {
                                                groupCode: o.groupCode,
                                                canvasCode: t.canvasCode
                                            }),
                                            o.active = !0;
                                        break
                                    }
                                s.success("View deleted successfully.", "Success"),
                                    g.safeApply()
                            }, function() {
                                s.error("Unable to delete view!", "Error")
                            })
                        })
                    }
                },
                g.safeApply = function() {
                    var t;
                    "$apply" !== (t = e.$root ? e.$root.$$phase : e.$$phase) && "$digest" !== t && e.$apply()
                },
                g.navigateToChildState = function(e, t) {
                    a.go(e, t)
                },
                g.init = function() {
                    d.getGraphForCanvas(r.projectCode, r.canvasCode, "default", g.cleanCache).then(function(t) {
                        if (200 === t.status) {
                            g.cleanCache = c.checkCache(e.$resolve.$$state.self.name),
                                l.upsertCacheData(t.config.url, t),
                                l.deleteUriInProgress(t.config.url),
                                l.callRegisteredCallBackAndRemove(t.config.url),
                                g.constructViews(t.data.customViews),
                                g.defaultViewMetrics = t.data.defaultView ? t.data.defaultView.metrics : {},
                                t.data.customViews && t.data.customViews.length && (g.sortedView = _.orderBy(t.data.customViews, [function(e) {
                                        return e.updatedOn || ""
                                    }], ["desc"]),
                                    angular.forEach(t.data.customViews, function(e) {
                                        g.addAttributesForView(e, !1),
                                            g.viewOptions.push(e)
                                    })),
                                "main.drawCanvas.analyze" === a.current.name && a.go("main.drawCanvas.analyze.views", {
                                    groupCode: g.sortedView && g.sortedView.length ? g.sortedView[0].groupCode : "default"
                                });
                            var n = _.find(g.viewOptions, function(e) {
                                return g.sortedView && g.sortedView.length && e.groupCode === g.sortedView[0].groupCode || e.groupCode === a.params.groupCode
                            });
                            n && (n.active = !0)
                        }
                    })
                },
                g.init()
        } catch (e) {}
    }
    e.$inject = ["$scope", "$uibModal", "$state", "$timeout", "Validator", "$stateParams", "SweetAlerts", "toastr", "cacheFactory", "UtilFactory", "analyzeTabService", "viewsService", "granularAccessControl", "PAYLOAD_ENUM"],
        angular.module("cape-webapp").controller("analyzeTabController", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i) {
        var s = this;
        e.$on("userProfile:updated", function(e, t) {
                s.userInfo = t
            }),
            s.loggedInUserInfo = t.getLoggedInUserDetails(),
            s.username = s.loggedInUserInfo.username,
            s.orgCode = s.loggedInUserInfo.orgCode,
            s.updating = !1,
            null !== n.getFormValidationPattern() ? s.formValidationPattern = n.getFormValidationPattern() : n.callInitFunction().then(function(e) {
                n.setFormValidationPattern(e.data.validationPattern),
                    s.formValidationPattern = n.getFormValidationPattern()
            }, function(e) {}),
            s.updateProfile = function(t, n, i) {
                t ? (s[n] = !s[n],
                    s.userInfo.email = s.email,
                    s.userInfo.name = s.name,
                    s.updating = !0,
                    o.editProfile(s.userInfo).then(function(t) {
                        s.updating = !1,
                            a.clearUserDetails(),
                            a.setUserDetails(t.data),
                            r.success("user info updated successfully", "Success"),
                            e.$broadcast("userProfile:updated", t.data)
                    }, function(e) {
                        s.updating = !1,
                            e && e.data && e.data.message && e.data.message.length ? s.changePasswordErrorMessage = e.data.message : s.changePasswordErrorMessage = "Something went wrong"
                    })) : r.error("Fill the fields correctly", "Error")
            },
            s.init = function() {
                a.getUserDetails() ? (s.userInfo = a.getUserDetails(),
                    s.email = s.userInfo.email,
                    s.name = s.userInfo.name) : o.getUserInfo(s.orgCode, s.username).then(function(e) {
                    a.setUserDetails(e.data),
                        s.userInfo = e.data,
                        s.email = s.userInfo.email,
                        s.name = s.userInfo.name
                }, function(e) {
                    r.error("Failed while fetching user info!", "Error")
                })
            },
            s.init()
    }
    e.$inject = ["$rootScope", "userDetails", "Validator", "UtilFactory", "userProfileService", "toastr", "$log"],
        angular.module("cape-webapp").controller("updateProfileController", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i) {
        var s = this;
        s.userInfo = t.getLoggedInUserDetails(),
            s.name = s.userInfo.name,
            s.hideFields = r.hideFields,
            s.username = s.userInfo.username,
            s.email = s.userInfo.email,
            null !== n.getFormValidationPattern() ? s.formValidationPattern = n.getFormValidationPattern() : n.callInitFunction().then(function(e) {
                n.setFormValidationPattern(e.data.validationPattern),
                    s.formValidationPattern = n.getFormValidationPattern()
            }, function(e) {}),
            s.updateProfileWithPassword = function(t) {
                s.newPassword === s.confirmNewPassword && s.newPassword !== s.oldPassword && t && (s.changePasswordErrorMessage = "",
                    s.userInfo.username = s.username,
                    s.userInfo.email = s.email,
                    s.userInfo.name = s.name,
                    s.userInfo.password = e.encode(s.oldPassword),
                    s.userInfo.newPassword = e.encode(s.newPassword),
                    o.editProfile(s.userInfo).then(function() {
                        a.logout()
                    }, function(e) {
                        e && e.data && e.data.message && e.data.message.length ? s.changePasswordErrorMessage = e.data.message : s.changePasswordErrorMessage = "Something went wrong"
                    }))
            }
    }
    e.$inject = ["$base64", "userDetails", "userProfileFactory", "UtilFactory", "userProfileService", "$stateParams", "$log"],
        angular.module("cape-webapp").controller("changePasswordController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.deleteApplication = function(a) {
                return e.delete(t + "studio/v1/app/" + a)
            },
            a.getApplicationAccessGroups = function() {
                return e.get(t + "studio/v1/api/accessGroups")
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("ApplicationListService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("ApplicationController", ["$uibModal", "ApplicationListService", "SweetAlert", "granularAccessControlData", "PAYLOAD_ENUM", "toastr", "SERVICE_BASE_URL", "lazyloadingFactory", "$log", function(e, t, a, n, o, r, i, s, l) {
        var c = this;
        c.applicationList = [],
            c.clipboardText = "Click to copy token",
            c.changeClipboardText = function(e) {
                c.clipboardText = e ? o.CLIPBOARD_TEXT.AFTER_CLICK : o.CLIPBOARD_TEXT.DEFAULT_MESSAGE
            },
            c.loadApplications = function(e, a) {
                c.errorMessage = "",
                    200 === a && e && e.length && (c.applicationList = _.concat(c.applicationList, e),
                        c.responseReceived = !0,
                        t.getApplicationAccessGroups().then(function(e) {
                            n.setAccessList(e.data)
                        }, function(e) {
                            e && e.data && e.data.message && e.data.message.length ? r.error(e.message, "Error") : r.error("Something went wrong", "Error")
                        }))
            },
            c.clearSearch = function() {
                c.applicationSearch = "",
                    c.init()
            },
            c.init = function() {
                c.lazyLoading.resetScrollValue = !0,
                    c.applicationList = [];
                var e = i + "studio/v1/app";
                c.lazyLoading.pageNumber = 0,
                    c.lazyLoading.url = e,
                    c.lazyLoading.pageSize = 20,
                    c.lazyLoading.params = {
                        searchKey: c.applicationSearch
                    },
                    c.lazyLoading.isEmpty = !1,
                    c.lazyLoading.nextPage()
            },
            c.deleteApplication = function(e) {
                a.swal({
                    title: "Delete application",
                    text: e + " will be removed",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: !1,
                    closeOnCancel: !1
                }, function(n) {
                    n ? (a.swal("Deleted", e + " has been deleted", "success"),
                        t.deleteApplication(e).then(function() {
                            c.init(),
                                c.lazyLoading.resetScrollValue = !0
                        }, function(e) {
                            e && e.message && e.message.length ? r.error(e.message, "Error") : r.error("Something went wrong", "Error")
                        })) : a.swal("Cancelled", e + " details are safe", "error")
                })
            },
            c.updateApplication = function(t, a) {
                e.open({
                    templateUrl: "app/modules/platform/application/createAndUpdateApplication/updateApplication.html",
                    controller: "updateApplicationController",
                    controllerAs: "updateApplicationCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        action: function() {
                            return t
                        },
                        applicationData: function() {
                            return {
                                applicationData: a,
                                applicationList: c.applicationList
                            }
                        }
                    }
                }).result.then(function(e) {
                    e && (c.init(),
                        c.lazyLoading.resetScrollValue = !0)
                }, function() {})
            },
            c.failedLoading = function(e) {
                c.errorMessage = "Error occurred while processing request!"
            };
        var u = new s.LazyLoading;
        u.resAttr = "applications",
            u.callback = c.loadApplications,
            u.errorCallback = c.failedLoading,
            c.lazyLoading = u,
            c.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.deleteAdmin = function(a) {
                return e.delete(t + "studio/v1/admins/" + a)
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("AdminsListService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("AdminsController", ["$uibModal", "AdminsListService", "toastr", "userDetails", "SweetAlert", "SERVICE_BASE_URL", "UtilFactory", "lazyloadingFactory", function(e, t, a, n, o, r, i, s) {
        var l = this;
        l.loggedInUserDetails = n.getLoggedInUserDetails(),
            l.adminsList = [],
            l.loadAdmins = function(e, t) {
                200 === t && e && e.length && (l.adminsList = _.concat(l.adminsList, e),
                        l.responseReceived = !0),
                    l.errorMessage = ""
            },
            l.clearSearch = function() {
                l.adminsSearch = "",
                    l.init()
            },
            l.init = function() {
                l.lazyLoading.resetScrollValue = !0,
                    l.adminsList = [];
                var e = r + "studio/v1/admins";
                l.lazyLoading.url = e,
                    l.lazyLoading.pageNumber = 0,
                    l.lazyLoading.params = {
                        searchKey: l.adminsSearch
                    },
                    l.lazyLoading.isEmpty = !1,
                    l.lazyLoading.nextPage()
            },
            l.deleteAdmin = function(e) {
                o.swal({
                    title: "Delete admin",
                    text: e + " will be removed from the project",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: !1,
                    closeOnCancel: !1
                }, function(n) {
                    n ? (o.swal("Deleted", e + " has been deleted", "success"),
                        t.deleteAdmin(e).then(function() {
                            l.init(),
                                l.lazyLoading.resetScrollValue = !0
                        }, function(e) {
                            e && e.message && e.message.length ? a.error(e.message, "Error") : a.error("Something went wrong", "Error")
                        })) : o.swal("Cancelled", e + " details are safe", "error")
                })
            },
            l.updateAdmins = function(t, a) {
                e.open({
                    templateUrl: "app/modules/platform/admins/createAndUpdateAdmins/updateAdmins.html",
                    controller: "updateAdminsController",
                    controllerAs: "updateAdminsCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        action: function() {
                            return t
                        },
                        adminData: function() {
                            return {
                                adminData: a,
                                adminList: l.adminsList
                            }
                        }
                    }
                }).result.then(function(e) {
                    e && (l.init(),
                        l.lazyLoading.resetScrollValue = !0)
                }, function() {})
            },
            l.failedLoading = function(e) {
                l.errorMessage = "Error occurred while processing request!"
            };
        var c = new s.LazyLoading;
        c.resAttr = "admins",
            c.callback = l.loadAdmins,
            c.errorCallback = l.failedLoading,
            l.lazyLoading = c,
            l.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c) {
        var u = this;
        u.stateName = a,
            u.aclName = n,
            u.userInfo = t.getLoggedInUserDetails(),
            u.navigateToCanvas = function(t) {
                s.isAuthorised(l.ACCESS_CONTROL_LIST[u.aclName], !1) && e.go(u.stateName, t),
                    o.close()
            },
            u.onCancel = function() {
                o.close(!0)
            },
            u.validateNavigateToCanvasForm = function() {
                if (!u.selectedProject.default && !u.selectedCanvas.default) {
                    var e = {
                        projectCode: u.selectedProject.projectCode,
                        canvasCode: u.selectedCanvas.canvasCode,
                        canvasName: u.selectedCanvas.canvasName,
                        groupCode: "default"
                    };
                    u.navigateToCanvas(e)
                }
            },
            u.loadCanvases = function() {
                u.selectedProject && (u.canvasList = [],
                    u.selectedProject.default || c.getAllCanvases(u.selectedProject.projectCode).then(function(e) {
                        var t = {
                            canvasName: "Select Canvas",
                            default: !0
                        };
                        u.canvasList.push(t),
                            u.canvasList.push.apply(u.canvasList, e.data.canvases),
                            u.selectedCanvas = u.canvasList[0]
                    }))
            },
            u.loadAllProject = function() {
                u.projects = [],
                    r.getAllProjects(u.userInfo.username).then(function(e) {
                        var t = {
                            projectName: "Select Project",
                            default: !0
                        };
                        u.projects.push(t),
                            u.projects.push.apply(u.projects, e.data),
                            u.selectedProject = u.projects[0]
                    }, function(e) {
                        i.error(e.message, "Error")
                    })
            },
            u.init = function() {
                u.loadAllProject()
            },
            u.init()
    }
    e.$inject = ["$state", "userDetails", "stateName", "aclName", "$uibModalInstance", "mainService", "toastr", "granularAccessControl", "PAYLOAD_ENUM", "drawCanvasServices"],
        angular.module("cape-webapp").controller("navigateToCanvasController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.init = function() {
                a.addComponentsData = e,
                    a.selectedComponents = []
            },
            a.checkboxChanged = function(e) {
                !0 === e.selected ? a.selectedComponents.push(e) : _.remove(a.selectedComponents, e)
            },
            a.addDashboardComponents = function() {
                t.close(a.selectedComponents)
            },
            a.init()
    }
    e.$inject = ["modalData", "$uibModalInstance"],
        angular.module("cape-webapp").controller("AddDashboardComponentController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.getAllSoftwares = function(a) {
                return e({
                    method: "GET",
                    url: t + "studio/v1/components/" + a + "/softwares"
                })
            },
            a.deleteSoftware = function(a, n) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/components/" + a + "/softwares/" + n
                })
            },
            a.deleteIntegration = function(a, n, o) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/components/" + a + "/softwares/" + n + "/integration/" + o
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("softwareListService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r = this;
        r.rootComponentCode = e.componentCode,
            r.appURL = n,
            r.componentCode = e.subComponentCode,
            r.componentName = e.subComponentName,
            r.responseReceived = !1,
            r.timeStamp = (new Date).getTime(),
            r.init = function() {
                a.getAllSoftwares(r.componentCode).then(function(e) {
                    r.errorResponse = "",
                        200 === e.status && (r.softwaresInfo = e.data,
                            r.responseReceived = !0)
                }, function(e) {
                    r.errorResponse = "Error occured while processing request!"
                })
            },
            r.deleteIntegration = function(e, n) {
                t.swal({
                    title: "Delete integration",
                    text: "Integration will get removed",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: !0,
                    closeOnCancel: !0
                }, function(i) {
                    i ? (t.swal("Deleted!", "integration has been deleted.", "success"),
                        a.deleteIntegration(r.componentCode, n, e.softwareCode).then(function(e) {
                            200 === e.status ? (o.success("Integartion has been deleted succesfully."),
                                r.init()) : o.error("Integartion couldn't be deleted.")
                        }, function(e) {
                            o.error("Integartion couldn't be deleted.")
                        })) : t.swal("Cancelled", "integration deletiion cancelled", "error")
                })
            },
            r.deleteSoftware = function(e) {
                t.swal({
                    title: "Delete software",
                    text: e.softwareName + " will be deleted",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: !0,
                    closeOnCancel: !0
                }, function(n) {
                    n ? (t.swal("Deleted!", e.softwareName + " has been deleted.", "success"),
                        a.deleteSoftware(r.componentCode, e.softwareCode).then(function(e) {
                            200 === e.status ? (o.success("Software has been deleted succesfully."),
                                r.init()) : o.error("Software couldn't be deleted.")
                        }, function() {
                            o.error("Software couldn't be deleted.")
                        })) : t.swal("Cancelled", e.softwareName + " deletiion cancelled", "error")
                })
            },
            r.init()
    }
    e.$inject = ["$stateParams", "SweetAlert", "softwareListService", "SERVICE_BASE_URL", "toastr"],
        angular.module("cape-webapp").controller("softwareListController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.getAllComponents = function() {
                return e({
                    method: "GET",
                    url: t + "studio/v1/components"
                })
            },
            a.deleteComponent = function(a) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/components/" + a
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("componentsService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s) {
        var l = this;
        l.appURL = r,
            l.componentCode = e.componentCode,
            l.categories = [],
            l.errorMessage = "",
            l.init = function() {
                l.timeStamp = (new Date).getTime(),
                    l.categories.length = 0,
                    i.getPalette().then(function(e) {
                        l.errorMessage = "",
                            200 === e.status && (l.componentsDetails = s.buildJsonStructureForComponentPalette(e.data).groupedComponent,
                                l.categories = _.keys(l.componentsDetails))
                    }, function(e) {
                        l.errorMessage = "Error occured while processing request!"
                    })
            },
            l.init(),
            l.editComponent = function(e) {
                l.isInfoAvailable = e,
                    t.open({
                        templateUrl: "app/modules/components/addAndEditComponent/editComponent.html",
                        controller: "editComponentController",
                        controllerAs: "editComponentCtrl",
                        windowClass: "my-modal",
                        backdrop: "static",
                        keyboard: !1,
                        resolve: {
                            componentInfo: function() {
                                return e
                            },
                            categoriesArray: function() {
                                return l.categories
                            }
                        }
                    }).result.then(function(e) {
                        e && (l.init(),
                            a.success("Component has been " + (null !== l.isInfoAvailable ? "updated" : "created") + " successfully", "Success"))
                    })
            },
            l.deleteComponent = function(e) {
                e.softwares && e.softwares.length ? a.info("In order to delete the component, first delete all assigned softwares.", "Information") : o.swal({
                    title: "Delete component",
                    text: e.componentName + " will be deleted",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: !0,
                    closeOnCancel: !0
                }, function(t) {
                    t ? (o.swal("Deleted!", e.componentName + "has been deleted.", "success"),
                        n.deleteComponent(e.componentCode).then(function(e) {
                            200 === e.status && (a.success("Component has been deleted successfully", "Success"),
                                l.init())
                        }, function(e) {
                            a.error(e.data.message, "Error")
                        })) : o.swal("Cancelled", e.componentName + " deletion cancelled", "error")
                })
            }
    }
    e.$inject = ["$stateParams", "$uibModal", "toastr", "componentsService", "SweetAlert", "SERVICE_BASE_URL", "drawCanvasServices", "UtilFactory"],
        angular.module("cape-webapp").controller("ComponentsController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.getdefaultPropertyJson = function() {
                return e({
                    method: "GET",
                    url: "app/modules/components/addSoftware/defaultProperty.json"
                })
            },
            n.getSoftwareDetails = function(t, n) {
                return e({
                    method: "GET",
                    url: a + "studio/v1/components/" + n + "/softwares/" + t
                })
            },
            n.addSoftware = function(n, o, r, i) {
                var s = t.addSoftwareData(n),
                    l = a + "studio/v1/components/" + o + "/softwares" + (r ? "/" + i : "");
                return e({
                    method: r ? "PATCH" : "POST",
                    url: l,
                    data: s
                })
            },
            n
    }
    e.$inject = ["$http", "addSoftwareFactory", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("addSoftwareService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("addSoftwareFactory", function() {
        return {
            addSoftwareData: function(e) {
                return {
                    description: e.description,
                    iconURL: e.iconURL,
                    softwareCode: e.softwareCode,
                    softwareName: e.softwareName,
                    connectionProperty: e.connectionProperty && (e.connectionProperty.form || e.connectionProperty.schema) ? {
                        form: angular.toJson(e.connectionProperty.form),
                        schema: angular.toJson(e.connectionProperty.schema)
                    } : null,
                    softwareProperty: e.softwareProperty && (e.softwareProperty.form || e.softwareProperty.schema) ? {
                        form: angular.toJson(e.softwareProperty.form),
                        schema: angular.toJson(e.softwareProperty.schema)
                    } : null,
                    integrations: e.integrations
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u) {
        var d = this,
            p = e;
        d.appURL = r,
            d.isSubmitted = !1,
            d.rootComponentCode = t.rootComponentCode,
            d.componentCode = t.componentCode,
            d.softwareCode = t.softwareCode,
            d.componentName = t.componentName,
            d.softwareDescription = t.softwareDescription,
            null !== o.getFormValidationPattern() ? d.formValidationPattern = o.getFormValidationPattern() : o.callInitFunction().then(function(e) {
                o.setFormValidationPattern(e.data.validationPattern),
                    d.formValidationPattern = o.getFormValidationPattern()
            }, function(e) {}),
            p.model = {},
            d.renderForm = function() {
                d.softwareDetails.connectionProperty = d.connectionPropertyJsonEditor.data,
                    p.connectionPropertyFormData = angular.copy(d.connectionPropertyJsonEditor.data),
                    p.connectionPropertySchema = p.connectionPropertyFormData.schema,
                    p.connectionPropertyForm = p.connectionPropertyFormData.form,
                    p.connectionPropertyModelData = {},
                    d.softwareDetails.softwareProperty = d.softwarePropertyJsonEditor.data,
                    p.softwarePropertyFormData = angular.copy(d.softwarePropertyJsonEditor.data),
                    p.softwarePropertySchema = p.softwarePropertyFormData.schema,
                    p.softwarePropertyForm = p.softwarePropertyFormData.form,
                    p.softwarePropertyModelData = {},
                    d.safeApply()
            },
            d.callOnSuccess = function(e, t) {
                d.softwareIconChanged = !0,
                    d.softwareDetails.iconURL = e.name,
                    d.timeStamp = "",
                    d.file = e,
                    d.iconURL && d.makeFieldReadable(e, d.iconURL),
                    d.iconURL = t
            },
            d.makeFieldReadable = function(e) {
                Object.defineProperties(e, {
                    name: {
                        value: d.splitImageUrl(d.iconURL) + d.iconURL.substring(d.iconURL.lastIndexOf("."), d.iconURL.length),
                        writable: !1
                    }
                })
            },
            d.callOnFailure = function() {},
            d.safeApply = function() {
                var e;
                "$apply" !== (e = p.$root ? p.$root.$$phase : p.$$phase) && "$digest" !== e && p.$apply()
            },
            d.validateAddSoftwareForm = function(e) {
                d.checkFormValidation(e) ? (d.isSubmitted = !0,
                    d.uploadImageFlag = !1, !d.softwareDetails.iconURL && d.softwareDetails.softwareName && d.softwareDetails.description ? l.error("Please upload software icon.", "Error") : l.error("Please fill all the mendatory fields.", "Error")) : d.addSoftware()
            },
            d.checkFormValidation = function(e) {
                return !(!e && d.softwareDetails.iconURL)
            },
            d.setUploadImageFlag = function() {
                d.uploadImageFlag = !0
            },
            d.addSoftware = function() {
                d.editedSoftwarePropertyForm = angular.toJson(d.softwareDetails.softwareProperty),
                    d.editedConnectionPropertyForm = angular.toJson(d.softwareDetails.connectionProperty);
                var e = angular.equals(d.initialConnectionPropertyForm, d.editedConnectionPropertyForm),
                    t = angular.equals(d.initialSoftwarePropertyForm, d.editedSoftwarePropertyForm);
                if (e || t) {
                    var a, o = "You have not edited the " + (a = e && t ? "software and connection configuration" : e ? "connection configuration" : "software configuration");
                    n.swal({
                        title: "Are you sure?",
                        text: o,
                        type: "warning",
                        showCancelButton: !0,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        closeOnConfirm: !0,
                        closeOnCancel: !0
                    }, function(e) {
                        e ? d.softwareIconChanged ? d.uploadImage() : d.updateSoftware() : n.swal("Cancelled", "You can edit your software form", "error")
                    })
                } else
                    d.softwareIconChanged ? d.uploadImage() : d.updateSoftware()
            },
            d.uploadImage = function() {
                i.uploadFile(d.file).then(function(e) {
                    d.softwareDetails.softwareCode = d.softwareCode ? d.softwareCode : d.splitImageUrl(e.data.iconURL),
                        d.softwareDetails.iconURL = e.data.iconURL,
                        d.updateSoftware()
                }, function() {})
            },
            d.splitImageUrl = function(e) {
                var t = e.split("/"),
                    a = t[t.length - 1];
                return a.substring(0, a.lastIndexOf("."))
            },
            d.updateSoftware = function() {
                var e = d.editorInstance.softwarePropertyJsonEditor.getText().trim().length,
                    t = d.editorInstance.connectionPropertyJsonEditor.getText().trim().length;
                !angular.equals(d.initialSoftwarePropertyForm, d.editedSoftwarePropertyForm) && e || (d.softwareDetails.softwareProperty = null), !angular.equals(d.initialConnectionPropertyForm, d.editedConnectionPropertyForm) && t || (d.softwareDetails.connectionProperty = null),
                    s.addSoftware(d.softwareDetails, d.componentCode, !!d.softwareCode, d.softwareCode).then(function() {
                        l.success("Software " + (d.softwareCode ? "updated" : "added") + " successfully.", "Success"),
                            a.go("main.softwares", {
                                componentCode: d.rootComponentCode,
                                subComponentCode: d.componentCode,
                                subComponentName: d.componentName
                            })
                    }, function(e) {
                        e.data && e.data.message && e.data.message.length ? l.error(e.data.message, "Error") : l.error("Error occurred while processing request!", "Error"),
                            d.softwareDetails.softwareProperty = d.editedSoftwarePropertyForm,
                            d.softwareDetails.connectionProperty = d.editedConnectionPropertyForm
                    })
            },
            d.editorInstance = {},
            d.onLoad = function(e) {
                e.expandAll(),
                    d.editorInstance[e.getName()] = e
            },
            d.changeJsonEditorPropertyData = function(e, t) {
                d[t].data = e
            },
            d.changeJsonEditorPropertyOptions = function(e) {
                d[e].options.mode = "tree" === d[e].options.mode ? "code" : "tree"
            },
            p.submitForm = function() {
                p.$broadcast("schemaFormValidate")
            },
            d.init = function() {
                d.softwareCode ? s.getSoftwareDetails(d.softwareCode, d.componentCode).then(function(e) {
                        if (c("softwareName"),
                            d.timeStamp = (new Date).getTime(),
                            d.softwareDetails = e.data,
                            d.iconURL = d.appURL + d.softwareDetails.iconURL,
                            d.softwareDetails.softwareProperty) {
                            var t = {};
                            t.form = angular.fromJson(d.softwareDetails.softwareProperty.form),
                                t.schema = angular.fromJson(d.softwareDetails.softwareProperty.schema),
                                d.softwareDetails.softwareProperty = t,
                                d.changeJsonEditorPropertyData(t, "softwarePropertyJsonEditor")
                        }
                        if (d.softwareDetails.connectionProperty) {
                            var a = {};
                            a.form = angular.fromJson(d.softwareDetails.connectionProperty.form),
                                a.schema = angular.fromJson(d.softwareDetails.connectionProperty.schema),
                                d.softwareDetails.connectionProperty = a,
                                d.changeJsonEditorPropertyData(a, "connectionPropertyJsonEditor")
                        }
                        d.renderForm()
                    }) : (d.softwareDetails = {},
                        d.getDefaultForm(),
                        c("softwareName")),
                    d.renderJsonEditor()
            },
            d.getDefaultForm = function() {
                s.getdefaultPropertyJson().then(function(e) {
                    delete e.status,
                        d.softwareDetails.softwareProperty = angular.copy(e.data),
                        d.initialSoftwarePropertyForm = angular.toJson(d.softwareDetails.softwareProperty),
                        d.changeJsonEditorPropertyData(d.softwareDetails.softwareProperty, "softwarePropertyJsonEditor"),
                        d.softwareDetails.connectionProperty = angular.copy(e.data),
                        d.initialConnectionPropertyForm = angular.toJson(d.softwareDetails.connectionProperty),
                        d.changeJsonEditorPropertyData(d.softwareDetails.connectionProperty, "connectionPropertyJsonEditor"),
                        d.renderForm()
                })
            },
            d.renderJsonEditor = function() {
                d.connectionPropertyJsonEditor = {
                        data: {},
                        options: {
                            name: "connectionPropertyJsonEditor",
                            mode: "tree",
                            change: function() {
                                d.renderForm()
                            }
                        }
                    },
                    d.softwarePropertyJsonEditor = {
                        data: {},
                        options: {
                            name: "softwarePropertyJsonEditor",
                            mode: "tree",
                            change: function() {
                                d.renderForm()
                            }
                        }
                    }
            },
            d.init()
    }
    e.$inject = ["$scope", "$stateParams", "$state", "SweetAlert", "UtilFactory", "SERVICE_BASE_URL", "DocumentUploadService", "addSoftwareService", "toastr", "focus", "$log"],
        angular.module("cape-webapp").controller("addSoftwareController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.getMockJson = function() {
                return e({
                    method: "GET",
                    url: "app/modules/components/addIntegration/addIntegration.json"
                })
            },
            n.getAllSoftwares = function(t) {
                return e({
                    method: "GET",
                    url: a + "studio/v1/components/" + t + "/softwares"
                })
            },
            n.getSoftwareDetails = function() {
                return e({
                    method: "GET",
                    url: a + "studio/v1/softwares"
                })
            },
            n.addIntegration = function(n, o, r, i) {
                var s = a + "studio/v1/components/" + o + "/softwares/" + i + "/integration" + (r ? "" : "/" + n.softwareCode),
                    l = t.addIntegrationData(n, r);
                return e({
                    method: r ? "POST" : "PATCH",
                    url: s,
                    data: l
                })
            },
            n
    }
    e.$inject = ["$http", "addIntegrationFactory", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("addIntegrationService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("addIntegrationFactory", function() {
        return {
            addIntegrationData: function(e) {
                return {
                    description: e.description,
                    iconURL: e.iconURL,
                    integrationProperty: e.integrationProperty ? {
                        form: angular.toJson(e.integrationProperty.form),
                        schema: angular.toJson(e.integrationProperty.schema)
                    } : null,
                    properties: {},
                    softwareCode: e.softwareCode,
                    softwareName: e.softwareName
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c) {
        var u = this,
            d = e;
        u.integrationError = !1,
            u.rootComponentCode = t.rootComponentCode,
            u.componentCode = t.componentCode,
            u.componentName = t.componentName,
            u.softwareCode = t.softwareCode,
            u.softwareName = t.softwareName,
            u.integratedSoftwareCode = t.integratedSoftwareCode,
            u.softwareDescription = t.softwareDescription,
            u.allIntergratedSoftwareArray = [],
            u.search = [],
            null !== o.getFormValidationPattern() ? u.formValidationPattern = o.getFormValidationPattern() : o.callInitFunction().then(function(e) {
                o.setFormValidationPattern(e.data.validationPattern),
                    u.formValidationPattern = o.getFormValidationPattern()
            }, function(e) {}),
            d.model = {},
            u.renderForm = function() {
                u.selectedIntegratedSoftware.integrationProperty = u.jsonEditor.data,
                    d.formData = angular.copy(u.jsonEditor.data),
                    d.schema = d.formData.schema,
                    d.form = d.formData.form,
                    d.modelData = {},
                    u.safeApply()
            },
            i(function() {
                d.addAttr && (d.addAttr("disabled", !0),
                    d.setStyle("pointer-events", "none"))
            }),
            u.filterIntegration = function(e) {
                var t = [];
                !e.length && u.search.length || u.focus() ? !e.length && u.search.length && (u.integrationError = !1) : t = u.allSoftwareArray.filter(function(t) {
                    return t.match(RegExp(e, "i"))
                });
                var a = r.defer();
                return a.resolve(t),
                    a.promise
            },
            u.selectIntegration = function(e) {
                u.selectedIntegratedSoftware.softwareName = e.text,
                    u.validateIntegration()
            },
            u.removeIntegration = function(e) {
                u.selectedIntegratedSoftware.softwareName = "",
                    u.focus(),
                    u.validateIntegration()
            },
            u.focus = function() {
                return u.search.length ? u.integrationError = !0 : u.integrationError = !1
            },
            u.callOnSuccess = function(e) {
                u.softwareIconChanged = !0,
                    u.softwareDetails.iconURL = e.name,
                    u.file = e
            },
            u.validateAddIntegrationForm = function(e) {
                !e && u.search && u.search.length ? u.addIntegration() : l.error("Please fill all the mendatory fields.", "Error")
            },
            u.callOnFailure = function() {},
            u.safeApply = function() {
                var e;
                "$apply" !== (e = d.$root ? d.$root.$$phase : d.$$phase) && "$digest" !== e && d.$apply()
            },
            u.addIntegration = function() {
                if (u.integrationExist)
                    l.error("Integration already exist with " + u.selectedIntegratedSoftware.softwareName + ".", "Error");
                else {
                    if (!u.integratedSoftwareCode)
                        for (var e = 0; e < u.selectedSoftware.length; e++)
                            if (u.selectedSoftware[e].softwareName === u.selectedIntegratedSoftware.softwareName) {
                                u.selectedIntegratedSoftware.softwareCode = u.selectedSoftware[e].softwareCode,
                                    u.selectedIntegratedSoftware.iconURL = u.selectedSoftware[e].iconURL;
                                break
                            }
                    u.editedForm = angular.toJson(u.selectedIntegratedSoftware.integrationProperty),
                        angular.equals(u.initialForm, u.editedForm) ? n.swal({
                            title: "Add integration",
                            text: "Integration from " + u.integrationList.softwareName + " to " + u.selectedIntegratedSoftware.softwareName + " will be allowed",
                            type: "warning",
                            showCancelButton: !0,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            closeOnConfirm: !0,
                            closeOnCancel: !0
                        }, function(e) {
                            e && u.updateSoftware()
                        }) : u.updateSoftware()
                }
            },
            u.updateSoftware = function() {
                s.addIntegration(u.selectedIntegratedSoftware, u.componentCode, !u.integratedSoftwareCode, u.softwareCode).then(function() {
                    l.success("Software " + (u.softwareCode ? "Updated " : "Added ") + "successfullly", "Success"),
                        a.go("main.softwares", {
                            componentCode: u.rootComponentCode,
                            subComponentCode: u.componentCode,
                            subComponentName: u.componentName
                        })
                }, function(e) {
                    e.data && e.data.message && e.data.message.length ? l.error(e.data.message, "Error") : l.error("Error occurred while updating the integration!", "Error")
                })
            },
            u.onLoad = function(e) {
                e.expandAll()
            },
            u.changeData = function(e) {
                u.jsonEditor.data = e
            },
            u.changeOptions = function() {
                u.jsonEditor.options.mode = "tree" === u.jsonEditor.options.mode ? "code" : "tree"
            },
            d.submitForm = function() {
                d.$broadcast("schemaFormValidate")
            },
            u.init = function() {
                u.integratedSoftwareCode ? s.getAllSoftwares(u.componentCode).then(function(e) {
                        if (u.sourceSoftwareDetails = e.data,
                            200 === e.status && u.sourceSoftwareDetails.softwares) {
                            for (t = 0; t < u.sourceSoftwareDetails.softwares.length; t++)
                                if (u.sourceSoftwareDetails.softwares[t].softwareCode === u.softwareCode) {
                                    u.integrationList = u.sourceSoftwareDetails.softwares[t];
                                    break
                                }
                            if (u.integrationList) {
                                u.selectedIntegratedSoftware = _.filter(u.integrationList.integrations, function(e) {
                                    return e.softwareCode === u.integratedSoftwareCode
                                });
                                for (var t = 0; t < u.integrationList.integrations.length; t++)
                                    if (u.integrationList.integrations[t].softwareCode === u.integratedSoftwareCode) {
                                        u.selectedIntegratedSoftware = u.integrationList.integrations[t];
                                        break
                                    }
                                u.search.push({
                                    text: u.selectedIntegratedSoftware.softwareName
                                })
                            }
                            if (u.selectedIntegratedSoftware.integrationProperty) {
                                var a = {};
                                a.form = angular.fromJson(u.selectedIntegratedSoftware.integrationProperty.form),
                                    a.schema = angular.fromJson(u.selectedIntegratedSoftware.integrationProperty.schema),
                                    u.selectedIntegratedSoftware.integrationProperty = a,
                                    u.changeData(a),
                                    u.renderForm()
                            } else
                                u.getDefaultForm()
                        }
                    }) : (u.selectedIntegratedSoftware = {},
                        s.getAllSoftwares(u.componentCode).then(function(e) {
                            if (u.sourceSoftwareDetails = e.data,
                                200 === e.status && u.sourceSoftwareDetails.softwares) {
                                for (var t = 0; t < u.sourceSoftwareDetails.softwares.length; t++)
                                    if (u.sourceSoftwareDetails.softwares[t].softwareCode === u.softwareCode) {
                                        u.integrationList = u.sourceSoftwareDetails.softwares[t];
                                        break
                                    }
                                _.each(u.integrationList.integrations, function(e) {
                                    u.allIntergratedSoftwareArray.push(e.softwareName)
                                })
                            }
                        }),
                        s.getSoftwareDetails().then(function(e) {
                            u.softwareDetails = e.data,
                                u.selectedSoftware = [],
                                u.allSoftwareArray = [],
                                _.each(u.softwareDetails.softwares, function(e) {
                                    u.selectedSoftware.push(e),
                                        u.allSoftwareArray.push(e.softwareName)
                                }),
                                u.allSoftwareArray = _.uniq(u.allSoftwareArray),
                                u.allSoftwareArray.sort(),
                                d.removeAttr("disabled"),
                                d.removeStyle("pointer-events")
                        }),
                        u.selectedIntegratedSoftware = {},
                        u.getDefaultForm()),
                    u.renderJsonEditor()
            },
            u.validateIntegration = function() {
                return _.includes(u.allIntergratedSoftwareArray, u.selectedIntegratedSoftware.softwareName) ? (l.error("Integration already exist with " + u.selectedIntegratedSoftware.softwareName + ".", "Error"),
                    u.integrationExist = !0) : u.integrationExist = !1
            },
            u.getDefaultForm = function() {
                s.getMockJson().then(function(e) {
                    delete e.status,
                        u.selectedIntegratedSoftware.integrationProperty = e.data,
                        u.initialForm = angular.toJson(e.data),
                        u.changeData(u.selectedIntegratedSoftware.integrationProperty),
                        u.renderForm()
                })
            },
            u.renderJsonEditor = function() {
                u.jsonEditor = {
                    data: {},
                    options: {
                        mode: "tree",
                        change: function() {
                            u.renderForm()
                        }
                    }
                }
            },
            u.init()
    }
    e.$inject = ["$scope", "$stateParams", "$state", "SweetAlert", "UtilFactory", "$q", "$timeout", "addIntegrationService", "toastr", "$log"],
        angular.module("cape-webapp").controller("addIntegrationController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.updateComponent = function(n, o, r, i, s) {
                var l = a.editComponentData(n, o, r, s),
                    c = t + "studio/v1/components" + (i ? "" : "/" + o);
                return e({
                    method: i ? "POST" : "PATCH",
                    url: c,
                    data: l
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "editComponentFactory"],
        angular.module("cape-webapp").service("editComponentService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("editComponentFactory", function() {
        return {
            editComponentData: function(e, t, a, n) {
                return {
                    componentName: e,
                    componentCode: t,
                    iconURL: a,
                    categories: n
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u) {
        var d = this;
        d.componentInfo = n,
            d.imageUploaded = !1,
            d.appURL = e,
            d.categoriesArray = c,
            d.categories = [],
            d.assignedCategories = [],
            null !== l.getFormValidationPattern() ? d.formValidationPattern = l.getFormValidationPattern() : l.callInitFunction().then(function(e) {
                l.setFormValidationPattern(e.data.validationPattern),
                    d.formValidationPattern = l.getFormValidationPattern()
            }, function(e) {}),
            n ? (d.newComponent = !1,
                d.timeStamp = (new Date).getTime(),
                d.compCode = d.componentInfo.componentCode,
                d.compName = d.componentInfo.componentName,
                d.componentInfo.multipleCategories ? d.assignedCategories = d.assignedCategories.concat(d.componentInfo.multipleCategories) : d.assignedCategories = d.componentInfo.categories,
                d.categories = d.componentInfo.categories,
                d.iconURL = d.appURL + d.componentInfo.iconURL) : (d.newComponent = !0,
                d.compCode = null,
                d.compName = null,
                d.iconURL = null),
            d.setUploadImageFlag = function() {
                d.uploadImageFlag = !0
            },
            t.$on("fileUploaded", function() {
                d.imageUploaded = !0,
                    d.cancelImageSelection = !1,
                    d.saveImageSelection = !1
            }),
            d.newCompCode = d.compCode,
            d.errorCode = !1,
            d.callOnSuccess = function(e, a) {
                d.file = e,
                    d.timeStamp = "",
                    d.iconURL && d.makeFieldReadable(e, d.iconURL),
                    d.iconURL = a,
                    d.saveImageSelection = !0,
                    l.safeApply(t)
            },
            d.validateSaveDetailsForm = function(e, t) {
                d.checkFormValidation(e) && t ? d.validateUpdation() : d.uploadImageFlag = !1
            },
            d.makeFieldReadable = function(e) {
                Object.defineProperties(e, {
                    name: {
                        value: d.splitImageUrl(d.iconURL) + d.iconURL.substring(d.iconURL.lastIndexOf("."), d.iconURL.length),
                        writable: !1
                    }
                })
            },
            d.callOnFailure = function() {
                d.cancelImageSelection = !0
            },
            d.filterUser = function(e) {
                var t = d.categoriesArray.filter(function(t) {
                        return t.match(RegExp(e, "i"))
                    }),
                    a = s.defer();
                return a.resolve(t),
                    a.promise
            },
            d.addCategory = function(e) {
                d.categories.push(e.category),
                    d.isValidCategoryFormat = !1
            },
            d.validateTag = function(e) {
                var a = new RegExp(d.formValidationPattern.softwareCategory.pattern);
                d.isValidCategoryFormat = a.test(e),
                    d.validationFlag = !d.isValidCategoryFormat,
                    d.form.category.$dirty = !d.isValidCategoryFormat,
                    d.form.$submitted = !1,
                    0 === e.length ? d.validationFlag = !1 : d.validationFlag = !d.isValidCategoryFormat,
                    l.safeApply(t)
            },
            d.deleteCategory = function(e) {
                d.categories.splice(d.assignedCategories.indexOf(e), 1)
            },
            d.checkFormValidation = function(e) {
                return !(!e && !d.saveImageSelection) || (o.error("There are no changes to save"), !1)
            },
            d.validateUpdation = function() {
                d.file ? d.getImageURL() : d.componentInfo && d.componentInfo.iconURL ? d.updateComponentData(d.componentInfo.iconURL, d.compCode) : o.error("Please upload component icon.", "Error")
            },
            d.getImageURL = function() {
                i.uploadFile(d.file).then(function(e) {
                    e && (d.componentInfo && (d.componentCode = d.componentInfo ? d.componentInfo.componentCode : d.splitImageUrl(e.data.iconURL)),
                        d.updateComponentData(e.data.iconURL, d.componentCode))
                }, function(e) {
                    o.error(e.data.message, "Error")
                })
            },
            d.splitImageUrl = function(e) {
                var t = e.split("/"),
                    a = t[t.length - 1];
                return a.substring(0, a.lastIndexOf("."))
            },
            d.onCancel = function() {
                a.close(!1)
            },
            d.updateComponentData = function(e, t) {
                r.updateComponent(d.compName, t, e, d.newComponent, d.categories).then(function(e) {
                    200 === e.status ? a.close(!0) : o.error(e.message, "Error")
                }, function(e) {
                    e && e.data && e.data.message && e.data.message.length ? d.updateComponentErrorMessage = e.data.message : d.updateComponentErrorMessage = "Error occurred while processing request!"
                })
            },
            d.init = function() {
                d.assignedCategories.length && (d.validationFlag = !1)
            },
            d.init()
    }
    e.$inject = ["SERVICE_BASE_URL", "$scope", "$uibModalInstance", "componentInfo", "toastr", "editComponentService", "DocumentUploadService", "$q", "UtilFactory", "categoriesArray", "$log"],
        angular.module("cape-webapp").controller("editComponentController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.editCanvas = function(n) {
                var o = t + "studio/v1/projects/" + n.projectCode + "/canvases/" + n.canvasCode + "/rename",
                    r = a.updateCanvasData(n);
                return e({
                    method: "PATCH",
                    url: o,
                    data: r
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "updateCanvasFactory"],
        angular.module("cape-webapp").service("editCanvasService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("updateCanvasFactory", function() {
        return {
            updateCanvasData: function(e) {
                return {
                    canvasName: e.canvasName,
                    description: e.description,
                    createdBy: e.createdBy,
                    orgCode: e.orgCode,
                    projectCode: e.projectCode,
                    version: e.version
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l) {
        var c = this;
        null !== n.getFormValidationPattern() ? c.formValidationPattern = n.getFormValidationPattern() : n.callInitFunction().then(function(e) {
                n.setFormValidationPattern(e.data.validationPattern),
                    c.formValidationPattern = n.getFormValidationPattern()
            }, function(e) {}),
            c.init = function() {
                c.isChanged = !1,
                    c.isCanvasNameValid = !0,
                    c.isCanvasNameChanged = !1,
                    c.isDescriptionChanged = !1,
                    c.projectName = s.projectName,
                    c.canvasInfo = angular.copy(a),
                    i("canvasName")
            },
            c.validateEditCanvasForm = function(e) {
                c.isCanvasNameChanged && c.isCanvasNameValid && e || c.isDescriptionChanged && e ? c.editCanvas() : r.error("There is nothing to edit")
            },
            c.validateCanvasName = function() {
                for (var e = 0, t = 0; t <= s.canvases.length - 1; t++) {
                    var a = s.canvases[t].canvasName;
                    if (c.canvasInfo.canvasName && a.toUpperCase() === c.canvasInfo.canvasName.toUpperCase()) {
                        e++;
                        break
                    }
                }
                e ? (c.isCanvasNameValid = !1,
                    c.isCanvasNameChanged = !1,
                    e = 0) : (c.isCanvasNameValid = !0,
                    c.isCanvasNameChanged = !0,
                    e = 0)
            },
            c.canvasDescriptionUpdated = function() {
                a.description !== c.canvasInfo.description ? c.isDescriptionChanged = !0 : c.isDescriptionChanged = !1
            },
            c.onCancel = function() {
                t.close(!1)
            },
            c.editCanvas = function() {
                c.isChanged = !0,
                    a = angular.copy(c.canvasInfo),
                    l.editCanvas(a).then(function() {
                        r.success("Canvas Edited Successfully.", "Success"),
                            c.isChanged = !1,
                            t.close(!0),
                            e.go("main.canvasList", {
                                projectCode: s.projectCode
                            })
                    }, function(e) {
                        c.isChanged = !1,
                            e.data && e.data.message && e.data.message.length ? c.editCanvasErrorMessage = e.data.message : c.editCanvasErrorMessage = "Error occurred while processing request!"
                    })
            },
            c.init()
    }
    e.$inject = ["$state", "$uibModalInstance", "canvasInfo", "UtilFactory", "$log", "toastr", "focus", "canvasList", "editCanvasService"],
        angular.module("cape-webapp").controller("EditCanvasController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("zoomFactory", function() {
        var e = {};
        return e.interpolateZoom = function(e, t, a, n, o) {
                return d3.transition().duration(350).tween("zoom", function() {
                    var r = d3.interpolate(t.translate(), a),
                        i = d3.interpolate(t.scale(), n);
                    return function(s) {
                        t.scale(i(s)).translate(r(s)),
                            o && o(e, a[0], a[1], n)
                    }
                })
            },
            e.zoomClick = function(e, t, a, n) {
                var o = 1,
                    r = 1,
                    i = [a / 2, n / 2],
                    s = t.scaleExtent(),
                    l = t.translate(),
                    c = [],
                    u = [],
                    d = {
                        x: l[0],
                        y: l[1],
                        k: t.scale()
                    };
                return o = "zoom_in" === e ? 1 : -1,
                    (r = t.scale() * (1 + .2 * o)) < s[0] || r > s[1] ? d : (c = [(i[0] - d.x) / d.k, (i[1] - d.y) / d.k],
                        d.k = r,
                        u = [c[0] * d.k + d.x, c[1] * d.k + d.y],
                        d.x += i[0] - u[0],
                        d.y += i[1] - u[1],
                        d)
            },
            e
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n) {
        var o = {};
        return o.getPalette = function() {
                return e({
                    method: "GET",
                    url: t + "studio/v1/components"
                })
            },
            o.retrieveCanvasDetails = function(a, o, r, i) {
                var s = t + "studio/v1/projects/" + a + "/canvas/" + o;
                return n.registerCallback(s, function() {
                    return n.insertUriInProgress(s, !0),
                        e({
                            method: "GET",
                            url: s,
                            params: {
                                versionNum: r
                            },
                            ignoreLoadingBar: !0
                        })
                }, !angular.isDefined(i) || i)
            },
            o.updateCanvasDetails = function(n, o, r, i, s, l, c, u, d) {
                var p = a.drawCanvasData(n, o, i, l, c, u, d);
                return e({
                    method: "PATCH",
                    url: t + "studio/v1/projects/" + s + "/canvases/" + r,
                    data: p,
                    ignoreLoadingBar: !0
                })
            },
            o.installSoftwareAndVm = function(a, n) {
                return e({
                    method: "GET",
                    url: t + "studio/v1/canvases/" + a + "/" + n + "/run",
                    ignoreLoadingBar: !0
                })
            },
            o.getSoftwareActions = function(a, n) {
                return e({
                    method: "POST",
                    url: t + "studio/v1/canvas/" + a + "/software/getActions",
                    data: {
                        swId: n
                    }
                })
            },
            o.executeSoftwareAction = function(a, n) {
                return e({
                    method: "POST",
                    url: t + "studio/v1/canvas/" + a + "/software/executeAction",
                    data: n
                })
            },
            o.installationLog = function(a) {
                return e({
                    method: "GET",
                    url: t + "studio/v1/software/executionLog/" + a,
                    ignoreLoadingBar: !0
                })
            },
            o.getBoilerplate = function(a, o, r, i) {
                var s = t + "studio/v1/orgs/" + a + "/boilerplates/" + o + "/" + r;
                return n.registerCallback(s, function() {
                    return n.insertUriInProgress(s, !0),
                        e({
                            method: "GET",
                            url: s,
                            ignoreLoadingBar: !0
                        })
                }, !angular.isDefined(i) || i)
            },
            o.deleteCanvas = function(a, n) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/projects/" + a + "/canvases/" + n
                })
            },
            o.getAllCanvases = function(a) {
                return e({
                    method: "GET",
                    url: t + "studio/v1/projects/" + a + "/canvases"
                })
            },
            o.deleteBoilerplate = function(a, n, o) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/orgs/" + a + "/boilerplate/" + n + "/" + o
                })
            },
            o.encryptCanvas = function(a) {
                return e({
                    method: "POST",
                    url: t + "studio/v1/canvas/encrypt",
                    data: a
                })
            },
            o
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "drawCanvasFactory", "cacheFactory"],
        angular.module("cape-webapp").service("drawCanvasServices", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("drawCanvasFactory", function() {
        return {
            drawCanvasData: function(e, t, a, n, o, r, i) {
                return {
                    canvasName: a,
                    paths: e,
                    nodes: t,
                    auditInfoAction: n,
                    version: o,
                    screenResolution: r,
                    createdBy: i.createdBy,
                    description: i.description,
                    orgCode: i.orgCode,
                    projectCode: i.projectCode
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u, d, p) {
        var f = this;
        f.selfStateName = a.$resolve.$$state.self.name,
            f.cleanCache = o.checkCache(f.selfStateName),
            o.clearAllInterval(),
            f.granularAccessControl = d,
            f.canvasName = e.canvasName,
            f.canvasCode = e.canvasCode,
            f.projectCode = e.projectCode,
            f.type = e.type ? e.type : null,
            f.boilerplateType = f.type === u.BOILERPLATE_TYPE.GLOBAL ? u.BOILERPLATE_TYPE.GLOBAL : u.BOILERPLATE_TYPE.LOCAL,
            f.PAYLOAD_ENUM = u,
            f.isBoilerplate = "false" === e.isCanvas,
            f.drawCanvasCommonFactory = l,
            f.drawCanvasCommonFactory.setProvisionLogFlag(!1),
            f.drawCanvasCommonFactory.setProvisionLogCallback(null),
            f.drawCanvasCommonFactory.setLogClosedByUserFlag(!1),
            f.drawCanvasCommonFactory.setCanvasUpdateFlag(!1),
            f.drawCanvasCommonFactory.setCanvasInstallFlag(!1),
            f.drawCanvasCommonFactory.setCanvasFetchFlag(!1),
            f.showIntegrationLabel = l.getIntegrationLabelFLag(),
            f.init = function() {
                f.isBoilerplate ? f.retrieveBoilerplateDetails() : f.retrieveCanvasDetails(function() {
                    f.canvasInfo.status === u.CANVAS_STATUS.INSTALLING ? (f.installing = !0,
                        angular.equals(t.current.name, "main.drawCanvas.provision.defaultView") || t.go("main.drawCanvas.provision")) : f.installing = !1
                })
            },
            f.createCanvasFromSVG = function() {
                var e = (new XMLSerializer).serializeToString(document.querySelector("svg")),
                    t = document.getElementById("canvas"),
                    a = t.getContext("2d"),
                    n = self.URL || self.webkitURL || self,
                    o = new Image,
                    r = new Blob([e], {
                        type: "image/svg+xml;charset=utf-8"
                    }),
                    i = n.createObjectURL(r);
                o.onload = function() {
                        a.drawImage(o, 0, 0);
                        var e = t.toDataURL("image/png");
                        document.querySelector("#png-container").innerHTML = '<img src="' + e + '"/>',
                            n.revokeObjectURL(e)
                    },
                    o.src = i
            },
            f.checkInstallingStatus = function() {
                f.canvasIsInstalling = l.getCanvasInstallFlag()
            },
            f.useAsCanvas = function() {
                d.isAuthorised(u.ACCESS_CONTROL_LIST.GLOBAL_BOILERPLATE + "|" + u.ACCESS_CONTROL_LIST.LOCAL_BOILERPLATE, !1) && d.isAuthorised(u.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && n.open({
                    templateUrl: "app/modules/boilerplate/useAsCanvas/useAsCanvas.html",
                    controller: "useAsCanvasController",
                    controllerAs: "useAsCanvasCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        canvasInfo: function() {
                            return f.canvasInfo
                        }
                    }
                })
            },
            f.disableTab = function() {
                return !!(f.drawCanvasCommonFactory.getCanvasUpdateFlag() || f.drawCanvasCommonFactory.getCanvasInstallFlag() && !f.isBoilerplate)
            },
            f.getIntergartionLabelStatus = function() {
                f.showIntegrationLabel = !f.showIntegrationLabel,
                    l.setIntegrationLabelFLag(f.showIntegrationLabel),
                    l.getIntergartionLabelCallback()()
            },
            f.retrieveBoilerplateDetails = function() {
                i.getBoilerplate(e.projectCode, e.type, e.canvasCode, f.cleanCache).then(function(e) {
                    200 === e.status && (p.upsertCacheData(e.config.url, e),
                        p.deleteUriInProgress(e.config.url),
                        p.callRegisteredCallBackAndRemove(e.config.url),
                        e.data.canvasName = e.data.boilerplateName,
                        e.data.projectCode = e.data.orgCode,
                        e.data.projectName = e.data.orgCode,
                        f.canvasInfo = e.data)
                }, function(e) {
                    e.data && e.data.message && e.data.message.length ? c.error(e.data.message, "Error") : c.error("Error occurred while processing request!", "Error")
                })
            },
            f.deleteBoilerplate = function() {
                if ("Global" === f.canvasInfo.type && d.isAuthorised(u.ACCESS_CONTROL_LIST.ADMIN_PLATFORM, !1) || "Local" === f.canvasInfo.type && d.isAuthorised(u.ACCESS_CONTROL_LIST.LOCAL_BOILERPLATE, !1)) {
                    var e = f.canvasInfo,
                        a = {
                            title: "Delete boilerplate",
                            text: e.boilerplateName + " will be deleted",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No"
                        };
                    r.complexView(a, e, function(a, n) {
                        a && i.deleteBoilerplate(n.orgCode, n.type, n.boilerplateCode).then(function() {
                            "Global" === e.type ? t.go("main.boilerplate", {
                                    type: "Global",
                                    viewType: "Grid"
                                }) : t.go("main.boilerplate", {
                                    type: "Local",
                                    viewType: "Grid"
                                }),
                                c.success("Boilerplate deleted successfully.", "Success")
                        }, function() {
                            c.error("Unable to delete boilerplate!", "Error")
                        })
                    })
                }
            },
            f.changeTab = function(e) {
                (!f.drawCanvasCommonFactory.getCanvasUpdateFlag() && !f.drawCanvasCommonFactory.getCanvasInstallFlag() || f.isBoilerplate) && t.go(e)
            },
            f.deleteCanvas = function() {
                if (d.isAuthorised(u.ACCESS_CONTROL_LIST.CANVAS_DELETE, !1))
                    if (l.getCanvasStatus() !== u.CANVAS_STATUS.EXECUTING) {
                        var e = {
                                title: "Delete canvas",
                                text: "Canvas will be deleted",
                                confirmButtonText: "Yes",
                                cancelButtonText: "No"
                            },
                            a = {
                                projectCode: f.canvasInfo.projectCode,
                                canvasCode: f.canvasInfo.canvasCode
                            };
                        r.complexView(e, a, function(e, a) {
                            e && i.deleteCanvas(a.projectCode, a.canvasCode).then(function() {
                                t.go("main.canvasList", {
                                        projectCode: f.canvasInfo.projectCode
                                    }),
                                    c.success("Canvas deleted successfully.", "Success")
                            }, function() {
                                c.error("Unable to delete canvas.", "Error")
                            })
                        })
                    } else
                        c.error("Please unprovision the canvas before deleting it.", "Error")
            },
            f.logHistoryOpen = !1,
            f.auditTrailViewOpen = !1,
            f.logHistoryData = {
                canvasCode: f.canvasCode,
                projectCode: f.projectCode
            },
            f.auditTrailData = f.logHistoryData,
            f.toggleLogHistory = function() {
                d.isAuthorised(u.ACCESS_CONTROL_LIST.CANVAS_EXECUTE + "|" + u.ACCESS_CONTROL_LIST.CANVAS_PROVISION, !1) && (f.logHistoryOpen = !f.logHistoryOpen)
            },
            f.showAuditTrailView = function() {
                d.isAuthorised(u.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && (f.auditTrailViewOpen = !f.auditTrailViewOpen)
            },
            f.saveJsonData = function() {
                d.isAuthorised(u.ACCESS_CONTROL_LIST.CANVAS_VIEW, !1) && f.retrieveCanvasDetails(function(e) {
                    l.makeAllNodesAsDraft(e);
                    var t = e.canvasName + "." + u.CANVAS_EXTENSION;
                    i.encryptCanvas(e).then(function(e) {
                        var a = e.data.encryptedData,
                            n = document.createElement("a");
                        document.body.appendChild(n),
                            n.style = "display: none";
                        var o = new Blob([a], {
                                type: "application/cns"
                            }),
                            r = window.URL.createObjectURL(o);
                        n.href = r,
                            n.download = t,
                            n.click(),
                            window.URL.revokeObjectURL(r)
                    }, function() {
                        c.error("Unable to encrypted canvas.", "Error")
                    })
                })
            },
            f.retrieveCanvasDetails = function(t) {
                l.setCanvasFetchFlag(!0),
                    i.retrieveCanvasDetails(e.projectCode, e.canvasCode, null, f.cleanCache).then(function(e) {
                        l.setCanvasData(e.data),
                            p.upsertCacheData(e.config.url, e),
                            p.deleteUriInProgress(e.config.url),
                            p.callRegisteredCallBackAndRemove(e.config.url),
                            l.setCanvasStatus(e.data.status),
                            l.setCanvasFetchFlag(!1),
                            s.setMessage("Canvas up to date"),
                            200 === e.status && (f.canvasInfo = e.data,
                                t && t(e.data))
                    }, function() {
                        l.setCanvasFetchFlag(!1),
                            s.setMessage("Canvas loading failed"),
                            f.isGetFetched = !0,
                            f.getResponseFetched = !0,
                            c.error("Error occurred while processing request!")
                    })
            },
            f.saveBoilerplate = function() {
                d.isAuthorised(u.ACCESS_CONTROL_LIST.GLOBAL_BOILERPLATE + "|" + u.ACCESS_CONTROL_LIST.LOCAL_BOILERPLATE, !1) && d.isAuthorised(u.ACCESS_CONTROL_LIST.CANVAS_VIEW, !1) && n.open({
                    templateUrl: "app/modules/boilerplate/saveAndEditBoilerplate/saveBoilerplate.html",
                    controller: "SaveBoilerplateController",
                    controllerAs: "SaveBoilerplateCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        canvasDetails: function() {
                            return angular.copy(f.canvasInfo)
                        },
                        editBoilerplateEnabled: function() {
                            return !1
                        },
                        boilerplateDetails: function() {
                            return !1
                        },
                        boilerplateList: function() {
                            return !1
                        }
                    }
                })
            },
            a.$on("$destroy", function() {
                l.setCanvasData(null)
            }),
            f.init()
    }
    e.$inject = ["$stateParams", "$state", "$scope", "$uibModal", "UtilFactory", "SweetAlerts", "drawCanvasServices", "mainFactory", "drawCanvasCommonFactory", "toastr", "PAYLOAD_ENUM", "granularAccessControl", "cacheFactory"],
        angular.module("cape-webapp").controller("drawCanvasController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a, n = {},
            o = null,
            r = null,
            i = !1,
            s = !1,
            l = !1,
            c = !1,
            u = null,
            d = !1,
            p = null,
            f = null,
            g = null,
            m = null,
            h = !0,
            v = null,
            C = null,
            w = !1;
        return n.setLastStateLoaded = function(e) {
                a = e
            },
            n.getLastStateLoaded = function() {
                return a
            },
            n.setIntegrationLabelFLag = function(e) {
                w = e
            },
            n.getIntegrationLabelFLag = function() {
                return w
            },
            n.setChildControllerScope = function(e) {
                v = e
            },
            n.getChildControllerScope = function() {
                return v
            },
            n.setChildControllerScopeForAnalyze = function(e) {
                C = e
            },
            n.getChildControllerScopeForAnalyze = function() {
                return C
            },
            n.setAnalyzeDefaultViewData = function(e) {
                o = e
            },
            n.getAnalyzeDefaultViewData = function() {
                return o
            },
            n.setCanvasData = function(e) {
                r = angular.copy(e)
            },
            n.getCanvasData = function() {
                return angular.copy(r)
            },
            n.setIntergartionLabelCallback = function(e) {
                h = e
            },
            n.getIntergartionLabelCallback = function() {
                return h
            },
            n.setCanvasStatus = function(e) {
                m = e
            },
            n.getCanvasStatus = function() {
                return m
            },
            n.setLogClosedByUserFlag = function(e) {
                d = e
            },
            n.getLogClosedByUserFlag = function() {
                return d
            },
            n.setProvisionLogFlag = function(e) {
                c = e
            },
            n.getProvisionLogFlag = function() {
                return c
            },
            n.setProvisionLogCallback = function(e) {
                u = e
            },
            n.getProvisionLogCallback = function() {
                return u
            },
            n.setCanvasUpdateFlag = function(e) {
                i = e
            },
            n.setCanvasFetchFlag = function(e) {
                s = e
            },
            n.setCanvasInstallFlag = function(e) {
                l = e
            },
            n.getCanvasUpdateFlag = function() {
                return i
            },
            n.getCanvasFetchFlag = function() {
                return s
            },
            n.getCanvasInstallFlag = function() {
                return l
            },
            n.setSetViewOptionsCallbackForProvisionTab = function(e) {
                p = e
            },
            n.getSetViewOptionsCallbackForProvisionTab = function() {
                return p
            },
            n.setDeleteViewOptionsCallbackForProvisionTab = function(e) {
                f = e
            },
            n.getDeleteViewOptionsCallbackForProvisionTab = function() {
                return f
            },
            n.setAssignViewOptionOnFirstLoadCallback = function(e) {
                g = e
            },
            n.getAssignViewOptionOnFirstLoadCallback = function() {
                return g
            },
            n.makeAllPathsAsDraft = function(t) {
                _.forEach(t.paths, function(t) {
                    t.status = e.SOFTWARE_STATUS.DRAFT
                })
            },
            n.makeAllNodesAsDraft = function(t) {
                _.forEach(t.nodes, function(t) {
                    t.type === e.NODE_TYPE.VM_NODE && (_.forEach(t.softwares, function(t) {
                                t.status !== e.SOFTWARE_STATUS.REMOVED && (t.status = e.SOFTWARE_STATUS.DRAFT)
                            }),
                            t.processes = null),
                        t.status = e.SOFTWARE_STATUS.DRAFT
                })
            },
            n.createContainer = function(e, t, a, n) {
                var o = {
                        top: -5,
                        right: -5,
                        bottom: -5,
                        left: -5
                    },
                    r = t + o.left + o.right,
                    i = a + o.top + o.bottom,
                    s = d3.select("#" + e).append("svg").attr("width", r + o.left + o.right).attr("height", i + o.top + o.bottom).attr({
                        xmlns: "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink"
                    }).append("g").attr("transform", "translate(" + o.left + "," + o.right + ")").call(n);
                s.on("mousemove.zoom", null),
                    s.on("dblclick.zoom", null),
                    s.on("touchstart.zoom", null),
                    s.on("MozMousePixelScroll.zoom", null),
                    s.append("svg:defs").append("svg:marker").attr("id", "end-arrow").attr("viewBox", "0 -5 10 10").attr("refX", 3).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5").attr("fill", "black"),
                    s.append("svg:defs").append("svg:marker").attr("id", "start-arrow").attr("viewBox", "0 -5 10 10").attr("refX", 4).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("svg:path").attr("d", "M10,-5L0,0L10,5").attr("fill", "black"),
                    s.append("svg:defs").append("svg:pattern").attr("id", "plug").attr("width", 20).attr("height", 20).append("svg:image").attr("xlink:href", "assets/images/connection-arrow.svg").attr("width", 20).attr("height", 20).attr("x", 0).attr("y", 0),
                    s.append("svg:defs").append("svg:pattern").attr("id", "socket").attr("width", 20).attr("height", 20).append("svg:image").attr("xlink:href", "assets/images/socket.svg").attr("width", 20).attr("height", 20).attr("x", 0).attr("y", 0);
                var l = s.append("g");
                l.append("rect").attr("width", r).attr("height", i).style("fill", "#fafafa").style("pointer-events", "all");
                return l.append("g").attr("class", "x axis").selectAll("line").data(d3.range(0, r, 35)).enter().append("line").attr("x1", function(e) {
                        return e
                    }).attr("y1", 0).attr("x2", function(e) {
                        return e
                    }).attr("y2", i).attr({
                        fill: "none",
                        stroke: "#ddd",
                        "shape-rendering": "crispEdges",
                        "vector-effect": "non-scaling-stroke"
                    }),
                    l.append("g").attr("class", "y axis").selectAll("line").data(d3.range(0, i, 35)).enter().append("line").attr("x1", 0).attr("y1", function(e) {
                        return e
                    }).attr("x2", r).attr("y2", function(e) {
                        return e
                    }).attr({
                        fill: "none",
                        stroke: "#ddd",
                        "shape-rendering": "crispEdges",
                        "vector-effect": "non-scaling-stroke"
                    }),
                    l
            },
            n.containerZoom = function(e, t, a, n) {
                e.attr("transform", ["translate(" + [t, a] + ")", "scale(" + n + ")"].join(" "))
            },
            n
    }
    e.$inject = ["PAYLOAD_ENUM", "$document"],
        angular.module("cape-webapp").factory("drawCanvasCommonFactory", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.createCanvas = function(n, o, r, i) {
                var s = a.createCanvasData(n, o, r, i);
                return e({
                    method: "POST",
                    url: t + "studio/v1/projects/" + o + "/canvases",
                    data: s
                })
            },
            n.decryptCanvas = function(a) {
                return e({
                    method: "POST",
                    url: t + "studio/v1/canvas/decrypt",
                    data: a
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "createCanvasFactory"],
        angular.module("cape-webapp").service("createCanvasService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("createCanvasFactory", function() {
        return {
            createCanvasData: function(e, t, a, n) {
                return a.projectCode = t,
                    a.createdBy = e,
                    a.version = 1,
                    a.orgCode = n,
                    a
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u, d, p) {
        var f = this;
        f.canvasTypeNew = d.CANVAS_TYPE.NEW,
            f.createCanvasOption = f.canvasTypeNew,
            f.canvasTypeExisting = d.CANVAS_TYPE.EXISTING,
            f.type = f.canvasTypeNew,
            f.isCreated = !1,
            f.userInfo = r.getLoggedInUserDetails(),
            f.errorMessage = "",
            f.importedFile = !1,
            f.canvasData = {},
            null !== o.getFormValidationPattern() ? f.formValidationPattern = o.getFormValidationPattern() : o.callInitFunction().then(function(e) {
                o.setFormValidationPattern(e.data.validationPattern),
                    f.formValidationPattern = o.getFormValidationPattern()
            }, function(e) {}),
            f.init = function() {
                f.isCanvasNameTest = !0,
                    s("canvasName"),
                    f.loadAllProject()
            },
            f.importCanvas = function(e) {
                f.importedFile = e,
                    f.resetFile()
            },
            f.stateFlag = e.current.name,
            f.userInfo = r.getLoggedInUserDetails(),
            f.projectName = l ? l.projectName : null,
            f.isCanvasNameValid = !1,
            t.$on("fileUploaded", function(e, t) {
                f.handleFileSelect(t.file)
            }),
            f.handleFileSelect = function(e) {
                var t = new FileReader;
                t.onload = function(t) {
                        n.$apply(function() {
                            if (f.errorMessage = "",
                                e.name.substring(e.name.lastIndexOf(".") + 1, e.name.length) === d.CANVAS_EXTENSION)
                                try {
                                    f.fileName = e.name,
                                        c.decryptCanvas(t.target.result).then(function(e) {
                                            var t = e.data;
                                            f.canvasData = angular.fromJson(t),
                                                f.canvasData.id = null,
                                                f.validateCanvasName()
                                        }, function() {
                                            i.error("Unable to decrypt canvas.", "Error")
                                        })
                                } catch (e) {
                                    f.errorMessage = "File is corrupted, Please select another file."
                                }
                            else
                                f.errorMessage = "Please select the file with " + d.CANVAS_EXTENSION + " extension"
                        })
                    },
                    t.readAsText(e)
            },
            f.resetFile = function() {
                f.errorMessage = "",
                    f.canvasData = {},
                    f.fileName = ""
            },
            f.validateCreateCanvasForm = function(e) {
                !f.errorMessage && f.isCanvasNameValid && e && f.createCanvas()
            },
            f.validateCanvasName = function() {
                if ("main.home" !== f.stateFlag) {
                    for (var e = 0, t = 0; t <= l.canvases.length - 1; t++) {
                        var a = l.canvases[t].canvasName;
                        if (f.canvasData.canvasName && a.toUpperCase() === f.canvasData.canvasName.toUpperCase()) {
                            e++;
                            break
                        }
                    }
                    e ? (f.isCanvasNameTest = !1,
                        f.isCanvasNameValid = !1) : (f.isCanvasNameTest = !0,
                        f.isCanvasNameValid = !0)
                } else
                    f.isCanvasNameValid = !0
            },
            f.onCancel = function() {
                a.close(!0)
            },
            f.createCanvas = function() {
                var t = _.find(f.projects, function(e) {
                    if (e.projectName === f.projectName)
                        return e.projectCode
                });
                f.isCreated = !0,
                    c.createCanvas(f.userInfo.username, t.projectCode, f.canvasData, f.userInfo.orgCode).then(function(t) {
                        i.success("Canvas Created Successfully.", "Success"),
                            f.isCreated = !1,
                            a.close(!0),
                            e.go("main.drawCanvas.compose", {
                                projectCode: t.data.projectCode,
                                canvasCode: t.data.canvasCode,
                                canvasName: t.data.canvasName
                            })
                    }, function(e) {
                        f.isCreated = !1,
                            e.data && e.data.message && e.data.message.length ? f.createCanvasErrorMessage = e.data.message : f.createCanvasErrorMessage = "Error occurred while processing request!"
                    })
            },
            f.loadAllProject = function() {
                o.getAllProjectData() ? f.projects = o.getAllProjectData() : u.getAllProjects(f.userInfo.username).then(function(e) {
                    o.setAllProjectData(e.data),
                        f.projects = e.data
                }, function() {
                    f.projects = []
                })
            },
            f.init()
    }
    e.$inject = ["$state", "$rootScope", "$uibModalInstance", "$scope", "UtilFactory", "userDetails", "toastr", "focus", "canvasList", "createCanvasService", "mainService", "PAYLOAD_ENUM", "$log"],
        angular.module("cape-webapp").controller("createCanvasController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("CanvasListController", ["$state", "$stateParams", "$scope", "$uibModal", "PAYLOAD_ENUM", "SERVICE_BASE_URL", "UtilFactory", "lazyloadingFactory", "granularAccessControl", function(e, t, a, n, o, r, i, s, l) {
        var c = this;
        a.title = "Testing Unit Test Case",
            c.isResponse = !1,
            c.allCanvasStatus = o.CANVAS_STATUS,
            c.projectCode = t.projectCode,
            c.listHeader = ["S.No", "Canvas Name", "Description", "Last Updated", "Total Components", "Total Virtual Machines", "Activity", "Logs", "Edit"],
            c.gridView = (t.viewType ? t.viewType : o.CANVAS_VIEW_TYPE.GRID) === o.CANVAS_VIEW_TYPE.GRID,
            c.toggleViews = function(a) {
                a || c.filterListData(),
                    c.gridView = a,
                    t.viewType = a ? o.CANVAS_VIEW_TYPE.GRID : o.CANVAS_VIEW_TYPE.LIST,
                    e.go(e.current.name, t, {
                        notify: !1
                    })
            },
            c.filterListData = function() {
                c.listData = [],
                    _.each(c.canvasInfo.canvases, function(e, t) {
                        var a = {
                            action: !0,
                            actionCallback: c.navigateInsideList,
                            actionArgs: e,
                            child: {
                                slNo: {
                                    action: !1,
                                    value: t + 1
                                },
                                name: {
                                    action: !1,
                                    value: e.canvasName
                                },
                                desc: {
                                    action: !1,
                                    value: e.description
                                },
                                created_on: {
                                    action: !1,
                                    value: e.lastUpdatedOn,
                                    isFilter: !0,
                                    filterName: "date",
                                    filterFormat: "yyyy-MM-dd hh:mm:ss"
                                },
                                no_of_software: {
                                    action: !1,
                                    value: e.softwareCount
                                },
                                no_of_vms: {
                                    action: !1,
                                    value: e.vmCount
                                },
                                activity: {
                                    action: !0,
                                    value: "Activity",
                                    actionArgs: e,
                                    actionCallback: c.showAuditTrailView
                                },
                                logs: {
                                    action: !0,
                                    value: "Logs",
                                    actionArgs: e,
                                    actionCallback: c.showLogHistoryView
                                },
                                edit: {
                                    action: !0,
                                    value: "Edit",
                                    actionArgs: e,
                                    actionCallback: c.editCanvas
                                }
                            }
                        };
                        c.listData.push(a)
                    })
            },
            c.navigateInsideList = function(t) {
                e.go("main.drawCanvas.compose", {
                    canvasName: t.canvasName,
                    canvasCode: t.canvasCode,
                    projectCode: t.projectCode
                })
            },
            c.loadCanvases = function(e, t) {
                c.errorMessage = "",
                    200 === t && (e && e.canvases.length && (_.forEach(e.canvases, function(e) {
                                e.totalVm = _.filter(e.tags, {
                                        type: "vmNode"
                                    }).length,
                                    e.totalSoftware = _.filter(e.tags, {
                                        type: "softwareNode"
                                    }).length,
                                    e.vmCount = e.totalVm < 10 ? "0" + e.totalVm : e.totalVm,
                                    e.softwareCount = e.totalSoftware < 10 ? "0" + e.totalSoftware : e.totalSoftware
                            }),
                            angular.forEach(e.canvases, function(e) {
                                var t = 0,
                                    a = 0;
                                if (e.tags)
                                    for (var n = 0; n < e.tags.length; n++)
                                        "Installed" === e.tags[n].status && "softwareNode" === e.tags[n].type ? t++ : "Installed" === e.tags[n].status && "vmNode" === e.tags[n].type && a++;
                                e.installedSoftwareCount = t < 10 ? "0" + t : t,
                                    e.installedVmCount = a < 10 ? "0" + a : a,
                                    c.canvasInfo.canvases.push(e)
                            }),
                            c.canvasInfo.projectCode = e.projectCode,
                            c.canvasInfo.count = e.count),
                        c.canvasInfo.projectName = e.projectName,
                        c.isResponse = !0,
                        c.gridView || c.filterListData())
            },
            c.init = function() {
                c.resetScroll = !0;
                var e = r + "studio/v1/projects/" + c.projectCode + "/canvases/";
                c.canvasInfo = {
                        projectCode: "",
                        projectName: "",
                        canvases: [],
                        count: 0
                    },
                    c.lazyLoading.url = e,
                    c.lazyLoading.pageNumber = 0,
                    c.lazyLoading.params = {
                        searchKey: c.canvasSearch
                    },
                    c.lazyLoading.isEmpty = !1,
                    c.lazyLoading.nextPage()
            },
            c.clearSearch = function() {
                c.canvasSearch = "",
                    c.init()
            },
            c.createCanvas = function() {
                l.isAuthorised(o.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && n.open({
                    templateUrl: "app/modules/canvas/createCanvas/createCanvas.html",
                    controller: "createCanvasController",
                    controllerAs: "createCanvasCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        projectCode: function() {
                            return c.projectCode
                        },
                        canvasList: function() {
                            return c.canvasInfo
                        }
                    }
                })
            },
            c.editCanvas = function(e, t) {
                t.stopPropagation(),
                    l.isAuthorised(o.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && n.open({
                        templateUrl: "app/modules/canvas/editCanvas/editCanvas.html",
                        controller: "EditCanvasController",
                        controllerAs: "EditCanvasCtrl",
                        windowClass: "my-modal",
                        backdrop: "static",
                        keyboard: !1,
                        resolve: {
                            canvasInfo: function() {
                                return e
                            },
                            canvasList: function() {
                                return c.canvasInfo
                            }
                        }
                    }).result.then(function(e) {
                        e && c.init()
                    }, function() {})
            },
            c.logHistoryOpen = !1,
            c.showLogHistoryView = function(e, t) {
                t.stopPropagation(),
                    l.isAuthorised(o.ACCESS_CONTROL_LIST.CANVAS_EXECUTE + "|" + o.ACCESS_CONTROL_LIST.CANVAS_PROVISION, !1) && (c.logHistoryData = {
                            canvasCode: e.canvasCode,
                            projectCode: e.projectCode
                        },
                        c.logHistoryOpen = !c.logHistoryOpen)
            },
            c.auditTrailViewOpen = !1,
            c.showAuditTrailView = function(e, t) {
                t.stopPropagation(),
                    l.isAuthorised(o.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && (c.auditTrailData = {
                            canvasCode: e.canvasCode,
                            projectCode: e.projectCode
                        },
                        c.auditTrailViewOpen = !c.auditTrailViewOpen)
            },
            c.safeApply = function() {
                var e;
                "$apply" !== (e = a.$root ? a.$root.$$phase : a.$$phase) && "$digest" !== e && a.$apply()
            },
            c.failedLoading = function(e) {
                c.errorMessage = "Error occurred while processing request!"
            };
        var u = new s.LazyLoading;
        u.resAttr = "canvases",
            u.callback = c.loadCanvases,
            u.errorCallback = c.failedLoading,
            c.lazyLoading = u,
            c.init()
    }])
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.useAsCanvas = function(n, o, r) {
                var i = a.useAsCanvasData(n, o, r);
                return e({
                    method: "POST",
                    url: t + "studio/v1/projects/" + o.projectCode + "/canvases",
                    data: i
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "useAsCanvasFactory"],
        angular.module("cape-webapp").service("useAsCanvasService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("useAsCanvasFactory", function() {
        return {
            useAsCanvasData: function(e, t, a) {
                return {
                    canvasName: t.canvasName,
                    projectCode: t.projectCode,
                    description: t.canvasDescription ? t.canvasDescription : "",
                    createdBy: e.username,
                    nodes: a.nodes,
                    paths: a.paths,
                    orgCode: e.orgCode,
                    version: 1
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c) {
        var u = this;
        u.isCreated = !1,
            null !== n.getFormValidationPattern() ? u.formValidationPattern = n.getFormValidationPattern() : n.callInitFunction().then(function(e) {
                n.setFormValidationPattern(e.data.validationPattern),
                    u.formValidationPattern = n.getFormValidationPattern()
            }, function(e) {}),
            u.init = function() {
                u.isCanvasNameTest = !0,
                    l.getAllProjects().then(function(e) {
                        u.allProjectsList = e.data
                    }, function() {
                        o.error("Something went wrong. Please try again!", "Error")
                    }),
                    r("canvasName")
            },
            u.validateUseAsCanvasForm = function(e) {
                e && u.useAsCanvas()
            },
            u.userInfo = a.getLoggedInUserDetails(),
            u.isCanvasNameValid = !1,
            u.onCancel = function() {
                t.close(!0)
            },
            u.useAsCanvas = function() {
                u.userEnteredData = {},
                    u.userEnteredData.projectCode = u.selectedProject,
                    u.userEnteredData.canvasName = u.txtCanvasName,
                    u.userEnteredData.canvasDescription = u.description,
                    u.isCreated = !0,
                    s.useAsCanvas(u.userInfo, u.userEnteredData, i).then(function(a) {
                        u.isCreated = !1,
                            o.success("Canvas Created Successfully.", "Success"),
                            t.close(!0),
                            e.go("main.drawCanvas.compose", {
                                projectCode: a.data.projectCode,
                                canvasCode: a.data.canvasCode,
                                canvasName: a.data.canvasName,
                                isCanvas: "true",
                                type: null
                            }, {
                                reload: !0
                            })
                    }, function(e) {
                        u.isCreated = !1,
                            e.data && e.data.message && e.data.message.length ? u.useAsCanvasErrorMessage = e.data.message : u.useAsCanvasErrorMessage = "Error occurred while processing request!"
                    })
            },
            u.init()
    }
    e.$inject = ["$state", "$uibModalInstance", "userDetails", "UtilFactory", "toastr", "focus", "canvasInfo", "useAsCanvasService", "mainService", "$log"],
        angular.module("cape-webapp").controller("useAsCanvasController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.saveBoilerplate = function(n, o) {
                var r = a.createBoilerplateData(n, o),
                    i = t + "studio/v1/orgs/" + n.orgCode + "/boilerplate/" + o.type;
                return e({
                    method: "POST",
                    url: i,
                    data: r
                })
            },
            n.editBoilerplate = function(a) {
                var n = t + "studio/v1/orgs/" + a.orgCode + "/boilerplates/" + a.type + "/" + a.boilerplateCode;
                return e({
                    method: "PATCH",
                    url: n,
                    data: a
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "saveBoilerplateFactory"],
        angular.module("cape-webapp").service("saveBoilerplateService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("saveBoilerplateFactory", function() {
        return {
            createBoilerplateData: function(e, t) {
                return {
                    boilerplateName: t.boilerplateName,
                    description: t.description,
                    components: e.components,
                    softwares: e.softwares,
                    machines: e.machines,
                    nodes: e.nodes,
                    paths: e.paths,
                    screenResolution: e.screenResolution
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u, d, p, f) {
        var g = this;
        g.boilerplateName = l ? l.boilerplateName : "",
            g.description = l ? l.description : "",
            g.type = l ? l.type : "Global",
            g.inProgress = !1,
            g.editBoilerplateEnabled = r,
            g.editLocalBoilerplateEnabled = r,
            g.editGlobalBoilerplateEnabled = r,
            g.isBoilerplateNameValid = !0,
            null !== o.getFormValidationPattern() ? g.formValidationPattern = o.getFormValidationPattern() : o.callInitFunction().then(function(e) {
                o.setFormValidationPattern(e.data.validationPattern),
                    g.formValidationPattern = o.getFormValidationPattern()
            }, function(e) {}),
            g.init = function() {
                i("boilerplateName")
            },
            g.canvasDetails = angular.copy(s),
            g.selectLocalBoilerplate = function() {
                d.isAuthorised(p.ACCESS_CONTROL_LIST.LOCAL_BOILERPLATE, !0) ? g.type = "Local" : (g.type = "Global",
                    g.editLocalBoilerplateEnabled = !0)
            },
            g.selectGlobalBoilerplate = function() {
                d.isAuthorised(p.ACCESS_CONTROL_LIST.GLOBAL_BOILERPLATE, !0) ? g.type = "Global" : (g.type = "Local",
                    g.editGlobalBoilerplateEnabled = !0)
            },
            g.validateSaveBoilerplateForm = function(e) {
                e && g.saveBoilerplate()
            },
            g.validateUpdateBoilerplateForm = function(e, t) {
                e && t ? g.editBoilerplate() : n.error("There is nothing to edit")
            },
            g.validateBoilerplateName = function() {
                var e = !1;
                if (c) {
                    for (var t = 0; t <= c.length - 1; t++) {
                        var a = c[t].boilerplateName;
                        if (a.toUpperCase() === g.boilerplateName.toUpperCase() && a.toUpperCase() !== l.boilerplateName.toUpperCase()) {
                            e = !0;
                            break
                        }
                    }
                    g.isBoilerplateNameValid = !e
                }
            },
            g.onCancel = function() {
                e.close(!1)
            },
            g.saveBoilerplate = function() {
                var o = {
                    boilerplateName: g.boilerplateName,
                    description: g.description,
                    type: g.type
                };
                g.inProgress = !0,
                    a.retrieveCanvasDetails(g.canvasDetails.projectCode, g.canvasDetails.canvasCode).then(function(a) {
                        g.inProgress = !1,
                            200 === a.status && (g.canvasDetails = a.data,
                                u.makeAllNodesAsDraft(g.canvasDetails),
                                u.makeAllPathsAsDraft(g.canvasDetails),
                                t.saveBoilerplate(g.canvasDetails, o).then(function() {
                                    g.inProgress = !1,
                                        n.success("Boilerplate Created Successfully.", "Success"),
                                        e.close(!0)
                                }, function(e) {
                                    g.inProgress = !1,
                                        e.data && e.data.message && e.data.message.length ? g.saveBoilerplateErrorMessage = e.data.message : g.saveBoilerplateErrorMessage = "Error occurred while processing request!"
                                }))
                    }, function(e) {
                        g.inProgress = !1,
                            e.data && e.data.message && e.data.message.length ? g.saveBoilerplateErrorMessage = e.data.message : g.saveBoilerplateErrorMessage = "Error occurred while processing request!"
                    })
            },
            g.editBoilerplate = function() {
                var a = angular.copy(l);
                a.boilerplateName = g.boilerplateName,
                    a.description = g.description,
                    g.inProgress = !0,
                    t.editBoilerplate(a).then(function() {
                        g.inProgress = !1,
                            n.success("Boilerplate Updated Successfully.", "Success"),
                            e.close(!0)
                    }, function(e) {
                        g.inProgress = !1,
                            e && e.data && e.data.message && e.data.message.length ? g.editBoilerplateErrorMessage = e.data.message : g.editBoilerplateErrorMessage = "Error occurred while processing request!"
                    })
            },
            g.init()
    }
    e.$inject = ["$uibModalInstance", "saveBoilerplateService", "drawCanvasServices", "toastr", "UtilFactory", "editBoilerplateEnabled", "focus", "canvasDetails", "boilerplateDetails", "boilerplateList", "drawCanvasCommonFactory", "granularAccessControl", "PAYLOAD_ENUM", "$log"],
        angular.module("cape-webapp").controller("SaveBoilerplateController", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l) {
        var c = this;
        c.userInfo = t.getLoggedInUserDetails(),
            c.boilerplateList = [],
            c.isResponse = !1,
            c.type = e.params.type,
            c.listHeader = ["S.No", "Boilerplate Name", "Description", "Last Updated", "Total Components", "Total Virtual Machines", "Edit"],
            c.gridView = (n.viewType ? n.viewType : a.CANVAS_VIEW_TYPE.GRID) === a.CANVAS_VIEW_TYPE.GRID,
            c.loadBoilerplates = function(e, t) {
                c.errorMessage = "",
                    200 === t && (e && e.boilerplates && e.boilerplates.length && angular.forEach(e.boilerplates, function(e) {
                            e.totalVm = _.filter(e.tags, {
                                    type: "vmNode"
                                }).length,
                                e.totalSoftware = _.filter(e.tags, {
                                    type: "softwareNode"
                                }).length,
                                e.vmCount = e.totalVm < 10 ? "0" + e.totalVm : e.totalVm,
                                e.softwareCount = e.totalSoftware < 10 ? "0" + e.totalSoftware : e.totalSoftware,
                                c.boilerplateList.push(e)
                        }),
                        c.isResponse = !0,
                        c.gridView || c.filterListData())
            },
            c.toggleViews = function(t) {
                t || c.filterListData(),
                    c.gridView = t,
                    n.viewType = t ? a.CANVAS_VIEW_TYPE.GRID : a.CANVAS_VIEW_TYPE.LIST,
                    e.go(e.current.name, n, {
                        notify: !1
                    })
            },
            c.filterListData = function() {
                c.listData = [],
                    _.each(c.boilerplateList, function(e, t) {
                        var a = {
                            action: !0,
                            actionCallback: c.navigateInsideList,
                            actionArgs: e,
                            child: {
                                slNo: {
                                    action: !1,
                                    value: t + 1
                                },
                                name: {
                                    action: !1,
                                    value: e.boilerplateName
                                },
                                desc: {
                                    action: !1,
                                    value: e.description
                                },
                                created_on: {
                                    action: !1,
                                    value: e.createdOn,
                                    isFilter: !0,
                                    filterName: "date",
                                    filterFormat: "yyyy-MM-dd hh:mm:ss"
                                },
                                no_of_software: {
                                    action: !1,
                                    value: e.softwareCount
                                },
                                no_of_vms: {
                                    action: !1,
                                    value: e.vmCount
                                },
                                edit: {
                                    action: !0,
                                    value: "Edit",
                                    actionArgs: e,
                                    actionCallback: c.editBoilerplate
                                }
                            }
                        };
                        c.listData.push(a)
                    })
            },
            c.init = function() {
                c.boilerplateList = [],
                    c.resetScroll = !0;
                var e = r + "studio/v1/orgs/" + c.userInfo.orgCode + "/boilerplates/" + c.type;
                c.lazyLoading.url = e,
                    c.lazyLoading.pageNumber = 0,
                    c.lazyLoading.params = {
                        searchKey: c.boilerplateSearch
                    },
                    c.lazyLoading.isEmpty = !1,
                    c.lazyLoading.nextPage()
            },
            c.clearSearch = function() {
                c.boilerplateSearch = "",
                    c.init()
            },
            c.editBoilerplate = function(e, t) {
                t.stopPropagation(),
                    ("Global" === c.type && l.isAuthorised(a.ACCESS_CONTROL_LIST.ADMIN_PLATFORM, !1) || "Local" === c.type && l.isAuthorised(a.ACCESS_CONTROL_LIST.LOCAL_BOILERPLATE, !1)) && o.open({
                        templateUrl: "app/modules/boilerplate/saveAndEditBoilerplate/saveBoilerplate.html",
                        controller: "SaveBoilerplateController",
                        controllerAs: "SaveBoilerplateCtrl",
                        windowClass: "my-modal",
                        backdrop: "static",
                        keyboard: !1,
                        resolve: {
                            canvasDetails: function() {
                                return null
                            },
                            editBoilerplateEnabled: function() {
                                return !0
                            },
                            boilerplateDetails: function() {
                                return e
                            },
                            boilerplateList: function() {
                                return c.boilerplateList.boilerplates
                            }
                        }
                    }).result.then(function(e) {
                        e && c.init()
                    }, function() {})
            },
            c.navigateInsideList = function(t) {
                e.go("main.drawCanvas", {
                    canvasName: t.boilerplateName,
                    canvasCode: t.boilerplateCode,
                    projectCode: t.orgCode,
                    view: "compose",
                    isCanvas: "false",
                    type: t.type
                })
            },
            c.failedLoading = function(e) {
                c.errorMessage = "Error occurred while processing request!"
            };
        var u = new s.LazyLoading;
        u.resAttr = "boilerplates",
            u.callback = c.loadBoilerplates,
            u.errorCallback = c.failedLoading,
            c.lazyLoading = u,
            c.init()
    }
    e.$inject = ["$state", "userDetails", "PAYLOAD_ENUM", "$stateParams", "$uibModal", "SERVICE_BASE_URL", "UtilFactory", "lazyloadingFactory", "granularAccessControl"],
        angular.module("cape-webapp").controller("BoilerplateListController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.getSoftwareList = function(a) {
                return e({
                    method: "GET",
                    url: t + "studio/v1/components/" + a + "/softwares"
                })
            },
            a.sendDataForValidation = function(a, n, o) {
                return e({
                    method: "POST",
                    url: t + (o ? "studio/v1/canvas/" + n + "/verification/host" : "studio/v1/canvas/" + n + "/verification/vm"),
                    data: a
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("vmDetailsService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r = this;
        r.appURL = t,
            r.selectedVirtualMachine = e.data,
            r.canvasCode = e.canvasCode,
            r.toggleValue = !1,
            r.configurationReadOnly = e.configurationReadOnly,
            r.virtualMachineOnPremise = e.virtualMachineOnPremise,
            r.onCancel = function() {
                e.callOnFailure()()
            },
            r.configurationFailed = function() {
                r.toggleValue = !0,
                    r.virtualMachineReconfiguration = !1
            },
            r.configurationSuccess = function(t, a) {
                r.virtualMachineReconfiguration = !1, !t.componentName && a && (t.componentName = "Untitled"),
                    r.virtualMachineOnPremise ? r.selectedVirtualMachineSoftware.properties = t : r.selectedVirtualMachineSoftware.provisionProperties = t,
                    r.selectedVirtualMachineSoftware.status = a ? n.SOFTWARE_STATUS.DRAFT : n.SOFTWARE_STATUS.NEW,
                    e.callOnSuccess()(r.selectedVirtualMachineSoftware, r.processes, a)
            },
            r.validateVmConfiguration = function(t) {
                e.validateVmName()(t)
            },
            e.afterValidatingVmName = function(e, t) {
                e ? r.afterVmValidation(!1, !0) : (t.softwareName = r.selectedVirtualMachineSoftware.softwareName,
                    o.sendDataForValidation(t, r.canvasCode, r.virtualMachineOnPremise).then(function(e) {
                        r.processes = e.data.processes ? e.data.processes : [],
                            r.afterVmValidation(!1, !1)
                    }, function(e) {
                        a.error(e.data.message, "Error"),
                            r.afterVmValidation(!1, !0)
                    }))
            },
            r.virtualMachineConfigForm = function(t) {
                r.selectedVirtualMachineSoftware = t,
                    r.selectedVirtualMachineSoftware.softwareProperty ? r.assignConfigurationData(r.selectedVirtualMachineSoftware) : e.callOnSuccess()(r.selectedVirtualMachineSoftware)
            },
            r.assignConfigurationData = function(e) {
                var t = {};
                t.form = angular.fromJson(e.softwareProperty.form),
                    t.schema = angular.fromJson(e.softwareProperty.schema),
                    r.virtualMachineOnPremise ? t.formModel = r.selectedVirtualMachineSoftware.properties : t.formModel = r.selectedVirtualMachineSoftware.provisionProperties,
                    r.selectedVirtualMachineProperty = t,
                    r.toggleValue = !1
            },
            r.init = function() {
                o.getSoftwareList(r.selectedVirtualMachine.componentCode).then(function(e) {
                    200 === e.status && (r.vmList = e.data)
                }, function(e) {
                    e.data && e.data.message && e.data.message.length ? a.error(e.data.message, "Error") : a.error("Error occured while processing request!", "Error")
                })
            },
            e.configuration ? (r.selectedVirtualMachineSoftware = angular.copy(r.selectedVirtualMachine.software),
                r.virtualMachineReconfiguration = !0,
                r.assignConfigurationData(r.selectedVirtualMachineSoftware)) : (r.toggleValue = !0,
                r.init())
    }
    e.$inject = ["$scope", "SERVICE_BASE_URL", "toastr", "PAYLOAD_ENUM", "vmDetailsService"],
        angular.module("cape-webapp").controller("vmDetailsDirectiveController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("vmDetailsFactory", function() {
        return {
            drawCanvasData: function(e, t, a) {
                return {
                    canvasName: a,
                    paths: e,
                    nodes: t
                }
            }
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("vmList", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/vmDetails/vmDetailsDirective.html",
            scope: {
                data: "=",
                canvasCode: "=",
                virtualMachineOnPremise: "=?",
                callOnSuccess: "&",
                callOnFailure: "&",
                validateVmName: "&",
                afterValidatingVmName: "=",
                configuration: "=",
                configurationReadOnly: "=?"
            },
            controller: "vmDetailsDirectiveController",
            controllerAs: "vmDetailsDirCtrl"
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r, i = {},
            s = null;
        return i.intervalReferenceList = [],
            i.isGetAllProjResponseFetched = !1,
            i.generateUrl = function(e, t, a) {
                var n = e.split("/"),
                    o = n.slice(0, a),
                    r = n.slice(a, n.length);
                o.push(t);
                var i = _.concat(o, r);
                return _.join(i, "/")
            },
            i.isLeftClick = function(e) {
                return !(!angular.isDefined(e.button) || 0 !== e.button)
            },
            i.setPageLoad = function(e) {
                r = e
            },
            i.getPageLoad = function() {
                return r
            },
            i.initializePageLoad = function() {
                this.setPageLoad(!0),
                    a(function() {
                            this.setPageLoad(!1)
                        }
                        .bind(this))
            },
            i.checkCache = function(e) {
                var t = !1;
                return this.getPageLoad() || (t = !0,
                        this.hasChildState(e) && this.initializePageLoad()),
                    t
            },
            i.checkbrowser = function() {
                var e = {};
                return e.isOpera = !!window.opr && !!window.opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
                    e.isFirefox = "undefined" != typeof InstallTrigger,
                    e.isSafari = /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window["safari"] || window.safari.pushNotification).toString(),
                    e.isIE = !!document.documentMode,
                    e.isEdge = !e.isIE && !!window.StyleMedia,
                    e.isChrome = !!window.chrome && !!window.chrome.webstore,
                    e.isBlink = (e.isChrome || e.isOpera) && !!window.CSS,
                    e
            },
            i.changeFormSchemaAsReadOnly = function(e) {
                for (var t in e)
                    angular.isObject(e[t]) && (e[t].readonly = !0);
                return e
            },
            i.safeApply = function(e) {
                var t;
                "$apply" !== (t = e.$root ? e.$root.$$phase : e.$$phase) && "$digest" !== t && e.$apply()
            },
            i.registerInterval = function(e, t) {
                var a = setInterval(e, t);
                return i.intervalReferenceList.push(a),
                    a
            },
            i.destroyInterval = function(e) {
                clearInterval(e),
                    i.removeIntervalFromList(e)
            },
            i.removeIntervalFromList = function(e) {
                for (var t = 0; t <= i.intervalReferenceList.length - 1; t++)
                    if (i.intervalReferenceList[t] === e) {
                        i.intervalReferenceList.splice(t, 1);
                        break
                    }
            },
            i.clearAllInterval = function() {
                for (var e = 0; e <= i.intervalReferenceList.length - 1; e++)
                    clearInterval(i.intervalReferenceList[e]),
                    i.intervalReferenceList.splice(e, 1),
                    e--
            },
            i.buildJsonStructureForComponentPalette = function(e, t, a) {
                var n = _.remove(e, function(e) {
                    return 1 !== e.categories.length
                });
                _.each(n, function(t) {
                    0 !== t.categories.length && _.each(t.categories, function(a) {
                        var n = angular.copy(t);
                        n.multipleCategories = t.categories,
                            n.categories = [a],
                            e.push(angular.copy(n))
                    })
                });
                var o = _.groupBy(e, "categories");
                if (!a && t)
                    delete o[t];
                else if (a && t) {
                    var r = {};
                    r[t] = o[t],
                        o = r
                }
                return {
                    groupedComponent: o,
                    allComponent: e
                }
            },
            i.setFormValidationPattern = function(e) {
                n.storage.setItem("formValidationPattern", e)
            },
            i.getFormValidationPattern = function() {
                return n.storage.getItem("formValidationPattern")
            },
            i.getPatternByKey = function(e) {
                return n.storage.getItem("formValidationPattern")[e]
            },
            i.setAllProjectData = function(e) {
                s = e
            },
            i.getAllProjectData = function() {
                return s
            },
            i.callInitFunction = function() {
                return e({
                    method: "GET",
                    url: o + "studio/v1/init"
                })
            },
            i.hasChildState = function(e) {
                var a = t.get();
                return !!_.filter(a, function(t) {
                    return -1 !== t.name.indexOf(e + ".")
                }).length
            },
            i.hasParentState = function(e) {
                return -1 !== e.lastIndexOf(".")
            },
            i
    }
    e.$inject = ["$http", "$state", "$timeout", "Validator", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").factory("UtilFactory", e)
}(),
function() {
    "use strict";

    function e(e) {
        function t(e, t) {
            this.uri = e,
                this.data = t
        }

        function a(e, t) {
            this.uri = e,
                this.isFetching = t
        }

        function n(e, t) {
            this.uri = e,
                this.callback = t
        }
        var o = {},
            r = [],
            i = [],
            s = [];
        return o.upsertCacheData = function(e, a) {
                var n;
                (n = _.find(r, {
                    uri: e
                })) ? n.data = a: (n = new t(e, a),
                    r.push(n))
            },
            o.insertUriInProgress = function(e, t) {
                var n = new a(e, t);
                i.push(n)
            },
            o.insertCallback = function(e, t) {
                var a = new n(e, t);
                s.push(a)
            },
            o.getCacheData = function(e) {
                return _.find(r, {
                    uri: e
                })
            },
            o.getUriInProgress = function(e) {
                return _.find(i, {
                    uri: e
                })
            },
            o.deleteCacheData = function(e) {
                return _.remove(r, {
                    uri: e
                })
            },
            o.deleteUriInProgress = function(e) {
                return _.remove(i, {
                    uri: e
                })
            },
            o.deleteRegisterdCallBack = function(e) {
                return _.remove(s, {
                    uri: e
                })
            },
            o.callRegisteredCallBackAndRemove = function(e) {
                for (var t = 0; t <= s.length - 1; t++)
                    if (s[t].uri === e) {
                        var a = s[t],
                            n = this.getCacheData(a.uri);
                        n && a.callback(n.data),
                            s.splice(t, 1),
                            t--
                    }
            },
            o.registerCallback = function(t, a, n) {
                if (n)
                    return this.deleteCacheData(t),
                        a();
                var o = this.getUriInProgress(t),
                    r = this.getCacheData(t);
                if (o || r) {
                    var i = e.defer();
                    return o ? this.insertCallback(t, function(e) {
                            i.resolve(e)
                        }) : i.resolve(r.data),
                        i.promise
                }
                return a()
            },
            o
    }
    e.$inject = ["$q"],
        angular.module("cape-webapp").factory("cacheFactory", e)
}(),
function() {
    "use strict";

    function e(e) {
        return {
            getLoggedInUserDetails: function() {
                return e.getUserInfoFromToken()
            }
        }
    }
    e.$inject = ["Validator"],
        angular.module("cape-webapp").factory("userDetails", e)
}(),
function() {
    "use strict";

    function e(e) {
        var t, a, n, o, r = this;
        return r.complexView = function(r, i, s) {
                t = r.title ? r.title : "Are you sure you want to delete?",
                    a = r.text ? r.text : "You will not be able to recover this data!",
                    n = r.confirmButtonText ? r.confirmButtonText : "Yes",
                    o = r.cancelButtonText ? r.cancelButtonText : "No",
                    e.swal({
                        title: t,
                        text: a,
                        type: "warning",
                        showCancelButton: !0,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: n,
                        cancelButtonText: o,
                        closeOnConfirm: !0,
                        closeOnCancel: !0
                    }, function(e) {
                        s(e, i)
                    })
            },
            r.simpleView = function(t, a) {
                "success" === a ? e.swal(t.title, t.text, "success") : "warning" === a ? e.swal(t.title, t.text, "warning") : e.swal(t.title, t.text, "error")
            },
            r
    }
    e.$inject = ["SweetAlert"],
        angular.module("cape-webapp").factory("SweetAlerts", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.getSoftwareList = function(t) {
                return e({
                    method: "GET",
                    url: a + "studio/v1/components/" + t + "/softwares"
                })
            },
            n.sendDataForValidation = function(t, n) {
                return e({
                    method: "POST",
                    url: a + "studio/v1/canvas/" + n + "/verification/software",
                    data: t
                })
            },
            n.getDefaultProvisionPropertyJson = function() {
                return e({
                    method: "GET",
                    url: "app/shared/softwareDetails/defaultProvisionForm.json"
                })
            },
            n
    }
    e.$inject = ["$http", "UtilFactory", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("softwareDetailsService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r = this,
            i = a;
        r.appURL = n,
            r.componentData = i.data,
            r.canvasCode = i.canvasCode,
            r.componentCode = r.componentData.componentCode ? r.componentData.componentCode : r.componentData.softwareCode,
            r.isConfig = i.configuration,
            r.configurationReadOnly = i.configurationReadOnly,
            r.selectedSoftware = {},
            r.toggleValue = !0,
            r.onCancel = function() {
                i.callOnFailure()()
            },
            r.configurationFailed = function() {
                r.toggleValue = !0
            },
            r.configurationSuccess = function(e, t) {
                if (r.selectedSoftware.properties)
                    for (var a in e)
                        r.selectedSoftware.properties[a] = e[a];
                else
                    r.selectedSoftware.properties = e;
                delete r.selectedSoftware.componentCode,
                    delete r.selectedSoftware.componentName,
                    i.callOnSuccess()(r.selectedSoftware, t)
            },
            r.validateSoftwareConfiguration = function(a) {
                r.componentData.isProvision ? r.afterSoftwareValidation(!1, !1) : e.sendDataForValidation(a, r.canvasCode).then(function() {
                    r.afterSoftwareValidation(!1, !1)
                }, function(e) {
                    t.error(e.data.message, "Error"),
                        r.afterSoftwareValidation(!1, !0)
                })
            },
            r.toggle = function(e, t) {
                r.selectedSoftware = e,
                    r.selectedSoftware.status = o.SOFTWARE_STATUS.NEW;
                var a;
                !t && e.connectionProperty ? (r.selectedSoftware.isProvision = !1,
                    r.selectedSoftware.isConnect = !0,
                    (a = {}).form = angular.fromJson(e.connectionProperty.form),
                    a.schema = angular.fromJson(e.connectionProperty.schema),
                    (a = r.changeFormSchemaForAction(t, a)).form.length ? (r.selectedSoftwareProperty = a,
                        r.toggleValue = !1) : i.callOnSuccess()(r.selectedSoftware)) : e.connectionProperty || e.softwareProperty || t ? (delete r.selectedSoftware.componentCode,
                    delete r.selectedSoftware.componentName,
                    r.selectedSoftware.isProvision = !0,
                    r.selectedSoftware.isConnect = !1,
                    (a = {}).form = angular.fromJson(e.connectionProperty.form),
                    a.schema = angular.fromJson(e.connectionProperty.schema),
                    a = r.changeFormSchemaForAction(t, a),
                    r.selectedSoftwareProperty = a,
                    r.toggleValue = !1) : (r.selectedSoftware.isProvision = !1,
                    r.selectedSoftware.isConnect = !0,
                    i.callOnSuccess()(r.selectedSoftware))
            },
            i.callAfterValidating = function(e, t) {
                r.afterSoftwareValidation(e, t)
            },
            r.changeFormSchemaForAction = function(e, t) {
                if (e)
                    for (a = 0; a < t.form.length; a++)
                        angular.isDefined(t.form[a].isConnect) && t.form[a].isConnect && (t.schema.properties = _.omit(t.schema.properties, [t.form[a].key]),
                            _.remove(t.schema.required, function(e) {
                                return e === t.form[a].key
                            }),
                            t.form.splice(a, 1),
                            a--);
                else
                    for (var a = 0; a < t.form.length; a++)
                        angular.isDefined(t.form[a].isConnect) && !t.form[a].isConnect && (t.schema.properties = _.omit(t.schema.properties, [t.form[a].key]),
                            _.remove(t.schema.required, function(e) {
                                return e === t.form[a].key
                            }),
                            t.form.splice(a, 1),
                            a--);
                return t
            },
            r.reConfiguration = function() {
                r.toggleValue = !1,
                    r.selectedSoftware = r.componentData.software ? angular.copy(r.componentData.software) : angular.copy(r.componentData);
                var e = {};
                r.selectedSoftware.isProvision && a.tabName === o.CANVAS_TAB_NAME.PROVISION ? (e.form = angular.fromJson(r.selectedSoftware.softwareProperty.form),
                        e.schema = angular.fromJson(r.selectedSoftware.softwareProperty.schema)) : (e.form = angular.fromJson(r.selectedSoftware.connectionProperty.form),
                        e.schema = angular.fromJson(r.selectedSoftware.connectionProperty.schema)), !r.selectedSoftware.isProvision || r.selectedSoftware.status !== o.SOFTWARE_STATUS.DRAFT && r.selectedSoftware.status !== o.SOFTWARE_STATUS.NEW || a.tabName !== o.CANVAS_TAB_NAME.COMPOSE || (e = r.changeFormSchemaForAction(!0, e)),
                    i.displayDefaultFormSchemaValue || (e.formModel = r.selectedSoftware.properties),
                    r.selectedSoftwareProperty = e,
                    r.configurationReadOnly = i.configurationReadOnly
            },
            r.init = function() {
                r.isConfig ? r.reConfiguration() : (r.toggleValue = !0,
                    e.getSoftwareList(r.componentCode).then(function(e) {
                        200 === e.status && (r.softwareList = e.data)
                    }, function(e) {
                        e.data && e.data.message && e.data.message.length ? t.error(e.data.message, "Error") : t.error("Error occured while processing request!", "Error")
                    }))
            },
            r.init()
    }
    e.$inject = ["softwareDetailsService", "toastr", "$scope", "SERVICE_BASE_URL", "PAYLOAD_ENUM"],
        angular.module("cape-webapp").controller("softwaresDetailsDirectiveController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("softwareList", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/softwareDetails/softwaresDetailsDirective.html",
            scope: {
                data: "=",
                tabName: "=",
                canvasCode: "=",
                callOnSuccess: "&",
                callOnFailure: "&",
                configuration: "=",
                configurationReadOnly: "=?",
                callAfterValidating: "=?",
                displayDefaultFormSchemaValue: "=?"
            },
            controller: "softwaresDetailsDirectiveController",
            controllerAs: "softwaresDetailsDirCtrl"
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("processDirectiveController", function() {
        var e = this;
        e.$onInit = function() {
            e.processes = e.data.processes
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("processDirective", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/processDirective/processDirective.html",
            scope: {
                data: "=?"
            },
            link: function(e, t) {
                t.css({
                    left: e.processDirCtrl.data.x + 20 + "px",
                    top: e.processDirCtrl.data.y - 15 + "px"
                })
            },
            controller: "processDirectiveController",
            controllerAs: "processDirCtrl",
            bindToController: !0,
            replace: !0
        }
    })
}(),
function() {
    "use strict";

    function e(e) {
        var t = this;
        if (t.pathData = e.data,
            t.pathData.integration) {
            t.renderDefaultConfiguration = !1;
            var a = {};
            a.form = angular.fromJson(t.pathData.integration.integrationProperty.form),
                a.schema = angular.fromJson(t.pathData.integration.integrationProperty.schema),
                a.formModel = t.pathData.integration.properties,
                t.selectedIntegrationProperty = a
        } else
            t.label = t.pathData.label,
            t.renderDefaultConfiguration = !0;
        t.onCancel = function() {
                e.callOnFailure()()
            },
            t.saveDefaultPathConfig = function() {
                t.pathData.label = t.label,
                    t.pathData.integration = null,
                    e.callOnSuccess()(t.pathData)
            },
            t.onCancel = function() {
                e.callOnFailure()()
            },
            t.savePathConfig = function(a, n) {
                t.pathData.label = a.label,
                    t.pathData.integration.properties = a,
                    e.callOnSuccess()(t.pathData, n)
            }
    }
    e.$inject = ["$scope"],
        angular.module("cape-webapp").controller("pathDetailsDirectiveController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("pathConfiguration", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/pathIntegrationDetails/pathIntegrationDetailsDirective.html",
            scope: {
                data: "=",
                callOnSuccess: "&",
                callOnFailure: "&"
            },
            controller: "pathDetailsDirectiveController",
            controllerAs: "pathDetailsDirCtrl"
        }
    })
}(),
function() {
    "use strict";

    function e(e) {
        var t = this;
        t.$postLink = function() {
                e.css({
                    left: t.data.cordinates.x + 20 + "px",
                    top: t.data.cordinates.y - 15 + "px",
                    position: "fixed",
                    "z-index": 1
                })
            },
            t.$onInit = function() {
                t.pathlabel = t.data.pathData.label,
                    t.pathData = t.data.pathData,
                    t.deleteable = !!t.data.isDeleteable && t.data.isDeleteable,
                    t.editable = !!t.data.isEditable && t.data.isEditable,
                    t.editPath = function() {
                        t.editable && t.data.editCallback(t.pathData)
                    },
                    t.deletePath = function() {
                        t.deleteable && t.data.deleteCallback()
                    },
                    t.closePathInfoPopup = function() {
                        t.showPathFlag = !1
                    }
            }
    }
    e.$inject = ["$element"],
        angular.module("cape-webapp").controller("pathInformationDirectiveController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("pathInformation", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/pathInformation/pathInformationDirective.html",
            scope: {
                data: "=",
                showPathFlag: "=",
                isDeleteable: "<",
                isEditable: "<"
            },
            bindToController: !0,
            controller: "pathInformationDirectiveController",
            controllerAs: "pathInformationDirectiveCtrl"
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("onEnter", function() {
        return function(e, t, a) {
            t.bind("keydown keypress", function(t) {
                13 === t.which && (e.$apply(function() {
                        e.$eval(a.ngEnter)
                    }),
                    t.preventDefault())
            })
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("logHistoryDirective", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/logHistoryDirective/logHistory.html",
            scope: {
                data: "=",
                showLogViewFlag: "="
            },
            bindToController: !0,
            controller: "logHistoryController",
            controllerAs: "logHistoryCtrl"
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r = this;
        r.$onInit = function() {
                var e = a + "studio/v1/canvas/" + r.data.canvasCode + "/log/all",
                    t = new n.LazyLoading;
                t.resAttr = "data",
                    t.callback = r.loadLogHistory,
                    t.errorCallback = r.failedLoading,
                    r.lazyLoading = t,
                    r.lazyLoading.url = e,
                    r.showLogView = !0,
                    r.loadData()
            },
            r.loadData = function() {
                r.logList = [],
                    r.resetScroll = !0,
                    r.lazyLoading.pageNumber = 0,
                    r.lazyLoading.params = {
                        searchKey: r.searchLog
                    },
                    r.lazyLoading.isEmpty = !1,
                    r.lazyLoading.nextPage()
            },
            r.clearSearch = function() {
                r.searchLog = "",
                    r.loadData()
            },
            r.failedLoading = function(e) {
                r.errorMessage = "Error occurred while processing request!"
            },
            r.stateParams = e,
            r.logList = [],
            r.logData = {},
            r.logsAutoScrollDown = {},
            r.isResponse = !1,
            r.displayLog = !1,
            r.showLog = function(e) {
                r.displayLog = !r.displayLog,
                    r.logData.header = e.action,
                    r.logData.log = e.message
            },
            r.showLogWindow = !0,
            r.fadeFlag = !0,
            r.closeLogHistoryView = function() {
                r.displayLog = !1,
                    r.fadeFlag = !1,
                    o(function() {
                        r.showLogView = !1,
                            r.showLogWindow = !1,
                            r.showLogViewFlag = !1
                    }, 100)
            },
            r.loadLogHistory = function(e, t) {
                r.errorMessage = "",
                    200 === t && (e && e.data.length && angular.forEach(e.data, function(e) {
                            r.logList.push(e)
                        }),
                        r.isResponse = !0)
            }
    }
    e.$inject = ["$stateParams", "UtilFactory", "SERVICE_BASE_URL", "lazyloadingFactory", "$timeout"],
        angular.module("cape-webapp").controller("logHistoryController", e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = {};
        return t.installationLog = function(t, a) {
                return e({
                    method: "GET",
                    url: a + "/" + t,
                    ignoreLoadingBar: !0
                })
            },
            t
    }
    e.$inject = ["$http"],
        angular.module("cape-webapp").service("logDirectiveService", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = this;
        n.$onInit = function() {
            n.showLog = !0,
                n.logsAutoScrollDown = {},
                n.isLogResponseFetching = !0,
                n.installationLog = function(t, a) {
                    t && e.installationLog(t, n.apiData.url).then(function(e) {
                        n.logData.log = e.data,
                            n.logData.header = a,
                            n.logsAutoScrollDown.scrollDown()
                    })
                },
                n.getLog = function(e, a) {
                    n.intervalPromise = t.registerInterval(function() {
                        n.installationLog(e, a),
                            n.showLog || n.destroyInterval()
                    }, 5e3)
                },
                n.hideLog = function() {
                    n.showLog = !1,
                        a.setLogClosedByUserFlag(!0)
                },
                n.destroyInterval = function() {
                    n.isLogResponseFetching = !1,
                        t.destroyInterval(n.intervalPromise)
                },
                n.getLastLog = function() {
                    n.installationLog(n.apiData.requestId, n.apiData.header)
                },
                n.makeApiCall ? (n.logData = {
                        log: "",
                        header: ""
                    },
                    n.installationLog(n.apiData.requestId, n.apiData.header),
                    n.getLog(n.apiData.requestId, n.apiData.header)) : n.isLogResponseFetching = !1
        }
    }
    e.$inject = ["logDirectiveService", "UtilFactory", "drawCanvasCommonFactory"],
        angular.module("cape-webapp").controller("logDirectiveController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("logDirective", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/logDirective/logDirective.html",
            scope: {
                apiData: "=?",
                destroyInterval: "=?",
                getLastLog: "=?",
                showLog: "=",
                hideLog: "=?",
                makeApiCall: "=?",
                logData: "=?"
            },
            bindToController: !0,
            controller: "logDirectiveController",
            controllerAs: "logDirectiveCtrl"
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("listViewDirectiveController", function() {
        var e = this;
        e.init = function() {},
            e.navigateInsideList = function(t, a) {
                a.stopPropagation(),
                    e.navigateCallback()(t)
            }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("listView", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/listView/listViewDirective.html",
            scope: {
                headerData: "=",
                data: "=",
                searchQuery: "=?",
                navigateCallback: "&"
            },
            controller: "listViewDirectiveController",
            controllerAs: "listViewDirCtrl",
            bindToController: !0
        }
    })
}(),
function() {
    function e(e, t, a) {
        var n = function() {
            this.fetchingData = !1,
                this.pageNumber = 0,
                this.pageSize = 20,
                this.isEmpty = !1,
                this.url = {},
                this.errorCallback = {},
                this.callback = {},
                this.resAttr = {},
                this.params = {}
        };
        return n.prototype.nextPage = function() {
            if (!this.fetchingData && !this.isEmpty) {
                this.fetchingData = !0;
                var t = this.url,
                    a = {
                        page: this.pageNumber,
                        size: this.pageSize
                    };
                a = angular.extend(a, this.params),
                    e({
                        method: "GET",
                        url: t,
                        params: a
                    }).then(function(e) {
                            e || (e = {});
                            var t, a, n = this.resAttr.split(".");
                            angular.forEach(n, function(a) {
                                    t = t ? t[a] : e.data[a]
                                }),
                                t && (a = t.length),
                                a < this.pageSize && (this.isEmpty = !0),
                                this.callback(e.data, e.status),
                                this.fetchingData = !1,
                                this.pageNumber++
                        }
                        .bind(this),
                        function(e) {
                            this.errorCallback(e)
                        }
                        .bind(this))
            }
        }, {
            LazyLoading: n
        }
    }
    e.$inject = ["$http", "$log", "toastr"],
        angular.module("cape-webapp").factory("lazyloadingFactory", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("imageUpload", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/imageUpload/imageUpload.html",
            scope: {
                buttonText: "@",
                callOnSuccess: "&",
                callOnFailure: "&",
                hidePreview: "=?",
                callOnFileLoad: "&"
            },
            controller: "imageUploadDirectiveController",
            controllerAs: "imageUploadDirCtrl",
            replace: !0,
            bindToController: !0
        }
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this;
        a.actualImage = null,
            a.croppedImage = null;
        var n = function(t) {
            var n = new FileReader;
            n.onload = function(t) {
                    e.$apply(function() {
                        a.actualImage = t.target.result,
                            a.callOnFileLoad() && a.callOnFileLoad()(a.actualImage)
                    })
                },
                n.readAsDataURL(t)
        };
        e.$on("fileUploaded", function(e, o) {
                a.lastUploadedFile = o.file,
                    t.fileValidation(a.lastUploadedFile) && n(a.lastUploadedFile)
            }),
            a.successCallback = function() {
                var e = t.convertFromBase64ToFile(a.lastUploadedFile, a.croppedImage);
                a.callOnSuccess()(e, a.croppedImage),
                    a.actualImage = null,
                    a.croppedImage = null,
                    a.lastUploadedFile = null
            },
            a.errorCallback = function() {
                a.callOnFailure()(),
                    a.actualImage = null,
                    a.croppedImage = null,
                    a.lastUploadedFile = null
            }
    }
    e.$inject = ["$scope", "fileUploadFactory"],
        angular.module("cape-webapp").controller("imageUploadDirectiveController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.dataURItoBlob = function(t) {
                var a;
                a = t.split(",")[0].indexOf("base64") >= 0 ? atob(t.split(",")[1]) : unescape(t.split(",")[1]);
                for (var n = t.split(",")[0].split(":")[1].split(";")[0], o = new Uint8Array(a.length), r = 0; r < a.length; r++)
                    o[r] = a.charCodeAt(r);
                try {
                    return new Blob([o], {
                        type: n
                    })
                } catch (t) {
                    var i = new(e.WebKitBlobBuilder || e.MozBlobBuilder);
                    return i.append(o),
                        i.getBlob(n)
                }
            },
            n.convertFromBase64ToFile = function(e, t) {
                var a = n.dataURItoBlob(t);
                try {
                    var o = e.name;
                    return new File([a], o, {
                        lastModified: new Date(0),
                        type: e.type
                    })
                } catch (e) {}
            },
            n.fileValidation = function(e) {
                var n = e.type,
                    o = e.name,
                    r = o.lastIndexOf("."),
                    i = t.MAX_PF_PIC_IMAGE_SIZE_IN_MB;
                if (-1 !== n.indexOf("image"))
                    return !(Math.log(e.size) / Math.log(1024) > i) || (a.error("Sorry You Exceeded Maximum File Size Limit(" + i + "MB!)", "Error"), !1);
                var s = o.substring(r + 1);
                return a.error("Sorry " + s + " File Not Allowed!", "Error"), !1
            },
            n
    }
    e.$inject = ["$window", "PAYLOAD_ENUM", "toastr"],
        angular.module("cape-webapp").factory("fileUploadFactory", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        this.uploadFile = function(a) {
            var n = new FormData;
            return n.append("file", a),
                e({
                    method: "post",
                    url: t + "studio/v1/upload",
                    transformRequest: angular.identity,
                    headers: {
                        "Content-Type": void 0
                    },
                    params: {
                        name: a.name
                    },
                    data: n
                })
        }
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("DocumentUploadService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("uploadFile", ["$parse", "$rootScope", function(e, t) {
        var a, n = !1;
        return {
            restrict: "A",
            link: function(o, r, i) {
                var s = e(i.uploadFile).assign,
                    l = e(i.onChange);
                r.bind("change", function() {
                        s(o, r[0].files[0]),
                            l(o),
                            n && (t.$broadcast("fileUploaded", {
                                    file: r[0].files[0]
                                }),
                                n = !1,
                                a.value = null),
                            r[0].value = "",
                            o.$apply(function() {
                                s(o, ""),
                                    l(o)
                            })
                    }),
                    r.bind("click", function() {
                        if ("button" === this.localName) {
                            var e = angular.element(this.parentElement.children);
                            a = e[1],
                                n = !0,
                                a.click()
                        }
                    })
            }
        }
    }])
}(),
function() {
    "use strict";

    function e(e) {
        this.fetchIframe = function(t) {
            return e({
                method: "get",
                url: t.url,
                headers: {
                    Authorization: t.header
                }
            })
        }
    }
    e.$inject = ["$http"],
        angular.module("cape-webapp").service("iframeService", e)
}(),
function() {
    "use strict";

    function e(e) {
        return {
            restrict: "EA",
            templateUrl: "app/shared/iframeComponent/iframe.html",
            scope: {
                data: "=",
                isDynamic: "=",
                remove: "&",
                defaultView: "<"
            },
            controller: "iframeController",
            controllerAs: "iframeCtrl",
            replace: !0,
            link: function(t, a) {
                var n = (a = a[0]).querySelector("iframe");
                if (t.isDynamic) {
                    var o = "://" + e.decode(t.data.data.headerValue) + "@",
                        r = t.data.data.url.toString().replace("://", o);
                    angular.element(n).attr("src", r)
                } else
                    angular.element(n).attr("src", t.data.data.url)
            }
        }
    }
    e.$inject = ["$base64"],
        angular.module("cape-webapp").directive("iframeComponent", e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = this,
            a = e;
        t.defaultView = a.defaultView,
            t.remove = function() {
                a.remove()(a.data.metricCode)
            }
    }
    e.$inject = ["$scope"],
        angular.module("cape-webapp").controller("iframeController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("granularAccessControlData", function() {
        var e = null;
        return {
            getAccessList: function() {
                return e
            },
            setAccessList: function(t) {
                e = t
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = null,
            n = function() {
                a = e.getUserInfoFromToken()
            },
            o = {
                "|": function(e, t) {
                    return r(e) || r(t)
                },
                "&": function(e, t) {
                    return r(e) && r(t)
                }
            },
            r = function(e) {
                return _.includes(a.acls, e)
            };
        return a || n(), {
            saveUserDetails: n,
            isAuthorised: function(e, n) {
                if (!a || !a.acls)
                    return !1;
                var i = !1,
                    s = [],
                    l = null;
                if (e.contains("|") ? (s = e.split("|"),
                        l = "|") : e.contains("&") ? (s = e.split("&"),
                        l = "&") : s = e.split("|"),
                    1 === s.length)
                    i = r(s[0]);
                else
                    for (var c = 0; c < s.length - 1 && (i = o[l](s[c].trim(), s[c + 1].trim()),
                            "|" !== l || !i) && ("&" !== l || i); c++)
                ;
                return !!i || (n || t.error("You are not authorized to perform this action", "Error"), !1)
            }
        }
    }
    e.$inject = ["Validator", "toastr"],
        angular.module("cape-webapp").factory("granularAccessControl", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        return function(a) {
            e(function() {
                var e = t.document.getElementById(a);
                e && e.focus()
            })
        }
    }
    e.$inject = ["$timeout", "$window"],
        angular.module("cape-webapp").factory("focus", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this,
            n = e;
        n.schema = n.data.d.formSchema.schema,
            n.form = n.data.d.formSchema.form,
            n.isConfig = n.configuration,
            n.model = n.data.d.formSchema.formModel ? n.data.d.formSchema.formModel : {},
            n.formOption = {
                formDefaults: {
                    readonly: !!n.configurationReadOnly && n.configurationReadOnly
                }
            },
            a.onCancel = function() {
                n.callOnFailure()()
            },
            n.onSubmit = function(e) {
                n.$broadcast("schemaFormValidate");
                var t = _.cloneDeep(n.data.d);
                t.model = n.model,
                    e.$valid && n.callOnSuccess()(t)
            }
    }
    e.$inject = ["$scope", "$http"],
        angular.module("cape-webapp").controller("executeActionDirectiveController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("executeAction", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/executeActionDirective/executeActionDirective.html",
            scope: {
                data: "=",
                callOnSuccess: "&",
                callOnFailure: "&"
            },
            controller: "executeActionDirectiveController",
            controllerAs: "executeActionDirectiveCtrl"
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("customFilterDirective", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/customFilterDirective/customFilter.html",
            scope: {
                filterForm: "<",
                callOnSuccess: "&",
                closeOnClick: "="
            },
            link: function(e, t) {
                t.css({
                    left: e.customFilterCtrl.filterForm.x + 20 + "px",
                    top: e.customFilterCtrl.filterForm.y - 15 + "px"
                })
            },
            bindToController: !0,
            controller: "customFilterController",
            controllerAs: "customFilterCtrl",
            replace: !0
        }
    })
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = this,
            n = e;
        a.dateParser = function(e) {
                for (var t in e)
                    e.hasOwnProperty(t) && !isNaN(Date.parse(e[t])) && (e[t] = new Date(e[t]));
                return e
            },
            a.onSubmit = function(e) {
                n.$broadcast("schemaFormValidate"),
                    e.$valid && a.callOnSuccess()(a.changeDateFilter(n.model))
            },
            a.changeDateFilter = function(e) {
                var a = angular.copy(e);
                for (var n in a)
                    a.hasOwnProperty(n) && (null === a[n] ? delete a[n] : isNaN(Date.parse(a[n])) || (a[n] = t("date")(a[n], "yyyy-MM-dd")));
                return a
            },
            a.clearFilter = function() {
                n.model = null,
                    a.callOnSuccess()(n.model)
            },
            a.closeFilterPopup = function() {
                a.closeOnClick = !1
            },
            a.$onInit = function() {
                n.schema = angular.fromJson(a.filterForm.data.schema),
                    n.form = angular.fromJson(a.filterForm.data.form),
                    n.model = a.filterForm.formModel ? a.filterForm.formModel : {},
                    n.model = a.dateParser(n.model)
            }
    }
    e.$inject = ["$scope", "$filter"],
        angular.module("cape-webapp").controller("customFilterController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        return {
            restrict: "EA",
            link: function(a, n) {
                var o;
                e(function() {
                        var e;
                        null !== n[0] && (e = n[0][0]),
                            "text" == e.type && n[0][0].focus(),
                            o = n[0][n[0].length - 1]
                    }, 10),
                    a.enableDisableSubmitButton = function(e) {
                        o.disabled = e;
                        var a = o.parentElement;
                        if (e) {
                            angular.element(o).addClass("hidden");
                            var n = t[0].createElement("button");
                            n.innerHTML = '<img src="assets/images/loading.gif" class="running-action">',
                                n.setAttribute("class", "btn btn-info"),
                                n.setAttribute("disabled", !0),
                                n.setAttribute("id", "ladda-button"),
                                a.appendChild(n)
                        } else
                            a.removeChild(angular.element("#ladda-button")[0]),
                            angular.element(o).removeClass("hidden")
                    }
            }
        }
    }
    e.$inject = ["$timeout", "$document"],
        angular.module("cape-webapp").directive("formSchemaFocus", e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = e;
        t.schema = t.data.schema,
            t.form = t.data.form,
            t.isConfig = t.configuration,
            t.model = t.data.formModel ? t.data.formModel : {},
            t.formOption = {
                formDefaults: {
                    readonly: !!t.configurationReadOnly && t.configurationReadOnly
                }
            },
            t.callAfterValidate = function(e, a) {
                !a && angular.isDefined(t.callOnSuccess) ? t.callOnSuccess()(t.model, e) : t.enableDisableSubmitButton(!1)
            },
            t.onSubmit = function(e) {
                t.$broadcast("schemaFormValidate"),
                    e.$valid && (t.callForValidate() ? (t.enableDisableSubmitButton(!0),
                        t.callForValidate()(t.model)) : t.callAfterValidate(!1))
            },
            t.saveAsDraft = function() {
                t.callAfterValidate(!0)
            },
            t.previous = function() {
                angular.isDefined(t.callOnCancel) && t.callOnCancel()()
            }
    }
    e.$inject = ["$scope"],
        angular.module("cape-webapp").controller("configurationDirectiveController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("configForm", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/configuration/configurationDirective.html",
            scope: {
                data: "=",
                callOnSuccess: "&",
                callOnCancel: "&",
                configuration: "=",
                callForValidate: "&",
                callAfterValidate: "=?",
                configurationReadOnly: "=?"
            },
            controller: "configurationDirectiveController",
            controllerAs: "configurationDirCtrl"
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").directive("auditTrailDirective", function() {
        return {
            restrict: "EA",
            templateUrl: "app/shared/auditTrail/auditTrail.html",
            scope: {
                data: "=",
                showActivityViewFlag: "="
            },
            bindToController: !0,
            controller: "auditTrailController",
            controllerAs: "auditTrailCtrl"
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r = this;
        r.stateParams = n,
            r.appURL = t,
            r.activityList = [],
            r.isResponse = !1,
            r.loadUserActivity = function(e, t) {
                r.errorMessage = "",
                    200 === t && (e && e.data.length && angular.forEach(e.data, function(e) {
                            r.activityList.push(e)
                        }),
                        r.isResponse = !0)
            },
            r.closeAuditTrailView = function() {
                r.fadeFlag = !1,
                    o(function() {
                        r.showActivityViewFlag = !1,
                            r.showAuditWindow = !1,
                            r.showAuditView = !1
                    }, 500)
            },
            r.failedLoading = function(e) {
                r.errorMessage = "Error occurred while processing request!"
            };
        var i = new a.LazyLoading;
        i.resAttr = "data",
            i.callback = r.loadUserActivity,
            i.errorCallback = r.failedLoading,
            r.lazyLoading = i,
            r.$onInit = function() {
                r.loadData()
            },
            r.loadData = function() {
                r.activityList = [],
                    r.resetScroll = !0;
                var e = t + "studio/v1/canvas/" + r.data.canvasCode + "/activity";
                r.lazyLoading.pageNumber = 0,
                    r.lazyLoading.url = e,
                    r.lazyLoading.isEmpty = !1,
                    r.lazyLoading.params = {
                        searchKey: r.searchActivity
                    },
                    r.lazyLoading.nextPage(),
                    r.showAuditWindow = !0,
                    r.showAuditView = !0,
                    r.fadeFlag = !0
            },
            r.clearSearch = function() {
                r.searchActivity = "",
                    r.loadData()
            }
    }
    e.$inject = ["UtilFactory", "SERVICE_BASE_URL", "lazyloadingFactory", "$stateParams", "$timeout"],
        angular.module("cape-webapp").controller("auditTrailController", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.editProfile = function(a) {
                var n = t + "studio/v1/orgs/" + a.orgCode + "/users/" + a.username + "/editProfile";
                return e({
                    method: "PATCH",
                    url: n,
                    data: a
                })
            },
            a.getUserInfo = function(a, n) {
                return e({
                    method: "GET",
                    url: t + "studio/v1/orgs/" + a + "/user/" + n + "/myProfile"
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("userProfileService", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.logout = function(n) {
                var o = t.logout(n);
                a.deleteUserInfoFromSession(),
                    e.$broadcast("oauth:loggedOut", o)
            },
            n
    }
    e.$inject = ["$rootScope", "LoginService", "Validator"],
        angular.module("cape-webapp").factory("userProfileFactory", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s) {
        var l = this;
        l.loggedInUserInfo = e.getLoggedInUserDetails(),
            l.username = l.loggedInUserInfo.username,
            l.orgCode = l.loggedInUserInfo.orgCode,
            l.userDomainName = l.username.substring(l.username.indexOf("@") + 1),
            l.ssoDomainList = i.getssoTanentList(),
            l.isSSOUser = !!_.includes(l.ssoDomainList, l.userDomainName),
            r.$on("userProfile:updated", function(e, t) {
                l.userInfo = t
            }),
            l.init = function() {
                o.go("main.userProfile" === o.current.name ? "main.userProfile.updateProfile" : o.current.name),
                    t.getUserDetails() ? l.userInfo = t.getUserDetails() : l.getUserInfo()
            },
            l.imageSelected = function(e, t) {
                l.imageloaded = !1,
                    l.userInfo.profilePic = t,
                    l.updateProfilePic()
            },
            l.imageSelectionCancelled = function() {
                l.imageloaded = !1
            },
            l.onfileLoad = function(e) {
                l.imageloaded = !0
            },
            l.updateProfilePic = function() {
                a.editProfile(l.userInfo).then(function(e) {
                    n.success("user info updated successfully", "Success"),
                        r.$broadcast("userProfile:updated", e.data)
                }, function(e) {
                    var t;
                    t = e && e.data && e.data.message && e.data.message.length ? e.data.message : "Something went wrong",
                        n.error(t, "Error")
                })
            },
            l.navigateToProfileOrPasswordPage = function(e) {
                e ? o.go("main.userProfile.updateProfile") : o.go("main.userProfile.changePassword")
            },
            l.getUserInfo = function() {
                a.getUserInfo(l.orgCode, l.username).then(function(e) {
                    l.userInfo = e.data,
                        t.setUserDetails(e.data)
                }, function(e) {
                    n.error("Failed while fetching user info!", "Error")
                })
            },
            l.init()
    }
    e.$inject = ["userDetails", "Validator", "userProfileService", "toastr", "$state", "$rootScope", "ssoFactory", "$log"],
        angular.module("cape-webapp").controller("userProfileController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("SettingsController", function() {})
}(),
function() {
    "use strict";
    angular.module("oauth.validator", ["angular-jwt"]).factory("Validator", ["$rootScope", "$location", "$window", "$sessionStorage", "$base64", "jwtHelper", "SERVICE_BASE_URL", function(e, t, a, n, o, r, i) {
        var s = {},
            l = null,
            c = null;
        return s.storage = {
                data: null,
                getItem: function(e) {
                    return this.data ? this.data[e] : null
                },
                setItem: function(e, t) {
                    this.data || (this.data = {}),
                        this.data[e] = t
                },
                removeItem: function(e) {
                    delete this.data[e]
                },
                clear: function() {
                    delete this.data
                }
            },
            s.clearDataFromStorage = function(e) {
                this.storage.removeItem(e)
            },
            s.getItemFromStorage = function(e) {
                return this.storage.getItem(e)
            },
            s.setItemToStorage = function(e, t) {
                this.storage.setItem(e, t)
            },
            s.setDriftTime = function(e) {
                var t = new Date(e),
                    a = (new Date).getTime() - t.getTime(),
                    n = Math.floor(a / 1e3);
                this.setItemToStorage("driftTime", n)
            },
            s.setUserDetails = function(e) {
                this.setItemToStorage("user_details", e)
            },
            s.getUserDetails = function() {
                return c = this.getItemFromStorage("user_details")
            },
            s.clearUserDetails = function() {
                this.clearDataFromStorage("user_details")
            },
            s.getAccessToken = function() {
                return l = this.getItemFromStorage("access_token")
            },
            s.setTokenToStorage = function(e) {
                for (var t in e)
                    e.hasOwnProperty(t) && this.setItemToStorage(t, e[t])
            },
            s.clearTokenFromStrorage = function() {
                this.storage.clear()
            },
            s.checkTokenExpiry = function(e) {
                var t = !0;
                if (e && null !== e) {
                    var a = this.decodeToken(e).exp,
                        n = Math.floor((new Date).getTime() / 1e3),
                        o = this.getItemFromStorage("driftTime");
                    t = !(a - n + (o || 0) <= 60)
                } else
                    t = !1;
                return t
            },
            s.readUserInfoFromToken = function(e) {
                var t;
                return e && null !== e && ((t = {}).orgCode = e.org_code,
                        t.orgName = e.org_Name,
                        t.username = e.upn,
                        t.email = e.email,
                        t.name = e.name,
                        t.acls = e.scp,
                        t.projectList = e.project_list),
                    t
            },
            s.decodeToken = function(e) {
                var t;
                return e && null !== e && (t = r.decodeToken(e)),
                    t
            },
            s.getRefreshToken = function() {
                var e = new XMLHttpRequest,
                    t = "grant_type=refresh_token&refresh_token=" + encodeURIComponent(this.storage.getItem("refresh_token"));
                if (e.open("POST", i + "studio/v1/accessToken?" + t, !1),
                    e.withCredentials = !0,
                    e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                    e.send(null),
                    200 === e.status) {
                    var a = angular.fromJson(e.response);
                    a.access_token && s.setTokenToStorage(a)
                } else
                    this.callLogoutUri()
            },
            s.callLogoutUri = function() {
                var t = this.getUserInfoFromToken();
                if (t && t.username) {
                    var a = i + "studio/v1/logout/" + t.username;
                    return this.storage.clear(),
                        e.$broadcast("oauth:loggedOut", a), !0
                }
                return !1
            },
            s.getUserInfoFromToken = function() {
                var e = this.decodeToken(s.getAccessToken());
                return this.readUserInfoFromToken(e)
            },
            s.deleteUserInfoFromSession = function() {
                if (null !== s.getAccessToken())
                    return this.storage.clear(), !0
            },
            s.redirectToServiceUnavilable = function() {
                e.$broadcast("service:unavailable")
            },
            s.redirectToUnauthorize = function() {
                e.$broadcast("service:unauthorize")
            },
            s
    }])
}(),
function() {
    "use strict";
    angular.module("oauth.stateChangeHandler", []).factory("stateChangeHandler", ["$rootScope", "$log", "$location", "$window", "$sessionStorage", "$state", "$base64", "$injector", "$timeout", "Validator", "userDetails", "granularAccessControl", "ssoFactory", function(e, t, a, n, o, r, i, s, l, c, u, d, p) {
        var f = {};
        return f.getRedirctUri = function() {
                return f.redirecturi ? f.redirecturi : window.location.href
            },
            f.getLoginUri = function() {
                var e = window.location.href.indexOf("#");
                return n.location.href.substring(0, e) + "#/login"
            },
            f.getHomeUri = function() {
                var e = window.location.href.indexOf("#");
                return n.location.href.substring(0, e) + "#/main/home"
            },
            f.setRedirctUri = function(e) {
                f.redirecturi = e
            },
            f.routeChangeHandler = function(t, a, o, i, s) {
                e.internetConnectionFailed = !1;
                var u = f.getLoginUri(),
                    p = f.getHomeUri(),
                    g = n.location.href,
                    m = c.getAccessToken();
                if (a && a.isLoginRequired) {
                    var h = n.location.href;
                    if (f.redirecturi || -1 === h.indexOf("#") || (f.redirecturi = h),
                        m && null !== m) {
                        if (a.accessCode && !d.isAuthorised(a.accessCode, !0) && l(function() {
                                r.go("main.error", {
                                    errorCode: 403
                                })
                            }, 10),
                            f.redirecturi !== u || !m)
                            return;
                        f.changeBrowserURL(p)
                    } else
                        t.preventDefault(),
                        f.changeBrowserURL(u)
                } else
                    m && null !== m && g === u && l(function() {
                        n.location.href = p
                    }, 10)
            },
            f.listenStateChange = function() {
                e.$on("$stateChangeStart", f.routeChangeHandler),
                    e.$on("$locationChangeStart", f.locationChangeHandler)
            },
            f.changeBrowserURL = function(e) {
                n.location.href = e
            },
            e.$on("oauth:loggedIn", function() {
                if (n.location.href === f.redirecturi) {
                    var e = f.getHomeUri();
                    f.changeBrowserURL(e)
                } else
                    n.location.href = f.redirecturi ? f.redirecturi : "#/main/home"
            }),
            e.$on("oauth:loggedOut", function(e, t) {
                var a = f.getLoginUri();
                f.redirecturi = null,
                    f.changeBrowserURL(t + "/" + i.encode(encodeURIComponent(a)))
            }),
            e.$on("service:unavailable", function() {
                var e = window.location.href.indexOf("#"),
                    t = n.location.href.substring(0, e) + "#/unavailable";
                f.redirecturi = null,
                    f.changeBrowserURL(t)
            }),
            e.$on("service:unauthorize", function() {
                var e = window.location.href.indexOf("#"),
                    t = n.location.href.substring(0, e) + "#/unauthorize";
                f.changeBrowserURL(t)
            }),
            e.$on("redirct:login", function(e, t) {
                l(function() {
                    var e = f.getLoginUri();
                    location.replace(t || e),
                        t || window.location.reload(),
                        f.redirecturi = null
                }, 10)
            }),
            f.locationChangeHandler = function(e, t, n) {
                if (p.getssoTanentList().length) {
                    var o, r = a.search(),
                        i = t.substring(0, t.indexOf("access_token") - 1),
                        s = f.getLoginUri(),
                        u = f.getHomeUri();
                    if (r.access_token) {
                        var g = {
                            access_token: r.access_token,
                            token_type: r.token_type,
                            expires_in: r.expires_in,
                            expires_at: r.expires_at,
                            refresh_token: r.refresh_token,
                            refresh_token_issued_at: r.refresh_token_issued_at,
                            refresh_token_expires_in: r.refresh_token_expires_in,
                            refresh_token_expires_at: r.refresh_token_expires_at
                        };
                        c.setTokenToStorage(g),
                            o = i === s ? u : i,
                            l(function() {
                                location.replace(o),
                                    d.saveUserDetails()
                            }, 10)
                    }
                }
            },
            f
    }])
}(),
function() {
    "use strict";
    angular.module("oauth", ["oauth.stateChangeHandler", "oauth.validator", "oauth.interceptor"]).config(["$httpProvider", function(e) {
        e.interceptors.push("oauthInterceptor"),
            e.defaults.withCredentials = !0
    }]).run(["stateChangeHandler", function(e) {
        e.listenStateChange()
    }])
}(),
function() {
    "use strict";
    angular.module("oauth.interceptor", ["oauth.validator"]).factory("oauthInterceptor", ["$rootScope", "$q", "$window", "$timeout", "Validator", "$injector", "SERVICE_BASE_URL", function(e, t, a, n, o, r, i) {
        return {
            request: function(e) {
                if (e.url !== i + "studio/v1/login") {
                    var t = o.getAccessToken();
                    t && null !== t && (o.checkTokenExpiry(t) || (o.getRefreshToken(),
                            t = o.getAccessToken()),
                        t && !e.headers.Authorization && (e.headers.Authorization = "Bearer " + t))
                }
                return e
            },
            response: function(t) {
                var a = new RegExp(i);
                return t.config && a.test(t.config.url) && (o.setDriftTime(t.headers("Date")),
                        e.internetConnection = !0,
                        e.internetConnectionFailed = !1),
                    t
            },
            responseError: function(i) {
                var s = r.get("toastr"),
                    l = window.location.href.indexOf("#");
                if (401 === i.status) {
                    if (!o.callLogoutUri())
                        return t.reject(i)
                } else {
                    if (-1 === i.status)
                        return e.internetConnectionFailed || (s.error("Connection Failed!", "Error"),
                                e.internetConnectionFailed = !0),
                            e.internetConnection = !1,
                            t.reject(i);
                    if (504 === i.status)
                        return s.error("Connection timeOut!", "Error"),
                            t.reject(i);
                    403 !== i.status && 404 !== i.status || o.getAccessToken() && n(function() {
                        a.location.href = a.location.href.substring(0, l) + "#/main/error?errorCode=" + i.status
                    }, 10)
                }
                return t.reject(i)
            }
        }
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.getAllProjects = function() {
                return e({
                    method: "GET",
                    url: t + "studio/v1/projects"
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("mainService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").service("mainFactory", function() {
        var e = "";
        return {
            setMessage: function(t) {
                e = t
            },
            getMessage: function() {
                return e
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o, r, i, s, l, c, u, d, p, f, g) {
        var m = e;
        m.$state = t;
        var h = this;
        h.loggedInUserInfo = s.getLoggedInUserDetails(),
            h.username = h.loggedInUserInfo.username,
            h.orgCode = h.loggedInUserInfo.orgCode,
            h.version = r.storage.getItem("appVersion"),
            h.aclCode = o.ACCESS_CONTROL_LIST,
            a.$on("userProfile:updated", function(e, t) {
                h.userInfo = t
            }),
            h.init = function() {
                if (h.loggedInUserInfo) {
                    var e = h.loggedInUserInfo.username.indexOf("@");
                    h.domainName = h.loggedInUserInfo.username.substring(e),
                        u.isAuthorised(o.ACCESS_CONTROL_LIST.ADMIN_TENANT + "|" + o.ACCESS_CONTROL_LIST.CANVAS_VIEW, !0) && (h.loadAllProject(),
                            d.safeApply(m)),
                        "main" === t.current.name && h.navigateToHome()
                }
                h.getUserDetails()
            },
            h.redirectToHome = function(e) {
                t.go(e, {}, {
                    reload: !0
                })
            },
            h.getUserDetails = function() {
                r.getUserDetails() ? h.userInfo = r.getUserDetails() : p.getUserInfo(h.orgCode, h.username).then(function(e) {
                    r.setUserDetails(e.data),
                        h.userInfo = e.data
                }, function(e) {
                    f.error("Failed while fetching user info!", "Error")
                })
            },
            h.getAutoSaveMessage = function() {
                return h.currentStateName = t.current.name,
                    l.getMessage()
            },
            h.loadAllProject = function() {
                d.getAllProjectData() ? h.projects = d.getAllProjectData() : i.getAllProjects(h.username).then(function(e) {
                        d.setAllProjectData(e.data),
                            h.projects = e.data
                    }, function() {
                        h.projects = []
                    }),
                    h.navigateToHome()
            },
            h.navigateToHome = function() {
                t.go("main" === t.current.name ? "main.home" : t.current.name, n)
            },
            h.navigateToCanvasList = function() {
                t.go("main" === t.current.name ? "main.canvasList" : t.current.name, "main" === t.current.name ? {
                    projectCode: h.projects[0].projectCode
                } : "")
            },
            h.logOut = function() {
                c.logout(h.userInfo.username)
            },
            h.changePassword = function() {
                t.go("main.userProfile.updateProfile")
            },
            h.init()
    }
    e.$inject = ["$scope", "$state", "$rootScope", "$stateParams", "PAYLOAD_ENUM", "Validator", "mainService", "userDetails", "mainFactory", "userProfileFactory", "granularAccessControl", "UtilFactory", "userProfileService", "toastr", "$log"],
        angular.module("cape-webapp").controller("MainController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("ssoFactory", function() {
        var e = {},
            t = [];
        return e.setssoTanentList = function(e) {
                t = e
            },
            e.getssoTanentList = function() {
                return t
            },
            e
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n) {
        var o = {};
        return o.generateOtp = function(t) {
                var o = a.otpData(t);
                return e({
                    method: "POST",
                    url: n + "studio/v1/generateOtp",
                    headers: {
                        From: o.username
                    }
                })
            },
            o.redirectToSso = function(t, a, o) {
                return e({
                    method: "GET",
                    url: n + "studio/v1/redirectToSso/" + t + "/" + a + "/" + o
                })
            },
            o.generateSSOuri = function(e, t, a) {
                return n + "studio/v1/redirectToSso/" + e + "/" + t + "/" + a
            },
            o.validateUser = function(o) {
                var r = a.loginData(o);
                return e({
                    method: "POST",
                    url: n + "studio/v1/login",
                    headers: {
                        From: r.username,
                        Authorization: t.encode(r.password)
                    }
                })
            },
            o.logout = function(e) {
                return n + "studio/v1/logout/" + e
            },
            o
    }
    e.$inject = ["$http", "$base64", "LoginFactory", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("LoginService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("LoginFactory", function() {
        return {
            otpData: function(e) {
                return {
                    username: e
                }
            },
            loginData: function(e) {
                return {
                    username: e.username,
                    password: e.password
                }
            }
        }
    })
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("LoginController", ["$rootScope", "LoginService", "$uibModal", "$timeout", "$base64", "ssoFactory", "granularAccessControl", "toastr", "notify", "stateChangeHandler", "Validator", function(e, t, a, n, o, r, i, s, l, c, u) {
        var d = this;
        d.forgotPassword = function() {
                d.userName ? (d.sendingOTP = !0,
                    t.generateOtp(d.userName).then(function(e) {
                        200 == e.statusCode && (d.sendingOTP = !1,
                            s.info("One time password has been sent to your Email", "Info"),
                            n(function() {
                                a.open({
                                    templateUrl: "app/modules/forgotPassword/forgotPassword.html",
                                    controller: "forgotPasswordController",
                                    controllerAs: "forgotPasswordCtrl",
                                    windowClass: "my-modal",
                                    backdrop: "static"
                                }).result.then(function() {}, function() {})
                            }, 3e3))
                    }, function(e) {
                        s.error(e.message, "Error"),
                            d.sendingOTP = !1
                    })) : (d.forgotPasswordError = "Please enter username",
                    s.error("Please enter username", "Error"))
            },
            d.redirectTossoPage = function() {
                if (d.userName && d.userName.trim().length && r.getssoTanentList().length) {
                    var a = r.getssoTanentList(),
                        i = d.userName.indexOf("@"),
                        s = d.userName.substring(i + 1).toLowerCase(),
                        u = _.filter(a, function(e) {
                            return e.toLowerCase() === s
                        }).length;
                    if (0 === i || -1 === i || !u)
                        return;
                    d.redirectingToSSO = !0;
                    var p = l({
                        message: "Please wait while we will redirect you to your organization login page"
                    });
                    n(function() {
                        p.close();
                        var a = c.getHomeUri(),
                            n = o.encode(encodeURIComponent(a)),
                            r = t.generateSSOuri(s, d.userName, n);
                        e.$broadcast("redirct:login", r)
                    }, 3e3)
                }
            },
            d.validateUser = function(a) {
                var n = {
                    username: d.userName,
                    password: d.password
                };
                a && (d.loading = !0,
                    t.validateUser(n).then(function(t) {
                        d.loading = !1,
                            u.setTokenToStorage(t.data),
                            i.saveUserDetails(),
                            e.$broadcast("oauth:loggedIn")
                    }, function(e) {
                        d.loading = !1,
                            d.flgInvalidLogin = !0,
                            e && e.data && e.data.message && e.data.message.length ? ("CAP-114" == e.data.code && u.redirectToUnauthorize(),
                                d.invalidLoginMessage = e.data.message) : d.invalidLoginMessage = "Something went wrong"
                    }))
            }
    }])
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = this;
        n.openModalForCreatingCanvas = function() {
                t.isAuthorised(a.ACCESS_CONTROL_LIST.CANVAS_ADD_UPDATE, !1) && e.open({
                    templateUrl: "app/modules/canvas/createCanvas/createCanvas.html",
                    controller: "createCanvasController",
                    controllerAs: "createCanvasCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        projectCode: function() {
                            return null
                        },
                        canvasList: function() {
                            return null
                        }
                    }
                })
            },
            n.openCanvas = function(n, o) {
                t.isAuthorised(a.ACCESS_CONTROL_LIST.CANVAS_VIEW, !1) && e.open({
                    templateUrl: "app/modules/home/navigateToCanvas/navigateToCanvas.html",
                    controller: "navigateToCanvasController",
                    controllerAs: "navigateToCanvasCtrl",
                    windowClass: "my-modal",
                    backdrop: "static",
                    keyboard: !1,
                    resolve: {
                        stateName: function() {
                            return n
                        },
                        aclName: function() {
                            return o
                        }
                    }
                })
            }
    }
    e.$inject = ["$uibModal", "granularAccessControl", "PAYLOAD_ENUM"],
        angular.module("cape-webapp").controller("HomeController", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var n = {};
        return n.generateOtp = function(a) {
                return e({
                    method: "POST",
                    url: t + "studio/v1/generateOtp",
                    headers: {
                        From: a
                    }
                })
            },
            n.changePassword = function(n, o, r) {
                var i = a.changePassword(n, o, r);
                return e({
                    method: "POST",
                    url: t + "studio/v1/resetPassword",
                    data: i
                })
            },
            n
    }
    e.$inject = ["$http", "SERVICE_BASE_URL", "forgotPasswordFactory"],
        angular.module("cape-webapp").service("forgotPasswordService", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").factory("forgotPasswordFactory", function() {
        return {
            sendOtp: function(e) {
                return {
                    username: e
                }
            },
            changePassword: function(e, t, a) {
                return {
                    otp: e,
                    userName: t,
                    password: a
                }
            }
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, n, o) {
        var r = this;
        r.submitted = !1,
            r.resendOtpFlag = !1,
            null !== t.getFormValidationPattern() ? r.formValidationPattern = t.getFormValidationPattern() : t.callInitFunction().then(function(e) {
                t.setFormValidationPattern(e.data.validationPattern),
                    r.formValidationPattern = t.getFormValidationPattern()
            }, function(e) {
                n.error(e.data.message, "Error")
            }),
            r.resendOtp = function() {
                r.otpLaddaButton = !0,
                    r.resendOtpFlag = !0,
                    r.username ? a.generateOtp(r.username).then(function() {
                        n.success("Otp sent succesfully"),
                            r.otpLaddaButton = !1
                    }, function() {
                        r.otpLaddaButton = !1,
                            n.error("Something went wrong", "Error")
                    }) : (r.otpLaddaButton = !1,
                        r.forgotPasswordError = "Please enter username")
            },
            r.validateForgetPasswordForm = function(e) {
                r.submitted = !0,
                    e && r.changePassword()
            },
            r.changePassword = function() {
                r.saveLaddaButton = !0,
                    r.changePasswordErrorMessage = "";
                var t = e.encode(r.newPassword);
                a.changePassword(r.otp, r.username, t).then(function() {
                    n.success("Password changed succesfully"),
                        o.close(!0)
                }, function(e) {
                    r.saveLaddaButton = !1,
                        n.error(e.message, "Error")
                })
            },
            r.closeWindow = function() {
                o.close()
            }
    }
    e.$inject = ["$base64", "UtilFactory", "forgotPasswordService", "toastr", "$uibModalInstance"],
        angular.module("cape-webapp").controller("forgotPasswordController", e)
}(),
function() {
    "use strict";
    angular.module("cape-webapp").controller("ErrorModuleController", ["$stateParams", function(e) {
        var t = this;
        try {
            t.errorCode = parseInt(e.errorCode),
                401 === t.errorCode ? (t.errorImage = "../assets/images/error_401.svg",
                    t.errorDesc = "Unauthorized",
                    t.errorMessage = " Hold up, you are not authorized to access this page.") : 403 === t.errorCode ? (t.errorImage = "../assets/images/error_403.svg",
                    t.errorDesc = "Forbidden",
                    t.errorMessage = "Sorry , the page you are requesting is forbidden.") : 404 === t.errorCode ? (t.errorImage = "../assets/images/error_404.svg",
                    t.errorDesc = " Not Found\t",
                    t.errorMessage = " Sorry , the page you are requesting could not be found.") : 405 === t.errorCode && (t.errorImage = "../assets/images/error_405.svg",
                    t.errorDesc = " Not allowed",
                    t.errorMessage = " Sorry , you are not allowed to perform this action please contact to admin.")
        } catch (e) {
            t.errorImage = "../assets/images/error_404.svg",
                t.errorDesc = " Not Found\t",
                t.errorMessage = " Sorry , the page you are requesting could not be found."
        }
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = {};
        return a.getDashboardApis = function() {
                return e({
                    method: "GET",
                    url: t + "studio/v1/dashboard"
                })
            },
            a.getDashboardData = function(a) {
                return e({
                    method: "GET",
                    url: t + a
                })
            },
            a.updateDashboardData = function(a) {
                return e({
                    method: "PATCH",
                    data: a,
                    url: t + "studio/v1/dashboard/updateDashboard"
                })
            },
            a.deleteComponent = function(a) {
                return e({
                    method: "DELETE",
                    url: t + "studio/v1/dashboard/deleteDashboard/" + a
                })
            },
            a.getDefaultApis = function() {
                return e({
                    method: "GET",
                    url: t + "studio/v1/dashboard/default"
                })
            },
            a
    }
    e.$inject = ["$http", "SERVICE_BASE_URL"],
        angular.module("cape-webapp").service("DashboardService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, n) {
        var o = this;
        o.dashboardData = [],
            o.dashboardDataCopy = [],
            o.$onInit = function() {
                e.getDashboardApis().then(function(e) {
                    _.each(e.data, function(t, a) {
                            null !== t.row && null !== t.col && (e.data[a].row = parseInt(t.row),
                                e.data[a].col = parseInt(t.col))
                        }),
                        o.dashboardData = e.data,
                        o.dashboardDataCopy = angular.copy(o.dashboardData),
                        o.setGridsterOption()
                }, function(e) {
                    t.error(e.data.message, "Error")
                })
            },
            o.setGridsterOption = function() {
                o.gridsterOpts = {
                    columns: 13,
                    pushing: !0,
                    floating: !0,
                    swapping: !1,
                    width: "auto",
                    colWidth: "auto",
                    rowHeight: "match",
                    margins: [-10, -10],
                    outerMargin: !0,
                    sparse: !1,
                    isMobile: !1,
                    mobileBreakPoint: 600,
                    mobileModeEnabled: !0,
                    resizable: {
                        enabled: !1
                    },
                    draggable: {
                        enabled: !0,
                        stop: function(e, t, a) {
                            o.draggedComponent = {},
                                _.each(o.dashboardDataCopy, function(e) {
                                    if (e.componentName === a.componentName)
                                        return o.draggedComponent = e, !1
                                }),
                                o.draggedComponent.row === a.row && o.draggedComponent.col === a.col || (o.updateDashboard(),
                                    o.dashboardDataCopy = angular.copy(o.dashboardData))
                        }
                    }
                }
            },
            o.deleteComponent = function(a) {
                var r = {
                        title: "Delete component",
                        text: a.componentName + " will be deleted",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No"
                    },
                    i = {};
                n.complexView(r, i, function(n) {
                    n && e.deleteComponent(a.componentName).then(function(e) {
                        200 === e.status && (_.remove(o.dashboardData, a),
                            o.dashboardDataCopy = angular.copy(o.dashboardData),
                            t.info("Component deleted succesfully", "Info"))
                    }, function(e) {
                        t.error(e.data.message, "Error")
                    })
                })
            },
            o.addComponent = function() {
                e.getDefaultApis().then(function(e) {
                    o.defaultDashboard = e.data,
                        _.remove(o.defaultDashboard, function(e) {
                            return !!_.find(o.dashboardData, {
                                componentName: e.componentName
                            })
                        }),
                        o.defaultDashboard.length ? o.openAddDashboardModal() : t.info("No components to add", "Info")
                }, function(e) {
                    t.error(e.data.message, "Error")
                })
            },
            o.updateDashboard = function() {
                e.updateDashboardData(o.dashboardData).then(function(e) {}, function(e) {
                    t.error(e.data.message, "Error")
                })
            },
            o.openAddDashboardModal = function() {
                a.open({
                    templateUrl: "app/modules/dashboard/addComponent/addComponent.html",
                    controller: "AddDashboardComponentController",
                    controllerAs: "AddDashboardComponentCtrl",
                    windowClass: "my-modal",
                    resolve: {
                        modalData: function() {
                            return o.defaultDashboard
                        }
                    }
                }).result.then(function(e) {
                    o.dashboardData.push.apply(o.dashboardData, e),
                        o.dashboardDataCopy = angular.copy(o.dashboardData),
                        o.updateDashboard()
                })
            }
    }
    e.$inject = ["DashboardService", "toastr", "$uibModal", "SweetAlerts"],
        angular.module("cape-webapp").controller("DashboardController", e)
}(),
angular.element(document).ready(function(e) {
        function t() {
            var e = angular.element("body").height() - 61;
            angular.element(".sidebard-panel").css("min-height", e + "px");
            var t = angular.element("nav.navbar-default").height(),
                a = angular.element("#page-wrapper").height();
            t > a && angular.element("#page-wrapper").css("min-height", t + "px"),
                t < a && angular.element("#page-wrapper").css("min-height", angular.element(window).height() + "px"),
                angular.element("body").hasClass("fixed-nav") && (t > a ? angular.element("#page-wrapper").css("min-height", t - 60 + "px") : angular.element("#page-wrapper").css("min-height", angular.element(window).height() - 60 + "px"))
        }

        function a() {
            angular.element(document).width() < 769 && angular.element(document).height() < 769 ? angular.element(".cstm-wrapper").css("height", "405px") : angular.element(".cstm-wrapper").css("height", "inherit")
        }
        angular.element(window).bind("load resize scroll", function() {
                angular.element("body").hasClass("body-small") || (t(),
                    a())
            }),
            angular.element(window).scroll(function() {
                angular.element(window).scrollTop() > 0 && !angular.element("body").hasClass("fixed-nav") ? angular.element("#right-sidebar").addClass("sidebar-top") : angular.element("#right-sidebar").removeClass("sidebar-top")
            }),
            e(function() {
                t(),
                    a()
            }, 5e3)
    }),
    function() {
        "use strict";

        function e(e, t, a, n, o, r) {
            var i = this;
            i.init = function() {
                    var e = new XMLHttpRequest;
                    if (e.open("GET", t + "studio/v1/init", !1),
                        e.withCredentials = !0,
                        e.send(null),
                        200 === e.status) {
                        var i = angular.fromJson(e.response);
                        a.setDriftTime(e.getResponseHeader("Date")),
                            i.applicationProperties && a.storage.setItem("appVersion", i.applicationProperties.appVersion),
                            i.applicationProperties.regex && o.setFormValidationPattern(i.applicationProperties.regex),
                            i.tanentList && i.tanentList.length && r.setssoTanentList(i.tanentList),
                            i.token ? (a.setTokenToStorage(i.token),
                                n.saveUserDetails()) : a.storage.clear(),
                            o.initializePageLoad()
                    } else
                        a.storage.clear(),
                        a.redirectToServiceUnavilable()
                },
                i.checkbrowser = function() {
                    var t = o.checkbrowser();
                    if (!t.isChrome && !t.isFirefox) {
                        e.alert("For better user experience please use either Google Chrome or Mozilla Firefox")
                    }
                }
        }
        e.$inject = ["$window", "SERVICE_BASE_URL", "Validator", "granularAccessControl", "UtilFactory", "ssoFactory"],
            angular.module("cape-webapp").service("initialSetup", e)
    }(),
    function() {
        "use strict";

        function e(e, t) {
            t.checkbrowser();
            try {
                t.init()
            } catch (t) {
                e.storage.clear(),
                    e.redirectToServiceUnavilable()
            }
        }
        e.$inject = ["Validator", "initialSetup"],
            angular.module("cape-webapp").run(e)
    }(),
    function() {
        "use strict";

        function e(e, t, a, n) {
            a.hashPrefix(""),
                e.state("login", {
                    url: "/login",
                    templateUrl: "app/modules/login/login.html",
                    controller: "LoginController",
                    controllerAs: "loginCtrl",
                    params: {
                        redirecturi: null
                    }
                }).state("unauthorize", {
                    url: "/unauthorize",
                    templateUrl: "app/modules/unauthorize/unauthorize.html",
                    isLoginRequired: !1
                }).state("unavailable", {
                    url: "/unavailable",
                    templateUrl: "app/modules/unavailable/unavailable.html",
                    isLoginRequired: !1
                }).state("main", {
                    url: "/main",
                    templateUrl: "app/modules/main/main.html",
                    controller: "MainController",
                    controllerAs: "mainCtrl",
                    isLoginRequired: !0
                }).state("main.home", {
                    url: "/home",
                    templateUrl: "app/modules/home/home.html",
                    controller: "HomeController",
                    controllerAs: "homeCtrl",
                    isLoginRequired: !0
                }).state("main.userProfile", {
                    url: "/user",
                    templateUrl: "app/modules/user/userProfile.html",
                    controller: "userProfileController",
                    controllerAs: "userProfileCtrl",
                    isLoginRequired: !0,
                    params: {
                        hideFields: null
                    }
                }).state("main.dashboard", {
                    url: "/dashboard",
                    templateUrl: "app/modules/dashboard/dashboard.html",
                    controller: "DashboardController",
                    controllerAs: "DashboardCtrl",
                    isLoginRequired: !0
                }).state("main.userProfile.changePassword", {
                    url: "/change-password",
                    templateUrl: "app/modules/user/changePassword/changePassword.html",
                    controller: "changePasswordController",
                    controllerAs: "changePasswordCtrl",
                    isLoginRequired: !0
                }).state("main.userProfile.updateProfile", {
                    url: "/update-profile",
                    templateUrl: "app/modules/user/updateProfile/updateProfile.html",
                    controller: "updateProfileController",
                    controllerAs: "updateProfileCtrl",
                    isLoginRequired: !0
                }).state("main.settings", {
                    url: "/settings",
                    templateUrl: "app/modules/settings/settings.html",
                    controller: "SettingsController",
                    controllerAs: "settingsCtrl",
                    isLoginRequired: !0
                }).state("main.addIntegration", {
                    url: "/add-integration/:rootComponentCode/:componentCode/:componentName/:softwareCode/:softwareName/:integratedSoftwareCode",
                    templateUrl: "app/modules/components/addIntegration/addIntegration.html",
                    controller: "addIntegrationController",
                    controllerAs: "addIntegrationCtrl",
                    isLoginRequired: !0,
                    params: {
                        rootComponentCode: null,
                        componentCode: null,
                        softwareCode: null,
                        integratedSoftwareCode: null,
                        componentName: null,
                        softwareName: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_PLATFORM
                }).state("main.addSoftware", {
                    url: "/add-software/:rootComponentCode/:componentCode/:componentName/:softwareCode",
                    templateUrl: "app/modules/components/addSoftware/addSoftware.html",
                    controller: "addSoftwareController",
                    controllerAs: "addSoftwareCtrl",
                    isLoginRequired: !0,
                    params: {
                        rootComponentCode: null,
                        componentCode: null,
                        softwareCode: null,
                        componentName: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_PLATFORM
                }).state("main.boilerplate", {
                    url: "/boilerplate/:type?viewType",
                    templateUrl: "app/modules/boilerplate/boilerplateList/boilerplateList.html",
                    controller: "BoilerplateListController",
                    controllerAs: "BoilerplateListCtrl",
                    isLoginRequired: !0,
                    params: {
                        type: null,
                        viewType: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.GLOBAL_BOILERPLATE + "|" + n.ACCESS_CONTROL_LIST.LOCAL_BOILERPLATE
                }).state("main.canvasList", {
                    url: "/canvas-list/:projectCode?viewType",
                    templateUrl: "app/modules/canvas/canvaslist/canvaslist.html",
                    controller: "CanvasListController",
                    controllerAs: "canvaslistCtrl",
                    isLoginRequired: !0,
                    params: {
                        projectCode: null,
                        viewType: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.CANVAS_VIEW
                }).state("main.canvasLog", {
                    url: "/canvaslog",
                    templateUrl: "app/modules/canvas/canvasLog/canvasLog.html",
                    controller: "CanvasLogController",
                    controllerAs: "canvaslogCtrl",
                    isLoginRequired: !0,
                    accessCode: n.ACCESS_CONTROL_LIST.CANVAS_EXECUTE + "|" + n.ACCESS_CONTROL_LIST.CANVAS_PROVISION
                }).state("main.components", {
                    url: "/components/:componentCode",
                    templateUrl: "app/modules/components/componentList/components.html",
                    controller: "ComponentsController",
                    controllerAs: "componentsCtrl",
                    isLoginRequired: !0,
                    params: {
                        componentCode: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_PLATFORM
                }).state("main.drawCanvas", {
                    url: "/drawCanvas/:projectCode/:canvasCode/:canvasName?isCanvas?type",
                    templateUrl: "app/modules/canvas/drawCanvas/drawCanvas.html",
                    controller: "drawCanvasController",
                    controllerAs: "drawCanvasCtrl",
                    isLoginRequired: !0,
                    params: {
                        projectCode: null,
                        canvasCode: null,
                        canvasName: null,
                        type: null,
                        isCanvas: "true"
                    }
                }).state("main.drawCanvas.execute", {
                    url: "/execute",
                    templateUrl: "app/modules/canvas/drawCanvas/executeTab/executeView.html",
                    controller: "ExecuteTabController",
                    controllerAs: "ExecuteTabCtrl",
                    isLoginRequired: !0,
                    accessCode: n.ACCESS_CONTROL_LIST.CANVAS_VIEW
                }).state("main.drawCanvas.execute.defaultView", {
                    url: "/defaultView",
                    templateUrl: "app/modules/canvas/drawCanvas/executeTab/defaultExecuteTab/defaultExecuteTab.html",
                    controller: "DefaultViewController",
                    controllerAs: "DefaultViewCtrl",
                    isLoginRequired: !0,
                    accessCode: n.ACCESS_CONTROL_LIST.CANVAS_VIEW
                }).state("main.drawCanvas.compose", {
                    url: "/compose",
                    templateUrl: "app/modules/canvas/drawCanvas/composeTab/composeTab.html",
                    controller: "ComposeTabController",
                    controllerAs: "ComposeTabCtrl",
                    isLoginRequired: !0
                }).state("main.drawCanvas.provision", {
                    url: "/provision",
                    templateUrl: "app/modules/canvas/drawCanvas/provisionTab/provisionTab.html",
                    controller: "provisionTabController",
                    controllerAs: "provisionTabCtrl",
                    isLoginRequired: !0
                }).state("main.drawCanvas.provision.defaultView", {
                    url: "/defaultView",
                    templateUrl: "app/modules/canvas/drawCanvas/provisionTab/defaultProvisionTab/defaultProvisionTab.html",
                    controller: "defaultProvisionViewController",
                    controllerAs: "defaultProvisionViewCtrl",
                    isLoginRequired: !0
                }).state("main.drawCanvas.provision.infraView", {
                    url: "/infraView/:id",
                    templateUrl: "app/modules/canvas/drawCanvas/provisionTab/infraProvisionTab/infraProvisionTab.html",
                    controller: "InfraViewTabsController",
                    controllerAs: "InfraViewTabsCtrl",
                    isLoginRequired: !0,
                    params: {
                        id: null,
                        navigatingToChildState: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.CANVAS_VIEW
                }).state("main.drawCanvas.analyze", {
                    url: "/analyze",
                    templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/analyzeTab.html",
                    controller: "analyzeTabController",
                    controllerAs: "analyzeTabCtrl",
                    isLoginRequired: !0,
                    accessCode: n.ACCESS_CONTROL_LIST.ANALYZE_CANVAS
                }).state("main.drawCanvas.analyze.views", {
                    url: "/views/:groupCode",
                    templateUrl: "app/modules/canvas/drawCanvas/analyzeTab/views/views.html",
                    controller: "ViewsController",
                    controllerAs: "ViewsCtrl",
                    isLoginRequired: !0,
                    params: {
                        groupCode: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.ANALYZE_CANVAS
                }).state("main.projectManager", {
                    url: "/projectManager",
                    templateUrl: "app/modules/manage/project/projectManagement/projectManagement.html",
                    controller: "projectManagementController",
                    controllerAs: "projectManagementCtrl",
                    isLoginRequired: !0,
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_TENANT
                }).state("main.projectManager.projectUserList", {
                    url: "/projectUser-list/:projectCode",
                    templateUrl: "app/modules/manage/project/projectUserList/projectUserList.html",
                    controller: "projectUserListController",
                    controllerAs: "projectuserlistCtrl",
                    isLoginRequired: !0,
                    params: {
                        projectCode: null,
                        projectName: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_TENANT
                }).state("main.softwares", {
                    url: "/components/:componentCode/:subComponentCode/:subComponentName/softwares",
                    templateUrl: "app/modules/components/softwareList/softwareList.html",
                    controller: "softwareListController",
                    controllerAs: "softwareListCtrl",
                    isLoginRequired: !0,
                    params: {
                        componentCode: null,
                        subComponentCode: null,
                        subComponentName: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_PLATFORM
                }).state("main.tenantManager", {
                    url: "/tenantManager",
                    templateUrl: "app/modules/manage/tenant/tenantManagement/tenantManagement.html",
                    controller: "tenantManagementController",
                    controllerAs: "tenantManagementCtrl",
                    isLoginRequired: !0,
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_TENANT + "|" + n.ACCESS_CONTROL_LIST.ADMIN_PLATFORM
                }).state("main.tenantManager.userList", {
                    url: "/admin-list/:orgId/:orgName",
                    templateUrl: "app/modules/manage/tenant/userlist/userlist.html",
                    controller: "UserListController",
                    controllerAs: "userlistCtrl",
                    isLoginRequired: !0,
                    params: {
                        orgId: null,
                        orgName: null
                    },
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_TENANT + "|" + n.ACCESS_CONTROL_LIST.ADMIN_PLATFORM
                }).state("main.application", {
                    url: "/application",
                    templateUrl: "app/modules/platform/application/application.html",
                    controller: "ApplicationController",
                    controllerAs: "applicationCtrl",
                    isLoginRequired: !0,
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_PLATFORM
                }).state("main.admins", {
                    url: "/admins",
                    templateUrl: "app/modules/platform/admins/admins.html",
                    controller: "AdminsController",
                    controllerAs: "adminsCtrl",
                    isLoginRequired: !0,
                    accessCode: n.ACCESS_CONTROL_LIST.ADMIN_PLATFORM
                }).state("main.roles", {
                    url: "/roles",
                    templateUrl: "app/modules/manage/project/roles/roles.html",
                    controller: "RolesController",
                    controllerAs: "rolesCtrl",
                    isLoginRequired: !0
                }).state("main.error", {
                    url: "/error?errorCode",
                    templateUrl: "app/modules/errorModule/errorModule.html",
                    controller: "ErrorModuleController",
                    controllerAs: "errorModuleCtrl",
                    isLoginRequired: !0,
                    params: {
                        errorCode: null
                    }
                }),
                t.otherwise(function(e) {
                    e.get("$state").go("main")
                })
        }
        e.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "PAYLOAD_ENUM"],
            angular.module("cape-webapp").config(e)
    }(),
    function() {
        "use strict";
        angular.module("cape-webapp").constant("PAYLOAD_ENUM", {
            DEFAULT_BUILD_URL_LABEL: "service-url-to-be-changed-on-build",
            MAX_PF_PIC_IMAGE_SIZE_IN_MB: 2,
            USER_ROLES: {
                DEV: "DEV",
                ROOT: "ROOT",
                ADMIN: "ADMIN"
            },
            CLIPBOARD_TEXT: {
                DEFAULT_MESSAGE: "Click to copy token",
                AFTER_CLICK: "Copied"
            },
            ACCESS_CONTROL_LIST: {
                CANVAS_VIEW: "2010",
                CANVAS_ADD_UPDATE: "2040",
                CANVAS_DELETE: "2080",
                CANVAS_EXECUTE: "2043",
                CANVAS_PROVISION: "2044",
                ANALYZE_CANVAS: "2050",
                GLOBAL_BOILERPLATE: "1010",
                LOCAL_BOILERPLATE: "1020",
                ADMIN_TENANT: "5000",
                ADMIN_PLATFORM: "6000"
            },
            SECRET_KEY: "MprQpgf9C2BTSebnMqsihIKeDxzOW80k",
            CANVAS_EXTENSION: "cns",
            CANVAS_TYPE: {
                NEW: "New",
                EXISTING: "Existing"
            },
            LABLES: {
                LOGIN: {
                    logo: "C A P E",
                    logoSubtitle: "Composable Automated Platform For Enterprise",
                    forgotPassowordLabel: "Forgot password?",
                    sendOtpLabel: "Sending OTP. Please Wait...",
                    invalidLoginMessage: "Invalid Username or Password",
                    lblUserName: "User Id",
                    lblPassword: "Password",
                    lblLogin: "Login"
                },
                HEADER: {
                    logo: "CAPE",
                    lblLogout: "Logout",
                    lblUserProfile: "Profile"
                },
                FOOTER: {
                    lblCopyRite: "Mindtree Ltd &copy; 2016"
                }
            },
            BOILERPLATE_TYPE: {
                LOCAL: "Local",
                GLOBAL: "Global"
            },
            NODE_TYPE: {
                SOFTWARE_NODE: "softwareNode",
                VM_NODE: "vmNode"
            },
            CANVAS_TAB_NAME: {
                COMPOSE: "compose",
                EXECUTE: "execute",
                PROVISION: "provision",
                ANALYZE: "analyze"
            },
            CANVAS_VIEW_TYPE: {
                GRID: "Grid",
                LIST: "List"
            },
            CANVAS_STATUS: {
                NEW: "New",
                COMPOSING: "Composing",
                PROVISIONING: "Provisioning",
                EXECUTING: "Executing",
                INSTALLING: "Installing"
            },
            SOFTWARE_STATUS: {
                DRAFT: "Draft",
                NEW: "New",
                INSTALLING: "Installing",
                INSTALLED: "Installed",
                REMOVED: "Removed",
                UNINSTALLING: "Uninstalling",
                UNINSTALLED: "Uninstalled",
                FAILED_INSTALL: "FailedInstall",
                FAILED_UNINSTALL: "FailedUninstall",
                REMOVED_FAILED_UNINSTALL: "RemovedFailedUninstall",
                REMOVED_NEW: "RemovedNew"
            },
            VIEW_TYPE: {
                DEFAULT: "default"
            },
            ERROR_CODE: {
                CANVAS_OUT_OF_SYNC: "CAP-222"
            }
        })
    }(),
    function() {
        "use strict";
        angular.module("cape-webapp").filter("picker", ["$filter", function(e) {
            return function(t, a, n) {
                return e(a)(t, n)
            }
        }]).filter("componentPicker", ["$filter", function(e) {
            return function(t, a, n, o, r) {
                var i = [],
                    s = angular.isDefined(n) ? n.split(" << ") : void 0;
                i = e(a)(t, n),
                    angular.isDefined(s) && s[2] && r !== s[2] && (i = []),
                    (angular.isUndefined(n) || o.searchKey !== n) && (o.searchKeyCounter = 1);
                var l = !!i.length;
                return i.length && (o.searchKey = (angular.isDefined(n),
                        angular.copy(n))),
                    n && n && l && 1 === o.searchKeyCounter && (o.searchResultFound(r),
                        o.searchKeyCounter = 0),
                    i
            }
        }]).filter("highlight", ["$sce", function(e) {
            return function(t, a) {
                return a && (t = t.replace(new RegExp("(" + a + ")", "gi"), '<span class="highlighted">$1</span>')),
                    e.trustAsHtml(t)
            }
        }]).filter("timeago", function() {
            return function(e, t, a) {
                if (!e)
                    return "never";
                if (t || (t = Date.now()),
                    angular.isDate(e) ? e = e.getTime() : angular.isString(e) && (e = new Date(e).getTime()),
                    angular.isDate(t) ? t = t.getTime() : angular.isString(t) && (t = new Date(t).getTime()),
                    angular.isNumber(e) && angular.isNumber(t)) {
                    var n = Math.abs((t - e) / 1e3),
                        o = [];
                    return o = n <= 60 ? ["", a ? "now" : Math.round(Math.abs(n)) + " seconds"] : n < 3600 ? [Math.round(Math.abs(n / 60)), "min"] : n < 86400 ? [Math.round(Math.abs(n / 3600)), "hr"] : n < 604800 ? [Math.round(Math.abs(n / 86400)), "day"] : n < 31449600 ? [Math.round(Math.abs(n / 604800)), "week"] : n < 315569260 ? [Math.round(Math.abs(n / 31556926)), "year"] : n < 31556926e3 ? [Math.round(Math.abs(n / 315569260)), "decade"] : ["", "a long time"],
                        o[1] += 0 === o[0] || o[0] > 1 ? "s" : "",
                        o = o.join(" "), !0 === a ? o : e <= t ? o + " ago" : "in " + o
                }
            }
        })
    }(),
    function() {
        "use strict";

        function e(e, t, a, n, o, r) {
            o.decorator("SERVICE_BASE_URL", ["$delegate", function(e) {
                    return e === r.DEFAULT_BUILD_URL_LABEL && (e = window.location.origin + "/"),
                        e
                }]),
                angular.extend(e, {
                    allowHtml: !0,
                    closeButton: !0,
                    positionClass: "custom-toast-top-right",
                    progressBar: !1,
                    tapToDismiss: !0,
                    timeOut: 4e3,
                    preventOpenDuplicates: !0
                }),
                a.includeSpinner = !1,
                t.setOption({
                    style: "zoom-in",
                    spinnerSize: 35,
                    spinnerColor: "steelBlue"
                }),
                n.setCryptographyKey(r.SECRET_KEY)
        }
        e.$inject = ["toastrConfig", "laddaProvider", "cfpLoadingBarProvider", "$cryptoProvider", "$provide", "PAYLOAD_ENUM"],
            angular.module("cape-webapp").config(e)
    }(),
    function() {
        "use strict";
        angular.module("cape-webapp").directive("sideNavigation", ["$timeout", function(e) {
            return {
                restrict: "A",
                link: function(t, a) {
                    t.$watch("authentication.user", function() {
                        e(function() {
                            a.metisMenu()
                        })
                    })
                }
            }
        }]).directive("removeAndAddAttribute", function() {
            return {
                restrict: "A",
                link: function(e, t) {
                    var a = t[0];
                    e.addAttr = function(e, t) {
                            a.setAttribute(e, t)
                        },
                        e.removeAttr = function(e) {
                            a.removeAttribute(e)
                        },
                        e.setStyle = function(e, t) {
                            a.style[e] = t
                        },
                        e.removeStyle = function(e) {
                            a.style[e] = null
                        }
                }
            }
        }).directive("downloadFile", ["$document", function(e) {
            return {
                restrict: "A",
                link: function(t, a) {
                    a.bind("click", function() {
                        var t = e[0],
                            a = d3.select("svg").node(),
                            n = a.getAttribute("width"),
                            o = a.getAttribute("height"),
                            r = (new XMLSerializer).serializeToString(a),
                            i = t.createElement("canvas");
                        i.width = n,
                            i.height = o,
                            canvg(i, r, {
                                useCORS: !0,
                                ignoreMouse: !0,
                                ignoreAnimation: !0,
                                renderCallback: function() {
                                    var e = i.toDataURL("image/png"),
                                        a = t.createElement("a");
                                    a.href = e,
                                        a.download = "canvas",
                                        a.click()
                                }
                            })
                    })
                }
            }
        }]).directive("calculateActiveTabWidth", ["$timeout", function(e) {
            return {
                restrict: "A",
                scope: {
                    isActive: "=",
                    indexValue: "=",
                    scrollForThisTab: "=?"
                },
                link: function(t, a) {
                    t.indexValue && t.isActive && t.indexValue > 5 && e(function() {
                        var e = a.parent().width() * (t.indexValue + 1);
                        t.scrollForThisTab(e)
                    }, 10)
                }
            }
        }]).directive("isDraggable", function() {
            return {
                restrict: "A",
                scope: {
                    callback: "&"
                },
                link: function(e, t, a) {
                    t.bind("mousedown", function(t) {
                        e.$parent.$eval(a.isAuthorize) ? e.callback()(t, angular.fromJson(a.callbackArgs)) : t.preventDefault()
                    })
                }
            }
        }).directive("scrollable", ["$interval", "$timeout", function(e, t) {
            return {
                restrict: "A",
                scope: {
                    elementId: "@",
                    scrollValue: "=?",
                    scrollCompleteLeft: "=?",
                    scrollCompleteRight: "=?",
                    scrollForActiveTab: "=?",
                    activeTabWidth: "@"
                },
                link: function(a, n) {
                    function o() {
                        l = e(function() {
                            s.scrollLeft += a.scrollValue
                        }, 1e3 / 60)
                    }

                    function r() {
                        e.cancel(l)
                    }

                    function i() {
                        n.on("mousedown", function(e) {
                                o(e)
                            }),
                            n.on("mouseup mouseleave", function(e) {
                                r(e)
                            })
                    }
                    var s, l;
                    t(function() {
                            s = angular.element("#" + a.elementId)[0].querySelector(".nav-tabs")
                        }, 10),
                        a.scrollCompleteLeft = function() {
                            s.scrollLeft = 0
                        },
                        a.scrollCompleteRight = function() {
                            t(function() {
                                s.scrollLeft = s.scrollWidth
                            }, 10)
                        },
                        a.scrollForActiveTab = function(e) {
                            t(function() {
                                s.scrollLeft = e
                            }, 10)
                        },
                        t(function() {
                            i()
                        })
                }
            }
        }]).directive("closeSidebar", ["$timeout", function(e) {
            return {
                restrict: "A",
                scope: !0,
                link: function(t, a) {
                    a.on("click", function() {
                        angular.element("body").hasClass("mini-navbar") || (angular.element("body").toggleClass("mini-navbar"),
                            angular.element("#nav-icon3").removeClass("open"),
                            angular.element("#side-menu").hide(),
                            e(function() {
                                angular.element("#side-menu").fadeIn(200)
                            }, 10))
                    })
                }
            }
        }]).directive("minimalizaSidebar", ["$timeout", "$rootScope", function(e, t) {
            return {
                restrict: "A",
                template: '<div id="nav-icon3" ng-click="minimalize();"><span></span><span></span><span></span><span></span></div>',
                link: function(a, n) {
                    a.toggled = !1, !angular.element("body").hasClass("mini-navbar") || angular.element("body").hasClass("body-small") ? angular.element("#nav-icon3").addClass("open") : angular.element("#nav-icon3").removeClass("open"),
                        a.minimalize = function() {
                            angular.element("body").toggleClass("mini-navbar"), !angular.element("body").hasClass("mini-navbar") || angular.element("body").hasClass("body-small") ? (angular.element("#side-menu").hide(),
                                angular.element("#nav-icon3").addClass("open"),
                                e(function() {
                                    angular.element("#side-menu").fadeIn(200)
                                }, 200),
                                a.minimized = !0) : (angular.element("#nav-icon3").removeClass("open"),
                                angular.element("#side-menu").removeAttr("style"),
                                a.callback && !a.toggled && e(function() {
                                    a.callback()
                                }, 500),
                                a.minimized = !1)
                        };
                    var o = t.$on("toggleNavBar", function(e, t) {
                        a.callback = t,
                            angular.element("body").hasClass("mini-navbar") ? t && (t(),
                                a.toggled = !0) : (a.toggled = !1,
                                a.minimalize(),
                                a.toggled = !0)
                    });
                    a.$on("$destroy", o)
                }
            }
        }]).directive("scrollDown", ["$timeout", function(e) {
            return {
                restrict: "A",
                scope: {
                    control: "=?"
                },
                link: function(t, a) {
                    angular.isDefined(t.control) && (t.control.scrollDown = function() {
                        e(function() {
                            a[0].scrollTop = a[0].scrollHeight
                        })
                    })
                }
            }
        }]).directive("capeUserPrivilege", ["granularAccessControl", "$state", "UtilFactory", "$timeout", function(e, t, a, n) {
            return {
                restrict: "A",
                link: function(o, r, i) {
                    var s = "",
                        l = [],
                        c = null;
                    if (i.access.contains("|") ? (l = i.access.split("|"),
                            c = "|") : i.access.contains("&") ? (l = i.access.split("&"),
                            c = "&") : l = i.access.split("|"),
                        1 === l.length)
                        s = o.$eval(l[0].trim());
                    else {
                        s = o.$eval(l[0].trim());
                        for (var u = 1; u < l.length - 1; u++)
                            s = s + " " + c + " " + o.$eval(l[u].trim()) + " ";
                        s = s + " " + c + " " + o.$eval(l[l.length - 1].trim())
                    }
                    e.isAuthorised(s, !0) ? "true" !== i.parent && r.on("mouseup", function(e) {
                        var n = JSON.parse(i.params);
                        a.isLeftClick(e) && t.go(n.to, n.params, n.opt)
                    }) : (i.parent,
                        n(function() {
                            r.addClass("disabled"),
                                r.attr("title", "Access denied")
                        }, 1))
                }
            }
        }]).directive("attributeAssign", ["PAYLOAD_ENUM", function(e) {
            return {
                restrict: "A",
                scope: {
                    attributeAssign: "@"
                },
                link: function(t, a, n) {
                    for (var o = t.attributeAssign.replace(/[{}']/g, "").split(","), r = {}, i = 0; i <= o.length - 1; i++) {
                        var s = o[i].indexOf(":"),
                            l = o[i].substring(0, s),
                            c = o[i].substring(s + 1, o[i].length);
                        r[l] = c
                    }
                    var u = r.nodeName,
                        d = r.lbl;
                    "innerHTML" === r.attrName ? a[0].innerHTML = e.LABLES[u][d] : "placeholder" === r.attrName && n.$set(r.attrName, e.LABLES[u][d])
                }
            }
        }]).directive("onEnterEvent", function() {
            return {
                restrict: "A",
                link: function(e, t, a) {
                    t.bind("keydown keypress", function(t) {
                        13 === t.which && (e.$apply(function() {
                                e.$eval(a.onEnterEvent)
                            }),
                            t.preventDefault())
                    })
                }
            }
        }).directive("onTagInputKeyUp", function() {
            return {
                restrict: "A",
                link: function(e, t, a) {
                    var t = t[0],
                        n = angular.element(t).find("input");
                    n.bind("keyup", function(t) {
                            e.controllerName && e[e.controllerName].validateTag && e[e.controllerName].validateTag(t.currentTarget.value),
                                40 !== t.keyCode && 38 !== t.keyCode && e.openSuggestionList()
                        }),
                        e.openSuggestionList = function() {
                            var e = angular.element(n).scope();
                            angular.isDefined(e) && angular.isDefined(e.text) && 0 === e.text.length && e.events.trigger("input-focus")
                        },
                        e.closeSuggestionList = function() {
                            var e = angular.element(n).scope();
                            e && (e.events.trigger("input-blur"),
                                e.hasFocus = !1)
                        }
                }
            }
        }).directive("ngLeftClick", ["$parse", "UtilFactory", function(e, t) {
            return {
                restrict: "A",
                link: function(e, a, n) {
                    a.bind("click", function(a) {
                        t.isLeftClick(a) && e.$eval(n.ngLeftClick)
                    })
                }
            }
        }]).directive("whenScrollDown", function() {
            return {
                restrict: "A",
                scope: {
                    condition: "=",
                    resetScrollValue: "=?"
                },
                link: function(e, t, a) {
                    var n = 0;
                    t.scroll(function() {
                        var o = t.scrollTop() + t[0].clientHeight + 100;
                        angular.isUndefined(e.condition) && (e.condition = !0),
                            e.resetScrollValue && (n = 0),
                            o > t[0].scrollHeight && e.condition && t.scrollTop() > n && (n = t.scrollTop(),
                                e.$parent.$eval(a.whenScrollDown),
                                e.resetScrollValue = !1)
                    })
                }
            }
        }).directive("autoFocusTagInput", ["$timeout", function(e) {
            return function(t, a) {
                var n = a.find("input");
                e(function() {
                    n[0].focus()
                }, 100)
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("cape-webapp").value({
            SERVICE_BASE_URL: "service-url-to-be-changed-on-build"
        })
    }();