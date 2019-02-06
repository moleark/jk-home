import * as tslib_1 from "tslib";
import { CenterApi as CenterApiBase } from 'tonva-tools';
//
var CenterApi = /** @class */ (function (_super) {
    tslib_1.__extends(CenterApi, _super);
    function CenterApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CenterApi.prototype.userAppUnits = function (app) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tie/user-app-units', { app: app })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CenterApi;
}(CenterApiBase));
export { CenterApi };
export var centerApi = new CenterApi('tv/', undefined);
//# sourceMappingURL=centerApi.js.map