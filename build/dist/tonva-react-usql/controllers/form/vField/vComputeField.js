import * as tslib_1 from "tslib";
import React from 'react';
import { VField } from './vField';
import { observer } from 'mobx-react';
var VComputeField = /** @class */ (function (_super) {
    tslib_1.__extends(VComputeField, _super);
    function VComputeField(form, field, fieldRes) {
        var _this = _super.call(this, form, field, undefined, fieldRes) || this;
        _this.view = observer(function () {
            var value = _this.form.values[_this.field.name];
            var _a = _this.fieldRes, placeHolder = _a.placeHolder, suffix = _a.suffix;
            var ctrlCN = 'form-control form-control-input bg-light';
            if (value === null)
                value = '';
            var input = React.createElement("input", { className: ctrlCN, type: "text", placeholder: placeHolder, readOnly: true, value: value });
            var inputGroup;
            if (suffix === undefined)
                inputGroup = input;
            else
                inputGroup = React.createElement("div", { className: "input-group" },
                    input,
                    React.createElement("div", { className: "input-group-append" },
                        React.createElement("span", { className: "input-group-text" }, suffix)));
            return inputGroup;
            /*
                return <div
                className="form-control form-control-plaintext border border-info rounded bg-light cursor-pointer">
                {value} &nbsp;
            </div>;
            */
        });
        return _this;
    }
    return VComputeField;
}(VField));
export { VComputeField };
//# sourceMappingURL=vComputeField.js.map