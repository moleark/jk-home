import * as tslib_1 from "tslib";
var WebUser = /** @class */ (function () {
    function WebUser(cUqWebUser) {
        this.webUserCustomerMap = cUqWebUser.map('webUserCustomer');
        this.webUserContactMap = cUqWebUser.map('webUserContacts');
        this.webUserSettingMap = cUqWebUser.map('webUserSetting');
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
    WebUser.prototype.getContacts = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentCustomer !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentCustomer.getContacts()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, this.webUserContactMap.table({ webUser: this.id })];
                }
            });
        });
    };
    WebUser.prototype.addContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentCustomer !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentCustomer.addContact(contactId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.webUserContactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebUser.prototype.delContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentCustomer !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentCustomer.delContact(contactId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.webUserContactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebUser.prototype.getSetting = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.webUserSettingMap.obj({ webUser: this.id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WebUser.prototype.setDefaultShippingContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentCustomer !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentCustomer.setDefaultShippingContact(contactId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.webUserSettingMap.add({ webUser: this.id, shippingContact: contactId })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    async unsetDefaultShippingContact() {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.unsetDefaultShippingContact();
            return;
        }
        await this.webUserSettingMap.del?();
    }
    */
    WebUser.prototype.setDefaultInvoiceContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentCustomer !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentCustomer.setDefaultInvoiceContact(contactId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.webUserSettingMap.add({ webUser: this.id, arr1: [{ invoiceContact: contactId }] })];
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
    }
    ;
    Customer.prototype.getContacts = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contactMap.table({ customer: this.id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Customer.prototype.addContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contactMap.add({ webUser: this.id, arr1: [{ contact: contactId }] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Customer.prototype.delContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contactMap.del({ webUser: this.id, arr1: [{ contact: contactId }] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Customer.prototype.getSetting = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerSettingMap.obj({ customer: this.id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Customer.prototype.setDefaultShippingContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerSettingMap.add({ customer: this.id, arr1: [{ defaultShippingContact: contactId }] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Customer.prototype.setDefaultInvoiceContact = function (contactId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerSettingMap.add({ customer: this.id, arr1: [{ defaultInvoiceContact: contactId }] })];
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