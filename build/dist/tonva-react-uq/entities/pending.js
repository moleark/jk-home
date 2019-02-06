import * as tslib_1 from "tslib";
import { Query } from './query';
var Pending = /** @class */ (function (_super) {
    tslib_1.__extends(Pending, _super);
    function Pending() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryApiName = 'pending';
        return _this;
    }
    Object.defineProperty(Pending.prototype, "typeName", {
        get: function () { return 'pending'; },
        enumerable: true,
        configurable: true
    });
    return Pending;
}(Query));
export { Pending };
//# sourceMappingURL=pending.js.map