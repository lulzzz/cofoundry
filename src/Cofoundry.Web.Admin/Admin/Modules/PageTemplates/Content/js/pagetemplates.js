﻿angular.module("cms.pageTemplates", ["ngRoute", "cms.shared"]).constant("_", window._).constant("pageTemplates.modulePath", "/admin/modules/pagetemplates/js/"); angular.module("cms.pageTemplates").config(["$routeProvider", "shared.routingUtilities", "pageTemplates.modulePath", function (n, t, i) { t.registerCrudRoutes(n, i, "PageTemplate") }]); angular.module("cms.pageTemplates").controller("PageTemplateDetailsController", ["$routeParams", "$location", "shared.LoadState", "pageTemplates.pageTemplateService", "pageTemplates.modulePath", function (n, t, i, r) { function f() { u.editMode = !1; u.globalLoadState = new i; u.formLoadState = new i(!0); e().then(s.bind(null, u.formLoadState)) } function e() { function i(n) { u.pageTemplate = n; u.command = o(n); u.editMode = !1 } var t = n.id; return r.getById(t).then(i) } function o(n) { return _.pick(n, "pageTemplateId", "name", "description") } function s(n) { u.globalLoadState.off(); n && _.isFunction(n.off) && n.off() } var u = this; f() }]); angular.module("cms.pageTemplates").controller("PageTemplateListController", ["_", "shared.LoadState", "shared.SearchQuery", "pageTemplates.pageTemplateService", function (n, t, i, r) { function o() { u.gridLoadState = new t; u.query = new i({ onChanged: s }); u.filter = u.query.getFilters(); u.toggleFilter = f; f(!1); e() } function f(t) { u.isFilterVisible = n.isUndefined(t) ? !u.isFilterVisible : t } function s() { f(!1); e() } function e() { return u.gridLoadState.on(), r.getAll(u.query.getParameters()).then(function (n) { u.result = n; u.gridLoadState.off() }) } var u = this; o() }]); angular.module("cms.pageTemplates").factory("pageTemplates.pageModuleTypeService", ["$http", "shared.serviceBase", function (n, t) { var i = {}, r = t + "page-module-types"; return i.getAll = function () { return n.get(r) }, i }]); angular.module("cms.pageTemplates").factory("pageTemplates.pageTemplateService", ["$http", "shared.serviceBase", function (n, t) { function u(n) { return r + "/" + n } var i = {}, r = t + "page-templates"; return i.getAll = function (t) { return n.get(r, { params: t }) }, i.getById = function (t) { return n.get(u(t)) }, i }])