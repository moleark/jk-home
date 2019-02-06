import * as tslib_1 from "tslib";
import * as React from 'react';
import { observable, computed } from 'mobx';
var ControlBase = /** @class */ (function () {
    function ControlBase(formView) {
        this.formView = formView;
    }
    ControlBase.prototype.render = function () {
        return React.createElement("div", { className: "col-sm-10" }, this.renderControl());
    };
    Object.defineProperty(ControlBase.prototype, "hasError", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlBase.prototype, "filled", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    ControlBase.prototype.clear = function () { };
    ControlBase.prototype.clearErrors = function () { };
    ControlBase.prototype.readValues = function (values) { };
    ControlBase.prototype.setError = function (fieldName, error) { };
    ControlBase.prototype.setInitValues = function (values) { };
    ControlBase.prototype.isOk = function () { this.validate(); return !this.hasError; };
    ControlBase.prototype.validate = function () { };
    tslib_1.__decorate([
        computed
    ], ControlBase.prototype, "hasError", null);
    tslib_1.__decorate([
        computed
    ], ControlBase.prototype, "filled", null);
    return ControlBase;
}());
export { ControlBase };
var Control = /** @class */ (function (_super) {
    tslib_1.__extends(Control, _super);
    function Control(formView, field, face) {
        var _this = _super.call(this, formView) || this;
        _this.field = field;
        _this.face = face;
        _this.init();
        _this.setProps();
        return _this;
    }
    Control.prototype.ref = function (element) {
        this.element = element;
    };
    Control.prototype.init = function () {
        var _a;
        this.rules = [];
        var r = this.field.rules;
        if (r !== undefined) {
            if (Array.isArray(r) === true)
                (_a = this.rules).push.apply(_a, r);
            else
                this.rules.push(r);
        }
    };
    ;
    Control.prototype.setProps = function () {
        return this.props = {
            ref: this.ref.bind(this),
            name: this.field.name,
        };
    };
    ;
    Object.defineProperty(Control.prototype, "hasError", {
        get: function () { return this.error !== undefined; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "filled", {
        get: function () {
            var ret = this.value !== undefined && this.value !== this.field.defaultValue;
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    Control.prototype.clearValue = function () { this.value = undefined; };
    Control.prototype.clear = function () { this.clearErrors(); this.clearValue(); };
    Control.prototype.clearErrors = function () { this.isOK = undefined; this.error = undefined; };
    Control.prototype.readValues = function (values) {
        values[this.field.name] = this.value;
    };
    Control.prototype.setError = function (fieldName, error) { };
    Control.prototype.setInitValues = function (values) { };
    Control.prototype.getValueFromElement = function () { return this.value; };
    Control.prototype.validate = function () {
        try {
            var v = this.getValueFromElement();
            if (this.rules.length > 0) {
                var isOk = void 0;
                for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
                    var rule = _a[_i];
                    console.log('validate: %s', v);
                    var err = rule(v);
                    console.log('validate: %s err: %s', v, err);
                    if (err === true) {
                        this.error = undefined;
                        isOk = true;
                    }
                    else if (err !== undefined) {
                        //console.log('field %s onBlur v=%s rule=%s err=%s', 
                        //    this.field.name, JSON.stringify(v), rule, err);
                        this.error = err;
                        this.isOK = false;
                        return;
                    }
                }
                this.isOK = isOk;
            }
            this.value = v;
        }
        catch (e) {
            this.error = e.message;
        }
    };
    Control.prototype.render = function () {
        var n;
        if (this.face !== undefined) {
            var notes = this.face.notes;
            if (notes !== undefined)
                n = React.createElement("small", { className: "text-muted" }, notes);
        }
        return React.createElement("div", { className: "col-sm-10" },
            this.renderControl(),
            n);
    };
    tslib_1.__decorate([
        observable
    ], Control.prototype, "isOK", void 0);
    tslib_1.__decorate([
        observable
    ], Control.prototype, "error", void 0);
    tslib_1.__decorate([
        observable
    ], Control.prototype, "value", void 0);
    tslib_1.__decorate([
        computed
    ], Control.prototype, "hasError", null);
    tslib_1.__decorate([
        computed
    ], Control.prototype, "filled", null);
    return Control;
}(ControlBase));
export { Control };
//# sourceMappingURL=control.js.map