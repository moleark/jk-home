import * as tslib_1 from "tslib";
import * as React from 'react';
import { Control } from './control';
var RadioControl = /** @class */ (function (_super) {
    tslib_1.__extends(RadioControl, _super);
    function RadioControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioControl.prototype.renderControl = function () {
        var _this = this;
        return React.createElement("div", { className: "form-control-static" },
            React.createElement("div", { className: "form-control" }, this.face.list.map(function (item, index) {
                var t, v;
                if (typeof item !== 'object')
                    t = v = item;
                else {
                    t = item.text;
                    v = item.value;
                }
                return React.createElement("label", { key: index, className: "custom-control custom-radio w-25" },
                    React.createElement("input", { type: 'radio', name: _this.field.name, className: "custom-control-input" }),
                    React.createElement("span", { className: "custom-control-indicator" }),
                    React.createElement("span", { className: "custom-control-description" }, t));
            })));
    };
    return RadioControl;
}(Control));
export { RadioControl };
//# sourceMappingURL=radioControl.js.map