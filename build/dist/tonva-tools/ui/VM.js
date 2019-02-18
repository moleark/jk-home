import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav } from './nav';
import { Page } from './page';
import { isDevelopment } from '../net';
var Controller = /** @class */ (function () {
    function Controller(res) {
        var _this = this;
        this.isDev = isDevelopment;
        this.onMessageReceive = function (message) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onMessage(message)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.res = res || {};
        this.x = this.res.x || {};
    }
    Object.defineProperty(Controller.prototype, "user", {
        get: function () { return nav.user; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "isLogined", {
        get: function () {
            var user = nav.user;
            if (user === undefined)
                return false;
            return user.id > 0;
        },
        enumerable: true,
        configurable: true
    });
    Controller.prototype.dispose = function () {
        // message listener的清理
        nav.unregisterReceiveHandler(this.receiveHandlerId);
        this.onDispose();
    };
    Controller.prototype.onDispose = function () {
    };
    Controller.prototype.openVPage = function (vp, param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (new vp(this)).open(param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.renderView = function (view, param) {
        return (new view(this)).render(param);
    };
    Controller.prototype.event = function (type, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onEvent(type, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.onEvent = function (type, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Controller.prototype.msg = function (text) {
        alert(text);
    };
    Controller.prototype.errorPage = function (header, err) {
        this.openPage(React.createElement(Page, { header: "App error!" },
            React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
    };
    Controller.prototype.onMessage = function (message) {
        return;
    };
    Controller.prototype.beforeStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                /*
                console.log('this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);');
                this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
                console.log('return true');
                */
                return [2 /*return*/, true];
            });
        });
    };
    Controller.prototype.registerReceiveHandler = function () {
        this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
    };
    Controller.prototype.start = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disposer = this.dispose.bind(this);
                        this.registerReceiveHandler();
                        return [4 /*yield*/, this.beforeStart()];
                    case 1:
                        ret = _a.sent();
                        if (ret === false)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.internalStart(param)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Controller.prototype, "isCalling", {
        get: function () { return this._resolve_$ !== undefined; },
        enumerable: true,
        configurable: true
    });
    Controller.prototype.call = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (this._resolve_$ === undefined)
                    this._resolve_$ = [];
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this._resolve_$.push(resolve);
                                    return [4 /*yield*/, this.start(param)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Controller.prototype.vCall = function (vp, param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (this._resolve_$ === undefined)
                    this._resolve_$ = [];
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this._resolve_$.push(resolve);
                                    return [4 /*yield*/, (new vp(this)).open(param)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Controller.prototype.returnCall = function (value) {
        if (this._resolve_$ === undefined)
            return;
        var resolve = this._resolve_$.pop();
        if (resolve === undefined) {
            alert('the Coordinator call already returned, or not called');
            return;
        }
        resolve(value);
    };
    Controller.prototype.openPage = function (page) {
        nav.push(page, this.disposer);
        this.disposer = undefined;
    };
    Controller.prototype.replacePage = function (page) {
        nav.replace(page, this.disposer);
        this.disposer = undefined;
    };
    Controller.prototype.backPage = function () {
        nav.back();
    };
    Controller.prototype.closePage = function (level) {
        nav.pop(level);
    };
    Controller.prototype.ceasePage = function (level) {
        nav.ceaseTop(level);
    };
    Controller.prototype.removeCeased = function () {
        nav.removeCeased();
    };
    Controller.prototype.regConfirmClose = function (confirmClose) {
        nav.regConfirmClose(confirmClose);
    };
    return Controller;
}());
export { Controller };
var View = /** @class */ (function () {
    function View(controller) {
        this.controller = controller;
        this.res = controller.res;
        this.x = controller.x;
    }
    Object.defineProperty(View.prototype, "isDev", {
        get: function () { return isDevelopment; },
        enumerable: true,
        configurable: true
    });
    View.prototype.renderVm = function (vm, param) {
        return (new vm(this.controller)).render(param);
    };
    View.prototype.openVPage = function (vp, param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (new vp(this.controller)).open(param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    View.prototype.event = function (type, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /*
                    if (this._resolve_$_ !== undefined) {
                        await this._resolve_$_({type:type, value:value});
                        return;
                    }*/
                    return [4 /*yield*/, this.controller.event(type, value)];
                    case 1:
                        /*
                        if (this._resolve_$_ !== undefined) {
                            await this._resolve_$_({type:type, value:value});
                            return;
                        }*/
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    View.prototype.returnCall = function (value) {
        this.controller.returnCall(value);
    };
    View.prototype.openPage = function (view, param) {
        this.controller.openPage(React.createElement(view, param));
    };
    View.prototype.replacePage = function (view, param) {
        this.controller.replacePage(React.createElement(view, param));
    };
    View.prototype.openPageElement = function (page) {
        this.controller.openPage(page);
    };
    View.prototype.replacePageElement = function (page) {
        this.controller.replacePage(page);
    };
    View.prototype.backPage = function () {
        this.controller.backPage();
    };
    View.prototype.closePage = function (level) {
        this.controller.closePage(level);
    };
    View.prototype.ceasePage = function (level) {
        this.controller.ceasePage(level);
    };
    View.prototype.removeCeased = function () {
        this.controller.removeCeased();
    };
    View.prototype.regConfirmClose = function (confirmClose) {
        this.controller.regConfirmClose(confirmClose);
    };
    return View;
}());
export { View };
var VPage = /** @class */ (function (_super) {
    tslib_1.__extends(VPage, _super);
    function VPage(coordinator) {
        return _super.call(this, coordinator) || this;
    }
    VPage.prototype.render = function (param) { return null; };
    return VPage;
}(View));
export { VPage };
//# sourceMappingURL=VM.js.map