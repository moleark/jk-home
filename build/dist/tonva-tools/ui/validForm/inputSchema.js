import * as tslib_1 from "tslib";
import * as React from 'react';
import * as _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
var Err = /** @class */ (function (_super) {
    tslib_1.__extends(Err, _super);
    function Err() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Err.prototype.render = function () {
        return React.createElement("span", null, this.props.err);
    };
    Err = tslib_1.__decorate([
        observer
    ], Err);
    return Err;
}(React.Component));
export { Err };
var InputSchema = /** @class */ (function () {
    function InputSchema(formSchema, field) {
        var _this = this;
        this.field = _.clone(field);
        this.formSchema = formSchema;
        this.id = _.uniqueId();
        this.label = field.label;
        this.value = field.defaultValue;
        this.props = {
            name: field.name,
            placeholder: field.placeholder,
            onFocus: function () { _this.err = undefined; _this.formSchema.errors = []; },
            ref: this.ref.bind(this),
        };
        this.setProps();
        this.buildValidators();
    }
    InputSchema.prototype.parseValue = function (value) { return value; };
    InputSchema.prototype.ref = function (element) {
        this.element = element;
    };
    InputSchema.prototype.reset = function () {
        this.value = undefined;
        this.err = undefined;
    };
    InputSchema.prototype.clear = function () {
        this.value = undefined;
        this.err = undefined;
    };
    Object.defineProperty(InputSchema.prototype, "defaultValue", {
        get: function () { return this.field.defaultValue; },
        enumerable: true,
        configurable: true
    });
    InputSchema.prototype.setInitValue = function (value) { };
    Object.defineProperty(InputSchema.prototype, "filled", {
        get: function () {
            var ret = this.value !== undefined && this.value !== this.defaultValue;
            console.log('%s value=%s default=%s ret=%s', this.field.name, this.value, this.defaultValue, ret);
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    InputSchema.prototype.buildValidators = function () {
        var rules = this.field.rules;
        if (rules === undefined)
            return;
        this.validators = [];
        if (Array.isArray(rules)) {
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var rule = rules_1[_i];
                var validator = this.buildValidator(rule);
                if (validator !== undefined)
                    this.validators.push(validator);
            }
        }
        else {
            var validator = this.buildValidator(rules);
            if (validator !== undefined)
                this.validators.push(validator);
        }
    };
    InputSchema.prototype.buildValidator = function (rule) {
        if (typeof rule === 'function')
            return rule;
        var parts = rule.split(':');
        return this.stringValidator(parts[0], parts[1]);
    };
    InputSchema.prototype.stringValidator = function (rule, param) {
        switch (rule) {
            default: return undefined;
            case 'required': return this.required.bind(this);
        }
    };
    InputSchema.prototype.required = function (values) { return undefined; };
    tslib_1.__decorate([
        observable
    ], InputSchema.prototype, "err", void 0);
    tslib_1.__decorate([
        observable
    ], InputSchema.prototype, "value", void 0);
    return InputSchema;
}());
export { InputSchema };
var UnkownInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(UnkownInputSchema, _super);
    function UnkownInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnkownInputSchema.prototype.setProps = function () {
        this.props.type = 'text';
        this.props.disabled = true;
        this.props.placeholder = 'unknown type ' + this.field.type;
    };
    return UnkownInputSchema;
}(InputSchema));
var SingleInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(SingleInputSchema, _super);
    function SingleInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleInputSchema.prototype.setProps = function () {
        var _this = this;
        this.props.type = 'text';
        this.props.value = this.value;
        this.props.onBlur = function () {
            if (_this.validators !== undefined) {
                for (var _i = 0, _a = _this.validators; _i < _a.length; _i++) {
                    var v = _a[_i];
                    var ret = v();
                    if (ret !== undefined) {
                        _this.err = ret;
                        return;
                    }
                }
            }
            _this.value = _this.parseValue(_this.element.value);
        };
    };
    SingleInputSchema.prototype.setInitValue = function (value) {
        if (value === undefined)
            value = '';
        this.element.value = value;
        this.value = this.parseValue(value);
    };
    SingleInputSchema.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.element.value = this.field.defaultValue || '';
    };
    SingleInputSchema.prototype.required = function (values) {
        if (this.element === undefined)
            return undefined;
        var value = this.element.value;
        if (value === undefined)
            return;
        if (value.trim().length > 0)
            return undefined;
        return '不能为空';
    };
    return SingleInputSchema;
}(InputSchema));
var NumberInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(NumberInputSchema, _super);
    function NumberInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberInputSchema.prototype.setProps = function () {
        var _this = this;
        _super.prototype.setProps.call(this);
        this.props.type = 'number';
        this.props.onKeyPress = function (event) {
            var ch = event.charCode;
            if (ch === 8 || ch === 0 || ch === 13 || ch >= 48 && ch <= 57) {
                if (_this.extraChars === undefined)
                    return;
                if (_this.extraChars.indexOf(ch) >= 0)
                    return;
                return;
            }
            event.preventDefault();
        };
    };
    NumberInputSchema.prototype.stringValidator = function (rule, param) {
        switch (rule) {
            default: return _super.prototype.stringValidator.call(this, rule, param);
            case 'min':
                this._min = Number(param);
                if (this._min === NaN)
                    this._min = undefined;
                return this.min.bind(this);
            case 'max':
                this._max = Number(param);
                if (this._max === NaN)
                    this._max = undefined;
                return this.max.bind(this);
        }
    };
    NumberInputSchema.prototype.min = function (values) {
        if (this._min === undefined)
            return;
        var value = this.element.value;
        if (value === undefined)
            return;
        if (value.trim().length === 0)
            return;
        var val = Number(value);
        if (val === NaN)
            return;
        if (val < this._min)
            return '最小值为' + this._min;
        return undefined;
    };
    NumberInputSchema.prototype.max = function (values) {
        if (this._max === undefined)
            return;
        var value = this.element.value;
        if (value === undefined)
            return;
        if (value.trim().length === 0)
            return;
        var val = Number(value);
        if (val === NaN)
            return;
        if (val > this._max)
            return '最大值为' + this._max;
        return undefined;
    };
    return NumberInputSchema;
}(SingleInputSchema));
var IntInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(IntInputSchema, _super);
    function IntInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IntInputSchema;
}(NumberInputSchema));
var DecInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(DecInputSchema, _super);
    function DecInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DecInputSchema;
}(NumberInputSchema));
var FloatInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(FloatInputSchema, _super);
    function FloatInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FloatInputSchema;
}(NumberInputSchema));
var StringInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(StringInputSchema, _super);
    function StringInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringInputSchema.prototype.stringValidator = function (rule, param) {
        switch (rule) {
            default: return _super.prototype.stringValidator.call(this, rule, param);
            case 'maxlength':
                this.props.maxLength = param;
                return;
        }
    };
    return StringInputSchema;
}(SingleInputSchema));
var PasswordInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(PasswordInputSchema, _super);
    function PasswordInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordInputSchema.prototype.setProps = function () {
        _super.prototype.setProps.call(this);
        this.props.type = 'password';
    };
    return PasswordInputSchema;
}(StringInputSchema));
var TextInputSchema = /** @class */ (function (_super) {
    tslib_1.__extends(TextInputSchema, _super);
    function TextInputSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextInputSchema.prototype.setProps = function () {
        var _this = this;
        this.props.onBlur = function () {
            if (_this.validators !== undefined) {
                for (var _i = 0, _a = _this.validators; _i < _a.length; _i++) {
                    var v = _a[_i];
                    var ret = v();
                    if (ret !== undefined) {
                        _this.err = ret;
                        return;
                    }
                }
            }
            _this.value = _this.parseValue(_this.element.value);
        };
    };
    TextInputSchema.prototype.setInitValue = function (value) {
        if (value === undefined)
            value = '';
        this.element.value = value;
        this.value = this.parseValue(value);
    };
    return TextInputSchema;
}(InputSchema));
var CheckBoxSchema = /** @class */ (function (_super) {
    tslib_1.__extends(CheckBoxSchema, _super);
    function CheckBoxSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckBoxSchema.prototype.setProps = function () {
        var _this = this;
        this.props.type = 'checkbox';
        this.props.onChange = function (event) {
            _this.value = event.target.checked === true ? 1 : 0;
        };
    };
    Object.defineProperty(CheckBoxSchema.prototype, "defaultValue", {
        get: function () {
            var d = this.field.defaultValue;
            if (d !== undefined)
                return d;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    CheckBoxSchema.prototype.setInitValue = function (value) {
        this.element.checked = value !== 0 ? true : false;
        this.value = value;
    };
    return CheckBoxSchema;
}(InputSchema));
export function inputFactory(formSchema, field) {
    switch (field.type) {
        default: return new UnkownInputSchema(formSchema, field);
        case 'int': return new IntInputSchema(formSchema, field);
        case 'dec': return new DecInputSchema(formSchema, field);
        case 'float': return new FloatInputSchema(formSchema, field);
        case 'string': return new StringInputSchema(formSchema, field);
        case 'password': return new PasswordInputSchema(formSchema, field);
        case 'text': return new TextInputSchema(formSchema, field);
        case 'checkbox': return new CheckBoxSchema(formSchema, field);
    }
}
//# sourceMappingURL=inputSchema.js.map