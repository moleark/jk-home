import * as tslib_1 from "tslib";
import * as React from 'react';
import _ from 'lodash';
import { List, Muted } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { ViewModel, JSONContent } from './viewModel';
import { VForm, FormMode } from './vForm';
var VArr = /** @class */ (function (_super) {
    tslib_1.__extends(VArr, _super);
    function VArr(ownerForm, arr, onEditRow) {
        var _this = _super.call(this) || this;
        _this.rowPage = function () {
            return React.createElement(Page, { header: _this.label, back: "close" }, _this.vForm.render('py-3'));
        };
        _this.onSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var valueBoxs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valueBoxs = this.vForm.valueBoxs;
                        return [4 /*yield*/, this.onRowChanged(valueBoxs)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onRowChanged = function (rowValues) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.rowValues === undefined)) return [3 /*break*/, 4];
                        rowValues.$owner = this.ownerForm.values;
                        this.list.push(rowValues);
                        if (!(this.onEditRow === undefined)) return [3 /*break*/, 1];
                        this.vForm.reset();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.onEditRow(undefined, this.onRowChanged)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        _.merge(this.rowValues, rowValues);
                        if (this.onEditRow === undefined)
                            nav.pop();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.renderItem = function (item, index) {
            if (_this.rowContent === undefined)
                return React.createElement("div", { className: "px-3 py-2" },
                    React.createElement(JSONContent, tslib_1.__assign({}, item)));
            return React.createElement(_this.rowContent, tslib_1.__assign({}, item));
        };
        _this.showRow = function (rowValues) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.onEditRow !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onEditRow(rowValues, this.onRowChanged)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.vForm.reset();
                        if (rowValues !== undefined)
                            this.vForm.setValues(rowValues);
                        nav.push(React.createElement(this.rowPage, null));
                        return [2 /*return*/];
                }
            });
        }); };
        _this.editRow = function (rowValues) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var vSubmit;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rowValues = rowValues;
                        vSubmit = this.vForm.vSubmit;
                        if (vSubmit !== undefined) {
                            vSubmit.caption = this.editSubmitCaption;
                            vSubmit.className = 'btn btn-outline-success';
                        }
                        this.vForm.mode = this.ownerForm.mode;
                        return [4 /*yield*/, this.showRow(rowValues)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.internalAddRow = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var vSubmit;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rowValues = undefined;
                        vSubmit = this.vForm.vSubmit;
                        vSubmit.caption = this.newSubmitCaption;
                        vSubmit.className = 'btn btn-outline-success';
                        this.vForm.reset();
                        this.vForm.mode = FormMode.new;
                        return [4 /*yield*/, this.showRow(undefined)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = function () {
            var button;
            if (_this.addRow !== undefined || _this.mode !== FormMode.readonly) {
                button = React.createElement("button", { onClick: _this.addRow || _this.internalAddRow, type: "button", className: "btn btn-link p-0" }, _this.ownerForm.arrTitleNewButton);
            }
            var header = _this.header || React.createElement("div", { className: "px-3 bg-light small", style: { paddingTop: '1px', paddingBottom: '1px' } },
                React.createElement("div", { className: "flex-fill align-self-center" }, _this.label),
                button);
            return React.createElement(List, { className: "pb-3", header: header, none: React.createElement(Muted, { className: "px-3 py-2" }, _this.none), items: _this.list, item: { render: _this.renderItem, onClick: _this.editRow } });
        };
        _this.ownerForm = ownerForm;
        var name = arr.name, fields = arr.fields;
        _this.name = name;
        var ui = ownerForm.ui, res = ownerForm.res, mode = ownerForm.mode, inputs = ownerForm.inputs, values = ownerForm.values;
        var arrsRes = res.arrs;
        var arrRes = arrsRes !== undefined ? arrsRes[name] : {};
        var label = arrRes.label, none = arrRes.none, newSubmit = arrRes.newSubmit, editSubmit = arrRes.editSubmit;
        _this.none = none || ownerForm.none;
        _this.newSubmitCaption = newSubmit || ownerForm.arrNewCaption;
        _this.editSubmitCaption = editSubmit || ownerForm.arrEditCaption;
        _this.label = label || name;
        var arrUI = ((ui && ui.items[name]) || {});
        _this.rowContent = arrUI.rowContent; // || JSONContent;
        _this.mode = mode;
        if (_this.onEditRow === undefined) {
            _this.vForm = new VForm({
                fields: fields,
                arrs: undefined,
                ui: arrUI,
                res: arrRes,
                inputs: inputs[name],
                none: ownerForm.none,
                submitCaption: 'submit',
                arrNewCaption: undefined,
                arrEditCaption: undefined,
                arrTitleNewButton: undefined,
                mode: mode,
            }, mode === FormMode.readonly ? undefined : _this.onSubmit);
        }
        else {
            _this.onEditRow = onEditRow;
        }
        _this.list = values[name];
        return _this;
    }
    VArr.prototype.reset = function () {
        this.vForm.reset();
        this.list.clear();
    };
    VArr.prototype.setAddRow = function (addRow) {
        this.addRow = addRow;
    };
    return VArr;
}(ViewModel));
export { VArr };
//# sourceMappingURL=vArr.js.map