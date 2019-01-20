import * as tslib_1 from "tslib";
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { observable } from 'mobx';
import { Controller } from 'tonva-tools';
import { OrderSuccess } from './OrderSuccess';
var COrder = /** @class */ (function (_super) {
    tslib_1.__extends(COrder, _super);
    function COrder(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.orderData = new Order();
        _this.createOrderFromCart = function (cartItem) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var contactArr, contactWapper;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.orderData.webUser = this.cApp.currentUser.id;
                        if (!(this.orderData.shippingContact === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cApp.currentUser.getShippingContacts()];
                    case 1:
                        contactArr = _a.sent();
                        if (contactArr && contactArr.length > 0) {
                            contactWapper = contactArr.find(function (element) {
                                if (element.isDefault === true)
                                    return element;
                            });
                            if (!contactWapper)
                                contactWapper = contactArr[0];
                            this.setContact(contactWapper.contact);
                        }
                        _a.label = 2;
                    case 2:
                        if (cartItem !== undefined && cartItem.length > 0) {
                            this.orderData.currency = cartItem[0].currency;
                            this.orderData.orderItems = cartItem.map(function (element, index) {
                                var item = new OrderItem();
                                item.product = element.product,
                                    item.pack = element.pack;
                                item.price = element.price;
                                item.quantity = element.quantity;
                                return item;
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.setContact = function (contactBox) {
            _this.orderData.shippingContact = contactBox;
        };
        _this.submitOrder = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.orderData.shippingContact) {
                            this.openContactList();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.orderSheet.save("order", this.orderData)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.orderSheet.action(result.id, result.flow, result.state, "submit")];
                    case 2:
                        _a.sent();
                        this.cApp.cCart.cart.clear(); //.removeFromCart(this.orderData.orderItems);
                        // 打开订单显示界面
                        this.closePage(1);
                        this.showVPage(OrderSuccess, result);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.openContactList = function () {
            _this.cApp.cUser.start();
        };
        _this.cApp = cApp;
        var cUsqOrder = cApp.cUsqOrder;
        _this.orderSheet = cUsqOrder.sheet('order');
        return _this;
    }
    COrder.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cart;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cart = param;
                        return [4 /*yield*/, this.createOrderFromCart(cart)];
                    case 1:
                        _a.sent();
                        this.showVPage(VCreateOrder);
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], COrder.prototype, "orderData", void 0);
    return COrder;
}(Controller));
export { COrder };
//# sourceMappingURL=COrder.js.map