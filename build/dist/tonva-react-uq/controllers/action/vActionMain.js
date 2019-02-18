import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { jsonStringify } from '../../tools';
import { VEntity } from '../CVEntity';
var VActionMain = /** @class */ (function (_super) {
    tslib_1.__extends(VActionMain, _super);
    function VActionMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        values = this.vForm.getValues();
                        _a = this;
                        return [4 /*yield*/, this.controller.submit(values)];
                    case 1:
                        _a.returns = _b.sent();
                        this.closePage();
                        this.openPage(this.resultPage);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.mainPage = function () {
            var label = _this.controller.label;
            return React.createElement(Page, { header: label }, _this.vForm.render('mx-3 my-2'));
        };
        _this.resultPage = function () {
            var label = _this.controller.label;
            return React.createElement(Page, { header: label, back: "close" },
                "\u5B8C\u6210\uFF01",
                React.createElement("pre", null, jsonStringify(_this.returns)));
        };
        return _this;
    }
    VActionMain.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.vForm = this.createForm(this.onSubmit, param);
                this.openPage(this.mainPage);
                return [2 /*return*/];
            });
        });
    };
    return VActionMain;
}(VEntity));
export { VActionMain };
//# sourceMappingURL=vActionMain.js.map