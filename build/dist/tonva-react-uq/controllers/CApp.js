import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page, loadAppUqs, nav, meInFrame, Controller, VPage, resLang } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { CUq } from './uq';
import { centerApi } from '../centerApi';
var CApp = /** @class */ (function (_super) {
    tslib_1.__extends(CApp, _super);
    function CApp(tonvaApp, ui) {
        var _this = _super.call(this, resLang(ui && ui.res)) || this;
        _this.cImportUqs = {};
        _this.cUqCollection = {};
        _this.renderRow = function (item, index) {
            var id = item.id, nick = item.nick, name = item.name;
            return React.createElement(LMR, { className: "px-3 py-2", right: 'id: ' + id },
                React.createElement("div", null, nick || name));
        };
        _this.onRowClick = function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        meInFrame.unit = item.id; // 25;
                        return [4 /*yield*/, this.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.selectUnitPage = function () {
            return React.createElement(Page, { header: "\u9009\u62E9\u5C0F\u53F7", logout: true },
                React.createElement(List, { items: _this.appUnits, item: { render: _this.renderRow, onClick: _this.onRowClick } }));
        };
        var parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        _this.appOwner = parts[0];
        _this.appName = parts[1];
        _this.ui = ui || { uqs: {} };
        _this.caption = _this.res.caption || 'Tonva';
        return _this;
    }
    CApp.prototype.startDebug = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var appName, cApp, keepNavBackButton;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appName = this.appOwner + '/' + this.appName;
                        cApp = new CApp(appName, { uqs: {} });
                        keepNavBackButton = true;
                        return [4 /*yield*/, cApp.start(keepNavBackButton)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.loadUqs = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retErrors, unit, app, id, uqs, promises, promiseChecks, _i, uqs_1, appUq, uqId, uqOwner, uqName, url, urlDebug, ws, access, token, uq, ui, cUq, results, _a, results_1, result, retError;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        retErrors = [];
                        unit = meInFrame.unit;
                        return [4 /*yield*/, loadAppUqs(this.appOwner, this.appName)];
                    case 1:
                        app = _b.sent();
                        id = app.id, uqs = app.uqs;
                        this.id = id;
                        promises = [];
                        promiseChecks = [];
                        for (_i = 0, uqs_1 = uqs; _i < uqs_1.length; _i++) {
                            appUq = uqs_1[_i];
                            uqId = appUq.id, uqOwner = appUq.uqOwner, uqName = appUq.uqName, url = appUq.url, urlDebug = appUq.urlDebug, ws = appUq.ws, access = appUq.access, token = appUq.token;
                            uq = uqOwner + '/' + uqName;
                            ui = this.ui && this.ui.uqs && this.ui.uqs[uq];
                            cUq = this.newCUq(uq, uqId, access, ui || {});
                            this.cUqCollection[uq] = cUq;
                            promises.push(cUq.loadSchema());
                            promiseChecks.push(cUq.entities.uqApi.checkAccess());
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        results = _b.sent();
                        Promise.all(promiseChecks).then(function (checks) {
                            for (var _i = 0, checks_1 = checks; _i < checks_1.length; _i++) {
                                var c = checks_1[_i];
                                if (c === false) {
                                    nav.start();
                                    return;
                                }
                            }
                        });
                        for (_a = 0, results_1 = results; _a < results_1.length; _a++) {
                            result = results_1[_a];
                            retError = result;
                            if (retError !== undefined) {
                                retErrors.push(retError);
                                continue;
                            }
                        }
                        if (retErrors.length === 0)
                            return [2 /*return*/];
                        return [2 /*return*/, retErrors];
                }
            });
        });
    };
    CApp.prototype.getImportUq = function (uqOwner, uqName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uq, cUq, ui, uqId, retError;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uq = uqOwner + '/' + uqName;
                        cUq = this.cImportUqs[uq];
                        if (cUq !== undefined)
                            return [2 /*return*/, cUq];
                        ui = this.ui && this.ui.uqs && this.ui.uqs[uq];
                        uqId = -1;
                        this.cImportUqs[uq] = cUq = this.newCUq(uq, uqId, undefined, ui || {});
                        return [4 /*yield*/, cUq.loadSchema()];
                    case 1:
                        retError = _a.sent();
                        if (retError !== undefined) {
                            console.error(retError);
                            debugger;
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, cUq];
                }
            });
        });
    };
    CApp.prototype.newCUq = function (uq, uqId, access, ui) {
        var cUq = new (this.ui.CUq || CUq)(this, uq, this.id, uqId, access, ui);
        Object.setPrototypeOf(cUq.x, this.x);
        return cUq;
    };
    Object.defineProperty(CApp.prototype, "cUqArr", {
        get: function () {
            var ret = [];
            for (var i in this.cUqCollection) {
                ret.push(this.cUqCollection[i]);
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.getCUq = function (apiName) {
        return this.cUqCollection[apiName];
    };
    Object.defineProperty(CApp.prototype, "VAppMain", {
        get: function () { return (this.ui && this.ui.main) || VAppMain; },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.beforeStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var hash, unit, app, id, retErrors, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        hash = document.location.hash;
                        if (hash.startsWith('#tvdebug')) {
                            this.isProduction = false;
                            //await this.showMainPage();
                            //return;
                        }
                        else {
                            this.isProduction = hash.startsWith('#tv');
                        }
                        unit = meInFrame.unit;
                        if (!(this.isProduction === false && (unit === undefined || unit <= 0))) return [3 /*break*/, 3];
                        return [4 /*yield*/, loadAppUqs(this.appOwner, this.appName)];
                    case 1:
                        app = _a.sent();
                        id = app.id;
                        this.id = id;
                        return [4 /*yield*/, this.loadAppUnits()];
                    case 2:
                        _a.sent();
                        switch (this.appUnits.length) {
                            case 0:
                                this.showUnsupport();
                                return [2 /*return*/, false];
                            case 1:
                                unit = this.appUnits[0].id;
                                if (unit === undefined || unit < 0) {
                                    this.showUnsupport();
                                    return [2 /*return*/, false];
                                }
                                meInFrame.unit = unit;
                                break;
                            default:
                                //nav.clear();
                                nav.push(React.createElement(this.selectUnitPage, null));
                                return [2 /*return*/, false];
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.loadUqs()];
                    case 4:
                        retErrors = _a.sent();
                        if (retErrors !== undefined) {
                            this.openPage(React.createElement(Page, { header: "ERROR" },
                                React.createElement("div", { className: "m-3" },
                                    React.createElement("div", null, "Load Uqs \u53D1\u751F\u9519\u8BEF\uFF1A"),
                                    retErrors.map(function (r, i) { return React.createElement("div", { key: i }, r); }))));
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                    case 5:
                        err_1 = _a.sent();
                        nav.push(React.createElement(Page, { header: "App start error!" },
                            React.createElement("pre", null, typeof err_1 === 'string' ? err_1 : err_1.message)));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (param !== true) {
                            this.clearPrevPages();
                        }
                        return [4 /*yield*/, this.showMainPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.beforeStart()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.render = function () {
        return this.renderView(this.VAppMain);
    };
    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    CApp.prototype.clearPrevPages = function () {
        nav.clear();
    };
    CApp.prototype.showUnsupport = function () {
        this.clearPrevPages();
        this.openPage(React.createElement(Page, { header: "APP\u65E0\u6CD5\u8FD0\u884C", logout: true },
            React.createElement("div", { className: "m-3 text-danger container" },
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" },
                        React.createElement(FA, { name: "exclamation-triangle" })),
                    React.createElement("div", { className: "col" }, "\u7528\u6237\u4E0D\u652F\u6301APP")),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "\u7528\u6237: "),
                    React.createElement("div", { className: "col" }, "" + nav.user.name)),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "App:"),
                    React.createElement("div", { className: "col" }, this.appOwner + "/" + this.appName)))));
    };
    CApp.prototype.showMainPage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parts, action, uqId, sheetTypeId, sheetId, cUq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parts = document.location.hash.split('-');
                        if (!(parts.length > 2)) return [3 /*break*/, 2];
                        action = parts[2];
                        if (!(action === 'sheet' || action === 'sheet_debug')) return [3 /*break*/, 2];
                        uqId = Number(parts[3]);
                        sheetTypeId = Number(parts[4]);
                        sheetId = Number(parts[5]);
                        cUq = this.getCUqFromId(uqId);
                        if (cUq === undefined) {
                            alert('unknown uqId: ' + uqId);
                            return [2 /*return*/];
                        }
                        this.clearPrevPages();
                        return [4 /*yield*/, cUq.navSheet(sheetTypeId, sheetId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.openVPage(this.VAppMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.getCUqFromId = function (uqId) {
        for (var i in this.cUqCollection) {
            var cUq = this.cUqCollection[i];
            if (cUq.id === uqId)
                return cUq;
        }
        return;
    };
    CApp.prototype.loadAppUnits = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, centerApi.userAppUnits(this.id)];
                    case 1:
                        ret = _a.sent();
                        this.appUnits = ret;
                        if (ret.length === 1) {
                            meInFrame.unit = ret[0].id;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CApp;
}(Controller));
export { CApp };
var VAppMain = /** @class */ (function (_super) {
    tslib_1.__extends(VAppMain, _super);
    function VAppMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appContent = function () {
            var cUqArr = _this.controller.cUqArr;
            var content;
            if (cUqArr.length === 0) {
                content = React.createElement("div", { className: "text-danger" },
                    React.createElement(FA, { name: "" }),
                    " \u6B64APP\u6CA1\u6709\u7ED1\u5B9A\u4EFB\u4F55\u7684UQ");
            }
            else {
                content = cUqArr.map(function (v, i) { return React.createElement("div", { key: i }, v.render()); });
            }
            return React.createElement(React.Fragment, null, content);
        };
        return _this;
    }
    VAppMain.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.appPage);
                return [2 /*return*/];
            });
        });
    };
    VAppMain.prototype.render = function (param) {
        return this.appContent();
    };
    VAppMain.prototype.appPage = function () {
        var caption = this.controller.caption;
        return React.createElement(Page, { header: caption, logout: function () { meInFrame.unit = undefined; } }, this.appContent());
    };
    return VAppMain;
}(VPage));
//# sourceMappingURL=CApp.js.map