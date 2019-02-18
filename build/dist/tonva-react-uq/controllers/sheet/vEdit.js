import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { FormMode } from '../form';
import { VSheetView } from './vSheetView';
var VSheetEdit = /** @class */ (function (_super) {
    tslib_1.__extends(VSheetEdit, _super);
    function VSheetEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = this.vForm.getValues();
                        return [4 /*yield*/, this.controller.saveSheet(values, this.vForm.values)];
                    case 1:
                        _a.sent();
                        this.closePage();
                        this.returnCall(this.vForm.values);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = function () { return React.createElement(Page, { header: _this.label }, _this.vForm.render()); };
        return _this;
    }
    VSheetEdit.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.sheetData = param;
                this.vForm = this.createForm(this.onSubmit, param.data, FormMode.edit);
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    return VSheetEdit;
}(VSheetView));
export { VSheetEdit };
//# sourceMappingURL=vEdit.js.map