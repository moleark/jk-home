import * as tslib_1 from "tslib";
import { VAddressList } from './VAddressList';
import { VContact } from './VContact';
import { Controller } from 'tonva-tools';
var CUser = /** @class */ (function (_super) {
    tslib_1.__extends(CUser, _super);
    function CUser(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.userShippingContacts = [];
        /**
         * 打开地址新建或边界界面
         */
        _this.onContactEdit = function (userShippingContact) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var userContactData, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userContactData = {};
                        if (!(userShippingContact !== undefined)) return [3 /*break*/, 2];
                        _a = userContactData;
                        return [4 /*yield*/, this.contactTuid.load(userShippingContact.contact.id)];
                    case 1:
                        _a.shippingContact = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.showVPage(VContact, userContactData);
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
                        return [4 /*yield*/, this.cApp.currentUser.addShippingContact(contactWithId.id)];
                    case 2:
                        _a.sent();
                        if (contact.id !== undefined) {
                            this.cApp.currentUser.delShippingContact(contact.id);
                        }
                        this.backPage();
                        this.onContactSelected(contact);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onContactSelected = function (contact) {
            var cOrder = _this.cApp.cOrder;
            cOrder.setContact(contact);
            _this.backPage();
        };
        _this.cApp = cApp;
        var cUsqCustomer = cApp.cUsqCustomer;
        _this.contactTuid = cUsqCustomer.tuid('contact');
        return _this;
    }
    CUser.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.cApp.currentUser.getShippingContacts()];
                    case 1:
                        _a.userShippingContacts = _b.sent();
                        this.showVPage(VAddressList);
                        return [2 /*return*/];
                }
            });
        });
    };
    return CUser;
}(Controller));
export { CUser };
//# sourceMappingURL=CPerson.js.map