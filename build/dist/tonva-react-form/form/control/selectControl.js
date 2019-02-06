import * as tslib_1 from "tslib";
import * as React from 'react';
import { Control } from './control';
var SelectControl = /** @class */ (function (_super) {
    tslib_1.__extends(SelectControl, _super);
    function SelectControl(formView, field, face) {
        var _this = _super.call(this, formView, field, face) || this;
        _this.ref = _this.ref.bind(_this);
        return _this;
    }
    SelectControl.prototype.getValueFromElement = function () {
        var _a = this.element, selectedIndex = _a.selectedIndex, selectedOptions = _a.selectedOptions;
        var v = selectedOptions[0].value;
        switch (this.field.type) {
            case 'number':
                v = Number(v);
                break;
            case 'date':
                v = new Date(v);
                break;
            case 'bool':
                if (typeof v === 'string') {
                    v = (v.toLowerCase() === 'true');
                }
                break;
        }
        return v;
    };
    SelectControl.prototype.renderControl = function () {
        var list = this.face.list;
        var def = this.face.default;
        var options = [];
        if (def === undefined)
            options.push(React.createElement("option", { key: -1, value: undefined }, "\u8BF7\u9009\u62E9"));
        options.push.apply(options, list.map(function (item, index) {
            var t, v;
            if (typeof item !== 'object')
                t = v = item;
            else {
                t = item.text;
                v = item.value;
            }
            return React.createElement("option", { key: index, value: v }, t);
        }));
        return React.createElement("div", { className: "form-control-static" },
            React.createElement("select", { name: this.field.name, className: "form-control", ref: this.ref }, options));
    };
    return SelectControl;
}(Control));
export { SelectControl };
//# sourceMappingURL=selectControl.js.map