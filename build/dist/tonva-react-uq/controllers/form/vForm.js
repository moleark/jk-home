import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from "mobx-react";
import { BandsBuilder } from './bandsBuilder';
import { computed, observable } from 'mobx';
import { FA } from 'tonva-react-form';
export var FormMode;
(function (FormMode) {
    FormMode[FormMode["new"] = 0] = "new";
    FormMode[FormMode["edit"] = 1] = "edit";
    FormMode[FormMode["readonly"] = 2] = "readonly";
})(FormMode || (FormMode = {}));
var VForm = /** @class */ (function () {
    function VForm(options, onSubmit) {
        var _this = this;
        this.vFields = {};
        this.vArrs = {};
        this.onFormSubmit = function (event) {
            event.preventDefault();
            return false;
        };
        this.view = observer(function (_a) {
            var className = _a.className;
            return React.createElement("form", { className: className, onSubmit: _this.onFormSubmit }, _this.bands.map(function (v) { return v.render(); }));
        });
        var fields = options.fields, arrs = options.arrs, ui = options.ui, res = options.res, inputs = options.inputs, none = options.none, submitCaption = options.submitCaption, arrNewCaption = options.arrNewCaption, arrEditCaption = options.arrEditCaption, arrTitleNewButton = options.arrTitleNewButton, mode = options.mode;
        this.fields = fields;
        this.arrs = arrs;
        this.ui = ui;
        if (this.ui !== undefined)
            this.formItems = this.ui.items; //.compute = this.ui.compute;
        this.res = res;
        this.inputs = inputs;
        this.none = none;
        this.submitCaption = submitCaption;
        this.arrNewCaption = arrNewCaption;
        this.arrEditCaption = arrEditCaption;
        this.arrTitleNewButton = arrTitleNewButton || React.createElement("small", null,
            React.createElement(FA, { name: "plus" }),
            " \u65B0\u589E");
        if (onSubmit === undefined)
            this.mode = FormMode.readonly;
        else
            this.mode = mode;
        this.buildFormValues();
        this.buildBands(options, onSubmit);
        this.onSubmit = onSubmit;
    }
    VForm.prototype.buildBands = function (options, onSubmit) {
        this.bandColl = {};
        var bandsBuilder = new BandsBuilder(this, options, onSubmit);
        this.bands = bandsBuilder.build();
        for (var _i = 0, _a = this.bands; _i < _a.length; _i++) {
            var band = _a[_i];
            this.bandColl[band.key] = band;
            var vFields = band.getVFields();
            if (vFields !== undefined)
                for (var _b = 0, vFields_1 = vFields; _b < vFields_1.length; _b++) {
                    var f = vFields_1[_b];
                    this.vFields[f.name] = f;
                }
            var vArr = band.getVArr();
            if (vArr !== undefined)
                this.vArrs[vArr.name] = vArr;
            var vSubmit = band.getVSubmit();
            if (vSubmit !== undefined)
                this.vSubmit = vSubmit;
        }
    };
    VForm.prototype.getBand = function (name) {
        return this.bandColl[name];
    };
    VForm.prototype.computeFields = function () {
        if (this.formItems === undefined)
            return;
        var values = this.values;
        for (var i in this.formItems) {
            var item = this.formItems[i];
            if (typeof item !== 'function')
                continue;
            values[i] = item.call(values);
        }
    };
    VForm.prototype.submit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.onSubmit === undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.onSubmit()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VForm.prototype.getValues = function () {
        var ret = {};
        var values = this.values;
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            var name_1 = f.name;
            var v = values[name_1];
            ret[name_1] = v !== null && typeof v === 'object' ? v.id : v;
        }
        if (this.arrs !== undefined) {
            for (var _b = 0, _c = this.arrs; _b < _c.length; _b++) {
                var arr = _c[_b];
                var name_2 = arr.name, fields = arr.fields, id = arr.id, order = arr.order;
                var list = ret[name_2] = [];
                var rows = this.vArrs[name_2].list;
                for (var _d = 0, rows_1 = rows; _d < rows_1.length; _d++) {
                    var row = rows_1[_d];
                    var item = {};
                    if (id !== undefined)
                        item[id] = row[id];
                    if (order !== undefined)
                        item[order] = row[order];
                    for (var _e = 0, fields_1 = fields; _e < fields_1.length; _e++) {
                        var f = fields_1[_e];
                        var fn = f.name;
                        var v = row[fn];
                        item[fn] = v !== null && typeof v === 'object' ? v.id : v;
                    }
                    list.push(item);
                }
            }
        }
        return ret;
    };
    Object.defineProperty(VForm.prototype, "valueBoxs", {
        get: function () {
            var ret = {};
            var values = this.values;
            for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
                var f = _a[_i];
                var name_3 = f.name, _tuid = f._tuid;
                var v = values[name_3];
                ret[name_3] = _tuid === undefined || typeof v === 'object' ? v : _tuid.boxId(v);
            }
            if (this.arrs === undefined)
                return ret;
            for (var _b = 0, _c = this.arrs; _b < _c.length; _b++) {
                var arr = _c[_b];
                var name_4 = arr.name, fields = arr.fields, id = arr.id, order = arr.order;
                var list = ret[name_4] = this.vArrs[name_4].list.slice();
                for (var _d = 0, list_1 = list; _d < list_1.length; _d++) {
                    var row = list_1[_d];
                    for (var _e = 0, fields_2 = fields; _e < fields_2.length; _e++) {
                        var f = fields_2[_e];
                        var fn = f.name, _tuid = f._tuid;
                        var v = row[fn];
                        row[fn] = _tuid === undefined || typeof v === 'object' ? v : _tuid.boxId(v);
                    }
                }
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    VForm.prototype.setValues = function (initValues) {
        if (initValues === undefined) {
            this.reset();
            return;
        }
        var values = this.values;
        var errors = this.errors;
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            var fn = f.name;
            errors[fn] = undefined;
            var v = initValues[fn];
            values[fn] = v;
        }
        // 还要设置arrs的values
        for (var i in this.vArrs) {
            var list = initValues[i];
            if (list === undefined)
                continue;
            var arrList = values[i];
            arrList.clear();
            arrList.push.apply(arrList, list);
        }
    };
    Object.defineProperty(VForm.prototype, "isOk", {
        get: function () {
            for (var i in this.vFields) {
                if (this.vFields[i].isOk === false)
                    return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    VForm.prototype.reset = function () {
        var values = this.values;
        var errors = this.errors;
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            var fn = f.name;
            //if (this.compute !== undefined && this.compute[fn] !== undefined) continue;
            values[fn] = null;
            errors[fn] = undefined;
        }
        for (var i in this.vFields) {
            var ctrl = this.vFields[i];
            var cn = ctrl.name;
            if (cn === undefined)
                continue;
            //if (this.compute !== undefined && this.compute[cn] !== undefined) continue;
            ctrl.setValue(null);
        }
        for (var i in this.vArrs) {
            var vArr = this.vArrs[i];
            vArr.reset();
        }
    };
    VForm.prototype.getValue = function (fieldName) {
        return this.values[fieldName];
    };
    VForm.prototype.setValue = function (fieldName, value) { this.values[fieldName] = value; };
    VForm.prototype.setError = function (fieldName, error) { this.errors[fieldName] = error; };
    VForm.prototype.buildFieldValues = function (fields) {
        var v = {
            valueFromFieldName: function (propName) {
                return this[propName];
            }
        };
        for (var _i = 0, fields_3 = fields; _i < fields_3.length; _i++) {
            var f = fields_3[_i];
            var fn = f.name;
            v[fn] = null;
        }
        return v;
    };
    VForm.prototype.buildObservableValues = function () {
        var v = this.buildFieldValues(this.fields);
        if (this.arrs !== undefined) {
            for (var _i = 0, _a = this.arrs; _i < _a.length; _i++) {
                var arr = _a[_i];
                v[arr.name] = observable.array([], { deep: true });
            }
        }
        var ret = observable(v);
        return ret;
    };
    VForm.prototype.buildFormValues = function () {
        this.values = this.buildObservableValues();
        this.errors = observable(this.buildFieldValues(this.fields));
    };
    VForm.prototype.render = function (className) {
        if (className === void 0) { className = "py-3"; }
        return React.createElement(this.view, { className: className });
    };
    tslib_1.__decorate([
        computed
    ], VForm.prototype, "isOk", null);
    return VForm;
}());
export { VForm };
//# sourceMappingURL=vForm.js.map