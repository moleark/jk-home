import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page, nav, Form } from 'tonva-tools';
import center from './center';
var schema = [
    { name: 'orgPassword', type: 'string', required: true },
    { name: 'newPassword', type: 'string', required: true },
    { name: 'newPassword1', type: 'string', required: true },
    { name: 'submit', type: 'submit' },
];
var uiSchema = {
    items: {
        orgPassword: {
            widget: 'password',
            label: '原密码',
            maxLength: 60,
            placeholder: '输入原来的密码'
        },
        newPassword: {
            widget: 'password',
            label: '新密码',
            maxLength: 60,
            placeholder: '输入新设的密码'
        },
        newPassword1: {
            widget: 'password',
            label: '确认密码',
            maxLength: 60,
            placeholder: '再次输入新设密码'
        },
        submit: {
            widget: 'button',
            className: 'btn btn-primary',
            label: '提交'
        }
    }
};
var ChangePasswordPage = /** @class */ (function (_super) {
    tslib_1.__extends(ChangePasswordPage, _super);
    function ChangePasswordPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSubmit = function (name, context) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values, orgPassword, newPassword, newPassword1, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = context.form.data;
                        orgPassword = values.orgPassword, newPassword = values.newPassword, newPassword1 = values.newPassword1;
                        if (newPassword !== newPassword1) {
                            context.setValue('newPassword', '');
                            context.setValue('newPassword1', '');
                            return [2 /*return*/, '新密码错误，请重新输入'];
                        }
                        return [4 /*yield*/, center.changePassword({ orgPassword: orgPassword, newPassword: newPassword })];
                    case 1:
                        ret = _a.sent();
                        if (ret === false) {
                            context.setValue('orgPassword', '');
                            return [2 /*return*/, '原密码错误'];
                        }
                        nav.replace(React.createElement(Page, { header: "\u4FEE\u6539\u5BC6\u7801", back: "close" },
                            React.createElement("div", { className: "m-3  text-success" }, "\u5BC6\u7801\u4FEE\u6539\u6210\u529F\uFF01")));
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ChangePasswordPage.prototype.render = function () {
        return React.createElement(Page, { header: "\u4FEE\u6539\u5BC6\u7801" },
            React.createElement(Form, { className: "m-3", schema: schema, uiSchema: uiSchema, requiredFlag: false, onButtonClick: this.onSubmit }));
    };
    return ChangePasswordPage;
}(React.Component));
export default ChangePasswordPage;
//# sourceMappingURL=changePassword.js.map