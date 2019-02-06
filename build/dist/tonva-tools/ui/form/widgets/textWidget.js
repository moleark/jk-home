import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
var TextWidget = /** @class */ (function (_super) {
    tslib_1.__extends(TextWidget, _super);
    function TextWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'text';
        return _this;
    }
    TextWidget.prototype.setElementValue = function (value) {
        if (this.input === null)
            return;
        this.input.value = value;
    };
    Object.defineProperty(TextWidget.prototype, "placeholder", {
        get: function () { return (this.ui && this.ui.placeholder) || this.name; },
        enumerable: true,
        configurable: true
    });
    TextWidget.prototype.onBlur = function (evt) {
        this.onInputChange(evt);
        this.checkRules();
        this.context.checkContextRules();
    };
    TextWidget.prototype.onFocus = function (evt) {
        this.clearError();
        this.context.removeErrorWidget(this);
        this.context.removeErrors();
    };
    TextWidget.prototype.onChange = function (evt) {
    };
    TextWidget.prototype.setReadOnly = function (value) {
        if (this.input === null)
            return;
        this.input.readOnly = this.readOnly = value;
    };
    TextWidget.prototype.setDisabled = function (value) {
        if (this.input === null)
            return;
        this.input.disabled = this.disabled = value;
    };
    TextWidget.prototype.render = function () {
        var _this = this;
        var renderTemplet = this.renderTemplet();
        if (renderTemplet !== undefined)
            return renderTemplet;
        var cn = {
        //'form-control': true,
        };
        if (this.hasError === true) {
            cn['is-invalid'] = true;
        }
        else {
            cn['required-item'] = this.itemSchema.required === true;
        }
        return React.createElement(React.Fragment, null,
            React.createElement("input", { ref: function (input) { return _this.input = input; }, className: classNames(this.className, cn), type: this.inputType, defaultValue: this.value, onChange: function (evt) { return _this.onChange(evt); }, placeholder: this.placeholder, readOnly: this.readOnly, disabled: this.disabled, onKeyDown: this.onKeyDown, onFocus: function (evt) { return _this.onFocus(evt); }, onBlur: function (evt) { return _this.onBlur(evt); }, maxLength: this.itemSchema.maxLength }),
            this.renderErrors());
    };
    return TextWidget;
}(Widget));
export { TextWidget };
//# sourceMappingURL=textWidget.js.map