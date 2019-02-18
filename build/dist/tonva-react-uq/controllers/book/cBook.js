import * as tslib_1 from "tslib";
import { CEntity } from "../CVEntity";
import { VBookMain } from "./vBookMain";
var CBook = /** @class */ (function (_super) {
    tslib_1.__extends(CBook, _super);
    function CBook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CBook.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VBookMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CBook.prototype, "VBookMain", {
        get: function () { return VBookMain; },
        enumerable: true,
        configurable: true
    });
    return CBook;
}(CEntity));
export { CBook };
//# sourceMappingURL=cBook.js.map