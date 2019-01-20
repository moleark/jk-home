import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form, Field } from 'tonva-tools';
import { LMR } from 'tonva-react-form';
import { tv } from 'tonva-react-usql';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from 'tools/minusPlusWidget';
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
        _this.inputRefs = {};
        _this.checkBoxs = {};
        _this.mapInputRef = function (input, item) {
            if (input === null)
                return;
            input.value = item.quantity;
            return _this.inputRefs[item.pack.id] = input;
        };
        _this.mapCheckBox = function (input, item) {
            if (input === null)
                return;
            input.checked = item.checked || false;
            return _this.checkBoxs[item.pack.id] = input;
        };
        _this.updateChecked = function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var input;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = this.checkBoxs[item.pack.id];
                        return [4 /*yield*/, this.controller.cart.updateChecked(item, input.checked)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         *
         */
        /*
        private updateQuantity = async (item: any) => {
    
            let input = this.inputRefs[item.pack.id];
            await this.controller.cart.updateQuantity(item, Number(input.value));
        }
    
        private minusQuantity = async (item: any) => {
    
            if (item.quantity > 1)
                await this.controller.cart.updateQuantity(item, item.quantity - 1);
        }
    
        private plusQuantity = async (item: any) => {
    
            await this.controller.cart.updateQuantity(item, item.quantity + 1);
        }
        */
        _this.renderProduct = function (product) { return React.createElement("strong", null, product.description); };
        _this.renderPack = function (pack) {
            return React.createElement(React.Fragment, null, (pack.radiox === 1 ? "" : pack.radiox + '*') + pack.radioy + pack.unit);
        };
        _this.renderItem = function (cartItem) {
            var product = cartItem.product, pack = cartItem.pack, price = cartItem.price, quantity = cartItem.quantity;
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
        /*
        private onCartItemRender = (cartItem: CartItem) => {
            let { isDeleted } = cartItem;
            let prod = <>
                {this.renderItem(cartItem)}
            </>;
            let input = <input
                className="text-center"
                style={{ width: "60px" }}
                ref={(input) => this.mapInputRef(input, cartItem)}
                type="number"
                onChange={() => this.updateQuantity(cartItem)} disabled={isDeleted} />;
            let onClick, btnContent;
            let mid;
            if (isDeleted === true) {
                mid = <del>{prod}</del>;
                onClick = () => cartItem.isDeleted = false;
                btnContent = <FA name="rotate-left" />;
            }
            else {
                mid = <div>
                    {prod}
                </div>
                onClick = () => cartItem.isDeleted = true;
                btnContent = <FA name="trash-o" />;
            }
            let button = <button className="btn btn-light" type="button" onClick={onClick}>{btnContent}</button>;
            return <LMR className="px-2 py-2"
                left={<input className="mr-3"
                    type="checkbox"
                    ref={(input) => this.mapCheckBox(input, cartItem)}
                    onChange={() => this.updateChecked(cartItem)} disabled={isDeleted} />}
                right={<>{button}</>}>
                {mid}
            </LMR>;
        }
        */
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
        _this.onQuantityChanged = function (context, value, prev) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var data, product, pack, retail, currency, cCart;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = context.data;
                        product = data.product, pack = data.pack;
                        retail = pack.retail, currency = pack.currency;
                        cCart = this.controller.cApp.cCart;
                        return [4 /*yield*/, cCart.cart.AddToCart(product, pack, value, retail, currency)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.productRow = function (item) {
            var product = item.product;
            //let {discription} = product;
            return React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm-6" }, tv(product)),
                React.createElement("div", { className: "col-sm-6" },
                    React.createElement(Field, { name: "packs" })));
        };
        _this.packsRow = function (item) {
            var pack = item.pack, quantity = item.quantity, price = item.price;
            //let {name} = pack;
            return React.createElement("div", { className: "d-flex align-items-center" },
                React.createElement("div", { className: "d-flex flex-grow-1" },
                    React.createElement("div", { className: "flex-grow-1" }, tv(pack)),
                    React.createElement("div", { className: "w-6c mr-4 text-right" },
                        React.createElement("span", { className: "text-danger h5" }, price),
                        "\u5143")),
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
                    RowContainer: function (content) { return React.createElement("div", { className: "p-3" }, content); },
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
                                    onChanged: _this.onQuantityChanged
                                }
                            }
                        }
                    }
                }
            }
        };
        _this.cartData = {
            list: [
                {
                    product: { discription: 'aaa' },
                    packs: [
                        {
                            pack: { name: '1g' },
                            quantity: 10,
                            price: 12.10,
                        },
                        {
                            pack: { name: '10g' },
                            quantity: 12,
                            price: 22.10,
                        }
                    ]
                },
                {
                    product: { discription: 'bbb' },
                    packs: [
                        {
                            pack: { name: '1g' },
                            quantity: 13,
                            price: 12.10,
                        },
                        {
                            pack: { name: '10g' },
                            quantity: 14,
                            price: 22.10,
                        }
                    ]
                }
            ]
        };
        _this.cartForm = function () {
            var cart = _this.controller.cart;
            var cartData = {
                list: cart.items,
            };
            return React.createElement(Form, { className: "bg-white", schema: cartSchema, uiSchema: _this.uiSchema, formData: cartData });
        };
        _this.page = function (params) {
            var cart = _this.controller.cart;
            if (cart.items.length === 0) {
                return React.createElement(Page, { header: "\u8D2D\u7269\u8F66" }, _this.empty());
            }
            return React.createElement(Page, { header: "\u8D2D\u7269\u8F66", footer: React.createElement(_this.CheckOutButton, null) },
                React.createElement(_this.cartForm, null));
        };
        _this.tab = observer(function () {
            var cart = _this.controller.cart;
            if (cart.items.length === 0) {
                return React.createElement(React.Fragment, null,
                    React.createElement("header", { className: "p-3 text-center" }, "\u8D2D\u7269\u8F66"),
                    _this.empty());
            }
            return React.createElement(React.Fragment, null,
                React.createElement("header", { className: "p-3 text-center" }, "\u8D2D\u7269\u8F66"),
                React.createElement(_this.cartForm, null),
                React.createElement("footer", null,
                    React.createElement(_this.CheckOutButton, null)));
            /*
                <div className="row">
                <div className="col-12">
                    <List items={cart.items} item={{ render: this.onCartItemRender }} />
                </div>
            </div>
            */
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