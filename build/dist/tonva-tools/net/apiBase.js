import * as tslib_1 from "tslib";
export function refetchApi(channel, url, options, resolve, reject) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, channel.fetch(url, options, resolve, reject)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var ApiBase = /** @class */ (function () {
    function ApiBase(path, showWaiting) {
        this.path = path || '';
        this.showWaiting = showWaiting;
    }
    ApiBase.prototype.call = function (url, method, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHttpChannel()];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, channel.callFetch(url, method, body)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiBase.prototype.get = function (path, params) {
        if (params === void 0) { params = undefined; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHttpChannel()];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, channel.get(this.path + path, params)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiBase.prototype.post = function (path, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHttpChannel()];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, channel.post(this.path + path, params)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiBase.prototype.put = function (path, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHttpChannel()];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, channel.put(this.path + path, params)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiBase.prototype.delete = function (path, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var channel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHttpChannel()];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, channel.delete(this.path + path, params)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ApiBase;
}());
export { ApiBase };
//# sourceMappingURL=apiBase.js.map