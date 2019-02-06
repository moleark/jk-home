import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva-tools';
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
        var left = React.createElement("img", { className: "m-1", src: logo, alt: "logo", style: { width: '3rem', height: '3rem' } });
        //let cart = this.controller.cApp.cCart.renderCartLabel();
        var right = undefined;
        /*
        <div className="d-flex flex-row mr-1 align-items-center">
            {currentSalesRegion} &nbsp;
            <button onClick={()=>nav.start()}>Try</button>
        </div>;*/
        return React.createElement(LMR, { className: "mb-3 align-items-center bg-white", left: left, right: right },
            React.createElement("div", { className: "" }, this.controller.renderSearchHeader('md')));
        //<div className="h4 px-3 mb-0">百灵威科技</div>
    };
    return VSiteHeader;
}(View));
export { VSiteHeader };
//# sourceMappingURL=VSiteHeader.js.map