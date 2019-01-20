import * as tslib_1 from "tslib";
import { bridgeCenterApi, isBridged } from './appBridge';
import { nav } from '../ui/nav';
import { isDevelopment } from './host';
export function httpGet(url, params) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var channel, ret;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    channel = new HttpChannel(false, url, undefined, undefined);
                    return [4 /*yield*/, channel.get('', params)];
                case 1:
                    ret = _a.sent();
                    return [2 /*return*/, ret];
            }
        });
    });
}
export function httpPost(url, params) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var channel, ret;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    channel = new HttpChannel(false, url, undefined, undefined);
                    return [4 /*yield*/, channel.post('', params)];
                case 1:
                    ret = _a.sent();
                    return [2 /*return*/, ret];
            }
        });
    });
}
var HttpChannel = /** @class */ (function () {
    function HttpChannel(isCenter, hostUrl, apiToken, ui) {
        var _this = this;
        this.startWait = function () {
            if (_this.ui !== undefined)
                _this.ui.startWait();
        };
        this.endWait = function (url, reject) {
            if (_this.ui !== undefined)
                _this.ui.endWait();
            if (reject !== undefined)
                reject('访问webapi超时 ' + url);
        };
        this.showError = function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.ui !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ui.showError(error)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        this.isCenter = isCenter;
        this.hostUrl = hostUrl;
        this.apiToken = apiToken;
        this.ui = ui;
        this.timeout = isDevelopment === true ? 500000 : 5000;
    }
    HttpChannel.prototype.used = function () {
        this.post('', {});
    };
    HttpChannel.prototype.get = function (url, params) {
        if (params === void 0) { params = undefined; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var keys, c, _i, keys_1, k, v, options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (params) {
                            keys = Object.keys(params);
                            if (keys.length > 0) {
                                c = '?';
                                for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                                    k = keys_1[_i];
                                    v = params[k];
                                    if (v === undefined)
                                        continue;
                                    url += c + k + '=' + params[k];
                                    c = '&';
                                }
                            }
                        }
                        options = this.buildOptions();
                        options.method = 'GET';
                        return [4 /*yield*/, this.innerFetch(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.post = function (url, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildOptions();
                        options.method = 'POST';
                        options.body = JSON.stringify(params);
                        return [4 /*yield*/, this.innerFetch(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.put = function (url, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildOptions();
                        options.method = 'PUT';
                        options.body = JSON.stringify(params);
                        return [4 /*yield*/, this.innerFetch(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.delete = function (url, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildOptions();
                        options.method = 'DELETE';
                        options.body = JSON.stringify(params);
                        return [4 /*yield*/, this.innerFetch(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.fetch = function (url, options, resolve, reject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            function buildError(err) {
                return {
                    channel: that,
                    url: path,
                    options: options,
                    resolve: resolve,
                    reject: reject,
                    error: err,
                };
            }
            var that, path, timeOutHandler_1, res, ct, text, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        this.startWait();
                        path = url;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 8]);
                        console.log('%s %s', options.method, path);
                        timeOutHandler_1 = setTimeout(function () { return that.endWait(url, reject); }, this.timeout);
                        return [4 /*yield*/, fetch(encodeURI(path), options)];
                    case 2:
                        res = _a.sent();
                        if (res.ok === false) {
                            clearTimeout(timeOutHandler_1);
                            that.endWait();
                            console.log('call error %s', res.statusText);
                            throw res.statusText;
                        }
                        ct = res.headers.get('content-type');
                        if (!(ct && ct.indexOf('json') >= 0)) return [3 /*break*/, 3];
                        return [2 /*return*/, res.json().then(function (retJson) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            clearTimeout(timeOutHandler_1);
                                            that.endWait();
                                            if (retJson.ok === true) {
                                                return [2 /*return*/, resolve(retJson.res)];
                                            }
                                            if (!(retJson.error === undefined)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, that.showError(buildError('not valid tonva json'))];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, that.showError(buildError(retJson.error))];
                                        case 3:
                                            _a.sent();
                                            reject(retJson.error);
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, that.showError(buildError(error.message))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3: return [4 /*yield*/, res.text()];
                    case 4:
                        text = _a.sent();
                        clearTimeout(timeOutHandler_1);
                        that.endWait();
                        resolve(text);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        error_1 = _a.sent();
                        if (typeof error_1 === 'string') {
                            if (error_1.toLowerCase().startsWith('unauthorized') === true) {
                                nav.logout();
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.showError(buildError(error_1.message))];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpChannel.prototype.innerFetch = function (url, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var u;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        u = this.hostUrl + url;
                        if (!(this.isCenter === true && this.apiToken === undefined && isBridged())) return [3 /*break*/, 2];
                        return [4 /*yield*/, bridgeCenterApi(u, options.method, options.body)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.fetch(u, options, resolve, reject)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.callFetch = function (url, method, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildOptions();
                        options.method = method;
                        options.body = body;
                        return [4 /*yield*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.fetch(url, options, resolve, reject)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.buildOptions = function () {
        var language = nav.language, culture = nav.culture;
        var headers = new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        var lang = language;
        if (culture)
            lang += '-' + culture;
        headers.append('Accept-Language', lang);
        if (this.apiToken) {
            headers.append('Authorization', this.apiToken);
        }
        var options = {
            headers: headers,
        };
        return options;
    };
    return HttpChannel;
}());
export { HttpChannel };
//# sourceMappingURL=httpChannel.js.map