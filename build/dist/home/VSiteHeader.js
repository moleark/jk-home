import * as tslib_1 from "tslib";
import * as React from 'react';
import { View, nav } from 'tonva-tools';
import { LMR, FA } from 'tonva-react-form';
import logo from '../images/logo.png';
var VSiteHeader = /** @class */ (function (_super) {
    tslib_1.__extends(VSiteHeader, _super);
    function VSiteHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VSiteHeader.prototype.render = function () {
        var currentSalesRegion = React.createElement(FA, { name: "globe" });
        var login = React.createElement("div", null, "\u767B\u5F55");
        var left = React.createElement("img", { className: "m-1", src: logo, alt: "logo" });
        //let cart = this.controller.cApp.cCart.renderCartLabel();
        var right = React.createElement("div", { className: "d-flex flex-row mr-1 align-items-center" },
            currentSalesRegion,
            " \u00A0",
            React.createElement("button", { onClick: function () { return nav.start(); } }, "Try"));
        return React.createElement(LMR, { className: "align-items-end pb-1", left: left, right: right },
            React.createElement("div", { className: "h4 px-3 mb-0" }, "\u767E\u7075\u5A01\u79D1\u6280"));
    };
    return VSiteHeader;
}(View));
export { VSiteHeader };
//# sourceMappingURL=VSiteHeader.js.map