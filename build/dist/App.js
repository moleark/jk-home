import * as tslib_1 from "tslib";
import * as React from 'react';
import './App.css';
import { NavView } from 'tonva-tools';
import { startApp } from 'tonva-react-uq';
import ui from './ui';
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
/*
class B extends A {
  constructor(b:string) {
    super(b);
  }
  //get super() {return this.A}
  async test():Promise<string> {return 'B'}
  async superTest() {
    console.log('superTest: ' + super.t())
    return super.test()
  }
  t() {return 'tb'}
  async d() {
    console.log(super.test);
    console.log(this.test);
    console.log(super.t);
    console.log(this.t);
    console.log('A.test ' + await this.superTest());
    console.log('B.test ' + await this.test());
    console.log('A.t ' + super.t());
    console.log('B.t ' + this.t());
  }
}
*/ 
//# sourceMappingURL=App.js.map