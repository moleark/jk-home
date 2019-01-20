import * as tslib_1 from "tslib";
import _ from 'lodash';
import { nav } from '../ui';
import { uid } from '../uid';
import { usqTokenApi, callCenterapi, CenterAppApi, centerToken } from './usqApi';
import { setSubAppWindow } from './wsChannel';
import { host } from './host';
var usqTokens = {};
export function logoutUsqTokens() {
    for (var i in usqTokens)
        usqTokens[i] = undefined;
}
var appsInFrame = {};
var AppInFrameClass = /** @class */ (function () {
    function AppInFrameClass() {
    }
    Object.defineProperty(AppInFrameClass.prototype, "unit", {
        get: function () { return this._unit; } // unit id
        ,
        set: function (val) { this._unit = val; },
        enumerable: true,
        configurable: true
    });
    return AppInFrameClass;
}());
export var meInFrame = new AppInFrameClass();
/* {
    hash: undefined,
    get unit():number {return } undefined, //debugUnitId,
    page: undefined;
    param: undefined,
}*/
export function isBridged() {
    return self !== window.parent;
}
window.addEventListener('message', function (evt) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var message, _a, ret;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    message = evt.data;
                    _a = message.type;
                    switch (_a) {
                        case 'sub-frame-started': return [3 /*break*/, 1];
                        case 'ws': return [3 /*break*/, 2];
                        case 'init-sub-win': return [3 /*break*/, 4];
                        case 'pop-app': return [3 /*break*/, 6];
                        case 'center-api': return [3 /*break*/, 7];
                        case 'center-api-return': return [3 /*break*/, 9];
                        case 'app-api': return [3 /*break*/, 10];
                        case 'app-api-return': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 14];
                case 1:
                    subFrameStarted(evt);
                    return [3 /*break*/, 15];
                case 2: 
                //wsBridge.receive(message.msg);
                return [4 /*yield*/, nav.onReceive(message.msg)];
                case 3:
                    //wsBridge.receive(message.msg);
                    _b.sent();
                    return [3 /*break*/, 15];
                case 4: return [4 /*yield*/, initSubWin(message)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 6:
                    nav.navBack();
                    return [3 /*break*/, 15];
                case 7: return [4 /*yield*/, callCenterApiFromMessage(evt.source, message)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 9:
                    bridgeCenterApiReturn(message);
                    return [3 /*break*/, 15];
                case 10:
                    console.log("receive PostMessage: %s", JSON.stringify(message));
                    return [4 /*yield*/, onReceiveAppApiMessage(message.hash, message.apiName)];
                case 11:
                    ret = _b.sent();
                    console.log("onReceiveAppApiMessage: %s", JSON.stringify(ret));
                    evt.source.postMessage({
                        type: 'app-api-return',
                        apiName: message.apiName,
                        url: ret.url,
                        urlDebug: ret.urlDebug,
                        token: ret.token
                    }, "*");
                    return [3 /*break*/, 15];
                case 12:
                    console.log("app-api-return: %s", JSON.stringify(message));
                    console.log('await onAppApiReturn(message);');
                    return [4 /*yield*/, onAppApiReturn(message)];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 14:
                    this.console.log('message: %s', JSON.stringify(message));
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
});
function subFrameStarted(evt) {
    var message = evt.data;
    var subWin = evt.source;
    setSubAppWindow(subWin);
    hideFrameBack(message.hash);
    var msg = _.clone(nav.user);
    msg.type = 'init-sub-win';
    subWin.postMessage(msg, '*');
}
function hideFrameBack(hash) {
    var el = document.getElementById(hash);
    if (el !== undefined)
        el.hidden = true;
}
function initSubWin(message) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('initSubWin: set nav.user', message);
                    nav.user = message; // message.user;
                    return [4 /*yield*/, nav.showAppView()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function onReceiveAppApiMessage(hash, apiName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var appInFrame, unit, parts, ret;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appInFrame = appsInFrame[hash];
                    if (appInFrame === undefined)
                        return [2 /*return*/, { name: apiName, url: undefined, urlDebug: undefined, token: undefined }];
                    unit = appInFrame.unit;
                    parts = apiName.split('/');
                    return [4 /*yield*/, usqTokenApi.usq({ unit: unit, usqOwner: parts[0], usqName: parts[1] })];
                case 1:
                    ret = _a.sent();
                    if (ret === undefined) {
                        console.log('apiTokenApi.api return undefined. api=%s, unit=%s', apiName, unit);
                        throw 'api not found';
                    }
                    return [2 /*return*/, { name: apiName, url: ret.url, urlDebug: ret.urlDebug, token: ret.token }];
            }
        });
    });
}
function onAppApiReturn(message) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var apiName, url, urlDebug, token, action, realUrl;
        return tslib_1.__generator(this, function (_a) {
            apiName = message.apiName, url = message.url, urlDebug = message.urlDebug, token = message.token;
            action = usqTokens[apiName];
            if (action === undefined) {
                throw 'error app api return';
                //return;
            }
            realUrl = host.getUrlOrDebug(url, urlDebug);
            console.log('onAppApiReturn(message:any): url=' + url + ', debug=' + urlDebug + ', real=' + realUrl);
            action.url = realUrl;
            action.token = token;
            action.resolve(action);
            return [2 /*return*/];
        });
    });
}
export function setMeInFrame(appHash) {
    var parts = appHash.split('-');
    var len = parts.length;
    meInFrame.hash = parts[0].substr(3);
    if (len > 0)
        meInFrame.unit = Number(parts[1]);
    if (len > 1)
        meInFrame.page = parts[2];
    if (len > 2)
        meInFrame.param = parts.slice(3);
    return meInFrame;
}
export function appUrl(url, unitId, page, param) {
    var u;
    for (;;) {
        u = uid();
        var a = appsInFrame[u];
        if (a === undefined) {
            appsInFrame[u] = { hash: u, unit: unitId };
            break;
        }
    }
    url += '#tv' + u + '-' + unitId;
    if (page !== undefined) {
        url += '-' + page;
        if (param !== undefined) {
            for (var i = 0; i < param.length; i++) {
                url += '-' + param[i];
            }
        }
    }
    return { url: url, hash: u };
}
export function loadAppUsqs(appOwner, appName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var centerAppApi, unit, ret;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    centerAppApi = new CenterAppApi('tv/', undefined);
                    unit = meInFrame.unit;
                    return [4 /*yield*/, centerAppApi.usqs(unit, appOwner, appName)];
                case 1:
                    ret = _a.sent();
                    centerAppApi.checkUsqs(unit, appOwner, appName).then(function (v) {
                        if (v === false)
                            nav.start();
                    });
                    return [2 /*return*/, ret];
            }
        });
    });
}
export function appUsq(usq, usqOwner, usqName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var usqToken, err, url, urlDebug, realUrl;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usqToken = usqTokens[usq];
                    if (usqToken !== undefined)
                        return [2 /*return*/, usqToken];
                    if (!!isBridged()) return [3 /*break*/, 2];
                    return [4 /*yield*/, usqTokenApi.usq({ unit: meInFrame.unit, usqOwner: usqOwner, usqName: usqName })];
                case 1:
                    usqToken = _a.sent();
                    if (usqToken === undefined) {
                        err = 'unauthorized call: usqTokenApi center return undefined!';
                        throw err;
                    }
                    if (usqToken.token === undefined)
                        usqToken.token = centerToken;
                    url = usqToken.url, urlDebug = usqToken.urlDebug;
                    realUrl = host.getUrlOrDebug(url, urlDebug);
                    console.log('realUrl: %s', realUrl);
                    usqToken.url = realUrl;
                    usqTokens[usq] = usqToken;
                    return [2 /*return*/, usqToken];
                case 2:
                    console.log("appApi parent send: %s", meInFrame.hash);
                    usqToken = {
                        name: usq,
                        url: undefined,
                        urlDebug: undefined,
                        token: undefined,
                        resolve: undefined,
                        reject: undefined,
                    };
                    usqTokens[usq] = usqToken;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            usqToken.resolve = function (at) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var a;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, at];
                                        case 1:
                                            a = _a.sent();
                                            console.log('return from parent window: %s', JSON.stringify(a));
                                            usqToken.url = a.url;
                                            usqToken.urlDebug = a.urlDebug;
                                            usqToken.token = a.token;
                                            resolve(usqToken);
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            usqToken.reject = reject;
                            (window.opener || window.parent).postMessage({
                                type: 'app-api',
                                apiName: usq,
                                hash: meInFrame.hash,
                            }, "*");
                        })];
            }
        });
    });
}
var brideCenterApis = {};
export function bridgeCenterApi(url, method, body) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('bridgeCenterApi: url=%s, method=%s', url, method);
                    return [4 /*yield*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var callId, bca;
                            return tslib_1.__generator(this, function (_a) {
                                for (;;) {
                                    callId = uid();
                                    bca = brideCenterApis[callId];
                                    if (bca === undefined) {
                                        brideCenterApis[callId] = {
                                            id: callId,
                                            resolve: resolve,
                                            reject: reject,
                                        };
                                        break;
                                    }
                                }
                                (window.opener || window.parent).postMessage({
                                    type: 'center-api',
                                    callId: callId,
                                    url: url,
                                    method: method,
                                    body: body
                                }, '*');
                                return [2 /*return*/];
                            });
                        }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function callCenterApiFromMessage(from, message) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var callId, url, method, body, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    callId = message.callId, url = message.url, method = message.method, body = message.body;
                    return [4 /*yield*/, callCenterapi.directCall(url, method, body)];
                case 1:
                    result = _a.sent();
                    from.postMessage({
                        type: 'center-api-return',
                        callId: callId,
                        result: result,
                    }, '*');
                    return [2 /*return*/];
            }
        });
    });
}
function bridgeCenterApiReturn(message) {
    var callId = message.callId, result = message.result;
    var bca = brideCenterApis[callId];
    if (bca === undefined)
        return;
    brideCenterApis[callId] = undefined;
    bca.resolve(result);
}
//# sourceMappingURL=appBridge.js.map