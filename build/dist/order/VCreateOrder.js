import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { ContactType } from './COrder';
import { List, LMR, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { observer } from 'mobx-react';
var VCreateOrder = /** @class */ (function (_super) {
    tslib_1.__extends(VCreateOrder, _super);
    function VCreateOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nullContact = function () {
            return React.createElement(React.Fragment, null, "\u8BF7\u70B9\u51FB\u6B64\u5904\u8F93\u5165\u6536\u8D27\u5730\u5740");
        };
        _this.renderProduct = function (product) { return React.createElement("strong", null, product.description); };
        _this.renderPack = function (pack) {
            return React.createElement(React.Fragment, null, (pack.radiox === 1 ? "" : pack.radiox + '*') + pack.radioy + pack.unit);
        };
        _this.renderOrderItem = function (orderItem) {
            var product = orderItem.product, packs = orderItem.packs;
            var left = React.createElement("img", { src: "favicon.ico", alt: "structure image" });
            var right = React.createElement("div", null, packs.map(function (v) {
                var pack = v.pack, price = v.price, quantity = v.quantity;
                return React.createElement("div", { key: pack.id, className: "d-flex" },
                    React.createElement("div", { className: "w-6c text-right" }, tv(pack)),
                    React.createElement("div", { className: "w-6c text-right" },
                        price,
                        React.createElement("small", null, "\u5143")),
                    React.createElement("div", { className: "mx-2" },
                        React.createElement(FA, { className: "text-muted", name: "times" })),
                    React.createElement("div", { className: "w-4c" }, quantity));
            }));
            return React.createElement(LMR, { left: left, right: right, className: "px-3 py-2" },
                React.createElement("div", { className: "px-3" },
                    React.createElement("div", null, tv(product, _this.renderProduct)),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-12" }, "\u8D27\u671F"))));
        };
        _this.page = observer(function () {
            var _a = _this.controller, orderData = _a.orderData, submitOrder = _a.submitOrder, openContactList = _a.openContactList;
            var orderItems = orderData.orderItems, shippingContact = orderData.shippingContact, invoiceContact = orderData.invoiceContact;
            var footer = React.createElement("button", { type: "button", className: "btn btn-danger w-100", onClick: submitOrder },
                "\u63D0\u4EA4\u8BA2\u5355",
                orderData.amount);
            var chevronRight = React.createElement(FA, { name: "chevron-right" });
            return React.createElement(Page, { header: "\u8BA2\u5355\u9884\u89C8", footer: footer },
                React.createElement("div", { className: "row px-3 py-3 bg-white mb-1", onClick: function () { return openContactList(ContactType.ShippingContact); } },
                    React.createElement("div", { className: "col-12 col-sm-2 text-muted" }, "\u6536\u8D27\u5730\u5740:"),
                    React.createElement("div", { className: "col-12 col-sm-10 pl-4 pl-sm-0 d-flex" },
                        tv(shippingContact, undefined, undefined, _this.nullContact),
                        chevronRight)),
                React.createElement("div", { className: "row px-3 py-3 bg-white mb-1", onClick: function () { return openContactList(ContactType.InvoiceContact); } },
                    React.createElement("div", { className: "col-12 col-sm-2 text-muted" }, "\u53D1\u7968\u5730\u5740:"),
                    React.createElement("div", { className: "col-12 col-sm-10 pl-4 pl-sm-0 d-flex" },
                        tv(invoiceContact, undefined, undefined, _this.nullContact),
                        chevronRight)),
                React.createElement(List, { items: orderItems, item: { render: _this.renderOrderItem } }));
        });
        return _this;
    }
    VCreateOrder.prototype.open = function (param) {
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
/*
            <LMR right={chevronRight} onClick={() => openContactList(ContactType.ShippingContact)} className="px-3 py-3">
                <div className="row">
                    <div className="col-12 col-sm-2">收货地址</div>
                    <div className="col-12 col-sm-10">{tv(shippingContact, undefined, undefined, this.nullContact)}</div>
                </div>
            </LMR>
            <LMR right={chevronRight} onClick={() => openContactList(ContactType.InvoiceContact)} className="px-3 py-3">
                <div className="row">
                    <div className="col-12 col-sm-2">发票地址</div>
                    <div className="col-12 col-sm-10">{tv(invoiceContact, undefined, undefined, this.nullContact)}</div>
                </div>
            </LMR>
*/ 
//# sourceMappingURL=VCreateOrder.js.map