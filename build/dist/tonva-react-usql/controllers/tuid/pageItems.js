import * as tslib_1 from "tslib";
import { PageItems } from 'tonva-tools';
var TuidPageItems = /** @class */ (function (_super) {
    tslib_1.__extends(TuidPageItems, _super);
    function TuidPageItems(tuid) {
        var _this = _super.call(this, true) || this;
        _this.tuid = tuid;
        return _this;
    }
    TuidPageItems.prototype.load = function (param, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tuid.search(param, pageStart, pageSize)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    TuidPageItems.prototype.setPageStart = function (item) {
        this.pageStart = item === undefined ? 0 : item.id;
    };
    return TuidPageItems;
}(PageItems));
export { TuidPageItems };
//# sourceMappingURL=pageItems.js.map