import * as tslib_1 from "tslib";
import * as React from 'react';
import { observable, computed } from 'mobx';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import { Page } from '../page';
import { nav } from '../nav';
import { inputFactory } from './inputSchema';
var FormSchema = /** @class */ (function () {
    function FormSchema(formFields, values) {
        this.errors = [];
        var fields = formFields.fields, onSumit = formFields.onSumit, fieldTag = formFields.fieldTag, submitText = formFields.submitText, resetButton = formFields.resetButton, clearButton = formFields.clearButton;
        this.initValues = values;
        this.fieldTag = fieldTag || 'div';
        this.submitText = submitText || '提交';
        if (resetButton === true)
            this.resetButton = '重来';
        else
            this.resetButton = resetButton;
        if (clearButton === true)
            this.clearButton = '清除';
        else
            this.clearButton = clearButton;
        this.submit = onSumit;
        this._inputs = {};
        this.inputs = [];
        this.hasLabel = false;
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            var name_1 = field.name;
            /*
            if (values !== undefined) {
                let v = values[name];
                if (v !== undefined) field.defaultValue = v;
            }*/
            if (field.label !== undefined)
                this.hasLabel = true;
            var v = this._inputs[field.name] = inputFactory(this, field);
            this.inputs.push(v);
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onNext = this.onNext.bind(this);
    }
    FormSchema.prototype.clear = function () {
        this.inputs.forEach(function (v) { return v.clear(); });
        this.errors.splice(0, this.errors.length);
    };
    FormSchema.prototype.reset = function () {
        this.inputs.forEach(function (v) { return v.reset(); });
        this.errors.splice(0, this.errors.length);
    };
    FormSchema.prototype.values = function () {
        var ret = {};
        for (var _i = 0, _a = this.inputs; _i < _a.length; _i++) {
            var vi = _a[_i];
            var v = vi.value;
            if (v === '')
                v = undefined;
            ret[vi.field.name] = v;
        }
        return ret;
    };
    Object.defineProperty(FormSchema.prototype, "hasError", {
        get: function () {
            return this.inputs.some(function (vi) { return vi.err !== undefined; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormSchema.prototype, "notFilled", {
        get: function () {
            var ret = this.inputs.every(function (vi) { return !vi.filled; });
            console.log('not filled %s', ret);
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    FormSchema.prototype.$ = function (name) { return this._inputs[name]; };
    FormSchema.prototype.removeInput = function (name) {
        var input = this._inputs[name];
        if (input !== undefined) {
            var index = this.inputs.findIndex(function (v) { return v === input; });
            if (index >= 0)
                this.inputs.splice(index, 1);
        }
    };
    FormSchema.prototype.setInputError = function (name, err) {
        var input = this._inputs[name];
        if (input === undefined)
            return;
        input.err = err;
    };
    FormSchema.prototype.onReset = function () {
        this.reset();
    };
    FormSchema.prototype.onClear = function () {
        this.clear();
    };
    FormSchema.prototype.onSubmit = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, input, blur_1, ret;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        event.preventDefault();
                        if (this.submit === undefined) {
                            alert('no submit funciton defined');
                            return [2 /*return*/];
                        }
                        for (_i = 0, _a = this.inputs; _i < _a.length; _i++) {
                            input = _a[_i];
                            blur_1 = input.props.onBlur;
                            if (blur_1 === undefined)
                                continue;
                            blur_1();
                        }
                        return [4 /*yield*/, this.submit(this.values())];
                    case 1:
                        ret = _b.sent();
                        if (ret === undefined)
                            return [2 /*return*/];
                        //if (ret === undefined) {
                        //    alert('no submit return');
                        //    return;
                        //}
                        if (ret.success === true) {
                            if (this.onSuccess !== undefined) {
                                this.onSuccess(ret.result);
                                return [2 /*return*/];
                            }
                        }
                        else {
                            if (this.onError !== undefined) {
                                this.onError(ret.result);
                                return [2 /*return*/];
                            }
                        }
                        nav.push(React.createElement(ResultPage, { return: ret, onFinish: this.onFinish, onNext: this.onNext }));
                        return [2 /*return*/];
                }
            });
        });
    };
    FormSchema.prototype.onFinish = function () {
        nav.pop();
    };
    FormSchema.prototype.onNext = function () {
        this.clear();
    };
    FormSchema.prototype.fieldContainerClassNames = function () {
        return classNames(this.hasLabel ? 'col-sm-10' : 'col-sm-12');
    };
    FormSchema.prototype.setInputValues = function () {
        if (this.initValues === undefined)
            return;
        for (var i in this._inputs) {
            var v = this.initValues[i];
            if (v !== undefined)
                this._inputs[i].setInitValue(v);
        }
    };
    FormSchema.prototype.renderInput = function (vInput) {
        switch (vInput.field.type) {
            default: return this.renderString(vInput);
            case 'checkbox': return this.renderCheckBox(vInput);
            case 'text': return this.renderTextArea(vInput);
        }
    };
    FormSchema.prototype.renderString = function (vInput) {
        var err = vInput.err;
        var cn = classNames('form-control', 'has-success', err ? 'is-invalid' : 'is-valid');
        return React.createElement("input", tslib_1.__assign({ className: cn }, vInput.props));
    };
    FormSchema.prototype.renderTextArea = function (vInput) {
        var err = vInput.err;
        var _a = vInput.props, value = _a.value, inputtag = _a.inputtag, attributes = tslib_1.__rest(_a, ["value", "inputtag"]);
        var cn = classNames('form-control', 'has-success', err ? 'is-invalid' : 'is-valid');
        return React.createElement("textarea", tslib_1.__assign({ className: cn }, attributes), vInput.value);
    };
    FormSchema.prototype.renderCheckBox = function (vInput) {
        var props = vInput.props, field = vInput.field, value = vInput.value;
        return React.createElement("label", { className: 'form-check-label h-100 align-items-center d-flex bg-light' },
            React.createElement("input", { type: 'checkbox', className: 'form-check-input position-static ml-0', name: field.name, checked: vInput.value === 1, onChange: props.onChange, ref: props.ref }));
    };
    FormSchema.prototype.renderLabel = function (vInput) {
        if (this.hasLabel === false)
            return null;
        return React.createElement("label", { className: 'col-sm-2 col-form-label' }, vInput !== undefined ? vInput.label : null);
    };
    FormSchema.prototype.renderErr = function (vInput) {
        return React.createElement("div", { className: "invalid-feedback" }, vInput.err);
    };
    FormSchema.prototype.renderField = function (vInput) {
        return React.createElement("div", { className: 'form-group row', key: vInput.id },
            this.renderLabel(vInput),
            React.createElement("div", { className: this.fieldContainerClassNames() },
                this.renderInput(vInput),
                vInput.err && this.renderErr(vInput)));
    };
    FormSchema.prototype.renderSeperator = function (vInput) {
        return null;
        //return <hr key={_.uniqueId()} style={{margin:'20px 0px'}} />;
    };
    FormSchema.prototype.renderSumit = function () {
        var cn = classNames('btn', 'btn-primary', this.hasLabel ? undefined : 'btn-block');
        return React.createElement("button", { className: cn, key: _.uniqueId(), type: 'submit', disabled: this.notFilled || this.hasError }, this.submitText);
    };
    FormSchema.prototype.renderReset = function () {
        return React.createElement("button", { className: 'btn btn-secondary"', key: _.uniqueId(), type: 'button', onClick: this.onReset }, this.resetButton);
    };
    FormSchema.prototype.renderClear = function () {
        return React.createElement("button", { className: 'btn btn-secondary"', key: _.uniqueId(), type: 'button', onClick: this.onClear }, this.clearButton);
    };
    FormSchema.prototype.renderFormErrors = function () {
        if (this.errors.length === 0)
            return null;
        return React.createElement("div", { className: 'form-group row' },
            React.createElement("div", { className: this.fieldContainerClassNames() },
                this.renderLabel(undefined),
                this.errors.map(function (e) { return React.createElement("div", { className: 'invalid-feedback', style: { display: 'block' } }, e); })));
    };
    FormSchema.prototype.renderButtons = function () {
        if (this.hasLabel === true) {
            return React.createElement("div", { className: 'form-group row', key: _.uniqueId() },
                this.renderLabel(undefined),
                React.createElement("div", { className: this.fieldContainerClassNames() },
                    React.createElement("div", { className: "row container" },
                        React.createElement("div", { className: "col-auto mr-auto" }, this.renderSumit()),
                        React.createElement("div", { className: "col-auto" }, this.clearButton && this.renderClear()),
                        React.createElement("div", { className: "col-auto" }, this.resetButton && this.renderReset()))));
        }
        return React.createElement("div", { className: 'form-group row', key: _.uniqueId() },
            React.createElement("div", { className: this.fieldContainerClassNames() }, this.renderSumit()),
            this.clearButton ? React.createElement("div", { className: "col-auto" }, "this.renderClear()") : null,
            this.resetButton ? React.createElement("div", { className: "col-auto" }, "this.renderReset()") : null);
    };
    tslib_1.__decorate([
        observable
    ], FormSchema.prototype, "errors", void 0);
    tslib_1.__decorate([
        computed
    ], FormSchema.prototype, "hasError", null);
    tslib_1.__decorate([
        computed
    ], FormSchema.prototype, "notFilled", null);
    return FormSchema;
}());
export { FormSchema };
var ResultPage = /** @class */ (function (_super) {
    tslib_1.__extends(ResultPage, _super);
    function ResultPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultPage.prototype.render = function () {
        var _a = this.props, ret = _a.return, onNext = _a.onNext, onFinish = _a.onFinish;
        var success = ret.success, message = ret.message, result = ret.result;
        if (message === undefined) {
            message = success === true ? '提交成功' : '提交发生错误';
        }
        return React.createElement(Page, { back: "close" },
            React.createElement("div", { className: 'jumbotron' },
                React.createElement("div", { className: 'lead' }, message),
                React.createElement("p", null, JSON.stringify(result)),
                React.createElement("hr", { className: "my-4" }),
                React.createElement("div", { className: 'lead' },
                    React.createElement("button", { className: 'btn btn-primary mr-2', type: 'button', onClick: function () { nav.pop(); onFinish(); } }, "\u5B8C\u6210"),
                    React.createElement("button", { className: 'btn btn-default mr-2', type: 'button', onClick: function () { nav.pop(); onNext(); } }, "\u7EE7\u7EED"))));
    };
    return ResultPage;
}(React.Component));
//# sourceMappingURL=formSchema.js.map