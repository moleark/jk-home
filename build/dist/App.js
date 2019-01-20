import * as tslib_1 from "tslib";
import * as React from 'react';
import './App.css';
import { NavView } from 'tonva-tools';
import { startApp } from 'tonva-react-usql';
import ui from './ui';
import { A } from 'a';
//import { faceTabs } from 'facetabs';
var tonvaApp = "百灵威系统工程部/cart";
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onLogined = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, startApp(tonvaApp, ui)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    App.prototype.render = function () {
        return React.createElement(NavView, { onLogined: this.onLogined, notLogined: this.onLogined });
    };
    return App;
}(React.Component));
export default App;
var B = /** @class */ (function (_super) {
    tslib_1.__extends(B, _super);
    function B(b) {
        return _super.call(this, b) || this;
    }
    //get super() {return this.A}
    B.prototype.test = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, 'B'];
        }); });
    };
    B.prototype.superTest = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.log('superTest: ' + _super.prototype.t.call(this));
                return [2 /*return*/, _super.prototype.test.call(this)];
            });
        });
    };
    B.prototype.t = function () { return 'tb'; };
    B.prototype.d = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        console.log(_super.prototype.test);
                        console.log(this.test);
                        console.log(_super.prototype.t);
                        console.log(this.t);
                        _b = (_a = console).log;
                        _c = 'A.test ';
                        return [4 /*yield*/, this.superTest()];
                    case 1:
                        _b.apply(_a, [_c + (_g.sent())]);
                        _e = (_d = console).log;
                        _f = 'B.test ';
                        return [4 /*yield*/, this.test()];
                    case 2:
                        _e.apply(_d, [_f + (_g.sent())]);
                        console.log('A.t ' + _super.prototype.t.call(this));
                        console.log('B.t ' + this.t());
                        return [2 /*return*/];
                }
            });
        });
    };
    return B;
}(A));
//# sourceMappingURL=App.js.map