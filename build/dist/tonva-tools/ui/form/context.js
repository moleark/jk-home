import * as tslib_1 from "tslib";
import * as React from 'react';
//import { ArrRow } from './arrRow';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
var Context = /** @class */ (function () {
    function Context(form, uiSchema, data, inNode, isRow) {
        var _a;
        var _this = this;
        this.widgets = {};
        this.errors = [];
        this.errorWidgets = [];
        this.renderErrors = observer(function () {
            var errors = _this.errors;
            if (errors.length === 0)
                return null;
            return React.createElement(React.Fragment, null, errors.map(function (err) { return React.createElement("span", { key: err, className: "text-danger inline-block my-1 ml-3" },
                React.createElement("i", { className: "fa fa-exclamation-circle" }),
                " \u00A0",
                err); }));
        });
        this.form = form;
        this.uiSchema = uiSchema;
        this.initData = data;
        this.inNode = inNode;
        this.isRow = isRow;
        if (uiSchema !== undefined) {
            var rules = uiSchema.rules;
            if (rules !== undefined) {
                this.rules = [];
                if (Array.isArray(rules) === false)
                    this.rules.push(rules);
                else
                    (_a = this.rules).push.apply(_a, rules);
            }
        }
    }
    Context.prototype.getArrRowContexts = function (arrName) {
        if (this.subContexts === undefined)
            this.subContexts = {};
        var arrRowContexts = this.subContexts[name];
        if (arrRowContexts === undefined)
            this.subContexts[name] = arrRowContexts = {};
        return arrRowContexts;
    };
    Object.defineProperty(Context.prototype, "arrName", {
        get: function () { return undefined; },
        enumerable: true,
        configurable: true
    });
    Context.prototype.getValue = function (itemName) { return this.initData[itemName]; };
    Context.prototype.setValue = function (itemName, value) {
        this.initData[itemName] = value;
        var widget = this.widgets[itemName];
        if (widget !== undefined)
            widget.setValue(value);
    };
    Context.prototype.getDisabled = function (itemName) {
        var widget = this.widgets[itemName];
        if (widget !== undefined)
            return widget.getDisabled();
        return undefined;
    };
    Context.prototype.setDisabled = function (itemName, value) {
        var widget = this.widgets[itemName];
        if (widget !== undefined)
            widget.setDisabled(value);
    };
    Context.prototype.getReadOnly = function (itemName) {
        var widget = this.widgets[itemName];
        if (widget !== undefined)
            widget.getReadOnly();
        return undefined;
    };
    Context.prototype.setReadOnly = function (itemName, value) {
        var widget = this.widgets[itemName];
        if (widget !== undefined)
            widget.setReadOnly(value);
    };
    Context.prototype.getVisible = function (itemName) {
        var widget = this.widgets[itemName];
        if (widget !== undefined)
            widget.getVisible();
        return undefined;
    };
    Context.prototype.setVisible = function (itemName, value) {
        var widget = this.widgets[itemName];
        if (widget !== undefined)
            widget.setVisible(value);
    };
    Context.prototype.checkFieldRules = function () {
        for (var i in this.widgets) {
            this.widgets[i].checkRules();
        }
        if (this.subContexts === undefined)
            return;
        for (var i in this.subContexts) {
            var arrRowContexts = this.subContexts[i];
            for (var j in arrRowContexts) {
                arrRowContexts[j].checkFieldRules();
            }
        }
    };
    Context.prototype.checkContextRules = function () {
        var _a;
        if (this.rules === undefined)
            return;
        this.clearContextErrors();
        for (var _i = 0, _b = this.rules; _i < _b.length; _i++) {
            var rule = _b[_i];
            var ret = rule(this);
            if (ret === undefined)
                continue;
            if (Array.isArray(ret) === true) {
                (_a = this.errors).push.apply(_a, ret);
            }
            else if (typeof ret === 'string') {
                this.errors.push(ret);
            }
            else {
                for (var i in ret)
                    this.setError(i, ret[i]);
            }
        }
        if (this.subContexts === undefined)
            return;
        for (var i in this.subContexts) {
            var arrRowContexts = this.subContexts[i];
            for (var j in arrRowContexts) {
                var rowContext = arrRowContexts[j];
                rowContext.removeErrors();
                rowContext.checkContextRules();
            }
        }
    };
    Context.prototype.setError = function (itemName, error) {
        var widget = this.widgets[itemName];
        if (widget === undefined)
            return;
        widget.setContextError(error);
        this.addErrorWidget(widget);
    };
    Context.prototype.clearContextErrors = function () {
        for (var i in this.widgets)
            this.widgets[i].clearContextError();
    };
    Context.prototype.checkRules = function () {
        this.checkFieldRules();
        this.checkContextRules();
    };
    Context.prototype.addErrorWidget = function (widget) {
        var pos = this.errorWidgets.findIndex(function (v) { return v === widget; });
        if (pos < 0)
            this.errorWidgets.push(widget);
    };
    Context.prototype.removeErrorWidget = function (widget) {
        var pos = this.errorWidgets.findIndex(function (v) { return v === widget; });
        if (pos >= 0)
            this.errorWidgets.splice(pos, 1);
    };
    Context.prototype.checkHasError = function () {
        var ret = (this.errorWidgets.length + this.errors.length) > 0;
        if (ret === true)
            return true;
        if (this.subContexts === undefined)
            return false;
        for (var i in this.subContexts) {
            var arrRowContexts = this.subContexts[i];
            for (var j in arrRowContexts) {
                if (arrRowContexts[j].hasError === true)
                    return true;
            }
        }
        return false;
    };
    Object.defineProperty(Context.prototype, "hasError", {
        get: function () {
            return this.checkHasError();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Context.prototype.removeErrors = function () {
        this.errors.splice(0);
        this.errorWidgets.splice(0);
        for (var i in this.widgets) {
            var widget = this.widgets[i];
            if (widget === undefined)
                continue;
            widget.clearContextError();
        }
    };
    tslib_1.__decorate([
        observable
    ], Context.prototype, "errors", void 0);
    tslib_1.__decorate([
        observable
    ], Context.prototype, "errorWidgets", void 0);
    tslib_1.__decorate([
        computed
    ], Context.prototype, "hasError", null);
    return Context;
}());
export { Context };
var rowKeySeed = 1;
var RowContext = /** @class */ (function (_super) {
    tslib_1.__extends(RowContext, _super);
    function RowContext(parentContext, arrSchema, data, inNode) {
        var _this = this;
        var uiArr;
        var uiSchema = parentContext.uiSchema;
        if (uiSchema !== undefined) {
            var items = uiSchema.items;
            if (items !== undefined)
                uiArr = items[arrSchema.name];
        }
        _this = _super.call(this, parentContext.form, uiArr, data, inNode, true) || this;
        _this.parentContext = parentContext;
        _this.arrSchema = arrSchema;
        _this.rowKey = rowKeySeed++;
        _this.data = data;
        return _this;
    }
    RowContext.prototype.getItemSchema = function (itemName) { return this.arrSchema.itemSchemas[itemName]; };
    RowContext.prototype.getUiItem = function (itemName) {
        if (this.uiSchema === undefined)
            return undefined;
        var items = this.uiSchema.items;
        if (items === undefined)
            return undefined;
        return items[itemName];
    };
    Object.defineProperty(RowContext.prototype, "arrName", {
        get: function () { return this.arrSchema.name; },
        enumerable: true,
        configurable: true
    });
    //get data() {return this.row.data;}
    RowContext.prototype.removeErrors = function () {
        _super.prototype.removeErrors.call(this);
        this.parentContext.removeErrors();
    };
    Object.defineProperty(RowContext.prototype, "parentData", {
        get: function () { return this.parentContext.data; },
        enumerable: true,
        configurable: true
    });
    return RowContext;
}(Context));
export { RowContext };
var FormContext = /** @class */ (function (_super) {
    tslib_1.__extends(FormContext, _super);
    function FormContext(form, inNode) {
        return _super.call(this, form, form.uiSchema, form.data, inNode, false) || this;
    }
    Object.defineProperty(FormContext.prototype, "data", {
        get: function () { return this.form.data; },
        enumerable: true,
        configurable: true
    });
    FormContext.prototype.getItemSchema = function (itemName) { return this.form.itemSchemas[itemName]; };
    FormContext.prototype.getUiItem = function (itemName) {
        var uiSchema = this.form.uiSchema;
        if (uiSchema === undefined)
            return undefined;
        var items = uiSchema.items;
        if (items === undefined)
            return undefined;
        return items[itemName];
    };
    return FormContext;
}(Context));
export { FormContext };
export var ContextContainer = React.createContext({});
//# sourceMappingURL=context.js.map