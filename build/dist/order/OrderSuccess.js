import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
var OrderSuccess = /** @class */ (function (_super) {
    tslib_1.__extends(OrderSuccess, _super);
    function OrderSuccess() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = function (orderCreateResult) {
            return React.createElement(Page, null,
                React.createElement("div", null, orderCreateResult.no));
        };
        return _this;
    }
    OrderSuccess.prototype.open = function (orderCreateResult) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, orderCreateResult);
                return [2 /*return*/];
            });
        });
    };
    return OrderSuccess;
}(VPage));
export { OrderSuccess };
//# sourceMappingURL=OrderSuccess.js.map