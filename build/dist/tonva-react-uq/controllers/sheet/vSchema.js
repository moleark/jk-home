import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
var VSheetSchema = /** @class */ (function (_super) {
    tslib_1.__extends(VSheetSchema, _super);
    function VSheetSchema() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = function () { return React.createElement(Page, { header: _this.label + "模板" },
            React.createElement("pre", { className: "mx-3 my-2" }, _this.entity.schemaStringify())); };
        return _this;
    }
    VSheetSchema.prototype.showEntry = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    return VSheetSchema;
}(VEntity));
export { VSheetSchema };
//# sourceMappingURL=vSchema.js.map