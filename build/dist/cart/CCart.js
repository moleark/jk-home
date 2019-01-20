import * as tslib_1 from "tslib";
import * as React from 'react';
import { VCartLabel } from './VCartLabel';
import { VCart } from './VCart';
import { Controller } from 'tonva-tools';
import { RemoteCart, LocalCart } from './Cart';
var CCart = /** @class */ (function (_super) {
    tslib_1.__extends(CCart, _super);
    function CCart(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.renderCart = function () {
            return _this.renderView(VCart);
        };
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
        var _a = _this.cApp, cUsqOrder = _a.cUsqOrder, cUsqProduct = _a.cUsqProduct, currentUser = _a.currentUser;
        if (currentUser.isLogined)
            _this.cart = new RemoteCart(cUsqProduct, cUsqOrder);
        else
            _this.cart = new LocalCart(cUsqProduct);
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
    CCart.prototype.onDispose = function () {
        this.cart.removeDeletedItem();
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