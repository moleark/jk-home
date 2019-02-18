import * as tslib_1 from "tslib";
import { VAddressList } from './VAddressList';
import { VContact } from './VContact';
import { Controller } from 'tonva-tools';
import { ContactType } from 'order/COrder';
var CUser = /** @class */ (function (_super) {
    tslib_1.__extends(CUser, _super);
    function CUser(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.userContacts = [];
        _this.userInvoiceContacts = [];
        /**
         * 打开地址新建或编辑界面
         */
        _this.onContactEdit = function (userContact) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var userContactData, _a, userSetting;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userContactData = {};
                        if (!(userContact !== undefined)) return [3 /*break*/, 3];
                        _a = userContactData;
                        return [4 /*yield*/, this.contactTuid.load(userContact.contact.id)];
                    case 1:
                        _a.contact = _b.sent();
                        return [4 /*yield*/, this.cApp.currentUser.getSetting()];
                    case 2:
                        userSetting = _b.sent();
                        if ((this.contactType === ContactType.ShippingContact
                            && userSetting.shippingContact && userSetting.shippingContact.id === userContact.contact.id) ||
                            (this.contactType === ContactType.InvoiceContact
                                && userSetting.invoiceContact && userSetting.invoiceContact.id === userContact.contact.id))
                            userContactData.contact.isDefault = true;
                        _b.label = 3;
                    case 3:
                        this.openVPage(VContact, userContactData);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.saveContact = function (contact) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var contactWithId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contactTuid.save(undefined, contact)];
                    case 1:
                        contactWithId = _a.sent();
                        return [4 /*yield*/, this.cApp.currentUser.addContact(contactWithId.id)];
                    case 2:
                        _a.sent();
                        if (!(contact.isDefault === true)) return [3 /*break*/, 6];
                        if (!(this.contactType === ContactType.ShippingContact)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cApp.currentUser.setDefaultShippingContact(contactWithId.id)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.cApp.currentUser.setDefaultInvoiceContact(contactWithId.id)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (contact.id !== undefined) {
                            this.cApp.currentUser.delContact(contact.id);
                        }
                        this.backPage();
                        this.onContactSelected(contactWithId);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onContactSelected = function (contact) {
            var cOrder = _this.cApp.cOrder;
            cOrder.setContact(contact, _this.contactType);
            _this.backPage();
        };
        _this.cApp = cApp;
        var cUqCustomer = cApp.cUqCustomer;
        _this.contactTuid = cUqCustomer.tuid('contact');
        return _this;
    }
    CUser.prototype.internalStart = function (contactType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.contactType = contactType;
                        _a = this;
                        return [4 /*yield*/, this.cApp.currentUser.getContacts()];
                    case 1:
                        _a.userContacts = _b.sent();
                        this.openVPage(VAddressList);
                        return [2 /*return*/];
                }
            });
        });
    };
    return CUser;
}(Controller));
export { CUser };
//# sourceMappingURL=CPerson.js.map