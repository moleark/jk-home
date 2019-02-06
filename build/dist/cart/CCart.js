import * as tslib_1 from "tslib";
import * as React from 'react';
import { VCartLabel } from './VCartLabel';
import { VCart } from './VCart';
import { Controller } from 'tonva-tools';
var CCart = /** @class */ (function (_super) {
    tslib_1.__extends(CCart, _super);
    function CCart(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.renderCart = function () {
            return _this.renderView(VCart);
        };
        _this.onQuantityChanged = function (context, value, prev) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var data, parentData, product, _a, pack, price, quantity, currency;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = context.data, parentData = context.parentData;
                        product = parentData.product;
                        _a = data, pack = _a.pack, price = _a.price, quantity = _a.quantity, currency = _a.currency;
                        //let { retail, currency } = pack;
                        return [4 /*yield*/, this.cart.AddToCart(product, pack, value, price, currency)];
                    case 1:
                        //let { retail, currency } = pack;
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onRowStateChanged = function (context, selected, deleted) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                alert('onRowStateChanged');
                return [2 /*return*/];
            });
        }); };
        /**
         * 导航到CheckOut界面
         */
        _this.checkOut = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var selectCartItem, cOrder;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isLogined) return [3 /*break*/, 1];
                        return [3 /*break*/, 3];
                    case 1:
                        selectCartItem = this.cart.getSelectItem();
                        if (selectCartItem === undefined)
                            return [2 /*return*/];
                        cOrder = this.cApp.cOrder;
                        return [4 /*yield*/, cOrder.start(selectCartItem)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.tab = function () { return React.createElement(_this.renderCart, null); };
        _this.cApp = cApp;
        _this.cart = cApp.cart;
        return _this;
    }
    CCart.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.showVPage(VCart);
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * 显示购物车图标
     */
    CCart.prototype.renderCartLabel = function () {
        return this.renderView(VCartLabel);
    };
    return CCart;
}(Controller));
export { CCart };
//# sourceMappingURL=CCart.js.map