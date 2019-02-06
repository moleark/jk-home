import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
var RangeWidget = /** @class */ (function (_super) {
    tslib_1.__extends(RangeWidget, _super);
    function RangeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'range';
        return _this;
    }
    RangeWidget.prototype.setReadOnly = function (value) { this.input.readOnly = this.readOnly = value; };
    RangeWidget.prototype.setDisabled = function (value) { this.input.disabled = this.disabled = value; };
    RangeWidget.prototype.render = function () {
        var _this = this;
        var _a = this.ui, min = _a.min, max = _a.max, step = _a.step;
        return React.createElement(React.Fragment, null,
            React.createElement("input", { ref: function (input) { return _this.input = input; }, className: classNames(this.className, 'form-control', 'w-min-6c'), type: this.inputType, defaultValue: this.defaultValue, onChange: this.onInputChange, max: max, min: min, step: step }));
    };
    return RangeWidget;
}(Widget));
export { RangeWidget };
//# sourceMappingURL=rangeWidget.js.map