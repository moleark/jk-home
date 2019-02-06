import * as tslib_1 from "tslib";
import * as React from 'react';
import { computed } from 'mobx';
import { uid } from '../uid';
import { ButtonsControl } from './control';
import { bootstrapCreateRow, elementCreateRow } from './rowContainer';
var FormView = /** @class */ (function () {
    function FormView(props) {
        this.rows = [];
        this.uid = uid();
        this.props = props;
        this.buildRows(props);
        this.createControl = props.createControl;
        this.onSubmit = this.onSubmit.bind(this);
    }
    Object.defineProperty(FormView.prototype, "hasError", {
        get: function () {
            var ret = this.rows.map(function (v, index) { return index + ': ' + v.hasError + '\n'; });
            console.log(ret);
            return this.rows.some(function (row) { return row.hasError; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormView.prototype, "nothing", {
        get: function () {
            var ret = this.rows.every(function (row) { return !row.filled; });
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    FormView.prototype.readValues = function () {
        var values = {};
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.readValues(values);
        }
        return values;
    };
    FormView.prototype.clear = function () {
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.clear();
        }
    };
    FormView.prototype.clearErrors = function () {
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.clearErrors();
        }
    };
    FormView.prototype.setError = function (fieldName, error) {
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.setError(fieldName, error);
        }
    };
    FormView.prototype.setInitValues = function (initValues) {
        if (initValues === undefined)
            return;
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.setInitValues(initValues);
        }
    };
    FormView.prototype.buildRows = function (props) {
        var formRows = props.formRows, createRow = props.createRow;
        if (formRows !== undefined) {
            for (var _i = 0, formRows_1 = formRows; _i < formRows_1.length; _i++) {
                var row = formRows_1[_i];
                this.rows.push(this.buildRow(row, createRow));
            }
            if (this.props.readOnly !== true) {
                this.buttonsRow = this.buildRow({ createControl: this.createButtons.bind(this) }, undefined);
            }
        }
        else {
            this.rows.push(elementCreateRow(this, React.createElement("div", { className: "text-warning" }, "TonvaForm need formRows defined")));
        }
    };
    FormView.prototype.buildRow = function (formRow, formRowCreator) {
        var createRow;
        var type = formRow.type;
        if (type !== undefined) {
            createRow = elementCreateRow;
        }
        else {
            createRow = formRow.createRow;
            if (createRow === undefined) {
                createRow = formRowCreator;
                if (createRow === undefined)
                    createRow = bootstrapCreateRow;
            }
        }
        var row = createRow(this, formRow);
        return row;
    };
    FormView.prototype.createButtons = function (form, row) {
        return new ButtonsControl(form);
    };
    FormView.prototype.isOk = function () {
        var isOk = true;
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (!row.isOk())
                isOk = false;
        }
        return isOk;
    };
    FormView.prototype.render = function () {
        var _this = this;
        return React.createElement("form", { onSubmit: this.onSubmit },
            this.rows.map(function (row, index) { return row.render(_this.uid + index); }),
            this.buttons());
    };
    FormView.prototype.buttons = function () {
        if (this.buttonsRow === undefined)
            return;
        return this.buttonsRow.render(this.uid + this.rows.length);
    };
    FormView.prototype.onSubmit = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var values;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        if (!this.isOk())
                            return [2 /*return*/];
                        values = this.readValues();
                        return [4 /*yield*/, this.props.onSubmit(values)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        computed
    ], FormView.prototype, "hasError", null);
    tslib_1.__decorate([
        computed
    ], FormView.prototype, "nothing", null);
    return FormView;
}());
export { FormView };
//# sourceMappingURL=formView.js.map