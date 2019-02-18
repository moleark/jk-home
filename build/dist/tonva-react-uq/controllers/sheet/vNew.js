import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
var VSheetNew = /** @class */ (function (_super) {
    tslib_1.__extends(VSheetNew, _super);
    function VSheetNew() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values, valuesWithBox;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = this.vForm.getValues();
                        valuesWithBox = this.vForm.values;
                        //let ret = 
                        return [4 /*yield*/, this.controller.onSave(values, valuesWithBox)];
                    case 1:
                        //let ret = 
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.view = function () { return React.createElement(Page, { header: _this.label }, _this.vForm.render()); };
        return _this;
    }
    VSheetNew.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.vForm = this.createForm(this.onSubmit, param);
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    return VSheetNew;
}(VEntity));
export { VSheetNew };
//# sourceMappingURL=vNew.js.map