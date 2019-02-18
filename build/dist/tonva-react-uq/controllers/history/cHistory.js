import * as tslib_1 from "tslib";
import { CEntity } from "../CVEntity";
import { VHistoryMain } from "./vHistoryMain";
var CHistory = /** @class */ (function (_super) {
    tslib_1.__extends(CHistory, _super);
    function CHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHistory.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VHistoryMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CHistory.prototype, "VHistoryMain", {
        get: function () { return VHistoryMain; },
        enumerable: true,
        configurable: true
    });
    return CHistory;
}(CEntity));
export { CHistory };
//# sourceMappingURL=cHistory.js.map