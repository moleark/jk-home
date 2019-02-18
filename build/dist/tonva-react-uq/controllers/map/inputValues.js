import * as tslib_1 from "tslib";
import * as React from 'react';
import { VEntity } from "../CVEntity";
import { Page } from "tonva-tools";
var VInputValues = /** @class */ (function (_super) {
    tslib_1.__extends(VInputValues, _super);
    function VInputValues() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onValuesSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values;
            return tslib_1.__generator(this, function (_a) {
                this.ceasePage();
                values = this.vForm.getValues();
                this.returnCall(values);
                return [2 /*return*/];
            });
        }); };
        _this.view = function () {
            return React.createElement(Page, null, _this.vForm.render());
        };
        return _this;
    }
    VInputValues.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.vForm = this.createForm(this.onValuesSubmit);
                this.openPageElement(React.createElement(this.view, null));
                return [2 /*return*/];
            });
        });
    };
    return VInputValues;
}(VEntity));
export { VInputValues };
//# sourceMappingURL=inputValues.js.map