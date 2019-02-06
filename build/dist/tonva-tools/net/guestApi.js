import * as tslib_1 from "tslib";
import { decodeGuestToken } from '../user';
import { CenterApi } from './uqApi';
var GuestApi = /** @class */ (function (_super) {
    tslib_1.__extends(GuestApi, _super);
    function GuestApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuestApi.prototype.guest = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret, guest;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('', {})];
                    case 1:
                        ret = _a.sent();
                        switch (typeof ret) {
                            default: return [2 /*return*/];
                            case 'string': return [2 /*return*/, decodeGuestToken(ret)];
                            case 'object':
                                guest = decodeGuestToken(ret.token);
                                return [2 /*return*/, guest];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GuestApi.prototype.unitFromName = function (unitName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(unitName)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret && ret.unit];
                }
            });
        });
    };
    return GuestApi;
}(CenterApi));
export { GuestApi };
export var guestApi = new GuestApi('tv/guest/', undefined);
//# sourceMappingURL=guestApi.js.map