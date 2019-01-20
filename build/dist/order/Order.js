import * as tslib_1 from "tslib";
import { observable, computed } from 'mobx';
var Order = /** @class */ (function () {
    function Order() {
        this.orderItems = [];
    }
    Object.defineProperty(Order.prototype, "amount", {
        get: function () {
            return this.orderItems.reduce(function (pv, cv) { return pv + cv.subAmount; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    ;
    tslib_1.__decorate([
        observable
    ], Order.prototype, "shippingContact", void 0);
    tslib_1.__decorate([
        observable
    ], Order.prototype, "orderItems", void 0);
    tslib_1.__decorate([
        computed
    ], Order.prototype, "amount", null);
    return Order;
}());
export { Order };
var OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    Object.defineProperty(OrderItem.prototype, "subAmount", {
        get: function () {
            return this.price * this.quantity;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        observable
    ], OrderItem.prototype, "price", void 0);
    tslib_1.__decorate([
        observable
    ], OrderItem.prototype, "quantity", void 0);
    tslib_1.__decorate([
        computed
    ], OrderItem.prototype, "subAmount", null);
    return OrderItem;
}());
export { OrderItem };
//# sourceMappingURL=Order.js.map