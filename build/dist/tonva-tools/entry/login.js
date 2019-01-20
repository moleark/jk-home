import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav, Page, Form, resLang } from '../ui';
import RegisterView from './register';
import Forget from './forget';
import userApi from './userApi';
import { loginRes } from './res';
var logo = require('../img/logo.svg');
var schema = [
    { name: 'username', type: 'string', required: true, maxLength: 100 },
    { name: 'password', type: 'string', required: true, maxLength: 100 },
    { name: 'login', type: 'submit' },
];
var Login = /** @class */ (function (_super) {
    tslib_1.__extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.res = resLang(loginRes);
        _this.uiSchema = {
            items: {
                username: { placeholder: '用户名', label: '用户' },
                password: { widget: 'password', placeholder: '密码', label: '密码' },
                login: { widget: 'button', className: 'btn btn-primary btn-block mt-3', label: '登录' },
            }
        };
        /*
        private schema:FormSchema = new FormSchema({
            fields: [
                {
                    type: 'string',
                    name: 'username',
                    placeholder: '用户名',
                    rules: ['required', 'maxlength:100']
                },
                {
                    type: 'password',
                    name: 'password',
                    placeholder: '密码',
                    rules: ['required', 'maxlength:100']
                },
            ],
            onSumit: this.onLoginSubmit.bind(this),
        });
        */
        _this.onSubmit = function (name, context) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values, un, pwd, user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = context.form.data;
                        un = values['username'];
                        pwd = values['password'];
                        if (pwd === undefined) {
                            return [2 /*return*/, 'something wrong, pwd is undefined'];
                        }
                        return [4 /*yield*/, userApi.login({
                                user: un,
                                pwd: pwd,
                                guest: nav.guest,
                            })];
                    case 1:
                        user = _a.sent();
                        if (user === undefined)
                            return [2 /*return*/, '用户名或密码错！'];
                        console.log("onLoginSubmit: user=%s pwd:%s", user.name, user.token);
                        return [4 /*yield*/, nav.logined(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    Login.prototype.click = function () {
        nav.replace(React.createElement(RegisterView, null));
    };
    Login.prototype.render = function () {
        var footer = React.createElement("div", { className: 'text-center' },
            React.createElement("button", { className: "btn btn-link", color: "link", style: { margin: '0px auto' }, onClick: function () { return nav.push(React.createElement(RegisterView, null)); } }, "\u5982\u679C\u6CA1\u6709\u8D26\u53F7\uFF0C\u8BF7\u6CE8\u518C"));
        var header = false;
        var top = '同花';
        if (this.props.withBack === true) {
            header = '登录';
            top = '登录用户';
        }
        return React.createElement(Page, { header: header, footer: footer },
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
                        } }, top)),
                React.createElement("div", { style: { height: '20px' } }),
                React.createElement(Form, { schema: schema, uiSchema: this.uiSchema, onButtonClick: this.onSubmit, requiredFlag: false }),
                React.createElement("button", { className: "btn btn-link btn-block", onClick: function () { return nav.push(React.createElement(Forget, null)); } }, "\u5FD8\u8BB0\u5BC6\u7801")));
    };
    return Login;
}(React.Component));
export default Login;
//# sourceMappingURL=login.js.map