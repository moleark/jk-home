import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { ContactType } from 'order/COrder';
var VAddressList = /** @class */ (function (_super) {
    tslib_1.__extends(VAddressList, _super);
    function VAddressList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onContactRender = function (userContact) {
            var contact = userContact.contact;
            var _a = _this.controller, onContactEdit = _a.onContactEdit, onContactSelected = _a.onContactSelected;
            var right = React.createElement("div", { className: "p-2 cursor-pointer text-info", onClick: function () { return onContactEdit(userContact); } },
                React.createElement(FA, { name: "edit" }));
            return React.createElement(LMR, { right: right, className: "px-3 py-2" },
                React.createElement("div", { onClick: function () { return onContactSelected(contact); } }, tv(contact)));
        };
        _this.page = function () {
            var _a = _this.controller, contactType = _a.contactType, onContactEdit = _a.onContactEdit, userContacts = _a.userContacts;
            var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: function () { return onContactEdit(); } }, "\u6DFB\u52A0\u65B0\u5730\u5740");
            var contactList = React.createElement(List, { items: userContacts, item: { render: _this.onContactRender }, none: "\u4F60\u8FD8\u6CA1\u6709\u8BBE\u7F6E\u6536\u8D27\u5730\u5740\uFF0C\u8BF7\u6DFB\u52A0\u65B0\u5730\u5740" });
            if (contactType === ContactType.InvoiceContact)
                contactList = React.createElement(List, { items: userContacts, item: { render: _this.onContactRender }, none: "\u4F60\u8FD8\u6CA1\u6709\u8BBE\u7F6E\u53D1\u7968\u5730\u5740\uFF0C\u8BF7\u6DFB\u52A0\u65B0\u5730\u5740" });
            return React.createElement(Page, { footer: footer, header: "\u7BA1\u7406\u5730\u5740" }, contactList);
        };
        return _this;
    }
    VAddressList.prototype.open = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VAddressList;
}(VPage));
export { VAddressList };
//# sourceMappingURL=VAddressList.js.map