import * as tslib_1 from "tslib";
import { CEntity } from "../CVEntity";
import { VPendingMain } from "./vPendingMain";
var CPending = /** @class */ (function (_super) {
    tslib_1.__extends(CPending, _super);
    function CPending() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CPending.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VPendingMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CPending.prototype, "VPendingMain", {
        get: function () { return VPendingMain; },
        enumerable: true,
        configurable: true
    });
    return CPending;
}(CEntity));
export { CPending };
//# sourceMappingURL=cPending.js.map