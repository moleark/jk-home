import * as tslib_1 from "tslib";
import { TextWidget } from './textWidget';
var PasswordWidget = /** @class */ (function (_super) {
    tslib_1.__extends(PasswordWidget, _super);
    function PasswordWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'password';
        return _this;
    }
    return PasswordWidget;
}(TextWidget));
export { PasswordWidget };
var UrlWidget = /** @class */ (function (_super) {
    tslib_1.__extends(UrlWidget, _super);
    function UrlWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'url';
        return _this;
    }
    return UrlWidget;
}(TextWidget));
export { UrlWidget };
var EmailWidget = /** @class */ (function (_super) {
    tslib_1.__extends(EmailWidget, _super);
    function EmailWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'email';
        return _this;
    }
    return EmailWidget;
}(TextWidget));
export { EmailWidget };
//# sourceMappingURL=passwordWidget.js.map