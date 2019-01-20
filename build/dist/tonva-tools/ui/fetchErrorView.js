import * as tslib_1 from "tslib";
import * as React from 'react';
import { refetchApi } from '../net';
var FetchErrorView = /** @class */ (function (_super) {
    tslib_1.__extends(FetchErrorView, _super);
    function FetchErrorView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reApi = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, channel, url, options, resolve, reject;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.props.clearError();
                        _a = this.props, channel = _a.channel, url = _a.url, options = _a.options, resolve = _a.resolve, reject = _a.reject;
                        return [4 /*yield*/, refetchApi(channel, url, options, resolve, reject)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.close = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.props.clearError();
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    FetchErrorView.prototype.render = function () {
        var _a = this.props, error = _a.error, url = _a.url;
        //let errMsg = fetchError.errorMsg;
        var errContent;
        if (typeof error === 'object') {
            var err = [];
            for (var i in error) {
                err.push(React.createElement("li", { key: i },
                    React.createElement("label", null, i),
                    React.createElement("div", null, error[i])));
            }
            errContent = React.createElement("ul", null, err);
        }
        else {
            errContent = React.createElement("div", null, error);
        }
        return React.createElement("li", null,
            React.createElement("article", { className: "page-container" },
                React.createElement("section", null,
                    React.createElement("div", { className: "va-error" },
                        React.createElement("div", null, "\u7F51\u7EDC\u51FA\u73B0\u95EE\u9898"),
                        React.createElement("div", null, "\u70B9\u51FB\u91CD\u65B0\u8BBF\u95EE"),
                        React.createElement("div", null,
                            "url: ",
                            url),
                        errContent,
                        React.createElement("div", { className: "p-3" },
                            React.createElement("button", { type: 'button', onClick: this.reApi }, "\u91CD\u65B0API"),
                            React.createElement("button", { type: 'button', onClick: this.close }, "\u5173\u95ED"))))));
    };
    return FetchErrorView;
}(React.Component));
export default FetchErrorView;
//# sourceMappingURL=fetchErrorView.js.map