import * as tslib_1 from "tslib";
import * as React from 'react';
import { Widget } from './widget';
var TextAreaWidget = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaWidget, _super);
    function TextAreaWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInputChange = function (evt) {
            _this.setValue(evt.currentTarget.value);
        };
        return _this;
    }
    TextAreaWidget.prototype.setElementValue = function (value) { this.input.value = value; };
    TextAreaWidget.prototype.setReadOnly = function (value) { this.input.readOnly = this.readOnly = value; };
    TextAreaWidget.prototype.setDisabled = function (value) { this.input.disabled = this.disabled = value; };
    TextAreaWidget.prototype.render = function () {
        var _this = this;
        return React.createElement("textarea", { ref: function (input) { return _this.input = input; }, rows: this.ui && this.ui.rows, maxLength: this.itemSchema.maxLength, defaultValue: this.defaultValue, onChange: this.onInputChange });
    };
    return TextAreaWidget;
}(Widget));
export { TextAreaWidget };
//# sourceMappingURL=textareaWidget.js.map