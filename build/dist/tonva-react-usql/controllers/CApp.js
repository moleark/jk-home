import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page, loadAppUsqs, nav, meInFrame, Controller, VPage, resLang } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { CUsq } from './usq';
import { centerApi } from '../centerApi';
var CApp = /** @class */ (function (_super) {
    tslib_1.__extends(CApp, _super);
    function CApp(tonvaApp, ui) {
        var _this = _super.call(this, resLang(ui && ui.res)) || this;
        _this.cImportUsqs = {};
        _this.cUsqCollection = {};
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
        /*
        protected appPage = () => {
            return <Page header={this.caption} logout={()=>{meInFrame.unit = undefined}}>
                {this.cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>)}
            </Page>;
        };
        */
        //<LMR className="px-3 py-2 my-2 bg-light"
        //left={<FA name='cog' fixWidth={true} className="text-info mr-2 pt-1" />}
        //onClick={this.opClick}>设置操作权限</LMR>
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
        _this.ui = ui || { usqs: {} };
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
                        cApp = new CApp(appName, { usqs: {} });
                        keepNavBackButton = true;
                        return [4 /*yield*/, cApp.start(keepNavBackButton)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.loadUsqs = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retErrors, unit, app, id, usqs, promises, promiseChecks, _i, usqs_1, appUsq, usqId, usqOwner, usqName, url, urlDebug, ws, access, token, usq, ui, cUsq, results, _a, results_1, result, retError;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        retErrors = [];
                        unit = meInFrame.unit;
                        return [4 /*yield*/, loadAppUsqs(this.appOwner, this.appName)];
                    case 1:
                        app = _b.sent();
                        id = app.id, usqs = app.usqs;
                        this.id = id;
                        promises = [];
                        promiseChecks = [];
                        for (_i = 0, usqs_1 = usqs; _i < usqs_1.length; _i++) {
                            appUsq = usqs_1[_i];
                            usqId = appUsq.id, usqOwner = appUsq.usqOwner, usqName = appUsq.usqName, url = appUsq.url, urlDebug = appUsq.urlDebug, ws = appUsq.ws, access = appUsq.access, token = appUsq.token;
                            usq = usqOwner + '/' + usqName;
                            ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
                            cUsq = this.newCUsq(usq, usqId, access, ui || {});
                            this.cUsqCollection[usq] = cUsq;
                            promises.push(cUsq.loadSchema());
                            promiseChecks.push(cUsq.entities.usqApi.checkAccess());
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
    CApp.prototype.getImportUsq = function (usqOwner, usqName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var usq, cUsq, ui, usqId, retError;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usq = usqOwner + '/' + usqName;
                        cUsq = this.cImportUsqs[usq];
                        if (cUsq !== undefined)
                            return [2 /*return*/, cUsq];
                        ui = this.ui && this.ui.usqs && this.ui.usqs[usq];
                        usqId = -1;
                        this.cImportUsqs[usq] = cUsq = this.newCUsq(usq, usqId, undefined, ui || {});
                        return [4 /*yield*/, cUsq.loadSchema()];
                    case 1:
                        retError = _a.sent();
                        if (retError !== undefined) {
                            console.error(retError);
                            debugger;
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, cUsq];
                }
            });
        });
    };
    CApp.prototype.newCUsq = function (usq, usqId, access, ui) {
        var cUsq = new (this.ui.CUsq || CUsq)(this, usq, this.id, usqId, access, ui);
        Object.setPrototypeOf(cUsq.x, this.x);
        return cUsq;
    };
    Object.defineProperty(CApp.prototype, "cUsqArr", {
        get: function () {
            var ret = [];
            for (var i in this.cUsqCollection) {
                ret.push(this.cUsqCollection[i]);
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.getCUsq = function (apiName) {
        return this.cUsqCollection[apiName];
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
                        return [4 /*yield*/, loadAppUsqs(this.appOwner, this.appName)];
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
                    case 3: return [4 /*yield*/, this.loadUsqs()];
                    case 4:
                        retErrors = _a.sent();
                        if (retErrors !== undefined) {
                            this.openPage(React.createElement(Page, { header: "ERROR" },
                                React.createElement("div", { className: "m-3" },
                                    React.createElement("div", null, "Load Usqs \u53D1\u751F\u9519\u8BEF\uFF1A"),
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
            var parts, action, usqId, sheetTypeId, sheetId, cUsq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parts = document.location.hash.split('-');
                        if (!(parts.length > 2)) return [3 /*break*/, 2];
                        action = parts[2];
                        if (!(action === 'sheet' || action === 'sheet_debug')) return [3 /*break*/, 2];
                        usqId = Number(parts[3]);
                        sheetTypeId = Number(parts[4]);
                        sheetId = Number(parts[5]);
                        cUsq = this.getCUsqFromId(usqId);
                        if (cUsq === undefined) {
                            alert('unknown usqId: ' + usqId);
                            return [2 /*return*/];
                        }
                        this.clearPrevPages();
                        return [4 /*yield*/, cUsq.navSheet(sheetTypeId, sheetId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.showVPage(this.VAppMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.getCUsqFromId = function (usqId) {
        for (var i in this.cUsqCollection) {
            var cUsq = this.cUsqCollection[i];
            if (cUsq.id === usqId)
                return cUsq;
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
            var cUsqArr = _this.controller.cUsqArr;
            var content;
            if (cUsqArr.length === 0) {
                content = React.createElement("div", { className: "text-danger" },
                    React.createElement(FA, { name: "" }),
                    " \u6B64APP\u6CA1\u6709\u7ED1\u5B9A\u4EFB\u4F55\u7684USQ");
            }
            else {
                content = cUsqArr.map(function (v, i) { return React.createElement("div", { key: i }, v.render()); });
            }
            return React.createElement(React.Fragment, null, content);
        };
        return _this;
    }
    VAppMain.prototype.showEntry = function (param) {
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