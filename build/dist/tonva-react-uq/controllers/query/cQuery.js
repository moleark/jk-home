import * as tslib_1 from "tslib";
import { CEntity } from "../CVEntity";
import { VQueryMain } from "./vQueryMain";
import { VQuerySelect } from "./vQuerySelect";
var CQueryBase = /** @class */ (function (_super) {
    tslib_1.__extends(CQueryBase, _super);
    function CQueryBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CQueryBase;
}(CEntity));
export { CQueryBase };
var CQuery = /** @class */ (function (_super) {
    tslib_1.__extends(CQuery, _super);
    function CQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CQuery.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VQueryMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CQuery.prototype, "VQueryMain", {
        get: function () { return this.ui && this.ui.main || VQueryMain; },
        enumerable: true,
        configurable: true
    });
    return CQuery;
}(CQueryBase));
export { CQuery };
var CQuerySelect = /** @class */ (function (_super) {
    tslib_1.__extends(CQuerySelect, _super);
    function CQuerySelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CQuerySelect.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VQuerySelect, param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CQuerySelect.prototype, "VQuerySelect", {
        get: function () { return VQuerySelect; },
        enumerable: true,
        configurable: true
    });
    return CQuerySelect;
}(CQueryBase));
export { CQuerySelect };
//# sourceMappingURL=cQuery.js.map