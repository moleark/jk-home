import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav, Page } from '../ui';
import userApi from './userApi';
import '../css/va-form.css';
var RegSuccess = /** @class */ (function (_super) {
    tslib_1.__extends(RegSuccess, _super);
    function RegSuccess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegSuccess.prototype.failed = function () {
        return;
    };
    RegSuccess.prototype.login = function () {
        var _this = this;
        var _a = this.props, user = _a.user, pwd = _a.pwd;
        userApi
            .login({ user: user, pwd: pwd, guest: nav.guest })
            .then(function (retUser) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (retUser === undefined) {
                            this.failed();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, nav.logined(retUser)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    RegSuccess.prototype.render = function () {
        var _this = this;
        var _a = this.props, user = _a.user, pwd = _a.pwd;
        return (React.createElement(Page, { header: false },
            React.createElement("div", { className: "container w-max-30c" },
                React.createElement("form", { className: "my-5" },
                    React.createElement("div", { className: "py-5" },
                        "\u7528\u6237 ",
                        React.createElement("strong", { className: "text-primary" },
                            user,
                            " "),
                        " \u6CE8\u518C\u6210\u529F\uFF01"),
                    React.createElement("button", { className: "btn btn-success btn-block", onClick: function () { return _this.login(); } }, "\u76F4\u63A5\u767B\u5F55")))));
    };
    return RegSuccess;
}(React.Component));
export default RegSuccess;
//# sourceMappingURL=regSuccess.js.map