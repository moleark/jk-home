import * as tslib_1 from "tslib";
export var isDevelopment = process.env.NODE_ENV === 'development';
var centerHost = process.env['REACT_APP_CENTER_HOST'];
var centerDebugHost = 'localhost:3000'; //'192.168.86.64';
var uqDebugHost = 'localhost:3015'; //'192.168.86.63';
var uqDebugBuilderHost = 'localhost:3009';
var hosts = {
    centerhost: {
        value: process.env['REACT_APP_CENTER_DEBUG_HOST'] || centerDebugHost,
        local: false
    },
    uqhost: {
        value: process.env['REACT_APP_UQ_DEBUG_HOST'] || uqDebugHost,
        local: false
    },
    unitxhost: {
        value: process.env['REACT_APP_UQ_DEBUG_HOST'] || uqDebugHost,
        local: false
    },
    "uq-build": {
        value: process.env['REACT_APP_UQ_DEBUG_BUILDER_HOST'] || uqDebugBuilderHost,
        local: false
    }
};
function centerUrlFromHost(host) { return "http://" + host + "/"; }
function centerWsFromHost(host) { return "ws://" + host + "/tv/"; }
var Host = /** @class */ (function () {
    function Host() {
    }
    Host.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var host;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(isDevelopment === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tryLocal()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        host = this.getCenterHost();
                        this.url = centerUrlFromHost(host);
                        this.ws = centerWsFromHost(host);
                        return [2 /*return*/];
                }
            });
        });
    };
    Host.prototype.debugHostUrl = function (host) { return "http://" + host + "/hello"; };
    Host.prototype.tryLocal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises, i, hostValue, value, fetchUrl, fetchOptions, results, p, i, hostValue;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        for (i in hosts) {
                            hostValue = hosts[i];
                            value = hostValue.value;
                            fetchUrl = this.debugHostUrl(value);
                            fetchOptions = {
                                method: "GET",
                                mode: "no-cors",
                                headers: {
                                    "Content-Type": "text/plain"
                                },
                            };
                            promises.push(localCheck(fetchUrl, fetchOptions));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        results = _a.sent();
                        p = 0;
                        for (i in hosts) {
                            hostValue = hosts[i];
                            hostValue.local = results[p];
                            ++p;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Host.prototype.getCenterHost = function () {
        //let host = process.env['REACT_APP_CENTER_HOST'];
        var _a = hosts.centerhost, value = _a.value, local = _a.local; // process.env.REACT_APP_CENTER_DEBUG_HOST || centerDebugHost;
        var hash = document.location.hash;
        if (hash.includes('sheet_debug') === true) {
            return value;
        }
        //if (process.env.NODE_ENV==='development') {
        if (isDevelopment === true) {
            if (local === true)
                return value;
            /*
            if (debugHost !== undefined) {
                try {
                    console.log('try connect debug url');
                    await fetchLocalCheck(centerUrlFromHost(debugHost));
                    return debugHost;
                }
                catch (err) {
                    //console.error(err);
                }
            }*/
        }
        return centerHost;
    };
    Host.prototype.getUrlOrDebug = function (url, urlDebug) {
        if (isDevelopment !== true)
            return url;
        if (!urlDebug)
            return url;
        for (var i in hosts) {
            var host_1 = hosts[i];
            var value = host_1.value, local = host_1.local;
            var hostString = "://" + i + "/";
            var pos = urlDebug.indexOf(hostString);
            if (pos > 0) {
                if (local === false)
                    break;
                urlDebug = urlDebug.replace(hostString, "://" + value + "/");
                return urlDebug;
            }
        }
        return url;
    };
    return Host;
}());
export var host = new Host();
// 因为测试的都是局域网服务器，甚至本机服务器，所以一秒足够了
// 网上找了上面的fetch timeout代码。
// 尽管timeout了，fetch仍然继续，没有cancel
// 实际上，一秒钟不够。web服务器会自动停。重启的时候，可能会比较长时间。也许两秒甚至更多。
//const timeout = 2000;
var timeout = 100;
function fetchLocalCheck(url, options) {
    return new Promise(function (resolve, reject) {
        fetch(url, options)
            .then(function (v) {
            v.text().then(resolve).catch(reject);
        })
            .catch(reject);
        var e = new Error("Connection timed out");
        setTimeout(reject, timeout, e);
    });
}
function localCheck(url, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchLocalCheck(url, options)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, true];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=host.js.map