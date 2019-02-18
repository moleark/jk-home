import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
var VHistoryMain = /** @class */ (function (_super) {
    tslib_1.__extends(VHistoryMain, _super);
    function VHistoryMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = function () { return React.createElement(Page, { header: _this.label }, "History"); };
        return _this;
    }
    VHistoryMain.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    return VHistoryMain;
}(VEntity));
export { VHistoryMain };
//# sourceMappingURL=vHistoryMain.js.map