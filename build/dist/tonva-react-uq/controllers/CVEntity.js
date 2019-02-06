import * as tslib_1 from "tslib";
import { VPage } from 'tonva-tools';
import { VForm, FormMode } from './form';
import { entityIcons } from './icons';
import { ControllerUq } from './ControllerUq';
var CEntity = /** @class */ (function (_super) {
    tslib_1.__extends(CEntity, _super);
    function CEntity(cUq, entity, ui, res) {
        var _this = _super.call(this, cUq, res) || this;
        Object.setPrototypeOf(_this.x, cUq.x);
        var name = entity.name, typeName = entity.typeName;
        _this.entity = entity;
        _this.ui = ui; // || entityUI.ui;
        _this.label = _this.res.label || name;
        _this.icon = entityIcons[typeName];
        return _this;
    }
    CEntity.prototype.beforeStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //if (await super.beforeStart() === false) return false;
                    return [4 /*yield*/, this.entity.loadSchema()];
                    case 1:
                        //if (await super.beforeStart() === false) return false;
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    CEntity.prototype.createForm = function (onSubmit, values, mode) {
        var options = this.buildFormOptions(mode);
        var ret = new VForm(options, onSubmit);
        ret.setValues(values);
        return ret;
    };
    CEntity.prototype.buildFormOptions = function (mode) {
        var _a = this.entity, fields = _a.fields, arrFields = _a.arrFields;
        var none, submitCaption, arrNewCaption, arrEditCaption, arrTitleNewButton;
        if (this.res !== undefined) {
            none = this.res['none'];
            submitCaption = this.res['submit'];
            arrNewCaption = this.res['arrNew'];
            arrEditCaption = this.res['arrEdit'];
            arrTitleNewButton = this.res['arrTitleNewButton'];
        }
        if (none === undefined) {
            none = this.cUq.res['none'] || 'none';
        }
        if (submitCaption === undefined)
            submitCaption = this.cUq.res['submit'] || 'Submit';
        if (arrNewCaption === undefined)
            arrNewCaption = this.cUq.res['arrNew'] || 'New';
        if (arrEditCaption === undefined)
            arrEditCaption = this.cUq.res['arrEdit'] || 'Edit';
        if (arrTitleNewButton === undefined)
            arrTitleNewButton = this.cUq.res['arrTitleNewButton'];
        if (mode === undefined)
            mode = FormMode.new;
        var formUI = this.ui.form;
        var ret = {
            fields: fields,
            arrs: arrFields,
            ui: formUI,
            res: this.res || {},
            inputs: this.buildInputs(formUI),
            none: none,
            submitCaption: submitCaption,
            arrNewCaption: arrNewCaption,
            arrEditCaption: arrEditCaption,
            arrTitleNewButton: arrTitleNewButton,
            mode: mode,
        };
        return ret;
    };
    CEntity.prototype.buildInputs = function (formUI) {
        var _a = this.entity, fields = _a.fields, arrFields = _a.arrFields;
        var ret = {};
        this.buildFieldsInputs(ret, fields, undefined, formUI);
        if (arrFields !== undefined) {
            for (var _i = 0, arrFields_1 = arrFields; _i < arrFields_1.length; _i++) {
                var arr = arrFields_1[_i];
                var name_1 = arr.name, fields_1 = arr.fields;
                var items = formUI && formUI.items;
                this.buildFieldsInputs(ret, fields_1, name_1, items && items[name_1]);
            }
        }
        return ret;
    };
    CEntity.prototype.buildFieldsInputs = function (ret, fields, arr, formUI) {
        if (arr !== undefined) {
            var arrFieldInputs = ret[arr];
            if (arrFieldInputs === undefined) {
                ret[arr] = arrFieldInputs = {};
                ret = arrFieldInputs;
            }
        }
        for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
            var field = fields_2[_i];
            var name_2 = field.name, _tuid = field._tuid;
            if (_tuid === undefined)
                continue;
            var fieldUI = formUI && formUI.items && formUI.items[name_2];
            ret[name_2] = {
                select: this.buildSelect(field, arr, fieldUI),
                content: this.buildContent(field, arr),
                placeHolder: this.cUq.getTuidPlaceHolder(_tuid),
            };
        }
    };
    CEntity.prototype.buildSelect = function (field, arr, fieldUI) {
        var _this = this;
        return function (form, field, values) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _tuid, _ownerField, cTuidSelect, param, ret, id;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _tuid = field._tuid, _ownerField = field._ownerField;
                        return [4 /*yield*/, _tuid.cSelectFrom()];
                    case 1:
                        cTuidSelect = _a.sent();
                        param = undefined;
                        if (_ownerField !== undefined)
                            param = form.getValue(_ownerField.name);
                        if (fieldUI && fieldUI.autoList === true) {
                            console.log('select search set param=empty string');
                            param = '';
                        }
                        return [4 /*yield*/, cTuidSelect.call(param)];
                    case 2:
                        ret = _a.sent();
                        cTuidSelect.removeCeased(); // 清除已经废弃的顶部页面
                        if (ret === undefined)
                            return [2 /*return*/, undefined];
                        id = cTuidSelect.idFromItem(ret);
                        _tuid.useId(id);
                        return [2 /*return*/, id];
                }
            });
        }); };
    };
    CEntity.prototype.buildContent = function (field, arr) {
        return;
    };
    CEntity.prototype.cQuerySelect = function (queryName) {
        return this.cUq.cQuerySelect(queryName);
    };
    return CEntity;
}(ControllerUq));
export { CEntity };
var VEntity = /** @class */ (function (_super) {
    tslib_1.__extends(VEntity, _super);
    function VEntity(controller) {
        var _this = _super.call(this, controller) || this;
        _this.entity = controller.entity;
        _this.ui = controller.ui;
        return _this;
    }
    Object.defineProperty(VEntity.prototype, "label", {
        get: function () { return this.controller.label; },
        enumerable: true,
        configurable: true
    });
    //private _form_$: VForm;
    VEntity.prototype.createForm = function (onSubmit, values, mode) {
        //if (this._form_$ !== undefined) return this._form_$;
        return this.controller.createForm(onSubmit, values, mode);
    };
    return VEntity;
}(VPage));
export { VEntity };
//# sourceMappingURL=CVEntity.js.map