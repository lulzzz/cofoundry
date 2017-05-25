﻿angular.module("cms.customEntities", ["ngRoute", "cms.shared"]).constant("_", window._).constant("customEntities.modulePath", "/admin/modules/customentities/js/"); angular.module("cms.customEntities").config(["$routeProvider", "shared.routingUtilities", "customEntities.modulePath", function (n, t, i) { t.registerCrudRoutes(n, i, "CustomEntity") }]); angular.module("cms.customEntities").controller("AddCustomEntityController", ["$scope", "$location", "$q", "$window", "shared.stringUtilities", "shared.LoadState", "shared.customEntityService", "shared.urlLibrary", "customEntities.options", function (n, t, i, r, u, f, e, o, s) { function a() { h.globalLoadState = new f; h.saveLoadState = new f; h.saveAndPublishLoadState = new f; h.formLoadState = new f(!0); h.editMode = !1; h.options = s; h.saveButtonText = s.autoPublish ? "Save" : "Save & Publish"; h.save = c.bind(null, !1, l); h.saveAndPublish = c.bind(null, !0, l); h.saveAndEdit = c.bind(null, !0, p); h.cancel = y; h.onNameChanged = v; w() } function c(n, t) { var i; n ? (h.command.publish = !0, i = h.saveAndPublishLoadState) : i = h.saveLoadState; b(i); e.add(h.command, s.customEntityDefinitionCode).then(t).finally(k.bind(null, i)) } function v() { h.command.urlSlug = u.slugify(h.command.title) } function y() { t.path("/") } function l(n) { t.path("/" + n) } function p(n) { function t(n) { r.location.href = o.customEntityVisualEditor(n, !0) } return e.getById(n).then(t) } function w() { function r(n) { h.command.model = {}; h.formDataSource = { model: h.command.model, modelMetaData: n } } function u(n) { h.pageRoutes = n } var t = e.getDataModelSchema(s.customEntityDefinitionCode).then(r), i = e.getPageRoutes(s.customEntityDefinitionCode).then(u); h.formLoadState.offWhen(t, i); h.command = {}; n.$watch("vm.command.localeId", function (n) { h.additionalParameters = n ? { localeId: n } : {} }) } function b(n) { h.globalLoadState.on(); n && _.isFunction(n.on) && n.on() } function k(n) { h.globalLoadState.off(); n && _.isFunction(n.off) && n.off() } var h = this; a() }]); angular.module("cms.customEntities").controller("CustomEntityDetailsController", ["$routeParams", "$q", "$location", "_", "shared.LoadState", "shared.modalDialogService", "shared.entityVersionModalDialogService", "shared.customEntityService", "shared.urlLibrary", "customEntities.modulePath", "customEntities.options", function (n, t, i, r, u, f, e, o, s, h, c) { function nt() { l.edit = tt; l.save = k.bind(null, !1); l.saveAndPublish = k.bind(null, !0); l.cancel = it; l.publish = rt; l.unpublish = ut; l.discardDraft = ft; l.copyToDraft = et; l.deleteCustomEntity = ot; l.changeUrl = st; l.editMode = !1; l.globalLoadState = new u; l.saveLoadState = new u; l.saveAndPublishLoadState = new u; l.formLoadState = new u(!0); l.options = c; l.urlLibrary = s; l.saveButtonText = c.autoPublish ? "Save" : "Save & Publish"; l.canChangeUrl = !c.autoGenerateUrlSlug || c.hasLocale; d(l.formLoadState) } function tt() { l.editMode = !0; l.mainForm.formStatus.clear() } function k(n) { var t; n ? (l.updateCommand.publish = !0, t = l.saveAndPublishLoadState) : t = l.saveLoadState; v(t); o.updateDraft(l.updateCommand, c.customEntityDefinitionCode).then(a.bind(null, "Changes were saved successfully")).finally(y.bind(null, t)) } function it() { l.editMode = !1; l.updateCommand = g(l.customEntity); l.mainForm.formStatus.clear() } function rt() { e.publish(l.customEntity.customEntityId, v, p).then(a.bind(null, c.nameSingular + " published successfully.")).catch(y) } function ut() { e.unpublish(l.customEntity.customEntityId, v, p).then(a.bind(null, "The " + w + " has been unpublished and reverted to draft state.")).catch(y) } function ft() { function t() { return v(), o.removeDraft(l.customEntity.customEntityId) } var n = { title: "Discard Version", message: "Are you sure you want to discard this draft? This will discard all changes since it was last published.", okButtonTitle: "Yes, discard it", onOk: t }; f.confirm(n).then(a.bind(null, "Draft discarded successfully")) } function et(n) { function i() { a("Draft created successfully.") } var t = !!ht(); e.copyToDraft(l.customEntity.customEntityId, n.customEntityVersionId, t, v, p).then(i).catch(y) } function ot() { function t() { return v(), o.remove(l.customEntity.customEntityId).then(ct).catch(y) } var n = { title: "Delete " + c.nameSingular, message: "Are you sure you want to delete this " + w + "?", okButtonTitle: "Yes, delete it", onOk: t }; f.confirm(n) } function st() { f.show({ templateUrl: h + "routes/modals/changeurl.html", controller: "ChangeUrlController", options: { customEntity: l.customEntity, onSave: a.bind(null, "Url Changed") } }) } function a(n, t) { return d(t).then(l.mainForm.formStatus.success.bind(null, n)) } function ht() { return r.find(l.versions, function (n) { return n.workFlowStatus === "Draft" }) } function d(i) { function r(n) { var t = n[0], i = n[1]; b = n[2]; l.customEntity = t; l.versions = i; l.updateCommand = g(t); l.additionalParameters = l.customEntity.locale ? { localeId: l.customEntity.locale.localeId } : {}; l.editMode = !1 } function u() { return o.getDataModelSchema(c.customEntityDefinitionCode) } function f() { return o.getById(n.id) } function e() { return o.getVersionsByCustomEntityId(n.id) } return t.all([f(), e(), u()]).then(r).then(y.bind(null, i)) } function g(n) { var t = { customEntityId: n.customEntityId, title: n.latestVersion.title, model: angular.copy(n.latestVersion.model) }; return l.formDataSource = { model: t.model, modelMetaData: b }, t } function ct() { i.path("") } function v(n) { l.globalLoadState.on(); n && r.isFunction(n.on) && n.on() } function y(n) { l.globalLoadState.off(); n && r.isFunction(n.off) && n.off() } var l = this, w = c.nameSingular.toLowerCase(), p = { entityNameSingular: c.nameSingular, isCustomEntity: !0 }, b; nt() }]); angular.module("cms.customEntities").controller("CustomEntityListController", ["_", "shared.LoadState", "shared.SearchQuery", "shared.modalDialogService", "shared.customEntityService", "customEntities.modulePath", "customEntities.options", function (n, t, i, r, u, f, e) { function c() { o.options = e; o.gridLoadState = new t; o.query = new i({ onChanged: a }); o.filter = o.query.getFilters(); o.toggleFilter = s; o.changeOrdering = l; s(!1); h() } function s(t) { o.isFilterVisible = n.isUndefined(t) ? !o.isFilterVisible : t } function l() { r.show({ templateUrl: f + "routes/modals/ChangeOrdering.html", controller: "ChangeOrderingController", options: { localeId: o.filter.localeId, onSave: h } }) } function a() { s(!1); h() } function h() { return o.gridLoadState.on(), u.getAll(o.query.getParameters(), e.customEntityDefinitionCode).then(function (n) { o.result = n; o.gridLoadState.off() }) } var o = this; c() }]); angular.module("cms.customEntities").controller("ChangeOrderingController", ["$scope", "$q", "$location", "_", "shared.LoadState", "shared.arrayUtilities", "shared.internalModulePath", "shared.modalDialogService", "shared.customEntityService", "customEntities.options", "options", "close", function (n, t, i, r, u, f, e, o, s, h, c, l) { function p() { n.options = h; n.command = { localeId: c.localeId, customEntityDefinitionCode: h.customEntityDefinitionCode }; n.isPartialOrdering = h.ordering === "Partial"; n.submitLoadState = new u; n.formLoadState = new u(!0); n.gridLoadState = new u; n.save = w; n.close = l; n.setStep = y; n.onLocalesLoaded = b; n.onDrop = k; n.remove = d; n.showPicker = g; nt() } function w() { n.command.orderedCustomEntityIds = v(); n.submitLoadState.on(); s.updateOrdering(n.command).then(c.onSave).then(l).finally(n.submitLoadState.off) } function b() { n.formLoadState.off() } function k(t, i) { f.moveObject(n.gridData, i, t, a) } function d(t) { f.removeObject(n.gridData, t) } function g() { function t(t) { var u, i; t && t.length ? (u = r.filter(n.gridData, function (n) { return !r.contains(t, n[a]) }), n.gridData = r.difference(n.gridData, u), i = r.difference(t, v()), i.length && (n.gridLoadState.on(), s.getByIdRange(i).then(function (t) { n.gridData = r.union(n.gridData, t); n.gridLoadState.off() }))) : n.gridData = [] } o.show({ templateUrl: e + "UIComponents/CustomEntities/CustomEntityPickerDialog.html", controller: "CustomEntityPickerDialogController", options: { selectedIds: v(), customEntityDefinition: h, filter: { localeId: n.command.localeId }, onSelected: t } }) } function v() { return r.pluck(n.gridData, a) } function nt() { h.hasLocale ? (n.allowStep1 = !0, y(1)) : (y(2), n.formLoadState.off()) } function y(t) { n.currentStep = t; t === 2 && tt() } function tt() { function i(t) { n.gridData = n.isPartialOrdering ? r.filter(t.items, function (n) { return !!n.ordering }) : t.items; n.formLoadState.off() } n.formLoadState.on(); var t = { pageSize: 60, localeId: n.command.localeId, interpretNullLocaleAsNone: !0 }; s.getAll(t, h.customEntityDefinitionCode).then(i) } var a = "customEntityId"; p() }]); angular.module("cms.customEntities").controller("ChangeUrlController", ["$scope", "$q", "$location", "shared.LoadState", "shared.customEntityService", "customEntities.options", "options", "close", function (n, t, i, r, u, f, e, o) { function h() { var t = e.customEntity; n.options = f; n.customEntity = t; n.command = { customEntityId: t.customEntityId, localeId: t.locale ? t.locale.localeId : undefined, urlSlug: t.urlSlug }; n.submitLoadState = new r; n.formLoadState = new r(f.hasLocale); n.save = c; n.close = o; n.localesLoaded = s.resolve; n.formLoadState.offWhen(s) } function c() { n.submitLoadState.on(); u.updateUrl(n.command).then(e.onSave).then(o).finally(n.submitLoadState.off) } var s = t.defer(); h() }])