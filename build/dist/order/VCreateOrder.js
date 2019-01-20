import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';
import { observer } from 'mobx-react';
var VCreateOrder = /** @class */ (function (_super) {
    tslib_1.__extends(VCreateOrder, _super);
    function VCreateOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nullContact = function () {
            return React.createElement(React.Fragment, null, "\u8BF7\u70B9\u51FB\u8F93\u5165\u5730\u5740");
        };
        _this.renderProduct = function (product) { return React.createElement("strong", null, product.description); };
        _this.renderPack = function (pack) {
            return React.createElement(React.Fragment, null, (pack.radiox === 1 ? "" : pack.radiox + '*') + pack.radioy + pack.unit);
        };
        _this.renderItem = function (orderItem) {
            var product = orderItem.product, pack = orderItem.pack, price = orderItem.price, quantity = orderItem.quantity;
            var left = React.createElement("img", { src: "favicon.ico", alt: "structure image" });
            var right = React.createElement("div", { className: "w-6c text-right" },
                React.createElement("span", { className: "text-primary" }, quantity));
            return React.createElement(LMR, { left: left, right: right, className: "px-3 py-2" },
                React.createElement("div", { className: "px-3" },
                    React.createElement("div", null, tv(product, _this.renderProduct)),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-3" }, tv(pack, _this.renderPack)),
                        React.createElement("div", { className: "col-3" },
                            React.createElement("strong", { className: "text-danger" }, price))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-12" }, "\u8D27\u671F"))));
        };
        _this.renderOrderItem = function (orderItem) {
            return React.createElement(React.Fragment, null,
                tv(orderItem, _this.renderItem),
                React.createElement("br", null));
        };
        _this.page = observer(function () {
            var _a = _this.controller, orderData = _a.orderData, submitOrder = _a.submitOrder, openContactList = _a.openContactList;
            var orderItems = orderData.orderItems, shippingContact = orderData.shippingContact;
            var footer = React.createElement("button", { type: "button", className: "btn btn-danger w-100", onClick: submitOrder },
                "\u63D0\u4EA4\u8BA2\u5355",
                orderData.amount);
            var chevronRight = React.createElement(FA, { name: "chevron-right" });
            return React.createElement(Page, { header: "\u8BA2\u5355\u9884\u89C8", footer: footer },
                React.createElement(LMR, { right: chevronRight, onClick: openContactList, className: "px-3 py-3" }, tv(shippingContact, undefined, undefined, _this.nullContact)),
                React.createElement(List, { items: orderItems, item: { render: _this.renderOrderItem } }));
        });
        return _this;
    }
    VCreateOrder.prototype.showEntry = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VCreateOrder;
}(VPage));
export { VCreateOrder };
//# sourceMappingURL=VCreateOrder.js.map