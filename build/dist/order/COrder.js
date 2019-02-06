import * as tslib_1 from "tslib";
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { observable } from 'mobx';
import { Controller } from 'tonva-tools';
import { OrderSuccess } from './OrderSuccess';
export var ContactType;
(function (ContactType) {
    ContactType["ShippingContact"] = "ShippingContact";
    ContactType["InvoiceContact"] = "InvoiceContact";
})(ContactType || (ContactType = {}));
var COrder = /** @class */ (function (_super) {
    tslib_1.__extends(COrder, _super);
    function COrder(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.orderData = new Order();
        _this.createOrderFromCart = function (cartItem) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var defaultSetting, contactArr, contactArr;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.orderData.webUser = this.cApp.currentUser.id;
                        defaultSetting = undefined;
                        if (!(this.orderData.shippingContact === undefined)) return [3 /*break*/, 3];
                        defaultSetting = this.cApp.currentUser.getSetting();
                        if (!defaultSetting.defaultShippingContact) return [3 /*break*/, 1];
                        this.setContact(defaultSetting.defaultShippingContact, ContactType.ShippingContact);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.cApp.currentUser.getContacts()];
                    case 2:
                        contactArr = _a.sent();
                        if (contactArr && contactArr.length > 0) {
                            this.setContact(contactArr[0].contact, ContactType.ShippingContact);
                        }
                        _a.label = 3;
                    case 3:
                        if (!(this.orderData.invoiceContact === undefined)) return [3 /*break*/, 6];
                        if (defaultSetting === undefined) {
                            defaultSetting = this.cApp.currentUser.getSetting();
                        }
                        if (!defaultSetting.defaultInvoiceContact) return [3 /*break*/, 4];
                        this.setContact(defaultSetting.defaultInvoiceContact, ContactType.InvoiceContact);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.cApp.currentUser.getContacts()];
                    case 5:
                        contactArr = _a.sent();
                        if (contactArr && contactArr.length > 0) {
                            this.setContact(contactArr[0].contact, ContactType.InvoiceContact);
                        }
                        _a.label = 6;
                    case 6:
                        if (cartItem !== undefined && cartItem.length > 0) {
                            this.orderData.currency = cartItem[0].currency;
                            this.orderData.orderItems = cartItem.map(function (element, index) {
                                var item = new OrderItem();
                                item.product = element.product;
                                item.packs = element.packs.filter(function (v) { return v.quantity > 0; });
                                //item.price = element.price;
                                //item.quantity = element.quantity;
                                return item;
                            });
                            // 运费和运费减免
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.setContact = function (contactBox, contactType) {
            if (contactType === ContactType.ShippingContact)
                _this.orderData.shippingContact = contactBox;
            else
                _this.orderData.invoiceContact = contactBox;
        };
        _this.submitOrder = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.orderData.shippingContact) {
                            this.openContactList(ContactType.ShippingContact);
                            return [2 /*return*/];
                        }
                        if (!this.orderData.invoiceContact) {
                            this.openContactList(ContactType.InvoiceContact);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.orderSheet.save("order", this.orderData.getDataForSave())];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.orderSheet.action(result.id, result.flow, result.state, "submit")];
                    case 2:
                        _a.sent();
                        this.cApp.cart.clear(); //.removeFromCart(this.orderData.orderItems);
                        // 打开订单显示界面
                        this.closePage(1);
                        this.showVPage(OrderSuccess, result);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.openContactList = function (contactType) {
            _this.cApp.cUser.start(contactType);
        };
        _this.cApp = cApp;
        var cUqOrder = cApp.cUqOrder;
        _this.orderSheet = cUqOrder.sheet('order');
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