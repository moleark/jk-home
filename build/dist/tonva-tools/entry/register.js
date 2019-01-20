import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav, Page, Form, resLang } from '../ui';
import LoginView from './login';
import userApi from './userApi';
import RegSuccess from './regSuccess';
import '../css/va-form.css';
import { registerRes } from './res';
var logo = require('../img/logo.svg');
var schema = [
    { name: 'user', type: 'string', required: true, maxLength: 100 },
    { name: 'pwd', type: 'string', required: true, maxLength: 100 },
    { name: 'rePwd', type: 'string', required: true, maxLength: 100 },
    { name: 'register', type: 'submit' },
];
var Register = /** @class */ (function (_super) {
    tslib_1.__extends(Register, _super);
    function Register() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.res = resLang(registerRes);
        _this.uiSchema = {
            items: {
                user: { placeholder: '用户名', label: '用户名' },
                pwd: { widget: 'password', placeholder: '密码', label: '密码' },
                rePwd: { widget: 'password', placeholder: '重复密码', label: '重复密码' },
                register: { widget: 'button', className: 'btn btn-primary btn-block mt-3', label: '注册新用户' },
            }
        };
        return _this;
    }
    /*
    private schema:FormSchema = new FormSchema({
        fields: [
            {
                type: 'string',
                name: 'user',
                placeholder: '用户名',
                rules: ['required', 'maxlength:100']
            },
            {
                type: 'password',
                name: 'pwd',
                placeholder: '密码',
                rules: ['required', 'maxlength:100']
            },
            {
                type: 'password',
                name: 'rePwd',
                placeholder: '重复密码',
                rules: ['required', 'maxlength:100']
            },
        ],
        submitText: '注册新用户',
        onSumit: this.onSubmit.bind(this),
    });
    */
    Register.prototype.onSubmit = function (name, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var values, user, pwd, rePwd, country, mobile, email, ret, msg;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = context.form.data;
                        user = values.user, pwd = values.pwd, rePwd = values.rePwd, country = values.country, mobile = values.mobile, email = values.email;
                        if (pwd !== rePwd) {
                            context.setValue('pwd', '');
                            context.setValue('rePwd', '');
                            return [2 /*return*/, '密码不对，请重新输入密码！'];
                            //this.schema.errors.push('密码不对，请重新输入密码！');
                            //this.schema.inputs['pwd'].clear();
                            //this.schema.inputs['rePwd'].clear();
                            //return undefined;
                        }
                        return [4 /*yield*/, userApi.register({
                                nick: undefined,
                                user: user,
                                pwd: pwd,
                                country: undefined,
                                mobile: undefined,
                                email: undefined,
                            })];
                    case 1:
                        ret = _a.sent();
                        switch (ret) {
                            default: throw 'unknown return';
                            case 0:
                                nav.clear();
                                nav.show(React.createElement(RegSuccess, { user: user, pwd: pwd }));
                                return [2 /*return*/];
                            case 1:
                                msg = '用户名 ' + user;
                                break;
                            case 2:
                                msg = '手机号 +' + country + ' ' + mobile;
                                break;
                            case 3:
                                msg = '电子邮件 ' + email;
                                break;
                        }
                        return [2 /*return*/, msg + ' 已经被注册过了'];
                }
            });
        });
    };
    Register.prototype.click = function () {
        nav.replace(React.createElement(LoginView, null));
        //nav.replace(<RegisterView />);
    };
    Register.prototype.render = function () {
        return React.createElement(Page, { header: '\u6CE8\u518C' },
            React.createElement("div", { style: {
                    maxWidth: '25em',
                    margin: '3em auto',
                    padding: '0 3em',
                } },
                React.createElement("div", { className: 'container', style: { display: 'flex', position: 'relative' } },
                    React.createElement("img", { className: 'App-logo', src: logo, style: { height: '60px', position: 'absolute' } }),
                    React.createElement("span", { style: { flex: 1,
                            fontSize: 'x-large',
                            alignSelf: 'center',
                            textAlign: 'center',
                            margin: '10px',
                        } }, "\u540C\u82B1")),
                React.createElement("div", { style: { height: '20px' } }),
                React.createElement(Form, { schema: schema, uiSchema: this.uiSchema, onButtonClick: this.onSubmit, requiredFlag: false })));
    };
    return Register;
}(React.Component));
export default Register;
// <ValidForm formSchema={this.schema}  />
//# sourceMappingURL=register.js.map