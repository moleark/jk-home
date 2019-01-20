import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage } from 'tonva-tools';
import { LMR, Muted, FA } from 'tonva-react-form';
var VMember = /** @class */ (function (_super) {
    tslib_1.__extends(VMember, _super);
    function VMember() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = function () {
            var _a = _this.controller, member = _a.member, user = _a.user;
            var im = React.createElement("img", { src: user.icon, alt: "\u5934\u50CF" });
            var pointTitle = React.createElement("p", { className: "h4" }, "\u6211\u7684\u79EF\u5206");
            var pointDetail = React.createElement("p", { className: "small align-self-end" },
                "\u67E5\u770B\u8BE6\u60C5 ",
                React.createElement(FA, { name: "angle-right" }));
            var pointThisWeek = React.createElement(React.Fragment, null,
                React.createElement("p", { className: "h5 mb-0" }, "0"),
                React.createElement(Muted, null, "\u672C\u5468"));
            var pointAll = React.createElement(React.Fragment, null,
                React.createElement("p", { className: "h5 mb-0" }, member.point),
                React.createElement(Muted, null, "\u7D2F\u8BA1"));
            var fansTitle = React.createElement("p", { className: "h4" }, "\u6211\u7684\u7C89\u4E1D");
            var fansDetail = React.createElement("p", { className: "small align-self-end" },
                "\u67E5\u770B\u8BE6\u60C5 ",
                React.createElement(FA, { name: "angle-right" }));
            return React.createElement("div", null,
                React.createElement(LMR, { className: "shadow bg-white rounded p-3 mb-1", left: im },
                    React.createElement("div", null,
                        React.createElement("div", null, user.name),
                        React.createElement("div", null,
                            "\u9080\u8BF7\u7801:",
                            member.recommendationCode))),
                React.createElement("div", { className: "shadow bg-white rounded p-3 mb-1" },
                    React.createElement(LMR, { left: pointTitle, right: pointDetail }),
                    React.createElement(LMR, { className: "pb-2" },
                        React.createElement("p", { className: "h4 mb-0" }, "0"),
                        React.createElement(Muted, null, "\u4ECA\u65E5")),
                    React.createElement(LMR, { left: pointThisWeek, right: pointAll })),
                React.createElement("div", { className: "shadow bg-white rounded p-3 mb-1" },
                    React.createElement(LMR, { left: fansTitle, right: fansDetail }),
                    React.createElement(LMR, { className: "pb-2" },
                        React.createElement("p", { className: "h4 mb-0" }, "0"),
                        React.createElement(Muted, null, "\u4ECA\u65E5")),
                    React.createElement(LMR, { left: pointThisWeek, right: pointAll })));
        };
        return _this;
    }
    VMember.prototype.showEntry = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VMember.prototype.render = function (member) {
        return React.createElement(this.content, null);
    };
    return VMember;
}(VPage));
export { VMember };
//# sourceMappingURL=VMember.js.map