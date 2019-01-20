import * as tslib_1 from "tslib";
import * as React from 'react';
import { computed } from 'mobx';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { FA } from 'tonva-react-form';
import { ViewModel } from "../viewModel";
import { FormMode } from '../vForm';
import { RuleRequired, RuleInt, RuleNum, RuleMin, RuleMax } from '../rule';
var VField = /** @class */ (function (_super) {
    tslib_1.__extends(VField, _super);
    function VField(form, field, fieldUI, fieldRes) {
        var _this = _super.call(this) || this;
        _this.form = form;
        _this.field = field;
        _this.name = field.name;
        _this.fieldUI = fieldUI || {};
        _this.fieldRes = fieldRes || {};
        _this.init();
        return _this;
    }
    VField.prototype.init = function () {
        this.buildRules();
    };
    VField.prototype.buildRules = function () {
        this.rules = [];
        var required = this.fieldUI.required;
        if (required === true || this.field !== undefined && this.field.null === false) {
            this.rules.push(new RuleRequired);
        }
    };
    Object.defineProperty(VField.prototype, "checkRules", {
        get: function () {
            var defy = [];
            for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
                var r = _a[_i];
                r.check(defy, this.value);
            }
            return defy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VField.prototype, "isOk", {
        get: function () {
            if (this.rules.length === 0)
                return true;
            var defy = this.checkRules;
            return defy.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VField.prototype, "value", {
        get: function () { return this.form.values[this.name]; },
        enumerable: true,
        configurable: true
    });
    VField.prototype.setValue = function (v) {
        this.form.values[this.name] = v;
    };
    Object.defineProperty(VField.prototype, "error", {
        get: function () { return this.form.errors[this.name]; },
        set: function (err) { this.form.errors[this.name] = err; },
        enumerable: true,
        configurable: true
    });
    VField.prototype.parse = function (str) { return str; };
    Object.defineProperty(VField.prototype, "readonly", {
        get: function () {
            var mode = this.form.mode;
            return mode === FormMode.readonly ||
                mode === FormMode.edit && this.fieldUI.editable === false;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        computed
    ], VField.prototype, "checkRules", null);
    tslib_1.__decorate([
        computed
    ], VField.prototype, "isOk", null);
    tslib_1.__decorate([
        computed
    ], VField.prototype, "value", null);
    return VField;
}(ViewModel));
export { VField };
var VUnknownField = /** @class */ (function (_super) {
    tslib_1.__extends(VUnknownField, _super);
    function VUnknownField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = function () {
            //let {name, type} = this.fieldUI;
            var type = '', name = '';
            return React.createElement("input", { type: "text", className: "form-control form-control-plaintext border border-info rounded bg-light", placeholder: 'unkown control: ' + type + '-' + name });
        };
        return _this;
    }
    return VUnknownField;
}(VField));
export { VUnknownField };
var VInputControl = /** @class */ (function (_super) {
    tslib_1.__extends(VInputControl, _super);
    function VInputControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderError = function (className) {
            var errors = _this.form.errors;
            var error = errors[_this.name];
            if (error === undefined)
                return;
            return React.createElement("div", { className: className },
                React.createElement(FA, { name: "exclamation-circle" }),
                " ",
                error);
        };
        _this.ref = function (input) {
            _this.input = input;
            _this.setInputValue();
        };
        _this.onFocus = function () {
            _this.error = undefined;
        };
        _this.onBlur = function () {
            var defy = _this.checkRules;
            if (defy.length > 0) {
                _this.error = defy[0];
            }
            _this.form.computeFields();
        };
        _this.onChange = function (evt) {
            var v = _this.parse(evt.currentTarget.value);
            if (v === null) {
                return;
            }
            _this.setValue(v);
        };
        _this.view = observer(function () {
            var required = _this.fieldUI.required;
            var _a = _this.fieldRes, placeHolder = _a.placeHolder, suffix = _a.suffix;
            var ctrlCN = ['form-control', 'form-control-input'];
            var errCN = 'text-danger small mt-1 mx-2';
            var redDot;
            var input;
            if (_this.readonly === true) {
                input = React.createElement("input", { className: classNames(ctrlCN, 'bg-light'), ref: _this.ref, type: _this.inputType, readOnly: true });
            }
            else {
                input = React.createElement("input", { className: classNames(ctrlCN), ref: _this.ref, type: _this.inputType, onFocus: _this.onFocus, onBlur: _this.onBlur, onChange: _this.onChange, placeholder: placeHolder, readOnly: false, maxLength: _this.maxLength, onKeyPress: _this.onKeyPress });
                if (required === true || _this.field.null === false) {
                    redDot = React.createElement(RedMark, null);
                }
            }
            var inputGroup;
            if (suffix === undefined)
                inputGroup = input;
            else
                inputGroup = React.createElement("div", { className: "input-group" },
                    input,
                    React.createElement("div", { className: "input-group-append" },
                        React.createElement("span", { className: "input-group-text" }, suffix)));
            return React.createElement(React.Fragment, null,
                redDot,
                inputGroup,
                _this.renderError(errCN));
        });
        return _this;
    }
    Object.defineProperty(VInputControl.prototype, "maxLength", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    /*
    get value() {
        return super.value;
    }*/
    VInputControl.prototype.setValue = function (v) {
        _super.prototype.setValue.call(this, v);
        this.setInputValue();
    };
    VInputControl.prototype.setInputValue = function () {
        if (!this.input)
            return;
        var v = this.value;
        this.input.value = v === null || v === undefined ? '' : v;
    };
    return VInputControl;
}(VField));
export { VInputControl };
export var RedMark = function () { return React.createElement("b", { style: { color: 'red', position: 'absolute', left: '0.1em', top: '0.5em' } }, "*"); };
var VStringField = /** @class */ (function (_super) {
    tslib_1.__extends(VStringField, _super);
    function VStringField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'text';
        return _this;
    }
    Object.defineProperty(VStringField.prototype, "maxLength", {
        get: function () { return this.field.size; },
        enumerable: true,
        configurable: true
    });
    return VStringField;
}(VInputControl));
export { VStringField };
var KeyCode_Neg = 45;
var KeyCode_Dot = 46;
var VNumberControl = /** @class */ (function (_super) {
    tslib_1.__extends(VNumberControl, _super);
    function VNumberControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'number';
        _this.onKeyPress = function (event) {
            var ch = event.charCode;
            if (ch === 8 || ch === 0 || ch === 13 || ch >= 48 && ch <= 57)
                return;
            if (_this.extraChars !== undefined) {
                if (_this.extraChars.indexOf(ch) >= 0) {
                    switch (ch) {
                        case KeyCode_Dot:
                            _this.onKeyDot();
                            break;
                        case KeyCode_Neg:
                            _this.onKeyNeg();
                            event.preventDefault();
                            break;
                    }
                    return;
                }
            }
            event.preventDefault();
        };
        return _this;
    }
    VNumberControl.prototype.init = function () {
        _super.prototype.init.call(this);
        this.extraChars = [];
        if (this.fieldUI !== undefined) {
            var _a = this.fieldUI, min = _a.min, max = _a.max;
            if (min !== undefined) {
                //this.rules.push((v:number) => {if (v === undefined) return; if (v<min) return ErrMin + min; return true;});
                if (min < 0)
                    this.extraChars.push(KeyCode_Neg);
            }
            else {
                this.extraChars.push(KeyCode_Neg);
            }
            if (max !== undefined) {
                //this.rules.push((v:number) => {if (v === undefined) return; if (v>max) return ErrMax + max; return true});
            }
        }
        switch (this.field.type) {
            case 'dec':
            case 'bigint':
            case 'int':
            case 'smallint':
            case 'tinyint':
                this.extraChars.push(KeyCode_Dot);
                break;
        }
    };
    VNumberControl.prototype.buildRules = function () {
        _super.prototype.buildRules.call(this);
        this.rules.push(new RuleNum);
        var _a = this.fieldUI, min = _a.min, max = _a.max;
        if (min !== undefined)
            this.rules.push(new RuleMin(min));
        if (max !== undefined)
            this.rules.push(new RuleMax(max));
    };
    VNumberControl.prototype.parse = function (text) {
        try {
            if (text.trim().length === 0)
                return undefined;
            var ret = Number(text);
            return (ret === NaN) ? null : ret;
        }
        catch (_a) {
            return null;
        }
    };
    VNumberControl.prototype.setInputValue = function () {
        if (!this.input)
            return;
        var v = this.value;
        if (this.parse(this.input.value) == v)
            return;
        this.input.value = v === null || v === undefined ? '' : v;
    };
    VNumberControl.prototype.onKeyDot = function () {
        var v = this.input.value;
        var p = v.indexOf('.');
        if (p >= 0)
            this.input.value = v.replace('.', '');
    };
    VNumberControl.prototype.onKeyNeg = function () {
        var v = this.input.value;
        var p = v.indexOf('-');
        if (p >= 0)
            v = v.replace('-', '');
        else
            v = '-' + v;
        this.input.value = v;
    };
    return VNumberControl;
}(VInputControl));
export { VNumberControl };
var VIntField = /** @class */ (function (_super) {
    tslib_1.__extends(VIntField, _super);
    function VIntField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VIntField.prototype.buildRules = function () {
        _super.prototype.buildRules.call(this);
        this.rules.push(new RuleInt);
    };
    return VIntField;
}(VNumberControl));
export { VIntField };
var VDecField = /** @class */ (function (_super) {
    tslib_1.__extends(VDecField, _super);
    function VDecField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VDecField;
}(VNumberControl));
export { VDecField };
var VTextField = /** @class */ (function (_super) {
    tslib_1.__extends(VTextField, _super);
    function VTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VTextField;
}(VStringField));
export { VTextField };
var VDateTimeField = /** @class */ (function (_super) {
    tslib_1.__extends(VDateTimeField, _super);
    function VDateTimeField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VDateTimeField;
}(VStringField));
export { VDateTimeField };
//# sourceMappingURL=vField.js.map