import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
var CheckBoxWidget = /** @class */ (function (_super) {
    tslib_1.__extends(CheckBoxWidget, _super);
    function CheckBoxWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInputChange = function (evt) {
            _this.setDataValue(evt.target.checked === true ? _this.trueValue : _this.falseValue);
        };
        _this.onClick = function () {
            _this.context.removeErrors();
        };
        return _this;
    }
    CheckBoxWidget.prototype.init = function () {
        _super.prototype.init.call(this);
        if (this.ui !== undefined) {
            var _a = this.ui, trueValue = _a.trueValue, falseValue = _a.falseValue;
            if (trueValue === undefined)
                this.trueValue = true;
            else
                this.trueValue = trueValue;
            if (falseValue === undefined)
                this.falseValue = false;
            else
                this.falseValue = falseValue;
        }
        else {
            this.trueValue = true;
            this.falseValue = false;
        }
    };
    CheckBoxWidget.prototype.setElementValue = function (value) {
        this.input.checked = value === this.trueValue;
    };
    CheckBoxWidget.prototype.setReadOnly = function (value) { this.input.readOnly = this.readOnly = value; };
    CheckBoxWidget.prototype.setDisabled = function (value) { this.input.disabled = this.disabled = value; };
    CheckBoxWidget.prototype.render = function () {
        var _this = this;
        var cn = classNames(this.className, 'form-check-inline');
        var input = React.createElement("input", { ref: function (input) { return _this.input = input; }, className: 'align-self-center', type: "checkbox", defaultChecked: this.defaultValue, onChange: this.onInputChange, onClick: this.onClick });
        return this.context.inNode ?
            React.createElement("label", { className: cn },
                input,
                " ",
                (this.ui && this.ui.label) || this.name)
            :
                React.createElement("div", { className: cn }, input);
    };
    return CheckBoxWidget;
}(Widget));
export { CheckBoxWidget };
//# sourceMappingURL=checkBoxWidget.js.map