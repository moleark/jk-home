import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { tv } from 'tonva-react-uq';
var VAddress = /** @class */ (function (_super) {
    tslib_1.__extends(VAddress, _super);
    function VAddress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = function (address) {
            var customer = _this.controller.customer;
            return React.createElement(Page, null,
                tv(customer),
                tv(address));
        };
        return _this;
    }
    VAddress.prototype.showEntry = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, param);
                return [2 /*return*/];
            });
        });
    };
    return VAddress;
}(VPage));
export { VAddress };
//# sourceMappingURL=VAddress.js.map