import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { RuleRequired, RuleCustom } from '../rules';
import { computed, observable } from 'mobx';
var Widget = /** @class */ (function () {
    function Widget(context, itemSchema, fieldProps, children) {
        var _this = this;
        this.errors = [];
        this.contextErrors = [];
        this.onInputChange = function (evt) {
            _this.changeValue(evt.target.value, true);
            /*
            let prev = this.value;
            let onChanging: ChangingHandler;
            let onChanged: ChangedHandler;
            if (this.ui !== undefined) {
                onChanging = this.ui.onChanging;
                onChanged = this.ui.onChanged;
            }
            let allowChange = true;
            if (onChanging !== undefined) {
                this.isChanging = true;
                allowChange = onChanging(this.context, this.value, prev);
                this.isChanging = false;
            }
            if (allowChange === true) {
                this.setDataValue(evt.currentTarget.value);
                if (onChanged !== undefined) {
                    this.isChanging = true;
                    onChanged(this.context, this.value, prev);
                    this.isChanging = false;
                }
            }
            */
        };
        this.context = context;
        var name = itemSchema.name;
        this.name = name;
        this.itemSchema = itemSchema;
        this.fieldProps = fieldProps;
        this.children = children;
        this.ui = context.getUiItem(name);
        if (this.ui === undefined) {
            this.readOnly = false;
            this.disabled = false;
            this.visible = true;
        }
        else {
            var _a = this.ui, readOnly = _a.readOnly, disabled = _a.disabled, visible = _a.visible;
            this.readOnly = (readOnly === true);
            this.disabled = (disabled === true);
            this.visible = !(visible === false);
        }
        this.value = this.defaultValue = context.getValue(name); //defaultValue;
        this.init();
    }
    Object.defineProperty(Widget.prototype, "hasError", {
        get: function () { return (this.errors.length + this.contextErrors.length) > 0; },
        enumerable: true,
        configurable: true
    });
    Widget.prototype.init = function () {
        this.rules = [];
        if (this.itemSchema.required === true) {
            this.rules.push(new RuleRequired(this.context.form.res));
        }
        this.buildRules();
        if (this.ui === undefined)
            return;
        var rules = this.ui.rules;
        if (rules === undefined)
            return;
        if (Array.isArray(rules) === false) {
            this.rules.push(new RuleCustom(rules));
            return;
        }
        for (var _i = 0, _a = rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            this.rules.push(new RuleCustom(rule));
        }
    };
    Widget.prototype.buildRules = function () {
    };
    Widget.prototype.checkRules = function () {
        var _a;
        var defy = [];
        for (var _i = 0, _b = this.rules; _i < _b.length; _i++) {
            var r = _b[_i];
            r.check(defy, this.value);
        }
        if (defy.length === 0) {
            this.context.removeErrorWidget(this);
        }
        else {
            this.context.addErrorWidget(this);
            (_a = this.errors).push.apply(_a, defy);
        }
    };
    Object.defineProperty(Widget.prototype, "isOk", {
        get: function () {
            return this.errors.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Widget.prototype.setError = function (err) {
        var _a;
        if (err === undefined)
            return;
        if (typeof err === 'string')
            this.errors.push(err);
        else
            (_a = this.errors).push.apply(_a, err);
    };
    Widget.prototype.setContextError = function (err) {
        var _a;
        if (err === undefined)
            return;
        if (typeof err === 'string')
            this.contextErrors.push(err);
        else
            (_a = this.contextErrors).push.apply(_a, err);
    };
    Widget.prototype.clearError = function () {
        this.errors.splice(0);
    };
    Widget.prototype.clearContextError = function () {
        this.contextErrors.splice(0);
    };
    Widget.prototype.parse = function (value) { return value; };
    Widget.prototype.setElementValue = function (value) { };
    Widget.prototype.setDataValue = function (value) {
        if (this.isChanging === true)
            return;
        this.context.initData[this.name] = this.value = this.parse(value);
    };
    Widget.prototype.setValue = function (value) {
        if (this.isChanging === true)
            return;
        //this.setDataValue(value);
        //this.setElementValue(value);
        this.changeValue(value, false);
    };
    Widget.prototype.getValue = function () {
        return this.context.getValue(this.name);
    };
    Widget.prototype.getReadOnly = function () { return this.readOnly; };
    Widget.prototype.getDisabled = function () { return this.disabled; };
    Widget.prototype.getVisible = function () { return this.visible; };
    Widget.prototype.setReadOnly = function (value) { this.readOnly = value; };
    Widget.prototype.setDisabled = function (value) { this.disabled = value; };
    Widget.prototype.setVisible = function (value) { this.visible = value; };
    Widget.prototype.changeValue = function (newValue, fromElement) {
        var prev = this.value;
        var onChanging;
        var onChanged;
        if (this.ui !== undefined) {
            onChanging = this.ui.onChanging;
            onChanged = this.ui.onChanged;
        }
        var allowChange = true;
        if (onChanging !== undefined) {
            this.isChanging = true;
            allowChange = onChanging(this.context, this.value, prev);
            this.isChanging = false;
        }
        if (allowChange === true) {
            this.setDataValue(newValue);
            if (fromElement !== true)
                this.setElementValue(newValue);
            if (onChanged !== undefined) {
                this.isChanging = true;
                onChanged(this.context, this.value, prev);
                this.isChanging = false;
            }
        }
    };
    Object.defineProperty(Widget.prototype, "className", {
        get: function () {
            var fieldClass;
            if (this.context.inNode === false)
                fieldClass = 'form-control';
            return classNames(fieldClass, this.context.form.FieldClass, this.ui && this.ui.className);
        },
        enumerable: true,
        configurable: true
    });
    Widget.prototype.renderContainer = function () {
        if (this.visible === false)
            return null;
        var _a = this.context, form = _a.form, inNode = _a.inNode;
        if (inNode === true)
            return this.render();
        var label;
        if (this.ui === undefined) {
            label = this.name;
        }
        else {
            var uiLabel = this.ui.label;
            if (uiLabel === null)
                label = null;
            label = uiLabel || this.name;
        }
        if (this.itemSchema.required === true && form.props.requiredFlag !== false) {
            if (label !== null)
                label = React.createElement(React.Fragment, null,
                    label,
                    "\u00A0",
                    React.createElement("span", { className: "text-danger" }, "*"));
        }
        return form.FieldContainer(label, this.render());
    };
    Widget.prototype.renderTemplet = function () {
        if (this.children !== undefined) {
            return React.createElement(React.Fragment, null, this.children);
        }
        if (this.ui === undefined)
            return undefined;
        var Templet = this.ui.Templet;
        if (typeof Templet === 'function')
            return Templet(this.value);
        return Templet;
    };
    Widget.prototype.renderErrors = function () {
        var errorList = this.errors.concat(this.contextErrors);
        if (errorList.length === 0)
            return null;
        var inNode = this.context.inNode;
        var tag = inNode === true ? 'span' : 'div';
        return errorList.map(function (err) { return React.createElement(tag, {
            key: err,
            className: 'text-danger d-inline-block my-2 ml-3'
        }, React.createElement(React.Fragment, null,
            React.createElement("i", { className: "fa fa-exclamation-circle" }),
            " \u00A0",
            err)); });
    };
    tslib_1.__decorate([
        observable
    ], Widget.prototype, "errors", void 0);
    tslib_1.__decorate([
        observable
    ], Widget.prototype, "contextErrors", void 0);
    tslib_1.__decorate([
        computed
    ], Widget.prototype, "hasError", null);
    tslib_1.__decorate([
        observable
    ], Widget.prototype, "visible", void 0);
    tslib_1.__decorate([
        computed
    ], Widget.prototype, "isOk", null);
    return Widget;
}());
export { Widget };
//# sourceMappingURL=widget.js.map