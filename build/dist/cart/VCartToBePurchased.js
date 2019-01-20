import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva-tools';
import { List } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';
var VCartToBePurchased = /** @class */ (function (_super) {
    tslib_1.__extends(VCartToBePurchased, _super);
    function VCartToBePurchased() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderProduct = function (product) { return React.createElement("strong", null, product.description); };
        _this.renderPack = function (pack) { return React.createElement(React.Fragment, null, pack.name); };
        _this.onCartItemRender = function (item) {
            return React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-3" },
                    React.createElement("img", { src: "favicon.ico", alt: item.product.obj.description })),
                React.createElement("div", { className: "col-9" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-12" }, tv(item.product, _this.renderProduct))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-3" }, tv(item.pack, _this.renderPack)),
                        React.createElement("div", { className: "col-3" },
                            React.createElement("strong", { className: "text-danger" }, item.price)),
                        React.createElement("div", { className: "col-6 text-right d-flex" },
                            React.createElement("span", { className: "px-4 bg-light" }, item.quantity))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-12" }, "\u8D27\u671F"))));
        };
        return _this;
    }
    VCartToBePurchased.prototype.render = function (selectedCartItem) {
        return React.createElement(List, { items: selectedCartItem, item: { render: this.onCartItemRender } });
    };
    return VCartToBePurchased;
}(View));
export { VCartToBePurchased };
//# sourceMappingURL=VCartToBePurchased.js.map