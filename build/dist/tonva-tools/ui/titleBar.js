import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav, mobileHeaderStyle } from './nav';
import { Page } from './page';
var TitleBar = /** @class */ (function (_super) {
    tslib_1.__extends(TitleBar, _super);
    function TitleBar(props) {
        var _this = _super.call(this, props) || this;
        _this.logoutClick = function () {
            nav.push(React.createElement(Page, { header: "\u5B89\u5168\u9000\u51FA", back: "close" },
                React.createElement("div", { className: "m-5 border border-info bg-white rounded p-3 text-center" },
                    React.createElement("div", null, "\u9000\u51FA\u5F53\u524D\u8D26\u53F7\u4E0D\u4F1A\u5220\u9664\u4EFB\u4F55\u5386\u53F2\u6570\u636E\uFF0C\u4E0B\u6B21\u767B\u5F55\u4F9D\u7136\u53EF\u4EE5\u4F7F\u7528\u672C\u8D26\u53F7"),
                    React.createElement("div", { className: "mt-3" },
                        React.createElement("button", { className: "btn btn-danger", onClick: function () { return _this.logout(); } }, "\u9000\u51FA")))));
        };
        _this.navChange = _this.navChange.bind(_this);
        _this.state = {
            hasBack: false,
        };
        return _this;
    }
    TitleBar.prototype.navChange = function () {
        this.setState({
            hasBack: nav.level > 1
        });
    };
    TitleBar.prototype.componentWillMount = function () {
        this.navChange();
        //this.navChangeHandler = nav.events.add('change', this.navChange);
    };
    TitleBar.prototype.componentWillUnmount = function () {
        //nav.events.remove('change', this.navChangeHandler);
    };
    TitleBar.prototype.back = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nav.back()];
                    case 1:
                        _a.sent(); // 这个才会显示confirm box，在dataForm里面，如果输入了数据的话
                        return [2 /*return*/];
                }
            });
        });
    };
    TitleBar.prototype.openWindow = function () {
        window.open(document.location.href);
    };
    TitleBar.prototype.logout = function () {
        var logout = this.props.logout;
        if (typeof logout === 'function') {
            logout();
        }
        nav.logout();
    };
    TitleBar.prototype.render = function () {
        var b = this.state.hasBack || self != top;
        var _a = this.props, right = _a.right, center = _a.center, logout = _a.logout;
        var back, pop, debugLogout;
        if (logout !== undefined && self === top) {
            if (typeof logout === 'boolean' && logout === true
                || typeof logout === 'function') {
                var _b = nav.user, nick = _b.nick, name_1 = _b.name;
                debugLogout = React.createElement("div", { className: "d-flex align-items-center" },
                    React.createElement("small", { className: "text-light" }, nick || name_1),
                    React.createElement("a", { className: "dropdown-toggle btn btn-secondary btn-sm ml-2", role: "button", onClick: this.logoutClick },
                        React.createElement("i", { className: "fa fa-sign-out" })));
            }
        }
        if (b) {
            switch (this.props.back) {
                case 'none':
                    back = undefined;
                    break;
                default:
                case 'back':
                    back = React.createElement("nav", { onClick: this.back },
                        React.createElement("i", { className: "fa fa-arrow-left" }));
                    break;
                case 'close':
                    back = React.createElement("nav", { onClick: this.back },
                        React.createElement("i", { className: "fa fa-close" }));
                    break;
            }
        }
        if (self != top) {
            console.log(document.location.href);
            pop = React.createElement("header", { onClick: this.openWindow });
        }
        var rightView;
        if (right || debugLogout)
            rightView = React.createElement("aside", null,
                right,
                " ",
                debugLogout);
        return (React.createElement("header", { style: mobileHeaderStyle },
            pop,
            back,
            React.createElement("div", null, center),
            rightView));
    };
    return TitleBar;
}(React.Component));
export { TitleBar };
//# sourceMappingURL=titleBar.js.map