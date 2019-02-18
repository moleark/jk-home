import * as tslib_1 from "tslib";
import * as React from 'react';
import { observable } from 'mobx';
import { UserInNav } from '../user';
import { Page } from './page';
import { netToken } from '../net/netToken';
import FetchErrorView from './fetchErrorView';
import { appUrl, setMeInFrame, logoutUqTokens } from '../net/appBridge';
import { LocalData } from '../local';
import { guestApi, logoutApis, setCenterUrl, setCenterToken, WSChannel, meInFrame, isDevelopment, host } from '../net';
import 'font-awesome/css/font-awesome.min.css';
import '../css/va-form.css';
import '../css/va.css';
import '../css/animation.css';
import { wsBridge } from '../net/wsChannel';
import { resOptions } from './res';
import { Loading } from './loading';
var regEx = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|' +
    'Opera Mini|IEMobile|Mobile', 'i');
var isMobile = regEx.test(navigator.userAgent);
export var mobileHeaderStyle = isMobile ? {
    minHeight: '3em'
} : undefined;
var logo = require('../img/logo.svg');
var logMark;
var logs = [];
;
var stackKey = 1;
var NavView = /** @class */ (function (_super) {
    tslib_1.__extends(NavView, _super);
    function NavView(props) {
        var _this = _super.call(this, props) || this;
        _this.waitCount = 0;
        _this.isHistoryBack = false;
        _this.clearError = function () {
            _this.setState({ fetchError: undefined });
        };
        _this.back = _this.back.bind(_this);
        _this.navBack = _this.navBack.bind(_this);
        _this.stack = [];
        _this.state = {
            stack: _this.stack,
            wait: 0,
            fetchError: undefined
        };
        return _this;
    }
    NavView.prototype.componentWillMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                window.addEventListener('popstate', this.navBack);
                return [2 /*return*/];
            });
        });
    };
    NavView.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nav.set(this);
                        /*
                        let start = this.props.start;
                        if (start !== undefined) {
                            await start();
                        }
                        else {
                        */
                        return [4 /*yield*/, nav.start()];
                    case 1:
                        /*
                        let start = this.props.start;
                        if (start !== undefined) {
                            await start();
                        }
                        else {
                        */
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(NavView.prototype, "level", {
        get: function () {
            return this.stack.length;
        },
        enumerable: true,
        configurable: true
    });
    NavView.prototype.startWait = function () {
        var _this = this;
        if (this.waitCount === 0) {
            this.setState({ wait: 1 });
            this.waitTimeHandler = global.setTimeout(function () {
                _this.waitTimeHandler = undefined;
                _this.setState({ wait: 2 });
            }, 1000);
        }
        ++this.waitCount;
        this.setState({
            fetchError: undefined,
        });
    };
    NavView.prototype.endWait = function () {
        var _this = this;
        setTimeout(function () {
            /*
            this.setState({
                fetchError: undefined,
            });*/
            --_this.waitCount;
            if (_this.waitCount === 0) {
                if (_this.waitTimeHandler !== undefined) {
                    clearTimeout(_this.waitTimeHandler);
                    _this.waitTimeHandler = undefined;
                }
                _this.setState({ wait: 0 });
            }
        }, 100);
    };
    NavView.prototype.onError = function (fetchError) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        err = fetchError.error;
                        if (!(err !== undefined && err.unauthorized === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, nav.showLogin()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.setState({
                            fetchError: fetchError,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NavView.prototype.show = function (view, disposer) {
        this.clear();
        return this.push(view, disposer);
    };
    NavView.prototype.push = function (view, disposer) {
        this.removeCeased();
        if (this.stack.length > 0) {
            window.history.pushState('forward', null, null);
        }
        var key = stackKey++;
        this.stack.push({
            key: key,
            view: view,
            ceased: false,
            disposer: disposer
        });
        this.refresh();
        //console.log('push: %s pages', this.stack.length);
        return key;
    };
    NavView.prototype.replace = function (view, disposer) {
        var item = undefined;
        var stack = this.stack;
        if (stack.length > 0) {
            item = stack.pop();
            //this.popAndDispose();
        }
        var key = stackKey++;
        this.stack.push({
            key: key,
            view: view,
            ceased: false,
            disposer: disposer
        });
        if (item !== undefined)
            this.dispose(item.disposer);
        this.refresh();
        //console.log('replace: %s pages', this.stack.length);
        return key;
    };
    NavView.prototype.ceaseTop = function (level) {
        if (level === void 0) { level = 1; }
        var p = this.stack.length - 1;
        for (var i = 0; i < level; i++, p--) {
            if (p < 0)
                break;
            var item = this.stack[p];
            item.ceased = true;
        }
    };
    NavView.prototype.pop = function (level) {
        if (level === void 0) { level = 1; }
        var stack = this.stack;
        var len = stack.length;
        //console.log('pop start: %s pages level=%s', len, level);
        if (level <= 0 || len <= 1)
            return;
        if (len < level)
            level = len;
        var backLevel = 0;
        for (var i = 0; i < level; i++) {
            if (stack.length === 0)
                break;
            //stack.pop();
            this.popAndDispose();
            ++backLevel;
        }
        if (backLevel >= len)
            backLevel--;
        this.refresh();
        if (this.isHistoryBack !== true) {
            //window.removeEventListener('popstate', this.navBack);
            //window.history.back(backLevel);
            //window.addEventListener('popstate', this.navBack);
        }
        //console.log('pop: %s pages', stack.length);
    };
    NavView.prototype.popTo = function (key) {
        throw new Error('to be designed');
    };
    NavView.prototype.removeCeased = function () {
        for (;;) {
            var p = this.stack.length - 1;
            if (p < 0)
                break;
            var top_1 = this.stack[p];
            if (top_1.ceased === false)
                break;
            var item = this.stack.pop();
            var disposer = item.disposer;
            this.dispose(disposer);
        }
        this.refresh();
    };
    NavView.prototype.popAndDispose = function () {
        this.removeCeased();
        var item = this.stack.pop();
        if (item === undefined)
            return;
        var disposer = item.disposer;
        this.dispose(disposer);
        this.removeCeased();
        return item;
    };
    NavView.prototype.dispose = function (disposer) {
        if (disposer === undefined)
            return;
        var item = this.stack.find(function (v) { return v.disposer === disposer; });
        if (item === undefined)
            disposer();
    };
    NavView.prototype.clear = function () {
        var len = this.stack.length;
        while (this.stack.length > 0)
            this.popAndDispose();
        this.refresh();
        if (len > 1) {
            //window.removeEventListener('popstate', this.navBack);
            //window.history.back(len-1);
            //window.addEventListener('popstate', this.navBack);
        }
    };
    NavView.prototype.regConfirmClose = function (confirmClose) {
        var stack = this.stack;
        var len = stack.length;
        if (len === 0)
            return;
        var top = stack[len - 1];
        top.confirmClose = confirmClose;
    };
    NavView.prototype.navBack = function () {
        nav.log('backbutton pressed - nav level: ' + this.stack.length);
        this.isHistoryBack = true;
        this.back(true);
        this.isHistoryBack = false;
    };
    NavView.prototype.back = function (confirm) {
        if (confirm === void 0) { confirm = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var stack, len, top;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stack = this.stack;
                        len = stack.length;
                        if (len === 0)
                            return [2 /*return*/];
                        if (len === 1) {
                            if (self != window.top) {
                                window.top.postMessage({ type: 'pop-app' }, '*');
                            }
                            return [2 /*return*/];
                        }
                        top = stack[len - 1];
                        if (!(confirm === true && top.confirmClose)) return [3 /*break*/, 2];
                        return [4 /*yield*/, top.confirmClose()];
                    case 1:
                        if ((_a.sent()) === true)
                            this.pop();
                        return [3 /*break*/, 3];
                    case 2:
                        this.pop();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NavView.prototype.confirmBox = function (message) {
        return window.confirm(message);
    };
    NavView.prototype.render = function () {
        var _a = this.state, wait = _a.wait, fetchError = _a.fetchError;
        var stack = this.state.stack;
        var top = stack.length - 1;
        var elWait = null, elError = null;
        switch (wait) {
            case 1:
                elWait = React.createElement("li", { className: "va-wait va-wait1" });
                break;
            case 2:
                elWait = React.createElement("li", { className: "va-wait va-wait2" },
                    React.createElement("i", { className: "fa fa-spinner fa-spin fa-3x fa-fw" }),
                    React.createElement("span", { className: "sr-only" }, "Loading..."));
                break;
        }
        if (fetchError)
            elError = React.createElement(FetchErrorView, tslib_1.__assign({ clearError: this.clearError }, fetchError));
        return (React.createElement("ul", { className: 'va' },
            stack.map(function (item, index) {
                var key = item.key, view = item.view;
                return React.createElement("li", { key: key, style: index < top ? { visibility: 'hidden' } : undefined }, view);
            }),
            elWait,
            elError));
    };
    NavView.prototype.refresh = function () {
        // this.setState({flag: !this.state.flag});
        this.setState({ stack: this.stack });
        // this.forceUpdate();
    };
    return NavView;
}(React.Component));
export { NavView };
var Nav = /** @class */ (function () {
    function Nav() {
        this.local = new LocalData();
        this.user = undefined;
        var lang = resOptions.lang, district = resOptions.district;
        this.language = lang;
        this.culture = district;
    }
    Object.defineProperty(Nav.prototype, "guest", {
        get: function () {
            var guest = this.local.guest;
            if (guest === undefined)
                return 0;
            var g = guest.get();
            if (g === undefined)
                return 0;
            return g.guest;
        },
        enumerable: true,
        configurable: true
    });
    Nav.prototype.set = function (nav) {
        //this.logo = logo;
        this.nav = nav;
    };
    Nav.prototype.registerReceiveHandler = function (handler) {
        if (this.ws === undefined)
            return;
        return this.ws.onWsReceiveAny(handler);
    };
    Nav.prototype.unregisterReceiveHandler = function (handlerId) {
        if (this.ws === undefined)
            return;
        if (handlerId === undefined)
            return;
        this.ws.endWsReceive(handlerId);
    };
    Nav.prototype.onReceive = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.ws === undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.ws.receive(msg)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.getUnitName = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var unitRes, res, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('unit.json', {})];
                    case 1:
                        unitRes = _a.sent();
                        return [4 /*yield*/, unitRes.json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.unit];
                    case 3:
                        err_1 = _a.sent();
                        this.local.unit.clear();
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.loadUnit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var unitName, unit, unitId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unit = this.local.unit.get();
                        if (!(unit !== undefined)) return [3 /*break*/, 2];
                        if (isDevelopment !== true)
                            return [2 /*return*/, unit.id];
                        return [4 /*yield*/, this.getUnitName()];
                    case 1:
                        unitName = _a.sent();
                        if (unitName === undefined)
                            return [2 /*return*/];
                        if (unit.name === unitName)
                            return [2 /*return*/, unit.id];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getUnitName()];
                    case 3:
                        unitName = _a.sent();
                        if (unitName === undefined)
                            return [2 /*return*/];
                        _a.label = 4;
                    case 4: return [4 /*yield*/, guestApi.unitFromName(unitName)];
                    case 5:
                        unitId = _a.sent();
                        if (unitId !== undefined) {
                            this.local.unit.set({ id: unitId, name: unitName });
                        }
                        return [2 /*return*/, unitId];
                }
            });
        });
    };
    Nav.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, ws, unit, guest, hash, mif, user, notLogined;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nav.clear();
                        nav.push(React.createElement(Page, { header: false },
                            React.createElement(Loading, null)));
                        return [4 /*yield*/, host.start()];
                    case 1:
                        _a.sent();
                        url = host.url, ws = host.ws;
                        this.centerHost = url;
                        this.wsHost = ws;
                        setCenterUrl(url);
                        return [4 /*yield*/, this.loadUnit()];
                    case 2:
                        unit = _a.sent();
                        meInFrame.unit = unit;
                        guest = this.local.guest.get();
                        if (!(guest === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, guestApi.guest()];
                    case 3:
                        guest = _a.sent();
                        _a.label = 4;
                    case 4:
                        nav.setGuest(guest);
                        hash = document.location.hash;
                        // document.title = document.location.origin;
                        console.log("url=%s hash=%s", document.location.origin, hash);
                        this.isInFrame = hash !== undefined && hash !== '' && hash.startsWith('#tv');
                        if (this.isInFrame === true) {
                            mif = setMeInFrame(hash);
                            if (mif !== undefined) {
                                this.ws = wsBridge;
                                console.log('this.ws = wsBridge in sub frame');
                                //nav.user = {id:0} as User;
                                if (self !== window.parent) {
                                    window.parent.postMessage({ type: 'sub-frame-started', hash: mif.hash }, '*');
                                }
                                // 下面这一句，已经移到 appBridge.ts 里面的 initSubWin，也就是响应从main frame获得user之后开始。
                                //await this.showAppView();
                                return [2 /*return*/];
                            }
                        }
                        user = this.local.user.get();
                        if (!(user === undefined)) return [3 /*break*/, 9];
                        notLogined = this.nav.props.notLogined;
                        if (!(notLogined !== undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, notLogined()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, nav.showLogin()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                    case 9: return [4 /*yield*/, nav.logined(user)];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.showAppView = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var onLogined;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onLogined = this.nav.props.onLogined;
                        if (onLogined === undefined) {
                            nav.push(React.createElement("div", null, "NavView has no prop onLogined"));
                            return [2 /*return*/];
                        }
                        nav.clear();
                        return [4 /*yield*/, onLogined()];
                    case 1:
                        _a.sent();
                        console.log('logined: AppView shown');
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.setGuest = function (guest) {
        this.local.guest.set(guest);
        netToken.set(0, guest.token);
    };
    Nav.prototype.logined = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ws;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ws = this.ws = new WSChannel(this.wsHost, user.token);
                        ws.connect();
                        console.log("logined: %s", JSON.stringify(user));
                        this.local.user.set(user);
                        netToken.set(user.id, user.token);
                        this.user = new UserInNav(user);
                        return [4 /*yield*/, this.showAppView()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.showLogin = function (withBack) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lv, loginView;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import('../entry/login')];
                    case 1:
                        lv = _a.sent();
                        loginView = React.createElement(lv.default, { withBack: withBack });
                        //}
                        if (withBack !== true) {
                            this.nav.clear();
                            this.pop();
                        }
                        //this.nav.show(loginView);
                        this.nav.push(loginView);
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.logout = function (notShowLogin) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var guest;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.local.logoutClear();
                        this.user = undefined; //{} as User;
                        logoutApis();
                        logoutUqTokens();
                        guest = this.local.guest.get();
                        setCenterToken(0, guest && guest.token);
                        this.ws = undefined;
                        if (notShowLogin === true)
                            return [2 /*return*/];
                        //await this.showLogin();
                        return [4 /*yield*/, nav.start()];
                    case 1:
                        //await this.showLogin();
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Nav.prototype, "level", {
        get: function () {
            return this.nav.level;
        },
        enumerable: true,
        configurable: true
    });
    Nav.prototype.startWait = function () {
        this.nav.startWait();
    };
    Nav.prototype.endWait = function () {
        this.nav.endWait();
    };
    Nav.prototype.onError = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nav.onError(error)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.show = function (view, disposer) {
        this.nav.show(view, disposer);
    };
    Nav.prototype.push = function (view, disposer) {
        this.nav.push(view, disposer);
    };
    Nav.prototype.replace = function (view, disposer) {
        this.nav.replace(view, disposer);
    };
    Nav.prototype.pop = function (level) {
        if (level === void 0) { level = 1; }
        this.nav.pop(level);
    };
    Nav.prototype.clear = function () {
        this.nav.clear();
    };
    Nav.prototype.navBack = function () {
        this.nav.navBack();
    };
    Nav.prototype.ceaseTop = function (level) {
        this.nav.ceaseTop(level);
    };
    Nav.prototype.removeCeased = function () {
        this.nav.removeCeased();
    };
    Nav.prototype.back = function (confirm) {
        if (confirm === void 0) { confirm = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nav.back(confirm)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.regConfirmClose = function (confirmClose) {
        this.nav.regConfirmClose(confirmClose);
    };
    Nav.prototype.confirmBox = function (message) {
        return this.nav.confirmBox(message);
    };
    Nav.prototype.navToApp = function (url, unitId, apiId, sheetType, sheetId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var sheet = _this.centerHost.includes('http://localhost:') === true ? 'sheet_debug' : 'sheet';
                        var uh = sheetId === undefined ?
                            appUrl(url, unitId) :
                            appUrl(url, unitId, sheet, [apiId, sheetType, sheetId]);
                        console.log('navToApp: %s', JSON.stringify(uh));
                        nav.push(React.createElement("article", { className: 'app-container' },
                            React.createElement("span", { id: uh.hash, onClick: function () { return _this.back(); }, style: mobileHeaderStyle },
                                React.createElement("i", { className: "fa fa-arrow-left" })),
                            React.createElement("iframe", { src: uh.url })), function () {
                            resolve();
                        });
                    })];
            });
        });
    };
    Nav.prototype.navToSite = function (url) {
        // show in new window
        window.open(url);
    };
    Object.defineProperty(Nav.prototype, "logs", {
        get: function () { return logs; },
        enumerable: true,
        configurable: true
    });
    ;
    Nav.prototype.log = function (msg) {
        logs.push(msg);
    };
    Nav.prototype.logMark = function () {
        var date = new Date();
        logMark = date.getTime();
        logs.push('log-mark: ' + date.toTimeString());
    };
    Nav.prototype.logStep = function (step) {
        logs.push(step + ': ' + (new Date().getTime() - logMark));
    };
    tslib_1.__decorate([
        observable
    ], Nav.prototype, "user", void 0);
    return Nav;
}());
export { Nav };
export var nav = new Nav();
//# sourceMappingURL=nav.js.map