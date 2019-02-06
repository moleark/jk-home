import * as tslib_1 from "tslib";
var subAppWindow;
function postWsToSubApp(msg) {
    if (subAppWindow === undefined)
        return;
    subAppWindow.postMessage({
        type: 'ws',
        msg: msg
    }, '*');
}
export function setSubAppWindow(win) {
    subAppWindow = win;
}
export function postWsToTop(msg) {
    window.top.postMessage({
        type: 'ws',
        msg: msg
    }, '*');
}
var WsBase = /** @class */ (function () {
    function WsBase() {
        this.handlerSeed = 1;
        this.anyHandlers = {};
        this.msgHandlers = {};
    }
    WsBase.prototype.onWsReceiveAny = function (handler) {
        var seed = this.handlerSeed++;
        this.anyHandlers[seed] = handler;
        return seed;
    };
    WsBase.prototype.onWsReceive = function (type, handler) {
        var seed = this.handlerSeed++;
        this.msgHandlers[seed] = { type: type, handler: handler };
        return seed;
    };
    WsBase.prototype.endWsReceive = function (handlerId) {
        delete this.anyHandlers[handlerId];
        delete this.msgHandlers[handlerId];
    };
    WsBase.prototype.receive = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var $type, _a, _b, _i, i, _c, _d, _e, i, _f, type, handler;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        $type = msg.$type;
                        _a = [];
                        for (_b in this.anyHandlers)
                            _a.push(_b);
                        _i = 0;
                        _g.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        i = _a[_i];
                        return [4 /*yield*/, this.anyHandlers[i](msg)];
                    case 2:
                        _g.sent();
                        _g.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _c = [];
                        for (_d in this.msgHandlers)
                            _c.push(_d);
                        _e = 0;
                        _g.label = 5;
                    case 5:
                        if (!(_e < _c.length)) return [3 /*break*/, 8];
                        i = _c[_e];
                        _f = this.msgHandlers[i], type = _f.type, handler = _f.handler;
                        if (type !== $type)
                            return [3 /*break*/, 7];
                        return [4 /*yield*/, handler(msg)];
                    case 6:
                        _g.sent();
                        _g.label = 7;
                    case 7:
                        _e++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return WsBase;
}());
export { WsBase };
var wsBaseSeed = 1;
var WsBridge = /** @class */ (function (_super) {
    tslib_1.__extends(WsBridge, _super);
    function WsBridge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wsBaseId = 'WsBridge seed ' + wsBaseSeed++;
        return _this;
    }
    return WsBridge;
}(WsBase));
export { WsBridge };
export var wsBridge = new WsBridge();
var WSChannel = /** @class */ (function (_super) {
    tslib_1.__extends(WSChannel, _super);
    function WSChannel(wsHost, token) {
        var _this = _super.call(this) || this;
        _this.wsBaseId = 'WSChannel seed ' + wsBaseSeed++;
        _this.wsHost = wsHost;
        _this.token = token;
        return _this;
    }
    WSChannel.setCenterToken = function (token) {
        WSChannel.centerToken = token;
    };
    WSChannel.prototype.connect = function () {
        var _this = this;
        //this.wsHost = wsHost;
        //this.token = token || WSChannel.centerToken;
        if (this.ws !== undefined)
            return;
        var that = this;
        return new Promise(function (resolve, reject) {
            var ws = new WebSocket(_this.wsHost, _this.token || WSChannel.centerToken);
            console.log('connect webSocket %s', _this.wsHost);
            ws.onopen = function (ev) {
                console.log('webSocket connected %s', _this.wsHost);
                that.ws = ws;
                resolve();
            };
            ws.onerror = function (ev) {
                reject('webSocket can\'t open!');
            };
            ws.onmessage = function (msg) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, that.wsMessage(msg)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            ws.onclose = function (ev) {
                that.ws = undefined;
                console.log('webSocket closed!');
            };
        });
    };
    WSChannel.prototype.close = function () {
        if (this.ws !== undefined) {
            this.ws.close();
            this.ws = undefined;
        }
    };
    WSChannel.prototype.wsMessage = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var msg, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('websocket message: %s', event.data);
                        msg = JSON.parse(event.data);
                        postWsToSubApp(msg);
                        return [4 /*yield*/, this.receive(msg)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log('ws msg error: ', err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WSChannel.prototype.sendWs = function (msg) {
        var netThis = this;
        this.connect().then(function () {
            netThis.ws.send(msg);
        });
    };
    return WSChannel;
}(WsBase));
export { WSChannel };
//# sourceMappingURL=wsChannel.js.map