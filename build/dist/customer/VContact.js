import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form } from 'tonva-tools';
var schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'name', type: 'string', required: true },
    { name: 'organizationName', type: 'string', required: true },
    { name: 'mobile', type: 'string', required: true },
    { name: 'telephone', type: 'string', required: false },
    { name: 'email', type: 'string', required: false },
    { name: 'address', type: 'id', required: false },
    { name: 'addressString', type: 'string', required: true },
    { name: 'isDefault', type: 'boolean', required: false },
    { name: 'submit', type: 'submit' },
];
var uiSchema = {
    items: {
        id: { visible: false },
        name: { widget: 'text', label: '姓名' },
        organizationName: { widget: 'text', label: '单位名称' },
        mobile: { widget: 'text', label: '手机号' },
        telephone: { widget: 'text', label: '电话' },
        email: {
            widget: 'email', label: 'email',
            rules: function (value) {
                if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))
                    return "email格式不正确。";
                else
                    return undefined;
            }
        },
        address: { widget: 'id', label: 'address' },
        addressString: {
            widget: 'text', label: '详细地址',
            rules: function (value) { if (value && value.length < 8)
                return "详细地址不能小于8个字符。";
            else
                return undefined; }
        },
        isDefault: { widget: 'checkbox', label: '作为默认地址' },
        submit: { widget: 'button', label: '提交' },
    }
};
var VContact = /** @class */ (function (_super) {
    tslib_1.__extends(VContact, _super);
    function VContact() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contactData = {};
        _this.saveContact = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        _this.onFormButtonClick = function (name, context) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.saveContact(context.form.data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = function () {
            var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: _this.saveContact }, "\u4FDD\u5B58\u5E76\u4F7F\u7528");
            return React.createElement(Page, { header: "\u6DFB\u52A0\u6536\u8D27\u4EBA", footer: footer },
                React.createElement("div", { className: "App-container container text-left" },
                    React.createElement(Form, { schema: schema, uiSchema: uiSchema, formData: _this.contactData, onButtonClick: _this.onFormButtonClick, fieldLabelSize: 3, className: "my-3" })));
        };
        return _this;
    }
    VContact.prototype.showEntry = function (userContactData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contact;
            return tslib_1.__generator(this, function (_a) {
                contact = userContactData.contact;
                if (contact !== undefined) {
                    this.contactData = {
                        id: contact.id,
                        name: contact.name,
                        organizationName: contact.organizationName,
                        mobile: contact.mobile,
                        telephone: contact.telephone,
                        email: contact.email,
                        addressString: contact.addressString,
                        isDefault: contact.isDefault,
                    };
                }
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VContact;
}(VPage));
export { VContact };
//# sourceMappingURL=VContact.js.map