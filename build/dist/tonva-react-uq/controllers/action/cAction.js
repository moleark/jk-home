import * as tslib_1 from "tslib";
import { CEntity } from "../CVEntity";
import { VActionMain } from "./vActionMain";
var CAction = /** @class */ (function (_super) {
    tslib_1.__extends(CAction, _super);
    function CAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CAction.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VActionMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CAction.prototype, "VActionMain", {
        get: function () { return VActionMain; },
        enumerable: true,
        configurable: true
    });
    CAction.prototype.submit = function (values) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.entity.submit(values)];
            });
        });
    };
    return CAction;
}(CEntity));
export { CAction };
//# sourceMappingURL=cAction.js.map