import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva-tools';
import { SearchBox } from 'tonva-react-form';
var VSearchHeader = /** @class */ (function (_super) {
    tslib_1.__extends(VSearchHeader, _super);
    function VSearchHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSearch = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cProduct;
            return tslib_1.__generator(this, function (_a) {
                cProduct = this.controller.cApp.cProduct;
                cProduct.start(key);
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    VSearchHeader.prototype.render = function (param) {
        return React.createElement(SearchBox, { className: "px-1 w-100", size: param, onSearch: this.onSearch, placeholder: "\u4EA7\u54C1\u540D, CAS, MDL" });
    };
    return VSearchHeader;
}(View));
export { VSearchHeader };
//# sourceMappingURL=VSearchHeader.js.map