import * as tslib_1 from "tslib";
import * as React from 'react';
import { productRow } from './CProduct';
import { VPage, Page, Form, Field } from 'tonva-tools';
import { LMR } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
var schema = [
    {
        name: 'list',
        type: 'arr',
        arr: [
            { name: 'pack', type: 'object' },
            { name: 'retail', type: 'number' },
            { name: 'vipPrice', type: 'number' },
            { name: 'currency', type: 'string' },
            { name: 'quantity', type: 'number' }
        ]
    }
];
var VProduct = /** @class */ (function (_super) {
    tslib_1.__extends(VProduct, _super);
    function VProduct() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onQuantityChanged = function (context, value, prev) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var data, pack, retail, currency, cApp, cart;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = context.data;
                        pack = data.pack, retail = data.retail, currency = data.currency;
                        cApp = this.controller.cApp;
                        cart = cApp.cart;
                        return [4 /*yield*/, cart.AddToCart(this.product.id, pack, value, retail, currency)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        //context:Context, name:string, value:number
        _this.arrTemplet = function (item) {
            //let a = context.getValue('');
            var pack = item.pack, retail = item.retail, vipPrice = item.vipPrice, inventoryAllocation = item.inventoryAllocation, futureDeliveryTimeDescription = item.futureDeliveryTimeDescription;
            var right, priceUI = React.createElement(React.Fragment, null);
            if (retail) {
                right = React.createElement("div", { className: "d-flex" },
                    React.createElement(Field, { name: "quantity" }));
                priceUI = React.createElement("div", null,
                    "retail:",
                    retail,
                    " vipPrice:",
                    vipPrice);
            }
            var deliveryTimeUI = React.createElement(React.Fragment, null);
            if (inventoryAllocation && inventoryAllocation.length > 0) {
                deliveryTimeUI = inventoryAllocation.map(function (v, index) {
                    return React.createElement("div", { key: index },
                        tv(v.warehouse, function (values) { return React.createElement(React.Fragment, null, values.name); }),
                        v.deliveryTimeDescription);
                });
            }
            else {
                deliveryTimeUI = React.createElement("div", null, futureDeliveryTimeDescription);
            }
            return React.createElement(LMR, { className: "mx-3", right: right },
                React.createElement("div", null, tv(pack)),
                priceUI,
                deliveryTimeUI);
        };
        _this.page = observer(function () {
            var cApp = _this.controller.cApp;
            var id = _this.product.id;
            var header = cApp.cHome.renderSearchHeader();
            var cartLabel = cApp.cCart.renderCartLabel();
            var listHeader = React.createElement(LMR, { className: "pt-3", right: "quantity  cart  favorite" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-2" }, "SKU"),
                    React.createElement("div", { className: "col-2" }, "price"),
                    React.createElement("div", { className: "col-2" }, "vip price")));
            return React.createElement(Page, { header: header, right: cartLabel },
                React.createElement("div", { className: "px-2 py-2 bg-white mb-1" }, tv(id, productRow)),
                React.createElement(Form, { schema: schema, uiSchema: _this.uiSchema, formData: _this.data }));
        });
        return _this;
    }
    //private packRows: PackRow[];
    VProduct.prototype.open = function (product) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.product = product;
                this.uiSchema = {
                    items: {
                        list: {
                            widget: 'arr',
                            Templet: this.arrTemplet,
                            items: {
                                quantity: {
                                    widget: 'custom',
                                    className: 'text-center',
                                    WidgetClass: MinusPlusWidget,
                                    onChanged: this.onQuantityChanged
                                }
                            },
                            ArrContainer: function (label, content) { return React.createElement("div", { className: "bg-white" }, content); },
                            Rowseperator: (React.createElement("div", { className: "border border-danger border-top" })),
                        },
                    }
                };
                //this.packRows = this.controller.buildPackRows();
                this.data = {
                    list: product.packRows,
                };
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VProduct;
}(VPage));
export { VProduct };
//# sourceMappingURL=VProduct.js.map