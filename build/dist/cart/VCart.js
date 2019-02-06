import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form, Field } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from '../tools';
var cartSchema = [
    {
        name: 'list',
        type: 'arr',
        arr: [
            { name: 'checked', type: 'boolean' },
            { name: 'product', type: 'object' },
            {
                name: 'packs', type: 'arr', arr: [
                    { name: 'pack', type: 'object' },
                    { name: 'price', type: 'number' },
                    { name: 'quantity', type: 'number' },
                ]
            }
        ],
    }
];
var VCart = /** @class */ (function (_super) {
    tslib_1.__extends(VCart, _super);
    function VCart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.CheckOutButton = observer(function () {
            var _a = _this.controller, checkOut = _a.checkOut, cart = _a.cart;
            //let { count, amount } = cart.sum;
            var amount = cart.amount.get();
            var check = "去结算";
            var content = amount > 0 ?
                React.createElement(React.Fragment, null,
                    check,
                    " (",
                    amount,
                    " \u5143)") :
                React.createElement(React.Fragment, null, check);
            return React.createElement("button", { className: "btn btn-success w-100", type: "button", onClick: checkOut, disabled: amount <= 0 }, content);
        });
        _this.productRow = function (item) {
            var product = item.product;
            return React.createElement("div", { className: "pr-1" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-sm-6" }, tv(product)),
                    React.createElement("div", { className: "col-sm-6" },
                        React.createElement(Field, { name: "packs" }))));
        };
        _this.packsRow = function (item) {
            var pack = item.pack, quantity = item.quantity, price = item.price;
            //let {name} = pack;
            //<div className="d-flex flex-grow-1">
            //</div>
            return React.createElement("div", { className: "d-flex align-items-center px-2" },
                React.createElement("div", { className: "flex-grow-1" }, tv(pack)),
                React.createElement("div", { className: "w-6c mr-4 text-right" },
                    React.createElement("span", { className: "text-danger h5" }, price),
                    "\u5143"),
                React.createElement(Field, { name: "quantity" }));
        };
        _this.uiSchema = {
            selectable: true,
            deletable: true,
            restorable: true,
            items: {
                list: {
                    widget: 'arr',
                    Templet: _this.productRow,
                    ArrContainer: function (label, content) { return content; },
                    RowContainer: function (content) { return React.createElement("div", { className: "py-3" }, content); },
                    //onStateChanged: this.controller.onRowStateChanged,
                    items: {
                        packs: {
                            widget: 'arr',
                            Templet: _this.packsRow,
                            selectable: false,
                            deletable: false,
                            ArrContainer: function (label, content) { return content; },
                            RowContainer: function (content) { return content; },
                            RowSeperator: React.createElement("div", { className: "border border-gray border-top my-3" }),
                            items: {
                                quantity: {
                                    widget: 'custom',
                                    className: 'text-center',
                                    WidgetClass: MinusPlusWidget,
                                    onChanged: _this.controller.onQuantityChanged
                                }
                            },
                        }
                    }
                }
            }
        };
        _this.cartForm = function () {
            var cart = _this.controller.cart;
            var cartData = cart.data;
            return React.createElement(Form, { className: "bg-white", schema: cartSchema, uiSchema: _this.uiSchema, formData: cartData });
        };
        _this.test = function () {
            var cart = _this.controller.cart;
            var row = cart.items[0];
            row.packs[0].quantity = row.packs[0].quantity + 1;
        };
        _this.testButton = function () { return React.createElement("button", { onClick: function () { return _this.test(); } }, "test"); };
        _this.page = observer(function (params) {
            var cart = _this.controller.cart;
            if (cart.count.get() === 0) {
                return React.createElement(Page, { header: "\u8D2D\u7269\u8F66" }, _this.empty());
            }
            return React.createElement(Page, { header: "\u8D2D\u7269\u8F66", footer: React.createElement(_this.CheckOutButton, null) },
                React.createElement(_this.cartForm, null));
        });
        _this.tab = observer(function () {
            var cart = _this.controller.cart;
            var header = React.createElement("header", { className: "py-2 text-center bg-info text-white" },
                React.createElement(FA, { className: "align-middle", name: "shopping-cart", size: "2x" }),
                " \u00A0 ",
                React.createElement("span", { className: "h5 align-middle" }, "\u8D2D\u7269\u8F66"));
            if (cart.count.get() === 0) {
                return React.createElement(React.Fragment, null,
                    header,
                    _this.empty());
            }
            return React.createElement("div", { className: "bg-white" },
                header,
                React.createElement(_this.cartForm, null),
                React.createElement("footer", { className: "m-3" },
                    React.createElement(_this.CheckOutButton, null)));
        });
        return _this;
    }
    VCart.prototype.showEntry = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    VCart.prototype.render = function (params) {
        return React.createElement(this.tab, null);
    };
    VCart.prototype.empty = function () {
        return React.createElement("div", { className: "py-5 text-center bg-white" }, "\u4F60\u7684\u8D2D\u7269\u8F66\u7A7A\u7A7A\u5982\u4E5F");
    };
    return VCart;
}(VPage));
export { VCart };
//# sourceMappingURL=VCart.js.map