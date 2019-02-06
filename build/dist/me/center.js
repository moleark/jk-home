import * as tslib_1 from "tslib";
import { CenterApi } from 'tonva-tools';
var Center = /** @class */ (function (_super) {
    tslib_1.__extends(Center, _super);
    function Center() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Center.prototype.changePassword = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tie/reset-password', param)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Center;
}(CenterApi));
var center = new Center('tv/', undefined);
export default center;
//# sourceMappingURL=center.js.map