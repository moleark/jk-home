import * as tslib_1 from "tslib";
import * as React from 'react';
import { createControl } from '../control';
var RowContainer = /** @class */ (function () {
    function RowContainer(form, row) {
        this.form = form;
        this.row = row;
        if (row.type === undefined) {
            var cc = row.createControl;
            if (cc === undefined)
                cc = form.createControl;
            if (cc === undefined)
                cc = createControl;
            this.control = cc(form, row);
        }
    }
    RowContainer.prototype.isOk = function () {
        if (this.control === undefined)
            return true;
        return this.control.isOk();
    };
    RowContainer.prototype.contains = function (fieldName) {
        var field = this.row.field;
        if (field !== undefined)
            return fieldName === field.name;
        var group = this.row.group;
        if (group !== undefined)
            return group.find(function (g) { return g.field.name === fieldName; }) !== undefined;
        return false;
    };
    Object.defineProperty(RowContainer.prototype, "hasError", {
        get: function () { return this.control.hasError; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowContainer.prototype, "filled", {
        get: function () { return this.control.filled; },
        enumerable: true,
        configurable: true
    });
    RowContainer.prototype.clear = function () {
        if (this.control !== undefined)
            this.control.clear();
    };
    RowContainer.prototype.clearErrors = function () {
        if (this.control !== undefined)
            this.control.clearErrors();
    };
    RowContainer.prototype.readValues = function (values) {
        if (this.control !== undefined)
            this.control.readValues(values);
    };
    RowContainer.prototype.setError = function (fieldName, error) {
        if (this.control !== undefined)
            this.control.setError(fieldName, error);
    };
    RowContainer.prototype.setInitValues = function (values) {
        if (this.control !== undefined)
            this.control.setInitValues(values);
    };
    return RowContainer;
}());
export { RowContainer };
var ElementRowContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ElementRowContainer, _super);
    function ElementRowContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementRowContainer.prototype.render = function (key) {
        return React.createElement("div", { key: key, className: "form-group" }, this.row);
    };
    Object.defineProperty(ElementRowContainer.prototype, "hasError", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementRowContainer.prototype, "filled", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    return ElementRowContainer;
}(RowContainer));
var BootStrapRowContainer = /** @class */ (function (_super) {
    tslib_1.__extends(BootStrapRowContainer, _super);
    function BootStrapRowContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BootStrapRowContainer.prototype.render = function (key) {
        return React.createElement("div", { key: key, className: 'form-group row' },
            React.createElement("label", { className: 'col-sm-2 col-form-label' }, this.row.label),
            this.control.render());
        //has-success is-valid
    };
    return BootStrapRowContainer;
}(RowContainer));
export function bootstrapCreateRow(form, row) {
    return new BootStrapRowContainer(form, row);
}
export function elementCreateRow(form, row) {
    return new ElementRowContainer(form, row);
}
//# sourceMappingURL=index.js.map