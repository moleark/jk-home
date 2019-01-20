import * as tslib_1 from "tslib";
export var isDevelopment = process.env.NODE_ENV === 'development';
var centerDebugHost = 'localhost:3000'; //'192.168.86.64';
var centerEnvHost = 'REACT_APP_CENTER_DEBUG_HOST';
var usqDebugHost = 'localhost:3015'; //'192.168.86.63';
var usqEnvHost = 'REACT_APP_USQ_DEBUG_HOST';
var debugUsqlServer = 'localhost:3009';
var envUsqlServer = 'REACT_APP_DEBUG_USQL_SERVER';
var hosts = {
    centerhost: {
        value: centerDebugHost,
        env: centerEnvHost,
        local: false
    },
    usqhost: {
        value: usqDebugHost,
        env: usqEnvHost,
        local: false
    },
    unitxhost: {
        value: usqDebugHost,
        env: usqEnvHost,
        local: false
    },
    "usql-server": {
        value: debugUsqlServer,
        env: envUsqlServer,
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
            var promises, i, hostValue, value, env, host_1, fetchUrl, fetchOptions, results, p, i, hostValue;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        for (i in hosts) {
                            hostValue = hosts[i];
                            value = hostValue.value, env = hostValue.env;
                            host_1 = process.env[env] || value;
                            fetchUrl = this.debugHostUrl(host_1);
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
        var host = process.env['REACT_APP_CENTER_HOST'];
        var debugHost = process.env.REACT_APP_CENTER_DEBUG_HOST || centerDebugHost;
        var hash = document.location.hash;
        if (hash.includes('sheet_debug') === true) {
            return debugHost;
        }
        if (process.env.NODE_ENV === 'development') {
            if (hosts.centerhost.local === true)
                return debugHost;
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
        return host;
    };
    Host.prototype.getUrlOrDebug = function (url, urlDebug) {
        if (isDevelopment !== true)
            return url;
        if (!urlDebug)
            return url;
        for (var i in hosts) {
            var host_2 = hosts[i];
            var env = host_2.env, value = host_2.value, local = host_2.local;
            var hostString = "://" + i + "/";
            var pos = urlDebug.indexOf(hostString);
            if (pos > 0) {
                if (local === false)
                    break;
                urlDebug = urlDebug.replace(hostString, "://" + (process.env[env] || value) + "/");
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
/*
function replaceUrlHost(url:string, hostString:string, defaultHost:string, envHost:string) {
    let pos = url.indexOf(hostString);
    if (pos > 0) {
        let host = process.env[envHost] || defaultHost;
        url = url.replace(hostString, '://' + host + '/');
    }
    return url;
}
export async function getUrlOrDebug(url:string, urlDebug:string):Promise<string> {
    try {
        let orgDebug = urlDebug;
        if (urlDebug.endsWith('/') === false) urlDebug += '/';
        urlDebug = replaceUrlHost(urlDebug, '://centerhost/', centerDebugHost, 'REACT_APP_CENTER_DEBUG_HOST');
        urlDebug = replaceUrlHost(urlDebug, '://usqhost/', usqDebugHost, 'REACT_APP_USQ_DEBUG_HOST');
        urlDebug = replaceUrlHost(urlDebug, '://unitxhost/', usqDebugHost, 'REACT_APP_USQ_DEBUG_HOST');
        urlDebug = replaceUrlHost(urlDebug, '://usql-server/', debugUsqlServer, 'REACT_APP_DEBUG_USQL_SERVER');

        if (path === undefined) path = '';
        let fetchUrl = urlDebug + path;
        console.log('urlDebug: ' + orgDebug + ' ---- ' + urlDebug + ' === ' + fetchUrl);
        let fetchOptions = {
            method: "GET",
            mode: "no-cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "text/plain"
            },
        };
        let ret = await fetchLocalCheck(fetchUrl, fetchOptions);
        //let text = await ret.text();
        return urlDebug;
    }
    catch (error) {
        console.log('cannot connect %s, so use %s', urlDebug, url);
        console.error(error);
        return url;
    }
}
*/ 
//# sourceMappingURL=host.js.map