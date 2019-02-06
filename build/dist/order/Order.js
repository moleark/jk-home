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
    Order.prototype.getDataForSave = function () {
        var orderItems = [];
        this.orderItems.forEach(function (oi) {
            oi.packs.forEach(function (pk) {
                orderItems.push({
                    product: oi.product, pack: pk.pack, price: pk.price, quantity: pk.quantity,
                    subAmount: pk.quantity * pk.price
                });
            });
        });
        return {
            webUser: this.webUser,
            organization: this.organization,
            customer: this.customer,
            shippingContact: this.shippingContact,
            invoiceContact: this.invoiceContact,
            amount: this.amount,
            currency: this.currency,
            orderItems: orderItems,
        };
    };
    tslib_1.__decorate([
        observable
    ], Order.prototype, "shippingContact", void 0);
    tslib_1.__decorate([
        observable
    ], Order.prototype, "invoiceContact", void 0);
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
            return this.packs.reduce(function (p, c) {
                return p + c.price * c.quantity;
            }, 0);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        observable
    ], OrderItem.prototype, "packs", void 0);
    tslib_1.__decorate([
        computed
    ], OrderItem.prototype, "subAmount", null);
    return OrderItem;
}());
export { OrderItem };
//# sourceMappingURL=Order.js.map