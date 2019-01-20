import * as tslib_1 from "tslib";
import _ from 'lodash';
import { HttpChannel } from './httpChannel';
import { HttpChannelNavUI } from './httpChannelUI';
import { appUsq } from './appBridge';
import { ApiBase } from './apiBase';
import { host } from './host';
var channelUIs = {};
var channelNoUIs = {};
export function logoutApis() {
    channelUIs = {};
    channelNoUIs = {};
    logoutUnitxApis();
}
var usqLocalEntities = 'usqLocalEntities';
var CacheUsqLocals = /** @class */ (function () {
    function CacheUsqLocals() {
    }
    CacheUsqLocals.prototype.loadAccess = function (usqApi) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var usqOwner, usqName, ls, _a, user, usqs, i, ul, ret, un, usq, value, str, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        usqOwner = usqApi.usqOwner, usqName = usqApi.usqName;
                        if (this.local === undefined) {
                            ls = localStorage.getItem(usqLocalEntities);
                            if (ls !== null) {
                                this.local = JSON.parse(ls);
                            }
                        }
                        if (this.local !== undefined) {
                            _a = this.local, user = _a.user, usqs = _a.usqs;
                            if (user !== loginedUserId || usqs === undefined) {
                                this.local = undefined;
                            }
                            else {
                                for (i in usqs) {
                                    ul = usqs[i];
                                    ul.isNet = undefined;
                                }
                            }
                        }
                        if (this.local === undefined) {
                            this.local = {
                                user: loginedUserId,
                                unit: undefined,
                                usqs: {}
                            };
                        }
                        ret = void 0;
                        un = usqOwner + '/' + usqName;
                        usq = this.local.usqs[un];
                        if (usq !== undefined) {
                            value = usq.value;
                            ret = value;
                        }
                        if (!(ret === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, usqApi.__loadAccess()];
                    case 1:
                        ret = _b.sent();
                        this.local.usqs[un] = {
                            value: ret,
                            isNet: true,
                        };
                        str = JSON.stringify(this.local);
                        localStorage.setItem(usqLocalEntities, str);
                        _b.label = 2;
                    case 2: return [2 /*return*/, _.cloneDeep(ret)];
                    case 3:
                        err_1 = _b.sent();
                        this.local = undefined;
                        localStorage.removeItem(usqLocalEntities);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CacheUsqLocals.prototype.checkAccess = function (usqApi) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var usqOwner, usqName, un, usq, isNet, value, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usqOwner = usqApi.usqOwner, usqName = usqApi.usqName;
                        un = usqOwner + '/' + usqName;
                        usq = this.local.usqs[un];
                        isNet = usq.isNet, value = usq.value;
                        if (isNet === true)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, usqApi.__loadAccess()];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, _.isMatch(value, ret)];
                }
            });
        });
    };
    return CacheUsqLocals;
}());
var localUsqs = new CacheUsqLocals;
var UsqApi = /** @class */ (function (_super) {
    tslib_1.__extends(UsqApi, _super);
    function UsqApi(basePath, usqOwner, usqName, access, showWaiting) {
        var _this = _super.call(this, basePath, showWaiting) || this;
        if (usqName) {
            _this.usqOwner = usqOwner;
            _this.usqName = usqName;
            _this.usq = usqOwner + '/' + usqName;
        }
        _this.access = access;
        _this.showWaiting = showWaiting;
        return _this;
    }
    UsqApi.prototype.getHttpChannel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channels, channelUI, channel, usqToken;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.showWaiting === true || this.showWaiting === undefined) {
                            channels = channelUIs;
                            channelUI = new HttpChannelNavUI();
                        }
                        else {
                            channels = channelNoUIs;
                        }
                        channel = channels[this.usq];
                        if (channel !== undefined)
                            return [2 /*return*/, channel];
                        return [4 /*yield*/, appUsq(this.usq, this.usqOwner, this.usqName)];
                    case 1:
                        usqToken = _a.sent();
                        this.token = usqToken.token;
                        channel = new HttpChannel(false, usqToken.url, usqToken.token, channelUI);
                        return [2 /*return*/, channels[this.usq] = channel];
                }
            });
        });
    };
    UsqApi.prototype.update = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('update')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.__loadAccess = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var acc, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        acc = this.access === undefined ?
                            '' :
                            this.access.join('|');
                        return [4 /*yield*/, this.get('access', { acc: acc })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UsqApi.prototype.loadAccess = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localUsqs.loadAccess(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.loadEntities = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('entities')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.checkAccess = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localUsqs.checkAccess(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.schema = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('schema/' + name)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.schemas = function (names) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('schema', names)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.tuidGet = function (name, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tuid/' + name + '/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.tuidGetAll = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tuid-all/' + name + '/')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.tuidSave = function (name, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tuid/' + name, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.tuidSearch = function (name, arr, owner, key, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tuids/' + name, {
                            arr: arr,
                            owner: owner,
                            key: key,
                            pageStart: pageStart,
                            pageSize: pageSize
                        })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UsqApi.prototype.tuidArrGet = function (name, arr, owner, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tuid-arr/' + name + '/' + owner + '/' + arr + '/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.tuidArrGetAll = function (name, arr, owner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tuid-arr-all/' + name + '/' + owner + '/' + arr + '/')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.tuidArrSave = function (name, arr, owner, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tuid-arr/' + name + '/' + owner + '/' + arr + '/', params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.tuidArrPos = function (name, arr, owner, id, order) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tuid-arr-pos/' + name + '/' + owner + '/' + arr + '/', {
                            id: id,
                            $order: order
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.tuidIds = function (name, arr, ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, ret, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = 'tuidids/' + name + '/';
                        if (arr !== undefined)
                            url += arr;
                        else
                            url += '$';
                        return [4 /*yield*/, this.post(url, ids)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsqApi.prototype.proxied = function (name, proxy, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, ret, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = 'tuid-proxy/' + name + '/' + proxy + '/' + id;
                        return [4 /*yield*/, this.get(url)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsqApi.prototype.sheetSave = function (name, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('sheet/' + name, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.sheetAction = function (name, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.put('sheet/' + name, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.stateSheets = function (name, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('sheet/' + name + '/states', data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.stateSheetCount = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('sheet/' + name + '/statecount')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.getSheet = function (name, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('sheet/' + name + '/get/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.sheetArchives = function (name, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('sheet/' + name + '/archives', data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.sheetArchive = function (name, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('sheet/' + name + '/archive/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.action = function (name, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('action/' + name, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.page = function (name, pageStart, pageSize, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var p;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        switch (typeof params) {
                            case 'undefined':
                                p = { key: '' };
                                break;
                            default:
                                p = _.clone(params);
                                break;
                        }
                        p['$pageStart'] = pageStart;
                        p['$pageSize'] = pageSize;
                        return [4 /*yield*/, this.post('query-page/' + name, p)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsqApi.prototype.query = function (name, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('query/' + name, params)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /*
        async history(name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
            let p = _.clone(params);
            p['$pageStart'] = pageStart;
            p['$pageSize'] = pageSize;
            let ret = await this.post('history/' + name, p);
            return ret;
        }
    
        async book(name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
            let p = _.clone(params);
            p['$pageStart'] = pageStart;
            p['$pageSize'] = pageSize;
            let ret = await this.post('history/' + name, p);
            return ret;
        }
    */
    UsqApi.prototype.user = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('user')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UsqApi;
}(ApiBase));
export { UsqApi };
var channels = {};
export function logoutUnitxApis() {
    channels = {};
}
var UnitxApi = /** @class */ (function (_super) {
    tslib_1.__extends(UnitxApi, _super);
    function UnitxApi(unitId) {
        var _this = _super.call(this, 'tv/', undefined, undefined, undefined, true) || this;
        _this.unitId = unitId;
        return _this;
    }
    UnitxApi.prototype.getHttpChannel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channel, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        channel = channels[this.unitId];
                        if (channel !== undefined)
                            return [2 /*return*/, channel];
                        _a = channels;
                        _b = this.unitId;
                        return [4 /*yield*/, this.buildChannel()];
                    case 1: return [2 /*return*/, _a[_b] = _c.sent()];
                }
            });
        });
    };
    UnitxApi.prototype.buildChannel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channelUI, centerAppApi, ret, token, url, urlDebug, realUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelUI = new HttpChannelNavUI();
                        centerAppApi = new CenterAppApi('tv/', undefined);
                        return [4 /*yield*/, centerAppApi.unitxUsq(this.unitId)];
                    case 1:
                        ret = _a.sent();
                        token = ret.token, url = ret.url, urlDebug = ret.urlDebug;
                        realUrl = host.getUrlOrDebug(url, urlDebug);
                        this.token = token;
                        return [2 /*return*/, new HttpChannel(false, realUrl, token, channelUI)];
                }
            });
        });
    };
    return UnitxApi;
}(UsqApi));
export { UnitxApi };
var centerHost;
export function setCenterUrl(url) {
    console.log('setCenterUrl %s', url);
    centerHost = url;
    centerToken = undefined;
    centerChannel = undefined;
    centerChannelUI = undefined;
}
export var centerToken = undefined;
var loginedUserId = 0;
export function setCenterToken(userId, t) {
    centerToken = t;
    console.log('setCenterToken %s', t);
    centerChannel = undefined;
    centerChannelUI = undefined;
}
var centerChannelUI;
var centerChannel;
function getCenterChannelUI() {
    if (centerChannelUI !== undefined)
        return centerChannelUI;
    return centerChannelUI = new HttpChannel(true, centerHost, centerToken, new HttpChannelNavUI());
}
function getCenterChannel() {
    if (centerChannel !== undefined)
        return centerChannel;
    return centerChannel = new HttpChannel(true, centerHost, centerToken);
}
var CenterApi = /** @class */ (function (_super) {
    tslib_1.__extends(CenterApi, _super);
    function CenterApi(path, showWaiting) {
        return _super.call(this, path, showWaiting) || this;
    }
    CenterApi.prototype.getHttpChannel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, (this.showWaiting === true || this.showWaiting === undefined) ?
                        getCenterChannelUI() :
                        getCenterChannel()];
            });
        });
    };
    return CenterApi;
}(ApiBase));
export { CenterApi };
var usqTokens = 'usqTokens';
var UsqTokenApi = /** @class */ (function (_super) {
    tslib_1.__extends(UsqTokenApi, _super);
    function UsqTokenApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsqTokenApi.prototype.usq = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var unitParam, usqOwner, usqName, ls, _a, unit, user, un, nowTick, usq, tick, value, ret, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        unitParam = params.unit, usqOwner = params.usqOwner, usqName = params.usqName;
                        if (this.local === undefined) {
                            ls = localStorage.getItem(usqTokens);
                            if (ls !== null) {
                                this.local = JSON.parse(ls);
                            }
                        }
                        if (this.local !== undefined) {
                            _a = this.local, unit = _a.unit, user = _a.user;
                            if (unit !== unitParam || user !== loginedUserId)
                                this.local = undefined;
                        }
                        if (this.local === undefined) {
                            this.local = {
                                user: loginedUserId,
                                unit: params.unit,
                                usqs: {}
                            };
                        }
                        un = usqOwner + '/' + usqName;
                        nowTick = new Date().getTime();
                        usq = this.local.usqs[un];
                        if (usq !== undefined) {
                            tick = usq.tick, value = usq.value;
                            if ((nowTick - tick) < 24 * 3600 * 1000) {
                                return [2 /*return*/, value];
                            }
                        }
                        return [4 /*yield*/, this.get('app-usq', params)];
                    case 1:
                        ret = _b.sent();
                        this.local.usqs[un] = {
                            tick: nowTick,
                            value: ret,
                        };
                        localStorage.setItem(usqTokens, JSON.stringify(this.local));
                        return [2 /*return*/, ret];
                    case 2:
                        err_2 = _b.sent();
                        this.local = undefined;
                        localStorage.removeItem(usqTokens);
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsqTokenApi;
}(CenterApi));
export { UsqTokenApi };
export var usqTokenApi = new UsqTokenApi('tv/tie/', undefined);
var CallCenterApi = /** @class */ (function (_super) {
    tslib_1.__extends(CallCenterApi, _super);
    function CallCenterApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallCenterApi.prototype.directCall = function (url, method, body) {
        return this.call(url, method, body);
    };
    return CallCenterApi;
}(CenterApi));
export { CallCenterApi };
export var callCenterapi = new CallCenterApi('', undefined);
var CenterAppApi = /** @class */ (function (_super) {
    tslib_1.__extends(CenterAppApi, _super);
    function CenterAppApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CenterAppApi.prototype.usqs = function (unit, appOwner, appName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret, ls, rLs, rUnit, rAppOwner, rAppName, value, obj;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ls = localStorage.getItem('appUsqs');
                        if (ls !== null) {
                            rLs = JSON.parse(ls);
                            rUnit = rLs.unit, rAppOwner = rLs.appOwner, rAppName = rLs.appName, value = rLs.value;
                            if (unit === rUnit && appOwner === rAppOwner && appName === rAppName)
                                ret = value;
                        }
                        if (!(ret === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.usqsPure(unit, appOwner, appName)];
                    case 1:
                        ret = _a.sent();
                        obj = {
                            unit: unit,
                            appOwner: appOwner,
                            appName: appName,
                            value: ret,
                        };
                        localStorage.setItem('appUsqs', JSON.stringify(obj));
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.cachedUsqs = _.cloneDeep(ret)];
                }
            });
        });
    };
    CenterAppApi.prototype.usqsPure = function (unit, appOwner, appName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/app-usqs', { unit: unit, appOwner: appOwner, appName: appName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CenterAppApi.prototype.checkUsqs = function (unit, appOwner, appName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usqsPure(unit, appOwner, appName)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, _.isMatch(this.cachedUsqs, ret)];
                }
            });
        });
    };
    CenterAppApi.prototype.unitxUsq = function (unit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/unitx-usq', { unit: unit })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CenterAppApi;
}(CenterApi));
export { CenterAppApi };
//# sourceMappingURL=usqApi.js.map