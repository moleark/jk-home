import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav, mobileHeaderStyle } from './nav';
var TitleBar = /** @class */ (function (_super) {
    tslib_1.__extends(TitleBar, _super);
    function TitleBar(props) {
        var _this = _super.call(this, props) || this;
        _this.logoutClick = function () {
            if (confirm('Really want to logout?') === false)
                return;
            var logout = _this.props.logout;
            if (typeof logout === 'function') {
                logout();
            }
            nav.logout();
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