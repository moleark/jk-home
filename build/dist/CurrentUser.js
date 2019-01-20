import * as tslib_1 from "tslib";
var WebUser = /** @class */ (function () {
    function WebUser(cUsqWebUser) {
        this.webUserCustomerMap = cUsqWebUser.map('webUserCustomer');
        this.webUserShippingContactMap = cUsqWebUser.map('webUserConsigneeContact');
    }
    Object.defineProperty(WebUser.prototype, "user", {
        set: function (user) {
            var _this = this;
            if (user !== undefined) {
                this._user = user;
                this.id = user.id;
                this.name = user.name;
                this.nick = user.nick;
                this.icon = user.icon;
                this.guest = user.guest;
                this.token = user.token;
                if (this._user !== undefined) {
                    this.webUserCustomerMap.obj({ webUser: this.id })
                        .then(function (value) {
                        if (value != undefined)
                            _this.currentCustomer = new Customer(value.Customer);
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebUser.prototype, "isLogined", {
        get: function () {
            return this._user !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebUser.prototype, "hasCustomer", {
        get: function () {
            return this.currentCustomer !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    WebUser.prototype.getShippingContacts = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentCustomer !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentCustomer.getShippingContacts()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.webUserShippingContactMap.table({ webUser: this.id })];
                }
            });
        });
    };
    WebUser.prototype.addShippingContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentCustomer !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentCustomer.addShippingContact(contactId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.webUserShippingContactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebUser.prototype.delShippingContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentCustomer !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentCustomer.delShippingContact(contactId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.webUserShippingContactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WebUser;
}());
export { WebUser };
;
var Customer = /** @class */ (function () {
    function Customer(customer) {
        // let { cUsqCustomer } = cCartApp;
        // this.consigneeContactMap = cUsqCustomer.map('customerConsigneeContact');
    }
    ;
    Customer.prototype.getShippingContacts = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shippingContactMap.table({ customer: this.id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Customer.prototype.addShippingContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shippingContactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Customer.prototype.delShippingContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shippingContactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Customer;
}());
export { Customer };
//# sourceMappingURL=CurrentUser.js.map