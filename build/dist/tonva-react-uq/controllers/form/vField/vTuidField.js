import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import { tv } from '../../../tools';
import { VField, RedMark } from "./vField";
var buttonStyle = {
    textAlign: 'left',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    overflow: 'hidden'
};
var VTuidField = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidField, _super);
    function VTuidField(vForm, field, fieldUI, fieldRes) {
        var _this = _super.call(this, vForm, field, fieldUI, fieldRes) || this;
        _this.onClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var id;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.readonly === true)) return [3 /*break*/, 2];
                        if (!this.value)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.tuid.showInfo(this.value.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!(this.input !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.input.select(this.vForm, this.field, this.vForm.getValues())];
                    case 3:
                        id = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        alert('call undefined');
                        id = 0;
                        _a.label = 5;
                    case 5:
                        this.setValue(this.tuid.boxId(id));
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = observer(function () {
            var placeHolder = _this.fieldRes.placeHolder;
            var disabled = false;
            var _ownerField = _this.field._ownerField;
            if (_ownerField !== undefined) {
                var name_1 = _ownerField.name, arr = _ownerField.arr;
                disabled = _this.vForm.getValue(name_1) === null;
            }
            var content;
            if (_this.value === null)
                content = React.createElement(React.Fragment, null, placeHolder || _this.input.placeHolder);
            else if (typeof _this.value === 'object') {
                content = tv(_this.value);
            }
            else {
                var idBox = _this.tuid.boxId(_this.value);
                content = tv(idBox); // idBox.content();
            }
            if (_this.readonly === true) {
                return React.createElement("div", { className: "form-control form-control-plaintext border border-info rounded bg-light cursor-pointer", onClick: _this.onClick }, content);
            }
            var redDot;
            var required = _this.fieldUI.required;
            if (required === true || _this.field.null === false) {
                redDot = React.createElement(RedMark, null);
            }
            return React.createElement(React.Fragment, null,
                redDot,
                React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", disabled: disabled, style: buttonStyle, onClick: _this.onClick }, content));
        });
        _this.tuid = field._tuid;
        _this.vForm = vForm;
        _this.input = vForm.inputs[field.name];
        return _this;
    }
    return VTuidField;
}(VField));
export { VTuidField };
//# sourceMappingURL=vTuidField.js.map