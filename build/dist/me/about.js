import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page, nav } from 'tonva-tools';
var About = /** @class */ (function (_super) {
    tslib_1.__extends(About, _super);
    function About() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showLogs = function () {
            nav.push(React.createElement(Page, { header: "Logs" },
                React.createElement("div", null,
                    "NODE_ENV: ",
                    process.env.NODE_ENV),
                nav.logs.map(function (v, i) {
                    return React.createElement("div", { key: i, className: "px-3 py-1" }, v);
                })));
        };
        return _this;
    }
    About.prototype.render = function () {
        var right = React.createElement("button", { className: 'btn btn-success btn-sm', onClick: this.showLogs }, "log");
        return React.createElement(Page, { header: "\u5173\u4E8E\u767E\u7075\u5A01", right: right },
            React.createElement("div", { className: 'm-3' }, "\u767E\u7075\u5A01\u96C6\u56E2"));
    };
    return About;
}(React.Component));
export { About };
//# sourceMappingURL=about.js.map